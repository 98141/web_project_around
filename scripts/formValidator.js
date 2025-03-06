export default class FormValidator {
  constructor(formElement, inputElement, contentElement) {
    this.formElement = formElement;
    this.inputElement = inputElement;
    this.contentElement = contentElement
  }

  showInputError(errorMessages, errorMessagesContent) {
    const errorElement = this.formElement.querySelector(`#${this.inputElement.id}-error`);
    this.inputElement.classList.add("form__input_type_error");
    errorElement.textContent = errorMessages; // contiene el elemento de error
    errorElement.classList.add("form__input-error_active");

    const errorContent = this.formElement.querySelector(`#${this.contentElement.id}-error`);
    this.contentElement.classList.add("form__input_type_error");
    errorContent.textContent = errorMessagesContent; // contiene el elemento de error
    errorContent.classList.add("form__input-error_active");
  }

  hideInputError() {
    const errorElement = this.formElement.querySelector(`#${this.inputElement.id}-error`);
    this.inputElement.classList.remove("form__input_type_error");
    errorElement.classList.remove("form__input-error_active");
    errorElement.textContent = "";

    const errorContent = this.formElement.querySelector(`#${this.contentElement.id}-error`);
    this.inputElement.classList.remove("form__input_type_error");
    errorContent.classList.remove("form__input-error_active");
    errorContent.textContent = "";
  }

  checkInputValidity(errorMessages) {
    const validityState = this.inputElement.validity;

    if (validityState.valueMissing) {
      this.showInputError(errorMessages.required);
    } else if (validityState.tooLong) {
      this.showInputError(`El máximo permitido son ${this.inputElement.maxLength} caracteres`);
    } else {
      this.hideInputError();
    }
  }

  hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  toggleButtonState(inputList, buttonElement) {
    if (this.hasInvalidInput(inputList)) {
      buttonElement.classList.add("button_inactive");
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove("button_inactive");
      buttonElement.disabled = false;
    }
  }

  setEventListeners() {
    const inputList = Array.from(this.formElement.querySelectorAll(".form__input"));
    const buttonElement = this.formElement.querySelector(".form__submit");

    this.toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.checkInputValidity();
        this.toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this.setEventListeners();
  }

  resetValidation() {
    if (!this.formElement) return;
    const inputList = Array.from(this.formElement.querySelectorAll(".form__input"));
    const buttonElement = this.formElement.querySelector(".form__submit");

    inputList.forEach((inputElement) =>
      this.hideInputError(inputElement)
    );
    this.toggleButtonState(inputList, buttonElement);
  }
}
