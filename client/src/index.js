
import ModalComponent from "./modals/modalComponent";
import IdeaSubmit from "./modals/ideaSubmit";
import IdeaList from "./modals/ideaList";
import "./style.css";
const myList = new IdeaList();
const modal = new ModalComponent();
const idea = new IdeaSubmit();
idea.render();

