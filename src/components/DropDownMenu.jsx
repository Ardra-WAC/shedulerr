import React from "react";
import "../styles/Header.css";

const DropDownMenu = ({ user, handleLogout }) => {
  return (
    <div className="dropdown-menu">
      <div className="user-info">
        <img
          src={user?.picture || "defaultProfilePic.jpg"}
          alt="Profile"
          className="dropdown-profile-pic"
        />
        <h3>{user?.name || "User Name"}</h3>
        <p>{user?.role || "User Role"}</p>
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default DropDownMenu;
