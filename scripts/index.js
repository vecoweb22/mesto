import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { galleryList } from './cards.js';

const main = document.querySelector('.main')
const editButton = main.querySelector('.profile__edit-button');
const addButton = main.querySelector('.profile__add-button');
const popupEdit = document.querySelector('#popup-user');
const popupAdd = document.querySelector('#popup-place');
const popupImage = document.querySelector('.popup_opened-img');
const fullImage = document.querySelector('.popup__screen-image');
const fullImageCaption = document.querySelector('.popup__screen-caption');
const closeButtons = document.querySelectorAll('.popup__close-button');
const editForm = document.querySelector('[name="edit-form"]');
const addForm = document.querySelector('[name="add-form"]');
const username = main.querySelector('.profile__title');
const userjob = main.querySelector('.profile__subtitle');
const inputUsername = document.querySelector('[name="user-name"]');
const inputUserjob = document.querySelector('[name="user-job"]');
const inputImgtitle = document.querySelector('[name="place-title"]');
const inputImgLink = document.querySelector('[name="photo-link"]');
const gallery = main.querySelector('.gallery__list');

function closeByOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
  document.addEventListener('mouseup', closeByOverlay);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
  document.removeEventListener('mouseup', closeByOverlay);
}

function openImagePopup(title, link) {
  fullImage.src = link;
  fullImage.alt = title;
  fullImageCaption.textContent = title;
  openPopup(popupImage);
}

editButton.addEventListener('click', function () {
  openPopup(popupEdit);
  inputUsername.value = username.textContent;
  inputUserjob.value = userjob.textContent;
  editFormValidator.toggleButtonState();
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  const popupForm = popup.querySelector('.popup__form');
  button.addEventListener('click', () => closePopup(popup, popupForm));
});

function handleSubmitEditCardForm(evt) {
  evt.preventDefault();
  username.textContent = inputUsername.value;
  userjob.textContent = inputUserjob.value;
  closePopup(popupEdit);
}

editForm.addEventListener('submit', handleSubmitEditCardForm);

addButton.addEventListener('click', function () {
  clearForm(addForm);
  openPopup(popupAdd);
});

function clearForm(form) {
  form.reset();
  addFormValidator.toggleButtonState();
}

function handleSubmitAddCardForm(evt) {
  evt.preventDefault();
  const newCard = { title: inputImgtitle.value, link: inputImgLink.value };
  createCard(newCard, '#gallery-item', openImagePopup, gallery);
  closePopup(popupAdd, addForm);
}

addForm.addEventListener('submit', handleSubmitAddCardForm);

galleryList.forEach((element) => {
  createCard(element, '#gallery-item', openImagePopup, gallery);
});

function createCard(element, template, popup, container) {
  const card = new Card(element, template, popup);
  const cardElement = card.generateCard();
  renderCard(container, cardElement);
}

function renderCard(container, card) {
  container.prepend(card);
}

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error_visible'
}

const addFormValidator = new FormValidator(config, addForm);
const editFormValidator = new FormValidator(config, editForm);

addFormValidator.enableValidation();
editFormValidator.enableValidation();


























// const openPopup = (popup) => {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keyup', handlerKeyUp);
// }

// const closePopup = (popup) => {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keyup', handlerKeyUp);
// }

// const handlerKeyUp = (evt) => {
//   if (evt.key === 'Escape') {
//     const popupOpened = document.querySelector('.popup_opened');
//     closePopup(popupOpened);
//   }
// }

// function openImagePopup(title, link) {
//   popupImagePhoto.src = link;
//   popupImagePhoto.alt = title;
//   popupImageFigcap.textContent = title;
//   openPopup(popupImage);
// }

// popupCardsAddButton.addEventListener('click', function () {
//   clearForm(formElementCard); // очистка формы и дезактивация кнопки
//   openPopup(popupCard);
// });

// function handleSubmitAddCardForm(evt) {
//   evt.preventDefault();
//   const newCard = { text: titleInput.value, link: linkInput.value };
//   createCard(newCard, '#gallery-item', openImagePopup, cardsContainer);

//   closePopup(popupCard, formElementCard);
// }

// formElementCard.addEventListener('submit', handleSubmitAddCardForm);

// galleryList.forEach((element) => {
//   createCard(element, '#gallery-item', openImagePopup, cardsContainer);
// });

// function createCard(element, template, popup, container) {
//   const card = new Card(element, template, popup);
//   const cardElement = card.generateCard();

//   renderCard(container, cardElement);
// }

// // функция вывода карточки на страницу вначало с помощью prepend
// function renderCard(container, card) {
//   container.prepend(card);
// }
// // function createCard(item) {
// //   const card = new Card(item, username,'#gallery-item');
// //   const cardItem = card.createItem();
// //   return cardItem;
// // }

// // const prependCardItems = (cardItems) => {
// //   gallery.prepend(...cardItems);
// // }

// // const galleryCardItems = galleryList.map(createCard);
// // prependCardItems(galleryCardItems);

// const submitFormEdit = () => {
//   username.textContent = inputUsername.value;
//   userjob.textContent = inputUserjob.value;
//   closePopup(popupEdit);
// }

// const submitFormAdd = () => {
//   const galleryItem = {
//     title: inputImgtitle.value,
//     link: inputImgLink.value,
//   }
//   const newCard = createCard(galleryItem);
//   prependCardItems([newCard])
//   closePopup(popupAdd);
//   addForm.reset();
// }

// addButton.addEventListener('click', () => {
//   openPopup(popupAdd);
//   addForm.reset();


//   button.classList.add('popup__save-button_inactive');
//   button.disabled = 'disabled';
// });

// editButton.addEventListener('click', () => {
//   inputUsername.value = username.textContent;
//   inputUserjob.value = userjob.textContent;
//   openPopup(popupEdit);
// });

// editForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   submitFormEdit();
// });

// addForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   submitFormAdd();
// });

// popups.forEach((popup) => {
//   popup.addEventListener('mousedown', (evt) => {
//     if (evt.target.classList.contains('popup_opened')) {
//       closePopup(popup)
//     }
//     if (evt.target.classList.contains('popup__close-button')) {
//       closePopup(popup)
//     }
//   })
// })

// const validationConfig = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__save-button',
//   inactiveButtonClass: 'popup__save-button_inactive',
//   inputErrorClass: 'popup__input_invalid',
//   errorClass: 'popup__error_visible'
// }

// const cardForm = document.querySelector('.popup__form_type_cards');
// const cardFormValidator = new FormValidator(validationConfig, cardForm);

// // создаем экземпляр FormValidator для попапа profile
// const profileForm = document.querySelector('.popup__form_type_profile');
// const profileFormValidator = new FormValidator(validationConfig, profileForm);

// // Вызываем метод enableValidation для включения валидации
// cardFormValidator.enableValidation();
// profileFormValidator.enableValidation();
