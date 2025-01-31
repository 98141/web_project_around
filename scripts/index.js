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
  { src: "./images/img_1.jpg", title: "Valle de Yosemite" },
  { src: "./images/img_2.png", title: "Lago Louise" },
  { src: "./images/img_3.png", title: "Montañas Calvas" },
  { src: "./images/img_4.png", title: "Vanois National Park" },
  { src: "./images/img_5.png", title: "Latemar" },
  { src: "./images/img_6.png", title: "Lago di Braies" }
];

const elementsContainer = document.querySelector("#elements");

// Función para crear un elemento y agregarlo al DOM
function createElement ({src, title}) {
  const element = document.createElement("div");
  element.classList.add("element");

  const img = document.createElement("img");
  img.src = src;
  img.classList.add("element__img");

  const elementItem = document.createElement("div");
  elementItem.classList.add("element__item");

  const titleElement = document.createElement("h2");
  titleElement.classList.add("element__item-title");
  titleElement.textContent = title;

  const heart = document.createElement("div");
  heart.classList.add("element__item-heart");

  // Agregamos los elementos al contenedor
  elementItem.appendChild(titleElement);
  elementItem.appendChild(heart);
  element.appendChild(img);
  element.appendChild(elementItem);

  return element;
}

// Iteramos sobre los datos y agregamos los elementos al DOM
elementsData.forEach(data => {
  const newElement = createElement(data);
  elementsContainer.appendChild(newElement);
});
