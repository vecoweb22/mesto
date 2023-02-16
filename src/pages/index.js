import './index.css';
import { buttonEdit, formEdit, usernameInput, userjobInput, buttonAdd, formAdd, validationConfig, username } from '../utils/constants.js';
import { galleryList } from '../utils/cards.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Card } from '../components/Card.js';

const cardFormValidation = new FormValidator(validationConfig, formAdd);
const profileFormValidation = new FormValidator(validationConfig, formEdit);

const openImage = (imageData) => {
  fullImg.open({ name: imageData.title, link: imageData.link });
};

const createCard = (formData) => {
  const card = new Card({ data: formData, handleCardClick: () => openImage(formData) }, username, '#gallery-item');
  const cardItem = card.generateCard();
  return cardItem;
};

const fullImg = new PopupWithImage({ popupSelector: '.popup_opened-img' }, '.popup__screen-image', '.popup__screen-caption');

const user = new UserInfo({ about: '.profile__subtitle', username: '.profile__title' });

const cardsList = new Section({items: galleryList, renderer: (cardData) => {
      cardsList.addItem(createCard(cardData));
    }}, '.gallery__list');

const popupEdit = new PopupWithForm({
  popupSelector: '#popup-user',
  inputSelector: '.popup__input',
  handleFormSubmit: (formData) => {
    const userInfoDataInput = {username: formData['user-name'], about: formData['user-job']}
    user.setUserInfo(userInfoDataInput);
    popupEdit.close();
  }
});

const popupAdd = new PopupWithForm({
  popupSelector: '#popup-place',
  inputSelector: '.popup__input',
  handleFormSubmit: (formData) => {
    const inputCardData = {title: formData['place-title'], link: formData['photo-link']}
    const newCard = createCard(inputCardData)
    cardsList.addItem(newCard);
    popupAdd.close();
  }
});

const handleAddButtonClick = () => {
  popupAdd.open();
  cardFormValidation.toggleButtonState();
};

const handleEditButtonClick = () => {
  popupEdit.open();

  const info = user.getUserInfo();

  usernameInput.value = info.name;
  userjobInput.value = info.about;
};

cardsList.renderItems();
profileFormValidation.enableValidation();
cardFormValidation.enableValidation();

buttonAdd.addEventListener('click', handleAddButtonClick);
buttonEdit.addEventListener('click', handleEditButtonClick);
popupEdit.setEventListeners();
popupAdd.setEventListeners();
fullImg.setEventListeners();
