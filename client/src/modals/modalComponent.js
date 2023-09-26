class ModalComponent {
  constructor() {
    this._modal = document.querySelector(".modal");
    this._addIdeaBtn = document.querySelector("#fa-circle-plus");
    this._isOpened = false;
    this.addEventListeners();
  }
  addEventListeners() {
    this._addIdeaBtn.addEventListener("click", this.#open.bind(this));
    document.addEventListener("closeModal", () => {
      if (this._isOpened) {
        this._modal.classList.remove("open");
      }
      this._isOpened = false;
    });
  }
  #open(e) {
    e.stopPropagation();
    this._modal.classList.toggle("open");
    this._isOpened = true;
  }

}

export default ModalComponent;
