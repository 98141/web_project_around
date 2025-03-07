export default class FormValidator {
  constructor(formElement) {
    this.formElement = formElement;
  }

  showInputError(inputElement, errorMessages) {
    const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add("form__input_type_error");
    errorElement.textContent = errorMessages;
    errorElement.classList.add("form__input-error_active");
  }

  hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove("form__input_type_error");
    errorElement.classList.remove("form__input-error_active");
    errorElement.textContent = "";
  }

  checkInputValidity(inputElement) {
    const validityState = inputElement.validity;

    if(validityState.valid) {
      this.hideInputError(inputElement);
    }else{
      this.showInputError(inputElement, inputElement.validationMessage);
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
        this.checkInputValidity(inputElement);
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
