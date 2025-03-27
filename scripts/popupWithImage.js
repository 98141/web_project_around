import popup  from "./Popup.js";

export  default class PopupWithImages extends popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".imagen-popup");
    this._caption = this._popup.querySelector(".popup__paragraph");
  }

  open({ src, title }) {
    super.open();

    if (!src || !title) {
      console.error("Datos inválidos para abrir el popup.");
      return;
    }
    this._image.src = src;
    this._image.alt = title;
    this._caption.textContent = title;
  }


}