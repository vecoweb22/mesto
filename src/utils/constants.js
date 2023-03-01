export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');
export const btnEditAvatar = document.querySelector('.profile__edit-avatar');
export const username = document.querySelector('.profile__title');
export const userAbout = document.querySelector('.profile__subtitle');
export const avatar = document.querySelector('.profile__img');
export const formEdit = document.querySelector('[name="edit-form"]');
export const usernameInput = document.querySelector('[name="user-name"]');
export const userjobInput = document.querySelector('[name="user-job"]');
export const formEditProfile = document.forms.editForm;
export const formAddProfile = document.forms.addForm;
export const formUpdateAvatar = document.forms.editAvatarForm;

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error_visible',
};
