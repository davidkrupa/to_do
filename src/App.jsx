import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);
  const [noteToEditIndex, setNoteToEditIndex] = useState(null);

  console.log(noteToEditIndex);

  console.log(savedNotes);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSave = () => {
    if (title.trim() === "" || text.trim() === "") return;
    if (noteToEditIndex != null) {
      setSavedNotes((prev) =>
        prev.map((note, index) => {
          if (index === noteToEditIndex) return { title, text };
          else return note;
        })
      );
    } else {
      setSavedNotes([...savedNotes, { title, text }]);
    }
    setTitle("");
    setText("");
    setNoteToEditIndex(null);
  };

  const handleDelete = (id) => {
    const savedNotesCopy = [...savedNotes];
    savedNotesCopy.splice(id, 1);
    setSavedNotes(savedNotesCopy);
  };

  const handleEdit = (id) => {
    setTitle(savedNotes[id].title);
    setText(savedNotes[id].text);
    setNoteToEditIndex(id);
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
          <div className="saved-notes__container-note" key={index}>
            <h3 className="saved-notes__container-title">{note.title}</h3>
            <p className="saved-notes__container-text">{note.text}</p>
            <button className="delete-btn" onClick={() => handleDelete(index)}>
              X
            </button>
            <button className="edit-btn" onClick={() => handleEdit(index)}>
              E
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
