document.addEventListener("DOMContentLoaded", () => {
  const editButton = document.querySelector(".profile__info-button");
  const modal = document.getElementById("editModal");
  const nameInput = document.getElementById("nameInput");
  const functionInput = document.getElementById("functionInput");
  const saveButton = document.getElementById("saveButton");
  const closeButton = document.getElementById("closeButton");

  const nameElement = document.querySelector(".profile__info-name");
  const functionElement = document.querySelector(".profile__info-function");

  editButton.addEventListener("click", (event) => {
    event.preventDefault();
    nameInput.value = nameElement.textContent;
    functionInput.value = functionElement.textContent;
    modal.style.display = "flex";
  });

  saveButton.addEventListener("click", () => {
    nameElement.textContent = nameInput.value;
    functionElement.textContent = functionInput.value;
    modal.style.display = "none";
  });

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });


  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});