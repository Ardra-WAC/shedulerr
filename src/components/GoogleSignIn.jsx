import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function GoogleSignIn({ loginSuccess, loginFailure, parseJwt }) {
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;
    const user = parseJwt(credential);
    loginSuccess(user, "google");
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/home");
  };
  return (
    <div>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={loginFailure}
        className="google-button"
        theme="outline"
        size="large"
        width="280"
      />
    </div>
  );
}

export default GoogleSignIn;
