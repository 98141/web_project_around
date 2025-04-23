import card from "./card.js";
import formValidator from "./formValidator.js";
import Section from "./Section.js";
import popupWithImages from "./popupWithImage.js";
import popupWithForm from "./popupWithForm.js";
import userInfo from "./userInfo.js";
import { api } from "./api.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";

document.addEventListener("DOMContentLoaded", () => {
  // Elementos del DOM
  const editButton = document.querySelector(".profile__info-button");
  const modal = document.getElementById("editModal");
  const nameInput = document.getElementById("nameInput");
  const functionInput = document.getElementById("functionInput");
  const saveButton = document.getElementById("saveButton");
  const closeButton = document.getElementById("closeButton");
  const closeButtonImg = document.getElementById("closeButtonImg");
  const closeButtonPopup = document.getElementById("closeButtonPopup");

  const nameElement = document.querySelector(".profile__info-name");
  const functionElement = document.querySelector(".profile__info-function");
  const elementsContainer = document.querySelector("#elements");
  const newImagen = document.getElementById("nuevoLugar");

  const openButton = document.querySelector("#profile__button");

  const editAvatarButton = document.getElementById("editAvatarButton");
  const editAvatar = document.getElementById("editAvatar");

  //popup de confirmacion
  const confirmDeletePopup = new PopupWithConfirmation("#confirmDeletePopup");
  confirmDeletePopup.setEventListeners();

  // Función para cerrar el modal con la tecla Esc
  function closeOnEsc(event) {
    if (event.key === "Escape") {
      closeEditModal();
      closeEditModalImg();
    }
  }

  //  Instancias de clases
  const newuserInfo = new userInfo(
    ".profile__info-name",
    ".profile__info-function",
    ".profile__avatar"
  );

  // Cargar datos del usuario desde la API
  // 1. Función reutilizable para crear una tarjeta
  function createCard(item) {
    const cardData = {
      src: item.link,
      title: item.name,
      id: item._id,
      isLiked: item.isLiked,
      owner: item.owner,
    };

    const cards = new card(cardData, "#element-template", {
      handleCardClick: (link, name) => {
        showCardPopup.open(link, name);
      },
      handleAddLike: (cardId, isLiked) => {
        return api
          .toggleLike(cardId, isLiked)
          .then(() => !isLiked)
          .catch((err) => {
            console.error("Error al alternar 'me gusta':", err);
            return isLiked;
          });
      },
      handleDeleteCard: (cardId, element) => {
        return new Promise((resolve) => {
          confirmDeletePopup.open(() => {
            api
              .removeCard(cardId)
              .then(() => {
                element.remove();
                confirmDeletePopup.close();
                resolve(); // para que la tarjeta se elimine visualmente
              })
              .catch((err) =>
                console.error("Error al eliminar tarjeta:", err)
              );
          });
        });
      },
    });

    return cards.createElement();
  }

  // 2. Instancia de Section para las tarjetas
  const section = new Section(
    {
      items: [], // inicialmente vacío
      renderer: (item) => {
        const cardElement = createCard(item);
        section.addItem(cardElement);
      },
    },
    "#elements"
  );

  // 3. Cargar datos del usuario desde la API
  api
    .getUserInfo()
    .then((userData) => {
      newuserInfo.setUserInfo({
        name: userData.name,
        about: userData.about,
        avatar: userData.avatar,
      });
    })
    .catch((err) => console.error("Error al obtener datos del usuario:", err));

  // 4. Cargar tarjetas desde la API
  api
    .getInitialCards()
    .then((initialCards) => {
      section._items = initialCards.reverse(); // actualiza los items
      section.renderItems();
    })
    .catch((err) => console.error("Error al cargar tarjetas:", err));

  // 5. Formulario para agregar nueva tarjeta
  const popupForm = new popupWithForm("#nuevoLugar", (data) => {
    return api
      .addNewCard(data.name, data.link)
      .then((newCard) => {
        const cardElement = createCard(newCard);
        section.addItem(cardElement); // Agrega la nueva tarjeta
        popupForm.close();
      })
      .catch((err) => console.error("Error al agregar tarjeta:", err));
  });
  popupForm.setEventListeners();

  // 6. Editar el perfil y guardar los cambios en la api - popup de perfil
  const profilePopup = new popupWithForm("#editModal", (data) => {
    return api
      .updateUserProfile(data.name, data.about)
      .then((updatedData) => {
        newuserInfo.setUserInfo(updatedData);
        profilePopup.close();
      })
      .catch((err) => console.error("Error al actualizar perfil:", err));
  });
  profilePopup.setEventListeners();

  // 7. Función para abrir el modal de edición de perfil
  editButton.addEventListener("click", () => {
    const currentUser = newuserInfo.getUserInfo();
    nameInput.value = currentUser.name;
    functionInput.value = currentUser.title;

    modal.style.display = "flex";

    profilePopup.open();
  });

  //validacion de los formularios
  const formValidatormodal = new formValidator(modal);
  formValidatormodal.enableValidation();

  //validacion de los formularios
  const formValidatorImg = new formValidator(newImagen);
  formValidatorImg.enableValidation();

  // Delegación de eventos para las imágenes abrir el popup de las imagenes
  elementsContainer.addEventListener("click", (event) => {
    // Crear una nueva instancia de PopupWithImages
    const popupWithImage = new popupWithImages("#popup");

    if (event.target.classList.contains("element__img")) {
      // Obtener la URL de la imagen y el título
      const imageSrc = event.target.src;
      const imageTitle = event.target.alt || "Imagen sin título";
      // Configurar los listeners para el popup
      popupWithImage.setEventListeners();
      // Abrir el popup y pasarle los datos de la imagen
      popupWithImage.open({ src: imageSrc, title: imageTitle });
      //popupWithImage.close();
    }
  });

  //funcion para mostrar la ventata de editar avatar
  editAvatarButton.addEventListener("click", () => {
    editAvatar.style.display = "flex";
  });

  const formValidatorAvatar = new popupWithForm("#editAvatar", modal);
  formValidatorAvatar.setEventListeners();

  //cerrar el modal nueva imagen
  newImagen.addEventListener("click", (event) => {
    if (event.target === newImagen) {
      newImagen.style.display = "none";
    }
  });

  //cerrar el modal de editar perfil
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Función para mostrar el formulario de nueva imagen
  openButton.addEventListener("click", () => {
    newImagen.style.display = "flex";
    popupForm.open();
  });

  // Funciones

  //Funcion para cerrar el popup de las imagenes
  function closeEditModalImg() {
    newImagen.style.display = "none";
    popupForm.close();
  }

  // Función para guardar los cambios en el perfil
  function saveProfile() {
    nameElement.textContent = nameInput.value;
    functionElement.textContent = functionInput.value;
    modal.style.display = "none";
  }

  // Función para cerrar el modal sin guardar cambios
  function closeEditModal() {
    modal.style.display = "none";
  }

  // Asignar eventos
  saveButton.addEventListener("click", saveProfile);
  closeButton.addEventListener("click", closeEditModal);
  closeButtonImg.addEventListener("click", closeEditModalImg);

  closeButtonPopup.addEventListener("click", () => {
    const popup = document.querySelector(".popup");
    popup.style.display = "none";
  });

  document.addEventListener("keydown", closeOnEsc);
});
