export default class UserInfo {
  constructor(nameSelector, hobbieSelector, avatarSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._hobbieElement = document.querySelector(hobbieSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      title: this._hobbieElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  // Método público para establecer la nueva información del usuario
  setUserInfo({ name, about, avatar }) {
    if (name) this._nameElement.textContent = name;
    if (about) this._hobbieElement.textContent = about;
    if (avatar) this._avatarElement.src = avatar;
  }

  setUserAvatar(newAvatarUrl) {
    this._avatarElement.src = newAvatarUrl;
  }
}
