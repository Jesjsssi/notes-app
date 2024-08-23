import notesData from "../data/notesData.js";

class NoteList extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = "";
    this.innerHTML = notesData
      .map(
        (note) => `
          <note-item title="${note.title}" body="${note.body}"></note-item>
        `,
      )
      .join("");
  }
}

customElements.define("note-list", NoteList);
