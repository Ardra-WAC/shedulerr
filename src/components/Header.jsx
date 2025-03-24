import React from "react";
import { useNavigate } from "react-router-dom";
import useDropdown from "../customHooks/useDropDown";
import DropDownMenu from "./DropDownMenu";
import { roleValue } from "./Atom";
import { userEmail } from "./Atom";
import { useSetAtom } from "jotai";
import { googleLogout } from "@react-oauth/google";

import "../styles/Header.css";

const Header = ({ user }) => {
  const { isDropdownOpen, toggleDropdown, closeDropdown } = useDropdown();
  const navigate = useNavigate();
  const setRole = useSetAtom(roleValue);
  const setEmail = useSetAtom(userEmail);

  const handleLogout = () => {
    closeDropdown();
    googleLogout();
    setEmail("");
    setRole("");
    navigate("/logoutfallback");
    console.log("Logged out");
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>WacMeets</h1>
      </div>
      <div className="profile" onClick={toggleDropdown}>
        <img
          src={user?.picture || "defaultProfilePic.jpg"}
          alt="Profile"
          className="profile-pic"
        />
        {isDropdownOpen && (
          <DropDownMenu user={user} handleLogout={handleLogout} />
        )}
      </div>
    </header>
  );
};

export default Header;
