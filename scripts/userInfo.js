export default class UserInfo {
  constructor(nameElement, workElement) {
    console.log("Miranbdo que mne imprime" + document.querySelector(workelement));
    this._nameElement = document.querySelector(nameElement);
    this._titleElement = document.querySelector(workElement);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      title: this._titleElement.textContent,
    };
  }

  setUserInfo({ name, title }) {
    const nameValueProfile = document.querySelector(".profile__info-name");
    const dedicationValueProfile = document.querySelector(
      ".profile__info-function"
    );

    nameValueProfile.textContent = name;
    dedicationValueProfile.textContent = title;
  }
}
