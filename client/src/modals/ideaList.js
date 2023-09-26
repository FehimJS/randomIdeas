import ideas from "../apiServices/getIdeas";
class IdeaList {
  constructor() {
    this._ideaList = document.querySelector(".container");
    this._search = document.querySelector(".fa-search");
    this._inputSearch = document.querySelector(".search");
    this._tagHead = document.querySelector(".heading p button");
    this.active = false;
    this.myList = this.list();
    this.allList;
  }

  async list(hide = "") {
    const options = {
      month: "short",
    };
    this.allList = "";
    let res = await ideas.getIdeas();
    res = await res.json();
    console.log("res", res);
    let array = res.data;
    array = array.reverse();
    console.log("myArr", array);
    this.constructList(array, hide);
    this.render();
    this.addEventListeners();
    return array;
  }
  async constructList(list, hide) {
    const myList = await list.map((li) => {
      li.tag = li.tag.toLowerCase();
      const deleteBtn =
        li.username === localStorage.getItem("username")
          ? ` <div class="crud-options trash">
        <i class="fa fa-trash" aria-hidden="true"></i>
        </div>`
          : "";
      this.allList += `
        <div class=list-item data-id=${li._id}>
       ${deleteBtn}
         <div class="idea-text">
          <p>${li.text}</p>
            </div>
            <div class="idea-tag tag-${
              li.tag
            }"><span>${li.tag.toUpperCase()}</span></div>
            <div class="idea-author">
          <p>${li.username} <span> ${new Date(li.date).toLocaleDateString(
        "tr-TR",
        { year: "numeric", month: "short", day: "numeric" }
      )}</span></p>
        </div>
      </div>
      </div>`;
    });
  }

  render() {
    this._ideaList.innerHTML = `${this.allList}`;
  }

  async deleteIdea(idea) {
    try {
      let decision = confirm("Idea gonna be deleted!");
      console.log(decision);
      if (decision) {
        let res = await ideas.deleteIdea(idea);
        res = await res.json();
        this.allList = "";
        window.location.reload();
        this.list();
      }
    } catch (error) {
      console.error("Error for delete : ", error);
    }
  }
  addEventListeners() {
    this._ideaList.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-trash")) {
        e.stopImmediatePropagation();
        const targetID = e.target.parentElement.parentElement.dataset.id;
        console.log(targetID, "?");
        this.deleteIdea(targetID);
      }
    });
    document.addEventListener("click", (e) => {
      if (this._inputSearch.classList.contains("active")) {
        e.stopImmediatePropagation();
        if (e.target.parentElement.classList.value !== "search-area") {
          this._inputSearch.classList.add("inactive");

          this._inputSearch.classList.remove("active");
        }
      }
    });
    this._search.addEventListener("click", () => {
      if (!this.active) {
        this._inputSearch.classList.remove("inactive");
        this._inputSearch.classList.add("active");
        this.active = true;
        return this.active;
      }
      if (this.active) {
        this._inputSearch.classList.add("inactive");
        this._inputSearch.classList.remove("active");
        this.active = false;
        return this.active;
      }
    });
    this._inputSearch.addEventListener("input", async (e) => {
      const searchList = await this.myList;
      const filtered = searchList.filter((search) => {
        return search.tag.includes(e.target.value);
      });
      console.log("filtered", filtered);
      let searchTags = filtered.map((tag) => tag.tag);
      console.log(e.target.value, "etargetvalue");

      console.log("Array state", searchTags);

      searchTags = searchTags.join(",");
      if (searchTags.includes(",")) {
        searchTags = searchTags.split(",")[1];
      }

      console.log(searchTags, "searchTags");
      // const innerEls = this._ideaList.children;
      // console.log(innerEls, typeof innerEls, "innerEls");
      // console.log(innerEls[0].children[2], "innerEls 0 index children index 2");
      this._tagLists = document.querySelectorAll(".idea-tag");
      this._tagLists.forEach((tag) => {
        if (!tag.classList.contains(`tag-${searchTags}`)) {
          tag.parentElement.classList.add("inactive");
          if (
            e.target.value.length > 2 &&
            searchTags.includes(e.target.value)
          ) {
            this._tagHead.innerHTML = `${
              searchTags.slice(0, 1).toUpperCase() + searchTags.slice(1)
            }`;
            this._tagHead.classList.remove("inactive");
          }
        } else {
          tag.parentElement.classList.remove("inactive");
          this._tagHead.classList.add("inactive");
          this._tagHead.innerHTML = ``;
        }
        if (e.target.value === "") {
          if (tag.parentElement.classList.contains("inactive")) {
            tag.parentElement.classList.remove("inactive");
            this._tagHead.innerHTML = ``;
            this._tagHead.classList.add("inactive");
          }
        }
        // } else {
        //   tag.parentElement.classList.remove("inactive");
        // }
        // if (searchTags === "" || undefined) {
        //   this._tagLists.forEach((tag) =>
        //     tag.parentElement.classList.remove("inactive")
        //   );
        // }
      });
    });
    this._tagHead.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      this._inputSearch.value = "";
      this._tagHead.classList.add("inactive");
      this._tagLists.forEach((tag) => {
        tag.parentElement.classList.remove("inactive");
      });
      console.log("Cleared!!");
    });
  }
}

export default IdeaList;
