import Card from "./card.js";
import { ElementsData } from "./cardInitial.js";
import FormValidator from "./formValidator.js";

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
  const imagenes = document.querySelectorAll(".element__img");
  const popup = document.getElementById("popup");
  const imagenPopup = document.getElementById("imagenPopup");
  const popupParagraph = document.getElementById("popup__paragraph");

  function closeOnEsc(event) {
    if (event.key === "Escape") {
      closePopup();
      closeEditModal();
      closeEditModalImg();
    }
  }

    const formValidatormodal = new FormValidator(modal, nameInput);

  // Función para abrir el modal de edición de perfil
  function openEditModal() {
    formValidatormodal.enableValidation();
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
    resetValidation(modal);
  }

  const formValidatorImg = new FormValidator(newImagen,nameImg);

  // Función para mostrar el formulario de nueva imagen
  function showImageForm() {
    newImagen.style.display = "flex";
    formValidatorImg.enableValidation();
  }

  // Función para manejar el evento de agregar una nueva imagen
  function handleSaveImageForm(event) {
    event.preventDefault();

    const imageTitle = nameImg.value;
    const imageURL = linkImg.value;


    if (imageTitle && imageURL ) {
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
    resetValidation(newImagen);
  }

  // Función para mostrar el popup con imagen ampliada
  function showPopup(event) {
    const img = event.target;
    imagenPopup.src = img.src;
    popupParagraph.textContent = img.getAttribute("data-title");
    popup.style.display = "flex";
    popupParagraph.style.display = "flex";

    // Hacer las demás imágenes opacas
    imagenes.forEach((otherImg) => {
      if (otherImg !== img) {
        otherImg.classList.add("activa");
      }
    });

    // Crear el botón de cerrar
    const closeButton = document.Card("div");
    closeButton.classList.add("popup__close");
    closeButton.textContent = "✖";
    closeButton.addEventListener("click", closePopup);

    popup.appendChild(closeButton);

    // Agregar evento para cerrar con Esc
    document.addEventListener("keydown", closeOnEsc);
  }

  // Función para cerrar el popup
  function closePopup() {
    popup.style.display = "none";
    popupParagraph.style.display = "none";
    imagenes.forEach((img) => {
      img.classList.remove("activa");
    });
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

  // Asignar eventos
  editButton.addEventListener("click", openEditModal);
  saveButton.addEventListener("click", saveProfile);
  closeButton.addEventListener("click", closeEditModal);
  closeButtonImg.addEventListener("click", closeEditModalImg);
  saveButtonImg.addEventListener("click", handleSaveImageForm);
  openButton.addEventListener("click", showImageForm);

  // Cerrar el popup al hacer clic fuera de la imagen
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopup();
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

  document.addEventListener("keydown", closeOnEsc);
});
