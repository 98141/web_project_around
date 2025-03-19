import { Popup  } from "./popup";

export default class Popup extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".imagen-popup");
    this._caption = this._popup.querySelector(".popup__paragraph");
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