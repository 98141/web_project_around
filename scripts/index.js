import Card from "./card.js";
import { ElementsData } from "./cardInitial.js";
import FormValidator from "./formValidator.js";
import showPopup from "./utils.js";
import { closePopup } from "./utils.js";

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
  const nameImg = document.getElementById("nameImg");
  const linkImg = document.getElementById("linkImg");
  const saveButtonImg = document.getElementById("saveButtonImg");
  const openButton = document.querySelector("#profile__button");

  function closeOnEsc(event) {
    if (event.key === "Escape") {
      closePopup();
      closeEditModal();
      closeEditModalImg();

    }
  }

  const formValidatormodal = new FormValidator(modal);
  formValidatormodal.enableValidation();

  // Función para abrir el modal de edición de perfil
  function openEditModal() {
    nameInput.value = nameElement.textContent;
    functionInput.value = functionElement.textContent;
    modal.style.display = "flex";
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

  const formValidatorImg = new FormValidator(newImagen);
  formValidatorImg.enableValidation();

  // Función para mostrar el formulario de nueva imagen
  function showImageForm() {
    newImagen.style.display = "flex";
  }

  // Función para manejar el evento de agregar una nueva imagen
  function handleSaveImageForm(event) {
    event.preventDefault();

    const imageTitle = nameImg.value;
    const imageURL = linkImg.value;

    if (imageTitle && imageURL) {
      const newCard = { title: imageTitle, src: imageURL };
      const newElement = new Card(newCard);
      elementsContainer.prepend(newElement.createElement(newCard)); // Agregar al inicio
      nameImg.value = "";
      linkImg.value = "";
      newImagen.style.display = "none";
    }
  }

  function closeEditModalImg() {
    newImagen.style.display = "none";
    //formValidatorImg(newImagen);
  }

  // Agregar imágenes al DOM
  ElementsData.forEach((data) => {
    const newCard = new Card(data);
    const element = newCard.createElement({ src: data.src, title: data.title }); // Usar el método createElement para obtener el nodo DOM
    elementsContainer.appendChild(element); // Agregar el nodo al contenedor
  });

  // Delegación de eventos para las imágenes
  elementsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("element__img")) {
      showPopup(event);
    }
  });

  //cerrar el modal
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

  // Asignar eventos
  editButton.addEventListener("click", openEditModal);
  saveButton.addEventListener("click", saveProfile);
  closeButton.addEventListener("click", closeEditModal);
  closeButtonImg.addEventListener("click", closeEditModalImg);
  saveButtonImg.addEventListener("click", handleSaveImageForm);
  openButton.addEventListener("click", showImageForm);

 document.addEventListener("keydown", closeOnEsc);
});
