import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import React from "react";
import "../style/OAuth.css";

const OAuth = (authenticated, setAuthenticated) => {

  function handleSuccessfulLogin(credentialResponse) {
    authenticated.setAuthenticated(true);

  }
  return (
    <div className="OAuth">
      <GoogleLogin
        onSuccess={handleSuccessfulLogin}
        onError={() => console.log("error")}
        auto_select={true}
      />
    </div>
  );
};

export default OAuth;
