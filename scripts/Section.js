export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);

    if (!this._container) {
      throw new Error(
        `No se encontró el contenedor con el selector: ${CardContainerSelector}`
      );
    }
  }

   // Renderiza todos los elementos en la página utilizando la función renderer
  _renderItems() {
    this._items.forEach(item => {
      this._renderer(item); // Llama a la función renderer para cada elemento
    });
  }


   // Agrega un nuevo elemento al contenedor
  addItem(element) {
      this._container.prepend(element);
  }
}