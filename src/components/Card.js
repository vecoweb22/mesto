export class Card {
  constructor(data, templateSelector, handleCardClick, userId, like, dislike, deleteCard) {
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._like = like;
    this._dislike = dislike;
    this._deleteCard = deleteCard;
    this._likes = data.likes;
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
  }

  like() {
    this._likeButton.classList.add('card__like_active');
  }

  dislike() {
    this._likeButton.classList.remove('card__like_active');
  }

  _userLiked() {
    this._likes.forEach((elementId) => {
      if (elementId._id === this._userId) {
        this.like();
      } else {
        this.dislike();
      }
    });
  }

  likesCount(res) {
    this._likesCount.textContent = `${res.likes.length}`;
  }

  remove() {
    this._cardElement.remove();
  }

  generateCard = () => {
    const template = document.querySelector(this._templateSelector);
    if (template) {
      const element = template.content.querySelector('.card');
      if (element) {
        this._cardElement = element.cloneNode(true);
      } else console.log('В классе Card не найден .card!');
    } else console.log('В классе Card не найден ' + this._templateSelector + '!');

    this._likeButton = this._cardElement.querySelector('.card__like');
    this._likesCount = this._cardElement.querySelector('.like__counter');
    this._likesCount.textContent = this._likes.length;
    this._deleteButton = this._cardElement.querySelector('.card__delete');
    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
    }
    this._imageElement = this._cardElement.querySelector('.card__image');
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._cardElement.querySelector('.card__title').textContent = this._name;
    this._setEventListeners();
    this._userLiked();
    return this._cardElement;
  };

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('card__like_active')) {
        this._dislike();
      } else {
        this._like();
      }
    });
    this._deleteButton.addEventListener('click', () => {
      this._deleteCard(this._id);
    });
    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
