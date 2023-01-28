export class Card {
  constructor(data, template, handleClickImage) {
    this._title = data.title;
    this._link = data.link;
    this._handleClickImage = handleClickImage;
    this._template = template;
  }

  _getTemplateCard() {
    const cardElement = document.querySelector(this._template).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _handlerDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  _handlerLikeButton() {
    this._elementLikeButton.classList.toggle('card__like_active');
  }

  _openImagePopup() {
    this._handleClickImage(this._title, this._link);
  }

  _setEventListeners() {
    this._elementImage.addEventListener('click', () => {
      this._openImagePopup();
    });

    this._elementDeleteButton.addEventListener('click', () => {
      this._handlerDeleteButton();
    });

    this._elementLikeButton.addEventListener('click', () => {
      this._handlerLikeButton();
    });
  }

  generateCard() {
    this._element = this._getTemplateCard();
    this._elementImage = this._element.querySelector('.card__image');
    this._elementImage.src = this._link;
    this._elementImage.alt = `${this._title}`;
    this._element.querySelector('.card__title').textContent = this._title;
    this._elementLikeButton = this._element.querySelector('.card__like');
    this._elementDeleteButton = this._element.querySelector('.card__delete');
    this._setEventListeners();
    return this._element;
  }
}
