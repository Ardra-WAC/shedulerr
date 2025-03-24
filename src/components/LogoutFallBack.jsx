import React from "react";
import { Link } from "react-router-dom";

function LogoutFallBack() {
  return (
    <div>
      <h3>You have logged out of WacMeets</h3>
      <Link to="/">Go To Login</Link>
    </div>
  );
}

export default LogoutFallBack;
