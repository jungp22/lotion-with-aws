import "../style/Header.css";
import hamburger from "../data/image.png";
import { useNavigate } from "react-router-dom";
const Header = ({ toggleList, logOut }) => {
  let navigate = useNavigate();

  return (
    <div className="Header">
      <button onClick={toggleList}>
        <img src={hamburger} alt="menu" />
      </button>
      <div className="title">
        <button id="Title" onClick={() => { navigate("/notes") }}>
          <h1>Lotion</h1>
        </button>
        <p>Like notion but worse</p>
      </div>
      <button className="cooldiv" onClick={logOut}>Log out</button>
    </div>
  );
};

export default Header;
