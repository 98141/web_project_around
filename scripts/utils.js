import Popup from "./popup.js";

export {closePopup}

const imagenes = document.querySelectorAll(".element__img");
const popup = document.getElementById("popup");
const imagenPopup = document.getElementById("imagenPopup");
const popupParagraph = document.getElementById("popup__paragraph");

// Función para mostrar el popup con imagen ampliada
export default function showPopup(event) {
  const img = event.target;
  imagenPopup.src = img.src;
  popupParagraph.textContent = img.getAttribute("data-title");
  popup.style.display = "flex";
  popupParagraph.style.display = "flex";

  // Hacer las demás imágenes opacas
  imagenes.forEach((otherImg) => {
    if (otherImg !== img) {
      otherImg.classList.add("activa");
    }

  });
  console.log("Abrio popup por utils  ");

}

// Función para cerrar el popup
function closePopup() {
  popup.style.display = "none";
  popupParagraph.style.display = "none";
  imagenes.forEach((img) => {
    img.classList.remove("activa");
  });
}

// Cerrar el popup al hacer clic fuera de la imagen
popup.addEventListener("click", (event) => {
  if (event.target === popup) {
    closePopup();
    console.log("Cerro popup por utils  ");
  }
});
