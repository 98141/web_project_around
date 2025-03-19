export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector); // Selecciona el popup a partir del selector proporcionado
    this.closeButton = this.popup.querySelector("popup__close"); // Selector para el botón de cerrar dentro del popup
    this._handleEscClose = this._handleEscClose.bind(this); // Vinculamos el contexto de `this` al método privado
  }

  // Abre el popup
  open() {
    this._popup.classList.add("popup_opened");
    this._popup.style.display = "flex"; // 🔥 Forzar visibilidad en caso de que display: none siga activo
    document.addEventListener("keydown", this._handleEscClose); // Escucha el evento de presionar la tecla 'Esc'
    console.log("Popup abierto");
  }

  // Cierra el popup
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose); // Deja de escuchar el evento de presionar la tecla 'Esc'
    console.log("Popup cerrado");
  }

  // Método privado para cerrar el popup cuando se presiona la tecla Esc
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  // Método para agregar los listeners de eventos
  setEventListeners() {
    // Cerrar el popup al hacer clic en el icono de cerrar (se asume que el popup tiene un botón con la clase '.popup__close')
    const closeButton = this._popup.querySelector(".popup__close");
    closeButton.addEventListener("click", () => this.close());

    // Cerrar el popup al hacer clic en el área sombreada del popup (la parte externa del formulario/modal)
    this._popup.addEventListener("click", (event) => {
      if (event.target === this._popup) {
        this.close();
      }
    });
  }
}
