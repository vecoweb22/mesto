import './index.css';
import {
  avatar,
  btnEditAvatar,
  buttonAdd,
  buttonEdit,
  formAddProfile,
  formEditProfile,
  formUpdateAvatar,
  userAbout,
  username,
  validationConfig,
} from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Card } from '../components/Card.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

function createCard(data) {
  const card = new Card(
    data,
    '.gallery-item',
    openPopupImage,

    userId,
    async () => {
      try {
        const response = await api.addLike(data._id);
        card.like();
        card.likesCount(response);
      } catch (error) {
        console.log(`Ошибка: ${error}`);
      }
    },
    async () => {
      try {
        const response = await api.removeLike(data._id);
        card.dislike();
        card.likesCount(response);
      } catch (error) {
        console.log(`Ошибка: ${error}`);
      }
    },
    () => {
      popupConfirmation.open(card);
    }
  );

  return card.generateCard();
}

function openPopupImage(name, link) {
  popupImage.open(name, link);
}

async function handleSubmitFormEditProfile(data) {
  try {
    const userProfile = await api.editProfileUserInfo(data);
    user.setUserInfo(userProfile);
  } catch (error) {
    console.log(`Ошибка: ${error}`);
  }
}

async function handleSubmitFormUpdateAvatar(data) {
  try {
    const userProfile = await api.updateProfileUserAvatar(data);
    user.setUserInfo(userProfile);
  } catch (error) {
    console.log(`Ошибка: ${error}`);
  }
}

async function handleSubmitFormAddCard(data) {
  try {
    const newCard = await api.addNewCard(data);
    cardList.addItem(createCard(newCard));
  } catch (error) {
    console.log(`Ошибка: ${error}`);
  }
}

function getSubmitHandlerCb(dataCallback, popupFormInstance) {
  return (data) => {
    dataCallback(data)
      .then(() => {
        popupFormInstance.close();
      })
      .finally(() => {
        popupFormInstance.returnInitSubmitterText();
      });
  };
}

const popupImage = new PopupWithImage('.popup_opened-img');
const popupAdd = new PopupWithForm('.popup-place');
const popupEdit = new PopupWithForm('.popup-user');
const popupAvatar = new PopupWithForm('.edit-avatar');

popupAdd.setSubmitHandlerCb(getSubmitHandlerCb(handleSubmitFormAddCard, popupAdd));
popupEdit.setSubmitHandlerCb(getSubmitHandlerCb(handleSubmitFormEditProfile, popupEdit));
popupAvatar.setSubmitHandlerCb(getSubmitHandlerCb(handleSubmitFormUpdateAvatar, popupAvatar));

const user = new UserInfo({
  name: username,
  about: userAbout,
  avatar: avatar,
});

buttonEdit.addEventListener(
  'click',
  () => {
    popupEdit.open();
    popupEdit.setInputValue(user.getUserInfo());
    validatorFormEditProfile.disableSubmitButton();
  },
  false
);

btnEditAvatar.addEventListener(
  'click',
  () => {
    popupAvatar.open();
    validatorFormUpdateAvatar.disableSubmitButton();
    console.log();
  },
  false
);

buttonAdd.addEventListener(
  'click',
  () => {
    popupAdd.open();
    validatorFormAddProfile.disableSubmitButton();
  },
  false
);

const validatorFormEditProfile = new FormValidator(validationConfig, formEditProfile);
validatorFormEditProfile.enableValidation();

const validatorFormAddProfile = new FormValidator(validationConfig, formAddProfile);
validatorFormAddProfile.enableValidation();

const validatorFormUpdateAvatar = new FormValidator(validationConfig, formUpdateAvatar);
validatorFormUpdateAvatar.enableValidation();

const popupConfirmation = new PopupWithConfirmation('#delete-card', async (card) => {
  api
    .removeCard(card._id)
    .then(() => {
      card.remove();
      popupConfirmation.close();
    })
    .catch((error) => console.log(`Ошибка: ${error}`));
});

const cardList = new Section(
  {
    renderer: (data) => {
      const card = createCard(data);
      cardList.addItem(card);
    },
  },
  '.gallery__list'
);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: '8c6b41f0-4aa0-423e-837e-c598762b9d36',
    'Content-Type': 'application/json',
  },
});

let userId;
Promise.all([api.getRealUserInfo(), api.getInitialCards()])
  .then(([userProfile, cards]) => {
    user.setUserInfo(userProfile);
    const popupEditProfile = document.querySelector('.popup-user');
    const error_title = 'При получении данных с сервера';
    const name = popupEditProfile.querySelector('#popup__username');
    const about = popupEditProfile.querySelector('#popup__userjob');
    if (name) {
      name.value = userProfile.name;
    } else console.log(error_title + ' не найден Edit popup__username');
    if (about) {
      about.value = userProfile.about;
    } else console.log(error_title + ' не найден Edit popup__userjob');
    userId = userProfile._id;
    cardList.renderItems(cards);
  })
  .catch((error) => console.log(`Ошибка: ${error}`));
