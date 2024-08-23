class NoteItem extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    const title = this.getAttribute("title") || "Default Title";
    const body = this.getAttribute("body") || "Default body text";
    const footer = this.getAttribute("footer") || "Default footer text";

    this.shadowRoot.innerHTML = `

      <style>
        .card {
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 10px;
          margin-bottom: 10px;
          background-color: #fff;
        }
        .card-title {
          font-size: 20px;
          font-weight: bold;
        }
        .card-body {
          margin-top: 10px;
        }
        .note-footer {
          margin-top: 10px;
          font-style: italic;
          color: #777;
        }
.note-card {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  margin-right: 20px;
  margin-bottom: 20px;
  width: 80%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.note-card h3 {
  margin-top: 0;
}

      </style>

<div class="note-card">
              <h3>${title}</h3>
              <p>
               ${body}
              </p>
            </div>
    `;
  }
}

customElements.define("note-item", NoteItem);
