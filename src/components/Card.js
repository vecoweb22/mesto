export class Card {
  constructor({ data, handleCardClick }, username, templateSelector) {
    this._title = data.title;
    this._link = data.link;
    this._username = username;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
  }

  _getTemplateCard() {
    return document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplateCard();
    this._elementImage = this._element.querySelector('.card__image');
    this._elementImage.src = this._link;
    this._elementImage.alt = `${this._title}. Автор: ${this._username.textContent}`;
    this._element.querySelector('.card__title').textContent = this._title;
    this._elementLikeButton = this._element.querySelector('.card__like');
    this._elementDeleteButton = this._element.querySelector('.card__delete');
    this._setEventListeners();
    return this._element;
  }

  _handlerDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  _handlerLikeButton() {
    this._elementLikeButton.classList.toggle('card__like_active');
  }

  _setEventListeners() {
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick();
    });

    this._elementDeleteButton.addEventListener('click', () => {
      this._handlerDeleteButton();
    });

    this._elementLikeButton.addEventListener('click', () => {
      this._handlerLikeButton();
    });
  }
}
