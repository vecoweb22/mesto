export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleSendingRequest(res) {
    if (res.ok) {
      return Promise.resolve(res.json());
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async getRealUserInfo() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
    return this._handleSendingRequest(res);
  }

  async getInitialCards() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
    return this._handleSendingRequest(res);
  }

  async editProfileUserInfo(data) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
    return this._handleSendingRequest(res);
  }

  async addNewCard(data) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    });
    return this._handleSendingRequest(res);
  }

  async addLike(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    });
    return this._handleSendingRequest(res);
  }

  async removeCard(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
    return this._handleSendingRequest(res);
  }

  async removeLike(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    });
    return this._handleSendingRequest(res);
  }

  async updateProfileUserAvatar(data) {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
    return this._handleSendingRequest(res);
  }
}
