import Popup  from "./popup.js";

export  default class PopupWithImages extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".imagen-popup");
    this._caption = this._popup.querySelector(".popup__paragraph");

    console.log("Popup del imagenes")

  }

  open({ src, title }) {
    if (!src || !title) {
      console.error("Datos inválidos para abrir el popup.");
      return;
    }
    this._image.src = src;
    this._image.alt = title;
    this._caption.textContent = title;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
  }
}