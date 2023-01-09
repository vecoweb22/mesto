const main = document.querySelector('.main')
const editButton = main.querySelector('.profile__edit-button');
const addButton = main.querySelector('.profile__add-button');
const popupEdit = document.querySelector('#popup-user');
const popupAdd = document.querySelector('#popup-place');
const popupImage = document.querySelector('.popup_opened-img');
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
const galleryTemplate = document.querySelector('#gallery-item').content.querySelector('.card');
const fullImage = document.querySelector('.popup__screen-image');
const fullImageCaption = document.querySelector('.popup__screen-caption');
const button = popupAdd.querySelector('.popup__save-button');
const popups = document.querySelectorAll('.popup');

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handlerKeyUp);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', handlerKeyUp);
}

const handlerKeyUp = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

class ItemBuilder {
  constructor(data, template) {
    this._title = data.title;
    this._imgLink = data.link;
    this._template = template;
  }

  _getTemplateCard() {
    const cardItem = document
      .querySelector(this._template)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardItem;
  }

  createItem() {
    this._item = this._getTemplateCard();
    this._item.querySelector('.card__image').src = this._imgLink;
    this._item.querySelector('.card__title').textContent = this._title;
    this._item.querySelector('.card__image').alt = `${this._title}. Автор: ${username.textContent}`;
    this._setEventListeners();
    return this._item;
  }

  _handlerDeleteButton() {
    this._item.remove();
  }

  _handlerLikeButton() {
    this._item.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _handleOpenScreen() {
    fullImage.src = this._imgLink;
    fullImage.alt = `${this._title}. Автор: ${username.textContent}`
    fullImageCaption.textContent = this._title;
    openPopup(popupImage);
  }

  _setEventListeners() {
    this._item.querySelector('.card__image').addEventListener('click', () => {
      this._handleOpenScreen();
    });

    this._item.querySelector('.card__delete').addEventListener('click', () => {
      this._handlerDeleteButton();
    });

    this._item.querySelector('.card__like').addEventListener('click', () => {
      this._handlerLikeButton();
    });
  }
}

function createCard(item) {
  const card = new ItemBuilder(item, '#gallery-item');
  const cardItem = card.createItem();
  return cardItem;
}

// NEW function
const prependCardItems = (cardItems) => {
  gallery.prepend(...cardItems);
}

const galleryCardItems = galleryList.map(createCard);
prependCardItems(galleryCardItems);

const submitFormEdit = () => {
  username.textContent = inputUsername.value;
  userjob.textContent = inputUserjob.value;
  closePopup(popupEdit);
}

const submitFormAdd = () => {
  const galleryItem = {
    title: inputImgtitle.value,
    link: inputImgLink.value,
  }
  const newCard = createCard(galleryItem);
  prependCardItems([newCard])
  closePopup(popupAdd);
  addForm.reset();
}

addButton.addEventListener('click', () => {
  openPopup(popupAdd);
  addForm.reset();


  button.classList.add('popup__save-button_inactive');
  button.disabled = 'disabled';
});

editButton.addEventListener('click', () => {
  inputUsername.value = username.textContent;
  inputUserjob.value = userjob.textContent;
  openPopup(popupEdit);
});

editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  submitFormEdit();
});

addForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  submitFormAdd();
});

// closeButtons.forEach((item) => {
//   const close = item.closest('.popup');
//   item.addEventListener('click', () => {
//     closePopup(close)
//   })
// });

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  })
})