import {Popup} from './popup';

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector); // Llama al constructor de Popup
    this._handleFormSubmit = handleFormSubmit; // Callback para el envío del formulario
    this._form = this._popup.querySelector('form'); // Selecciona el formulario dentro del popup
    this._inputList = this._form.querySelectorAll('input'); // Selecciona todos los campos de entrada
  }

  // Método privado para obtener los valores de los campos de entrada
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach(input => {
      inputValues[input.name] = input.value; // Asocia los valores de los campos con sus nombres
    });
    return inputValues;
  }

  // Sobrescribir el método setEventListeners para agregar el evento submit
  setEventListeners() {
    super.setEventListeners(); // Llama al método setEventListeners() del padre

    // Agrega un evento al formulario para manejar el submit
    this._form.addEventListener('submit', (event) => {
      event.preventDefault(); // Previene el comportamiento por defecto de enviar el formulario
      const inputValues = this._getInputValues(); // Obtiene los valores de los campos de entrada
      this._handleFormSubmit(inputValues); // Llama al callback con los valores
      this.close(); // Cierra el popup
    });
  }

  // Sobrescribir el método close para resetear el formulario
  close() {
    super.close(); // Llama al método close() del padre
    this._form.reset(); // Resetea el formulario
  }
}