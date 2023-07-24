class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
}
_handleResponse(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}
getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
    }).then(this._handleResponse)
}
getUserAvatar() {
  return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers
  }).then(this._handleResponse)
}
getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
    }).then(this._handleResponse)
}
setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            avatar: data.avatar
        })
    }).then(this._handleResponse)
}
setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            name: data.name,
            about: data.about
        })
    }).then(this._handleResponse)
}
createCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(data)
    }).then(this._handleResponse)
}
deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: this._headers,
    }).then(this._handleResponse)
}
likeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this._headers,
    }).then(this._handleResponse)
}
dislikeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._headers,
    }).then(this._handleResponse)
}
}
  
  export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
    headers: {
        authorization: '08e4a66c-2356-4013-93a7-044547033190',
        'Content-Type': 'application/json'
    }
});