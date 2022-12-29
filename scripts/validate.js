const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error_visible'
}

const showInputError = (form, input, config) => {
  const error = form.querySelector(`.${input.name}-error`);
  error.textContent = input.validationMessage;
  input.classList.add(config.inputErrorClass)
}

const hideInputError = (form, input, config) => {
  const error = form.querySelector(`.${input.name}-error`);
  error.textContent = '';
  input.classList.remove(config.inputErrorClass)
}


const checkInputValidity = (form, input, config) => {
  if (!input.validity.valid) {
    showInputError(form, input, config)
  } else {
    hideInputError(form, input, config)
  }
}

const toggleButtonState = (inputs, button, config) => {
  const isFormValid = inputs.every(input => {
    return input.validity.valid
  })

  if (!isFormValid) {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = 'disabled'
  } else {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = ''
  }
}

const enableValidation = (config) => {
  const { formSelector, inputSelector, submitButtonSelector, ...rest } = config

  const forms = Array.from(document.querySelectorAll(formSelector));
  // console.log(forms);
  forms.forEach(form => {
    const inputs = Array.from(form.querySelectorAll(inputSelector))
    const button = form.querySelector(submitButtonSelector);

    inputs.forEach(input => {
      input.addEventListener('input', () => {

        checkInputValidity(form, input, rest);

        toggleButtonState(inputs, button, rest);
      })
    })
  });
}

enableValidation(config);