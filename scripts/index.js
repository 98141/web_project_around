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

  const elementsData = [
    {
      src: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
      title: "Valle de Yosemite",
    },
    {
      src: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
      title: "Lago Louise",
    },
    {
      src: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
      title: "Montañas Calvas",
    },
    {
      src: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
      title: "Vanois National Park",
    },
    {
      src: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
      title: "Latemar",
    },
    {
      src: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
      title: "Lago di Braies",
    },
  ];

  function closeOnEsc(event) {
    if (event.key === "Escape") {
      closePopup();
      closeEditModal();
      closeEditModalImg();
    }
  }

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

  // Función para crear un nuevo elemento con imagen y título
  function createElement({ src, title }) {
    const element = document.createElement("div");
    element.classList.add("element");

    const img = document.createElement("img");
    img.src = src;
    img.alt = `Imagen de ${title}`;
    img.classList.add("element__img");
    img.setAttribute("data-title", title);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("element__delete");
    deleteButton.textContent = "🗑️";
    deleteButton.addEventListener("click", () => {
      element.remove();
    });

    const elementItem = document.createElement("div");
    elementItem.classList.add("element__item");

    const titleElement = document.createElement("h2");
    titleElement.classList.add("element__item-title");
    titleElement.textContent = title;

    const heart = document.createElement("div");
    heart.classList.add("element__item-heart");
    heart.addEventListener("click", () => {
      heart.classList.toggle("element__item-heart_active");
    });

    elementItem.appendChild(titleElement);
    elementItem.appendChild(heart);
    element.appendChild(deleteButton);
    element.appendChild(img);
    element.appendChild(elementItem);

    return element;
  }

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
      const newElement = createElement(newCard);
      elementsContainer.prepend(newElement); // Agregar al inicio
      nameImg.value = "";
      linkImg.value = "";
      newImagen.style.display = "none";
    }
    // Función para cerrar el modal sin guardar cambios
    newImagen.reset();
  }

  function closeEditModalImg() {
    newImagen.style.display = "none";
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
    const closeButton = document.createElement("div");
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

  // Asignar eventos
  editButton.addEventListener("click", openEditModal);
  saveButton.addEventListener("click", saveProfile);
  closeButton.addEventListener("click", closeEditModal);
  closeButtonImg.addEventListener("click", closeEditModalImg);
  saveButtonImg.addEventListener("click", handleSaveImageForm);
  openButton.addEventListener("click", showImageForm);


  // Agregar imágenes al DOM
  elementsData.forEach((data) => {
    const newElement = createElement(data);
    elementsContainer.appendChild(newElement);
  });

  // Delegación de eventos para las imágenes
  elementsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("element__img")) {
      showPopup(event);
    }
  });

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

  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add("form__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("form__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove("form__input_type_error");
    errorElement.classList.remove("form__input-error_active");
    errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add("button_inactive");
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove("button_inactive");
        buttonElement.disabled = false;
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".form__input"));
    const buttonElement = formElement.querySelector(".form__submit");

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = () => {
    const formElement = document.querySelector('form[name="form"]');
    formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
    });

    setEventListeners(formElement);
};

enableValidation();

});