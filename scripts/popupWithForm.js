import popup from "./popup.js";

export default class PopupWithForm extends popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = document.querySelector("form"); // Selecciona el formulario externo
    this._inputList = Array.from(this._form.querySelectorAll("input"));

  }

  // Método privado para recopilar datos de los inputs del formulario
  _getInputValues() {
    const formData = {};
    this._inputList.forEach(input => {
      formData[input.name] = input.value;
      formData[input.name] = input.value;
    });
    return formData;
  }

  // Modifica el método setEventListeners para manejar el submit del formulario
  setEventListeners() {
    super.setEventListeners();

    // Agregar evento al formulario externo
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });

    //Asegurar que se usa el botón de cierre correcto
    document.querySelector(".modal__close").addEventListener("click", () => {
      this.close();
    });

  }

  // Sobrescribe el método close para resetear el formulario al cerrar
  close() {
    super.close();
    this._form.reset();
  }
}