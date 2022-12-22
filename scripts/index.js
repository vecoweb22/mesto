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
const iinputImgLink = document.querySelector('[name="photo-link"]');
const gallery = main.querySelector('.gallery__list');
const galleryTemplate = document.querySelector('#gallery-item').content.querySelector('.card');
const fullImage = document.querySelector('.full-screen__image');
const fullImageCaption = document.querySelector('.full-screen__caption');


const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}

const createElement = (item) => {
  const galleryItem = galleryTemplate.cloneNode(true);
  console.log(galleryItem);
  const galleryItemTitle = galleryItem.querySelector('.card__title');
  const galleryItemImg = galleryItem.querySelector('.card__image');
  const likeButton = galleryItem.querySelector('.card__like');
  const deleteButton = galleryItem.querySelector('.card__delete');

  galleryItemImg.addEventListener('click', function () {
    openPopup(popupImage)

    fullImage.src = item.link;
    fullImage.alt = galleryItemImg.alt
    fullImageCaption.textContent = item.title;
  });

  likeButton.addEventListener('click', handleLikeButton);
  deleteButton.addEventListener('click', handleDeleteButton);

  galleryItemImg.src = item.link;
  galleryItemImg.alt = `${item.title}. Автор: ${username.textContent}`
  galleryItemTitle.textContent = item.title;

  return galleryItem;
}

const renderItem = (item) => {
  const element = createElement(item);
  gallery.prepend(element);
}


const formSubmitHandlerEdit = (evt) => {
  evt.preventDefault();

  username.textContent = inputUsername.value;
  userjob.textContent = inputUserjob.value;

  closePopup(popupEdit);
}

const formSubmitHandlerAdd = (evt) => {
  evt.preventDefault();

  const galleryItem = {
    title: inputImgtitle.value,
    link: iinputImgLink.value,
  }

  renderItem(galleryItem);

  addForm.reset()
  closePopup(popupAdd);
}

const handleLikeButton = (evt) => {
  evt.target.classList.toggle('card__like_active')
};

const handleDeleteButton = (evt) => {
  evt.target.closest('.card').remove()
};

galleryList.forEach(renderItem);

addButton.addEventListener('click', () => openPopup(popupAdd));

editButton.addEventListener('click', () => {
  openPopup(popupEdit);

  inputUsername.value = username.textContent;
  inputUserjob.value = userjob.textContent;
});

editForm.addEventListener('submit', formSubmitHandlerEdit);

addForm.addEventListener('submit', formSubmitHandlerAdd);

closeButtons.forEach(function (item) {
  const close = item.closest('.popup');
  item.addEventListener('click', () => closePopup(close))
});

fullImage.addEventListener('click', () => closePopup(popupImage));
