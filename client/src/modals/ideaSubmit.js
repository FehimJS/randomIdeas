import ideas from "../apiServices/getIdeas";
import IdeaList from "./ideaList";
const getAddedIdea = new IdeaList();
class IdeaSubmit {
  constructor() {
    this._idea = document.querySelector(".form-modal");
  }
  render() {
    this._idea.innerHTML = `
         <form method="POST" action="" class="idea-form">
            <label for="username">Enter a Username</label>
            <input
              type="text"
              id="username"
              name="username"
              aria-required="add your username"
              title="Add your name"
              value ="${
                localStorage.getItem("username")
                  ? localStorage.getItem("username")
                  : ""
              }"
              required
            />
            <label for="tag">Enter a Tag</label>
            <input type="text" id="tag" name="tag" required />
            <label for="text">Your Idea</label>
            <textarea
              name="text"
              id="text"
              cols="30"
              rows="10"
              maxlength='248'
              required
            ></textarea>
            <button>Add an Idea</button>
          </form>
        `;
    this._form = document.querySelector(".idea-form");
    this.addEventListeners();
  }
  addEventListeners() {
    this._form.addEventListener("submit", this.handleSubmit.bind(this));
  }
  async handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("username", this._form.elements.username.value);
    const idea = {
      tag: this._form.elements.tag.value,
      username: this._form.elements.username.value,
      text: this._form.elements.text.value,
    };
    try {
      const res = await ideas.createIdea(idea);

      console.log("data", res);
    } catch (error) {
      console.error("Eroor : ", error);
    }

    this._form.elements.tag.value = "";
    this._form.elements.text.value = "";
    document.dispatchEvent(new Event("closeModal"));
    window.location.reload();
    getAddedIdea.list();
  }
}
export default IdeaSubmit;
