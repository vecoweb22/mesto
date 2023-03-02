import { Popup } from '../components/Popup.js';

export class PopupWithForm extends Popup {
  constructor(selector) {
    super(selector);
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = [...this._form.querySelectorAll('.popup__input')];
  }

  setSubmitHandlerCb(cb) {
    this._callbackSubmit = cb;
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      const replacementText = event.submitter.textContent;

      this.returnInitSubmitterText = function () {
        event.submitter.textContent = replacementText;
      };

      event.submitter.textContent = 'Сохранение...';
      this._callbackSubmit(this._getInputValues());
    });
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setInputValue(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
