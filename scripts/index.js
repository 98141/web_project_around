import Card from "./card.js";
import { ElementsData } from "./cardInitial.js";
import FormValidator from "./formValidator.js";
import Section from "./Section.js";
import PopupWithImages from "./popupWithImage.js";
import PopupWithForm from "./popupWithForm.js";
import UserInfo from "./userInfo.js";
import { handleSaveImageForm } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  // Elementos del DOM
  const editButton = document.querySelector(".profile__info-button");
  const modal = document.getElementById("editModal");
  const nameInput = document.getElementById("nameInput");
  const functionInput = document.getElementById("functionInput");
  const saveButton = document.getElementById("saveButton");
  const closeButton = document.getElementById("closeButton");
  const closeButtonImg = document.getElementById("closeButtonImg");

  const nameElement = document.querySelector(".profile__info-name");
  const functionElement = document.querySelector(".profile__info-function");
  const elementsContainer = document.querySelector("#elements");
  const newImagen = document.getElementById("nuevoLugar");

  const saveButtonImg = document.getElementById("saveButtonImg");
  const openButton = document.querySelector("#profile__button");

  // Función para cerrar el modal con la tecla Esc
  //queda pendiente para ver si sigue funcional hasta el final o se cambia con el popup padre
  function closeOnEsc(event) {
    if (event.key === "Escape") {
      closeEditModal();
      closeEditModalImg();
    }
  }

  // Función para abrir el modal de edición de perfil
  editButton.addEventListener("click", () => {
    nameInput.value = nameElement.textContent;
    functionInput.value = functionElement.textContent;
    modal.style.display = "flex";

    //validacion de los formularios
    const formValidatormodal = new FormValidator(modal);
    formValidatormodal.enableValidation();

    //delegacion de eventos para formulario
    const handleFormSubmit = () => {
    };
    const popupForm = new PopupWithForm("#popup", handleFormSubmit);
    popupForm.setEventListeners();
  });

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

    //validacion de los formularios
    const formValidatorImg = new FormValidator(newImagen);
    formValidatorImg.enableValidation();

     //validacion de los formularios
     const formValidatormodal = new FormValidator(newImagen);
     formValidatormodal.enableValidation();

     //delegacion de eventos para formulario
     const handleFormSubmit = () => {
     };
     const popupForm = new PopupWithForm("#popup", handleFormSubmit);
     popupForm.setEventListeners();
  });

  //Funcion para cerrar el popup de las imagenes
  function closeEditModalImg() {
    newImagen.style.display = "none";
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

  //Instancia de section
  const section = new Section(
    {
      items: ElementsData,
      renderer: (data) => {
        const newCard = new Card(data, "#element-template"); // Ajusta el templateSelector si es necesario
        const element = newCard.createElement();
        section.addItem(element);
      },
    },
    "#elements" // Selector del contenedor en el DOM
  );

  section._renderItems();

  /*user info
  const userInfo = new UserInfo({
    nameElement: "#nameInput",
    workElement: "#functionInput",
  });

  modal.addEventListener(
    "submit",
    handleProfileFormSubmit(userInfo.setUserInfo)
  );*/

  // Delegación de eventos para las imágenes abrir el popup de las imagenes
  elementsContainer.addEventListener("click", (event) => {
    // Crear una nueva instancia de PopupWithImages
    const popupWithImage = new PopupWithImages("#popup");

    if (event.target.classList.contains("element__img")) {
      // Obtener la URL de la imagen y el título
      const imageSrc = event.target.src;
      const imageTitle = event.target.alt || "Imagen sin título";
      // Configurar los listeners para el popup
      popupWithImage.setEventListeners();
      // Abrir el popup y pasarle los datos de la imagen
      popupWithImage.open({ src: imageSrc, title: imageTitle });
    }
  });

  // Asignar eventos
  saveButton.addEventListener("click", saveProfile);
  closeButton.addEventListener("click", closeEditModal);
  closeButtonImg.addEventListener("click", closeEditModalImg);
  saveButtonImg.addEventListener("click", handleSaveImageForm);

  document.addEventListener("keydown", closeOnEsc);
});
