import { animate } from "motion";

class NoteInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const titlePlaceholder = this.getAttribute("title-placeholder") || "Title";
    const contentPlaceholder =
      this.getAttribute("content-placeholder") || "Take a note...";

    this.shadowRoot.innerHTML = `
      <style>
        .add-note {
          background-color: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }
        .add-note h2 {
          margin-top: 0;
        }
        .add-note input, .add-note textarea {
          width: 100%;
          margin-bottom: 10px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        #add-note-btn {
          background-color: #2d3a5f;
          border: none;
          color: white;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          border-radius: 5px;
        }
        #add-note-btn:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
      </style>

      <form class="add-note" id="add-note">
        <h2>Add a Note</h2>
        <input type="text" placeholder="${titlePlaceholder}" id="note-title" required>
        <textarea placeholder="${contentPlaceholder}" id="note-content" required></textarea>
        <button type="submit" id="add-note-btn" disabled>Add note</button>
      </form>`;

    const form = this.shadowRoot.querySelector("#add-note");
    const titleInput = this.shadowRoot.querySelector("#note-title");
    const bodyInput = this.shadowRoot.querySelector("#note-content");
    const button = this.shadowRoot.querySelector("#add-note-btn");

    form.addEventListener("input", () => {
      button.disabled = !(titleInput.value.trim() && bodyInput.value.trim());
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const newNote = {
        title: titleInput.value,
        body: bodyInput.value,
      };

      if (this.createNoteFunction) {
        this.createNoteFunction(newNote);
        this.animateButton();
      } else {
        console.error("createNoteFunction is not defined");
      }
    });
  }

  setCreateNoteFunction(fn) {
    this.createNoteFunction = fn;
  }

  animateButton() {
    const button = this.shadowRoot.querySelector("#add-note-btn");
    animate(button, { scale: [1, 1.2, 1] }, { duration: 0.4 });
  }
}

customElements.define("note-input", NoteInput);
