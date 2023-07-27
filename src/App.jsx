import { useState, useEffect } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);
  const [noteToEditIndex, setNoteToEditIndex] = useState(null);

  useEffect(() => {
    const notesFromLocalStorage = JSON.parse(localStorage.getItem("myNotes"));
    if (notesFromLocalStorage) {
      setSavedNotes(notesFromLocalStorage);
    }
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSave = () => {
    if (title.trim() === "" || text.trim() === "") return;

    let updatedNotes;

    if (noteToEditIndex != null) {
      updatedNotes = savedNotes.map((note, index) => {
        if (index === noteToEditIndex) return { title, text };
        else return note;
      });
    } else {
      updatedNotes = [...savedNotes, { title, text }];
    }

    setSavedNotes(updatedNotes);
    setTitle("");
    setText("");
    setNoteToEditIndex(null);
    localStorage.setItem("myNotes", JSON.stringify(updatedNotes));
  };

  const handleDelete = (id) => {
    const savedNotesCopy = [...savedNotes];
    savedNotesCopy.splice(id, 1);
    setSavedNotes(savedNotesCopy);
    localStorage.setItem("myNotes", JSON.stringify(savedNotesCopy));
  };

  const handleEdit = (id) => {
    setTitle(savedNotes[id].title);
    setText(savedNotes[id].text);
    setNoteToEditIndex(id);
  };

  const handleMoveUp = (id) => {
    setSavedNotes((prev) =>
      prev.map((note, index) => {
        if (index === id - 1) return savedNotes[id];
        else if (index === id) return savedNotes[id - 1];
        else return note;
      })
    );
  };

  const handleMoveDown = (id) => {
    setSavedNotes((prev) =>
      prev.map((note, index) => {
        if (index === id + 1) return savedNotes[id];
        else if (index === id) return savedNotes[id + 1];
        else return note;
      })
    );
  };

  return (
    <div className="app__wrapper">
      <div className="note__container">
        <input
          placeholder="Title..."
          value={title}
          onChange={(e) => {
            handleTitleChange(e);
          }}
        />
        <textarea
          placeholder="Type your note..."
          value={text}
          rows="14"
          cols="8"
          onChange={(e) => {
            handleTextChange(e);
          }}
        />
        <button type="button" className="save-btn" onClick={() => handleSave()}>
          Save Note
        </button>
      </div>
      <div className="saved-notes__container">
        {savedNotes?.map((note, index) => (
          <div
            className="saved-notes__container-note"
            key={index}
            onClick={() => handleEdit(index)}
          >
            <h3 className="saved-notes__container-title">{note.title}</h3>
            <p className="saved-notes__container-text">{note.text}</p>
            <button className="delete-btn" onClick={() => handleDelete(index)}>
              X
            </button>
            {index > 0 && (
              <button
                className="move-up-btn"
                onClick={() => handleMoveUp(index)}
              >
                ↑
              </button>
            )}
            {index < savedNotes.length - 1 && (
              <button
                className={index !== 0 ? "move-down-btn" : "move-up-btn"}
                onClick={() => handleMoveDown(index)}
              >
                ↓
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
