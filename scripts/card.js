export default class Card {
  constructor(data, templateSelector, handerCardClick) {
    this._src = data.src;
    this._title = data.title;
    this._templateSelector = templateSelector;
    this._handerCardClick = handerCardClick;
    this.isLiked = false;
  }

  toggleLike() {
    this.isLiked = !this.isLiked;
  }

  //Crear un nuevo elemento con imagen y título
  createElement() {
    const element = document.createElement("div");
    element.classList.add("element");

    const img = document.createElement("img");
    img.src = this._src;
    img.alt = `Imagen de ${this._title}`;
    img.classList.add("element__img");
    img.setAttribute("data-title",  this._title);

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
    titleElement.textContent =  this._title;

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

}
