const main = document.querySelector('.main');
export const buttonEdit = main.querySelector('.profile__edit-button');
export const username = main.querySelector('.profile__title');
export const formEdit = document.querySelector('[name="edit-form"]');
export const usernameInput = document.querySelector('[name="user-name"]');
export const userjobInput = document.querySelector('[name="user-job"]');
export const buttonAdd = main.querySelector('.profile__add-button');
export const formAdd = document.querySelector('[name="add-form"]');

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error_visible',
};
