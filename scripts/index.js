const popupElement = document.querySelector('.popup');
const profileEdit = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close-button');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');

const nameInput = document.querySelector('#popup__user-name');
const jobInput = document.querySelector('#popup__user-job');

function openPopup() {
  popupElement.classList.remove('popup_closed');
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

function closePopup() {
  popupElement.classList.add('popup_closed');
}

let formElement = document.querySelector('.popup__form');

function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;

  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
profileEdit.addEventListener('click', openPopup)
closeButton.addEventListener('click', closePopup)
