import popup from "./popup.js";

export default class PopupWithForm extends popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = document.querySelector("form"); // Selecciona el formulario externo
    this._inputList = Array.from(this._form.querySelectorAll("input"));
    this._submitButton = this._form.querySelector(".form__submit");
    this._submitButtonText = this._submitButton.textContent;
  }

  // Método privado para recopilar datos de los inputs del formulario
  _getInputValues() {
    const formData = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formData;
  }

  // Método para cambiar el estado del botón
  _toggleLoadingState(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Guardando...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  // Modifica el método setEventListeners para manejar el submit del formulario
  setEventListeners() {
    super.setEventListeners();

    // Agregar evento al formulario externo
    this._form.addEventListener("submit", (evt) => {
      console.log("Formulario enviado");
      evt.preventDefault();
      this._toggleLoadingState(true); // Mostrar "Guardando..."
      this._handleFormSubmit(this._getInputValues())
        .then(() => this.close()) // Cerrar si la solicitud fue exitosa
        .catch((err) => console.error("Error al enviar formulario:", err))
        .finally(() => this._toggleLoadingState(false)); // Restaurar el botón
    });

  }

  // Sobrescribe el método close para resetear el formulario al cerrar
  close() {
    super.close();
    this._form.reset();
  }
}
