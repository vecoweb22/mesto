const popupElement = document.querySelector('.popup');
const editProfile = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close-button');
const saveButton = document.querySelector('.popup__save-button');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');

let nameInput = document.querySelector('#popup__user-name');
let jobInput = document.querySelector('#popup__user-job');


function openPopup() {
  popupElement.style.display = 'flex'
}

function closePopup() {
  popupElement.style.display = 'none'
}

editProfile.addEventListener('click', openPopup)
closeButton.addEventListener('click', closePopup)


let formElement = document.querySelector('.popup__form');
nameInput.value = userName.textContent;
jobInput.value = userJob.textContent;

function formSubmitHandler (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;

  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
