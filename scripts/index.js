//Boton editar perfil
document.addEventListener("DOMContentLoaded", () => {
  const editButton = document.querySelector(".profile__info-button");
  const modal = document.getElementById("editModal");
  const nameInput = document.getElementById("nameInput");
  const functionInput = document.getElementById("functionInput");
  const saveButton = document.getElementById("saveButton");
  const closeButton = document.getElementById("closeButton");

  const nameElement = document.querySelector(".profile__info-name");
  const functionElement = document.querySelector(".profile__info-function");

  editButton.addEventListener("click", (event) => {
    event.preventDefault();
    nameInput.value = nameElement.textContent;
    functionInput.value = functionElement.textContent;
    modal.style.display = "flex";
  });

  saveButton.addEventListener("click", () => {
    nameElement.textContent = nameInput.value;
    functionElement.textContent = functionInput.value;
    modal.style.display = "none";
  });

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

//Agregar elementos
const elementsData = [
  { src: "../images/img_1.jpg", title: "Valle de Yosemite" },
  { src: "../images/img_2.png", title: "Lago Louise" },
  { src: "../images/img_3.png", title: "Montañas Calvas" },
  { src: "../images/img_4.png", title: "Vanois National Park" },
  { src: "../images/img_5.png", title: "Latemar" },
  { src: "../images/img_6.png", title: "Lago di Braies" },
];

const elementsContainer = document.querySelector("#elements");
const newImagen = document.querySelector("#nuevoLugar");
const openButton = document.querySelector("#profile__button");

// Función para crear un elemento y agregarlo al DOM
function createElement({ src, title }) {
  const element = document.createElement("div");
  element.classList.add("element");

  const img = document.createElement("img");
  img.src = src;
  img.alt = `Imagen de ${title}`;
  img.classList.add("element__img");

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
  heart.addEventListener("click", function (event) {
    event.target.classList.toggle("element__item-heart_active");
  });

  // Agregamos los elementos al contenedor
  elementItem.appendChild(titleElement);
  elementItem.appendChild(heart);
  element.appendChild(deleteButton);
  element.appendChild(img);
  element.appendChild(elementItem);

  return element;
}

//Activar el formulario
openButton.addEventListener("click", function () {
  newImagen.style.display = "block";
});
// Iteramos sobre los datos y agregamos los elementos al DOM
elementsData.forEach((data) => {
  const newElement = createElement(data);
  elementsContainer.appendChild(newElement);
});

// Evento para agregar nuevas imágenes desde el formulario
newImagen.addEventListener("saveButton", (event) => {
  event.preventDefault();

  const imageTitle = document.querySelector("titleInput").value;
  const imageURL = document.querySelector("enlaceInput").value;

  if (imageTitle && imageURL) {
    const newCard = { title: imageTitle, src: imageURL };
    const newElement = createElement(newCard);
    elementsContainer.prepend(newElement); // Agregar al inicio de la lista
  }

  // Limpiar el formulario
  newImagen.reset();
});

//popup
// Obtener los elementos
const imagenes = document.querySelectorAll('.element__img');
const popup = document.getElementById('popup');
const imagenPopup = document.getElementById('imagenPopup');

// Agregar el evento click a todas las imágenes
imagenes.forEach(imagen => {
  imagen.addEventListener('click', function() {
    // Cambiar la imagen en el popup
    imagenPopup.src = imagen.src;

    // Mostrar el popup
    popup.style.display = 'flex';

    // Hacer las demás imágenes opacas
    imagenes.forEach(img => {
      if (img !== imagen) {
        img.classList.add('activa');
      }
    });
  });
});

// Cerrar el popup cuando se hace clic fuera de la imagen ampliada
popup.addEventListener('click', function(e) {
  if (e.target === popup) {
    popup.style.display = 'none';
    imagenes.forEach(img => {
      img.classList.remove('activa');
    });
  }
});