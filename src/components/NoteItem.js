import { useNavigate } from "react-router-dom";
import "../style/NoteItem.css";

const NoteItem = ({ item, index }) => {
  let navigate = useNavigate();

  function HandleNoteClick() {
    navigate("/notes/" + (index + 1))
  }
  const formattedDate =
    new Date(item.date).toLocaleDateString("default", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }) +
    " at " +
    new Date(item.date).toLocaleTimeString("default", { timeStyle: "short" });

  return (
    <button className="NoteItem" id={item.id} onClick={HandleNoteClick}>
      <h2>{item.title}</h2>
      <p>{formattedDate}</p>
      <div className="content" dangerouslySetInnerHTML={{ __html: item.content }}>
      </div>
    </button>
  );
};

export default NoteItem;
