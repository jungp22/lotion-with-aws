import { useEffect, useState } from "react";
import Header from "../components/Header";
import "../style/styles.css";
import NoteList from "../components/NoteList";
import { v1 as uuidv1 } from "uuid";
import { Outlet, useNavigate } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import OAuth from "../components/OAuth";

const Homepage = () => {
  let navigate = useNavigate();

  const [showNoteList, setShowNoteList] = useState("true");
  const [noteItems, setNoteItems] = useState([]);
  const [authenticated, setAuthenticated] = useState("false");

  function toggleList() {
    const newShowList = showNoteList === "true" ? "false" : "true";
    setShowNoteList(newShowList);
    localStorage.setItem("showNoteList", newShowList);
  }

  useEffect(() => {
    const savedNoteList = localStorage.getItem("showNoteList");
    const savedNoteItems = JSON.parse(localStorage.getItem("noteItems"));
    const savedAuthentication = localStorage.getItem("authenticated");

    setShowNoteList(savedNoteList ? savedNoteList : "true");
    setNoteItems(savedNoteItems ? savedNoteItems : []);
    setAuthenticated(savedAuthentication ? savedAuthentication : "false");
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
    localStorage.setItem("authenticated", "false");
    setAuthenticated("false");
  }

  return (
    <div className="page">
      <Header toggleList={toggleList} logOut={logOut} />

      <div className="main">
        {(authenticated === "true") && (
          <>
            <NoteList
              showNoteList={showNoteList}
              noteItems={noteItems}
              addNote={addNote}
            />

            <Outlet />
          </>
        )}
        {(authenticated ==="false") &&(
          <>
            <OAuth
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Homepage;
