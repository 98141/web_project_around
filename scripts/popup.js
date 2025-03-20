export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector); // Selecciona el popup a partir del selector proporcionado
    this._handleEscClose = this._handleEscClose.bind(this); // Vinculamos el contexto de `this` al método privado
    this.setEventListeners();
  }

  // Abre el popup
  open() {
    this._popup.classList.add("popup__open");
    this._popup.style.display = "flex"; // 🔥 Forzar visibilidad en caso de que display: none siga activo
    document.addEventListener("keydown", this._handleEscClose); // Escucha el evento de presionar la tecla 'Esc'
    console.log("Popup abierto");
  }

  // Cierra el popup
  close() {
    this._popup.classList.remove("popup__open");
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
    this._popup.addEventListener("click", (evt) => {
      // Cierra si se hace clic en el área sombreada o en el botón de cierre
      if (
        evt.target.classList.contains("popup__overlay") ||
        evt.target.classList.contains("popup__close-button")
      ) {
        this.close();
      }
    });
  }
}
