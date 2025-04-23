export default class PopupWithConfirmation {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector("form");
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
  }

  open(submitCallback) {
    this._submitCallback = submitCallback;
    this._popup.style.display = "flex";
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.addEventListener("mousedown", this._handleOverlayClick);
  }

  close() {
    this._popup.style.display = "none";
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this._popup.removeEventListener("mousedown", this._handleOverlayClick);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClick(evt) {
    if (evt.target === this._popup) {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector(".modal__close");
    closeButton.addEventListener("click", () => this.close());

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback(); // Ejecuta la acción (ej. borrar tarjeta)
    });
  }
}
