import React from "react";
import { useSetAtom } from "jotai";
import { userEmail, roleValue } from "../components/Atom";

import { googleLogout } from "@react-oauth/google";
function useLogout() {
  const setEmail = useSetAtom(userEmail);
  const setRole = useSetAtom(roleValue);

  const handleLogout = () => {
    googleLogout();
    setEmail("");
    setRole("");
    localStorage.removeItem("user");
    console.log("Logged out");
    localStorage.removeItem("user");
  };

  return {
    handleLogout,
  };
}

export default useLogout;
