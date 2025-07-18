import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Homepage from "./pages/Homepage";
import EmptyNote from "./components/EmptyNote";
import NoteView from "./components/NoteView";
import NoteEdit from "./components/NoteEdit";
import { useState } from "react";
import OAuth from "./components/OAuth";
function App() {
  const [authenticated,setAuthenticated] = useState(false)
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Homepage/>}>
          {!authenticated && 
            <Route path="/*" element={<OAuth authenticated = {authenticated} setAuthenticated = {setAuthenticated}/>}></Route>
          }
          {authenticated && 
          <>
            <Route path="/*" element={<EmptyNote/>}></Route>
            <Route path="/notes/:id" element={<NoteView/>}></Route>
            <Route path="/notes/:id/edit" element={<NoteEdit/>}></Route>
            </>
          }
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;