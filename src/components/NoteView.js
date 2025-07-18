import "../style/Note.css";
import { useNavigate, useParams } from "react-router-dom";

const NoteView = () => {
  let navigate = useNavigate();

  const info = useParams();
  const noteItems =  JSON.parse(localStorage.getItem("noteItems"))
  
  function handleNoteEdit() {
    navigate("/notes/" + info.id + "/edit")
  }

  
  function handleDelete() {
    const answer = window.confirm("Are you sure?");
    if (answer) {
      localStorage.setItem("noteItems", JSON.stringify(noteItems.filter(item => item !== noteItems[info.id - 1])))
      navigate("/notes/")

    window.location.reload();
    }
  }
  const item = noteItems[info.id - 1]

  const formattedDate =
    new Date(item.date).toLocaleDateString("default", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }) +
    " at " +
    new Date(item.date).toLocaleTimeString("default", { timeStyle: "short" });

  return (
    <div className="Note">
      <div className="NoteHeader">
        <div className="NoteTitle">
          <h2>{noteItems[info.id - 1].title}</h2>
          <p>{formattedDate}</p>
        </div>
        <div className="NoteTitleButtons">
          <button onClick={handleNoteEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
      <div className="NoteContent" dangerouslySetInnerHTML={{ __html: noteItems[info.id - 1].content }}>
      </div>
    </div>
  );
};

export default NoteView;
