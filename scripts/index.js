const popupElement = document.querySelector('.popup'); //1 переменная всего popup
const editProfile = document.querySelector('.profile__edit-button'); //1 переменная открыть редактирование профиля
const closeButton = popupElement.querySelector('.popup__close-button'); //1 переменная закрыть редактирование
const saveButton = document.querySelector('.popup__save-button'); //1 переменная кнопки сохранить
const userName = document.querySelector('.profile__title'); //2 переменная касса имени профиля на странице
const userJob = document.querySelector('.profile__subtitle'); //2 переменная касса работы на странице

let nameInput = document.querySelector('#popup__user-name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('#popup__user-job'); // Воспользуйтесь инструментом .querySelector()


// const writeUserDataToInputs = () => {
//   nameInput.value = userName;
//   jobInput.value = userJob;
// };

function openPopup() {
  popupElement.style.display = 'flex'
  // writeUserDataToInputs();
}

function closePopup() {
  popupElement.style.display = 'none'
}

editProfile.addEventListener('click', openPopup)
closeButton.addEventListener('click', closePopup)


// Находим форму в DOM
let formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
nameInput.value = userName.textContent;
jobInput.value = userJob.textContent;

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

  // Находим поля формы в DOM

  // Получите значение полей из свойства value
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;

  closePopup();
  // Выберите элементы, куда должны быть вставлены значения полей

  // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
