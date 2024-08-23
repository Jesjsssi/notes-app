import { animate } from "motion";

function main() {
  const baseUrl = "https://notes-api.dicoding.dev/v2/";

  const createNote = async (note) => {
    showLoading();
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": "12345",
        },
        body: JSON.stringify(note),
      };

      const response = await fetch(`${baseUrl}/notes`, options);
      const responseJson = await response.json();

      if (responseJson.status != "success") {
        showResponseMessage(responseJson.message);
      } else {
        getNotes();
      }
    } catch (error) {
      showResponseMessage(error.message);
    }
    hideLoading();
  };

  const getNotes = async () => {
    showLoading();
    try {
      const response = await fetch(`${baseUrl}/notes`);
      const responseJson = await response.json();

      if (responseJson.status !== "success") {
        showResponseMessage(responseJson.message);
      } else {
        renderAllNotes(responseJson.data);
      }
    } catch (error) {
      showResponseMessage(error.message);
    }
    hideLoading();
  };

  const renderAllNotes = (notes) => {
    const listBookElement = document.querySelector("#list-notes");
    listBookElement.innerHTML = "";

    notes.forEach((note) => {
      const noteCard = document.createElement("div");
      noteCard.classList.add("note-card");
      noteCard.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.body}</p>
      <button class="delete-button" data-index="${note.id}">Delete</button>
    `;

      listBookElement.appendChild(noteCard);

      animate(
        noteCard,
        { opacity: [0, 1], transform: ["translateY(20px)", "translateY(0)"] },
        { duration: 0.5 },
      );

      const deleteButton = noteCard.querySelector(".delete-button");
      deleteButton.addEventListener("click", (event) => {
        const note_id = event.target.getAttribute("data-index");

        animate(
          noteCard,
          { opacity: [1, 0], transform: ["translateY(0)", "translateY(20px)"] },
          { duration: 0.3 },
        ).finished.then(() => {
          removeNotes(note_id);
        });
      });
    });
  };

  const removeNotes = async (note_id) => {
    showLoading();
    try {
      const response = await fetch(`${baseUrl}/notes/${note_id}`, {
        method: "DELETE",
      });
      const responseJson = await response.json();

      if (responseJson.status === "success") {
        getNotes();
      } else {
        showResponseMessage("Failed to delete note");
      }
    } catch (error) {
      showResponseMessage(error.message);
    }
    hideLoading();
  };

  const showResponseMessage = (message = "Check your internet connection") => {
    alert(message);
  };

  getNotes();

  const noteInputElement = document.querySelector("note-input");
  noteInputElement.setCreateNoteFunction(createNote);
}

const showLoading = () => {
  const loadingElement = document.getElementById("loading-container");
  loadingElement.style.display = "block";
  animate(loadingElement, { opacity: [0, 1] }, { duration: 0.5 });
};

const hideLoading = () => {
  const loadingElement = document.getElementById("loading-container");
  animate(loadingElement, { opacity: [1, 0] }, { duration: 0.5 }).finished.then(
    () => {
      loadingElement.style.display = "none";
    },
  );
};

export default main;
