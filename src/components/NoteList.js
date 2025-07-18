import "../style/NoteList.css";
import NoteItem from "./NoteItem";
const NoteList = ({ showNoteList, noteItems, addNote }) => {
  
  return (
    <>
      {showNoteList === "true" && (
        <div className="NoteList">
          <div className="ListHeader">
            <h2>Notes</h2>
            <button onClick={addNote}>+</button>
          </div>
          <div className="List">
            {noteItems.map((item, index) => (
              <NoteItem item={item} key={item.id} index={index}/>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NoteList;
