import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { galleryList } from './cards.js';

const main = document.querySelector('.main');
const buttonEdit = main.querySelector('.profile__edit-button');
const buttonAdd = main.querySelector('.profile__add-button');
const popupEdit = document.querySelector('#popup-user');
const popupAdd = document.querySelector('#popup-place');
const popupImage = document.querySelector('.popup_opened-img');
const fullImage = document.querySelector('.popup__screen-image');
const fullImageCaption = document.querySelector('.popup__screen-caption');
const buttonsClose = document.querySelectorAll('.popup__close-button');
const formEdit = document.querySelector('[name="edit-form"]');
const formAdd = document.querySelector('[name="add-form"]');
const username = main.querySelector('.profile__title');
const userjob = main.querySelector('.profile__subtitle');
const usernameInput = document.querySelector('[name="user-name"]');
const userjobInput = document.querySelector('[name="user-job"]');
const imgTitleInput = document.querySelector('[name="place-title"]');
const imgLinkInput = document.querySelector('[name="photo-link"]');
const popups = Array.from(document.querySelectorAll('.popup'));
const gallery = main.querySelector('.gallery__list');

function closeByOverlay(evt) {
  if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
    closePopup(evt.target);
  }
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

popups.forEach((popup) => {
  popup.addEventListener('click', closeByOverlay);
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function openImagePopup(title, link) {
  fullImage.src = link;
  fullImage.alt = title;
  fullImageCaption.textContent = title;
  openPopup(popupImage);
}

buttonEdit.addEventListener('click', function () {
  openPopup(popupEdit);
  usernameInput.value = username.textContent;
  userjobInput.value = userjob.textContent;
  formEditValidator.toggleButtonState();
});

buttonsClose.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function handleSubmitEditCardForm(evt) {
  evt.preventDefault();
  username.textContent = usernameInput.value;
  userjob.textContent = userjobInput.value;
  closePopup(popupEdit);
}

formEdit.addEventListener('submit', handleSubmitEditCardForm);

buttonAdd.addEventListener('click', function () {
  clearForm(formAdd);
  openPopup(popupAdd);
});

function clearForm(form) {
  form.reset();
  formAddValidator.toggleButtonState();
}

function handleSubmitAddCardForm(evt) {
  evt.preventDefault();
  const newCard = { title: imgTitleInput.value, link: imgLinkInput.value };
  const cardItem = createCard(newCard, '#gallery-item', openImagePopup);
  renderCard(cardItem);
  closePopup(popupAdd, formAdd);
}

formAdd.addEventListener('submit', handleSubmitAddCardForm);

galleryList.forEach((element) => {
  const cardItem = createCard(element, '#gallery-item', openImagePopup);
  renderCard(cardItem);
});

function createCard(cardData, template, popup) {
  const card = new Card(cardData, template, popup, gallery);
  const cardItem = card.generateCard();
  return cardItem;
}

function renderCard(card) {
  gallery.prepend(card);
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error_visible',
};

const formAddValidator = new FormValidator(validationConfig, formAdd);
const formEditValidator = new FormValidator(validationConfig, formEdit);

formAddValidator.enableValidation();
formEditValidator.enableValidation();
