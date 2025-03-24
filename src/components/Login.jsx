import React from "react";
import GoogleSignIn from "./GoogleSignIn";
import "../styles/Login.css";
import useLogin from "../customHooks/useLogin";

function Login() {
  const { loginSuccess, loginFailure, parseJwt } = useLogin();
  return (
    <div className="login-container">
      <h1>User Login</h1>
      <div className="login-buttons">
        <h2>Login to WacMeets with Google</h2>
        <GoogleSignIn
          loginSuccess={loginSuccess}
          loginFailure={loginFailure}
          parseJwt={parseJwt}
        />
      </div>
    </div>
  );
}

export default Login;
