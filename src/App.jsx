import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);

  console.log(savedNotes);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSave = () => {
    setSavedNotes([...savedNotes, { title, text }]);
    setTitle("");
    setText("");
  };

  const handleDelete = (id) => {
    const savedNotesCopy = [...savedNotes];
    savedNotesCopy.splice(id, 1);
    setSavedNotes(savedNotesCopy);
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
        <button onClick={() => handleSave()}>Save Note</button>
      </div>
      <div className="saved-notes__container">
        {savedNotes?.map((note, index) => (
          <div className="saved-notes__container-note" key={index}>
            <h3 className="saved-notes__container-title">{note.title}</h3>
            <p className="saved-notes__container-text">{note.text}</p>
            <button className="delete-btn" onClick={() => handleDelete(index)}>
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
