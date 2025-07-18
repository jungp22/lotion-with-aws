import { useEffect, useState } from "react";
import Header from "../components/Header";
import "../style/styles.css";
import NoteList from "../components/NoteList";
import { v1 as uuidv1 } from "uuid";
import { Outlet, useNavigate } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Homepage = () => {
  let navigate = useNavigate();

  const [showNoteList, setShowNoteList] = useState("true");
  const [noteItems, setNoteItems] = useState([]);

  function toggleList() {
    const newShowList = showNoteList === "true" ? "false" : "true";
    setShowNoteList(newShowList);
    localStorage.setItem("showNoteList", newShowList);
  }

  useEffect(() => {
    const savedNoteList = localStorage.getItem("showNoteList");
    const savedNoteItems = JSON.parse(localStorage.getItem("noteItems"));
    setShowNoteList(savedNoteList ? savedNoteList : "true");
    setNoteItems(savedNoteItems ? savedNoteItems : []);
  }, []);

  function addNote() {
    const currentDate = new Date();
    const newNoteItems = [
      {
        title: "Untitled",
        content: "",
        date: currentDate.toISOString(),
        id: uuidv1(),
      },
      ...noteItems,
    ];
    setNoteItems(newNoteItems);
    localStorage.setItem("noteItems", JSON.stringify(newNoteItems));
    navigate("/notes/1/edit");
  }
  function logOut() {
    googleLogout();
  }

  return (
    <div className="page">
      <Header toggleList={toggleList} />

      <div className="main">
        <NoteList
          showNoteList={showNoteList}
          noteItems={noteItems}
          addNote={addNote}
        />
        <Outlet />
      </div>
    </div>
  );
};

export default Homepage;
