//texts
const userNameText = document.querySelector(".profile__title"); //переменная касса имени профиля на странице
const userJobText = document.querySelector(".profile__subtitle"); //переменная касса работы на странице
//popup control
const popupElement = document.querySelector(".popup"); //переменная всего popup
const editProfile = document.querySelector(".profile__edit-button"); //переменная открыть редактирование профиля
const closeButton = popupElement.querySelector(".popup__close-button"); //переменная закрыть редактирование
const saveButton = document.querySelector(".popup__save-button"); //переменная кнопки сохранить
//inputs
let nameInput = document.querySelector(".popup__user-name"); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector(".popup__user-job"); // Воспользуйтесь инструментом .querySelector()

//init value
let userName = userNameText.innerText;
let userStatus = userJobText.innerText;

const writeUserDataToTexts = () => {
  userNameText.innerText = userName;
  userJobText.innerText = userStatus;
};

const writeUserDataToInputs = () => {
  nameInput.value = userName;
  jobInput.value = userStatus;
};

function openPopup() {
  popupElement.classList.remove("popup_opened");
  writeUserDataToInputs();
}

function closePopup() {
  popupElement.classList.add("popup_opened");
}

editProfile.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);

window.addEventListener("load", () => {
  writeUserDataToTexts();
});

nameInput.addEventListener("input", (e) => {
  const value = e.target.value;
  userName = value;
});

jobInput.addEventListener("input", (e) => {
  const value = e.target.value;
  userStatus = value;
});

saveButton.addEventListener("click", (e) => {
  e.preventDefault();
  closePopup();
  writeUserDataToTexts();
});