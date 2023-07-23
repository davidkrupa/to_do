import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
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
      </div>
      <div className="saved-notes__container">
        <div className="saved-notes__container-note">note 1</div>
        <div className="saved-notes__container-note">note 2</div>
        <div className="saved-notes__container-note">note 3</div>
        <div className="saved-notes__container-note">note 4</div>
      </div>
    </div>
  );
}

export default App;
