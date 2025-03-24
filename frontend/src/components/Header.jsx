import React from "react";
import "../styles/Header.css";
import useLogout from "../customHooks/useLogout";
import { FaSignOutAlt } from "react-icons/fa"; 

const Header = () => {
  const {handleLogout} = useLogout();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="header">
      <div className="logo">
        <h1>WacMeets</h1>
      </div>
      <div
        className="profile"
      >
        <img
          src={user?.picture || "defaultProfilePic.jpg"}
          alt="Profile"
          className="profile-pic"
        />
        <button>
         <FaSignOutAlt
          onClick={handleLogout}
          aria-label="Logout"
          className="logout-icon"
        />
        </button>
      </div>
    </header>
  );
};

export default Header;
