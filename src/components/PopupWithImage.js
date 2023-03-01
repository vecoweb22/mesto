import { Popup } from '../components/Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopup = this._popup.querySelector('.popup__screen-image');
    this._imagePopupTitle = this._popup.querySelector('.popup__screen-caption');
  }

  open(name, link) {
    this._imagePopupTitle.textContent = name;
    this._imagePopup.alt = 'Картинка ' + name;
    this._imagePopup.src = link;

    super.open();
  }
}
