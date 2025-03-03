class ImagePopup {
  constructor() {
    // Accedemos a los elementos del DOM
    this.newImagen = document.getElementById('newImagen');
    this.imagenPopup = document.getElementById('imagenPopup');
    this.popupParagraph = document.getElementById('popupParagraph');
    this.popup = document.getElementById('popup');
    this.imagenes = document.querySelectorAll('.image'); // Asegúrate de que las imágenes tienen esta clase
  }

  // Método para cerrar el modal de la imagen
  closeEditModalImg() {
    this.newImagen.style.display = "none";
    this.resetValidation(this.newImagen); // Asegúrate de que la función resetValidation esté definida
  }

  // Método para mostrar el popup con imagen ampliada
  showPopup(event) {
    const img = event.target;
    this.imagenPopup.src = img.src;
    this.popupParagraph.textContent = img.getAttribute("data-title");
    this.popup.style.display = "flex";
    this.popupParagraph.style.display = "flex";

    // Hacer las demás imágenes opacas
    this.imagenes.forEach((otherImg) => {
      if (otherImg !== img) {
        otherImg.classList.add("activa");
      }
    });
  }

  // Método para resetear la validación (puedes definir lo que hace)
  resetValidation(element) {
    // Lógica para resetear validación
  }
}

// Crear una instancia de la clase ImagePopup y asociar eventos
const imagePopupInstance = new ImagePopup();
imagePopupInstance.imagenes.forEach((img) => {
  img.addEventListener('click', (event) => imagePopupInstance.showPopup(event));
});