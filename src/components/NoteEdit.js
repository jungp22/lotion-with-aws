import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../style/Note.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const NoteEdit = () => {
  let navigate = useNavigate();
  const info = useParams();
  const noteItems = JSON.parse(localStorage.getItem("noteItems"));

  const [title, setTitle] = useState(noteItems[info.id - 1].title);
  const [date, setDate] = useState(noteItems[info.id - 1].date);
  const [content, setContent] = useState(noteItems[info.id - 1].content);

  function handleDelete() {
    const answer = window.confirm("Are you sure?");
    if (answer) {
      localStorage.setItem(
        "noteItems",
        JSON.stringify(
          noteItems.filter((item) => item !== noteItems[info.id - 1])
        )
      );
      window.location.reload();
    }

  }

  function handleSave() {
    const newList = noteItems;
    newList[info.id - 1].date = new Date(date).toISOString();
    newList[info.id - 1].title = title;
    newList[info.id - 1].content = content;
    localStorage.setItem("noteItems", JSON.stringify(newList));
    navigate("/notes/" + info.id);
    window.location.reload();
  }
  return (
    <div className="Note">
      <div className="NoteHeader">
        <div className="NoteTitle">
          <input
            id="EditTitle"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <input
            type="datetime-local"
            value={date.substring(0, 16)}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="NoteTitleButtons">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={(value) => setContent(value)}
        placeholder="Your Note Here"
      />
    </div>
  );
};

export default NoteEdit;
