  // Función para manejar el evento de agregar una nueva imagen
  const nameImg = document.getElementById("nameImg");
  const linkImg = document.getElementById("linkImg");
  const elementsContainer = document.querySelector("#elements");
  const newImagen = document.getElementById("nuevoLugar");

  import card from "./Card.js";

  export function handleSaveImageForm(event) {
    event.preventDefault();

    const imageTitle = nameImg.value;
    const imageURL = linkImg.value;

    if (imageTitle && imageURL) {
      const newCard = { title: imageTitle, src: imageURL };
      const newElement = new card(newCard);
      elementsContainer.prepend(newElement.createElement(newCard)); // Agregar al inicio
      nameImg.value = "";
      linkImg.value = "";
      newImagen.style.display = "none";
    }
  }