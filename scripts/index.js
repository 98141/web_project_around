import card from "./card.js";
import formValidator from "./formValidator.js";
import Section from "./Section.js";
import popupWithImages from "./popupWithImage.js";
import popupWithForm from "./popupWithForm.js";
import userInfo from "./userInfo.js";
import { api } from "./api.js";

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

  // Función para cerrar el modal con la tecla Esc
  //queda pendiente para ver si sigue funcional hasta el final o se cambia con el popup padre
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

  // Cargar tarjetas desde la API
  api
    .getInitialCards()
    .then((initialCards) => {
      const sections = new Section(
        {
          items: initialCards.reverse(),
          renderer: (item) => {
            const cardData = {
              src: item.link,
              title: item.name,
            };

            const cards = new card(cardData, "#element-template");
            const cardElement = cards.createElement();
            sections.addItem(cardElement);
          },
        },
        "#elements"
      );
      sections.renderItems();
    })
    .catch((err) => console.error("Error al cargar tarjetas:", err));

  // Función para abrir el modal de edición de perfil
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

  //Editar el perfil y guardar los cambios en la api - popup de perfil
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

  // Función para mostrar el formulario de nueva imagen
  openButton.addEventListener("click", () => {
    newImagen.style.display = "flex";

    console.log("Formulario de nueva imagen validado", popupForm);
    popupForm.open();
  });

  //validacion de los formularios
  const formValidatorImg = new formValidator(newImagen);
  formValidatorImg.enableValidation();

  // Función para guardar la nueva imagen
  const popupForm = new popupWithForm("#nuevoLugar", (data) => {
    return api
      .addNewCard(data.name, data.link)
      .then((newCard) => {
        const cardElement = (newCard.link, newCard.name, newCard._id);
        newImagen.prepend(cardElement);
        popupForm.close();
      })
      .catch((err) => console.error("Error al agregar tarjeta:", err));
  });
  popupForm.setEventListeners();

  //Funcion para cerrar el popup de las imagenes
  function closeEditModalImg() {
    newImagen.style.display = "none";
    popupForm.close();
  }

  //cerrar el modal de editar perfil
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  //cerrar el modal nueva imagen
  newImagen.addEventListener("click", (event) => {
    if (event.target === newImagen) {
      newImagen.style.display = "none";
    }
  });

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
