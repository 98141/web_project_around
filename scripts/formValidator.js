export default class FormValidator {
  constructor(formElement, inputElement) {
    this.formElement = formElement;
    this.inputElement = inputElement;
  }

  showInputError(message) {
    const errorElement = this.formElement.querySelector(`#${this.inputElement.id}-error`);
    this.inputElement.classList.add("form__input_type_error");
    errorElement.textContent = message; // Use the provided message
    errorElement.classList.add("form__input-error_active");
  }

  hideInputError() {
    const errorElement = this.formElement.querySelector(`#${this.inputElement.id}-error`);
    this.inputElement.classList.remove("form__input_type_error");
    errorElement.classList.remove("form__input-error_active");
    errorElement.textContent = "";
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
