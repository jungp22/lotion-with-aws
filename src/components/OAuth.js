import { GoogleLogin } from "@react-oauth/google";
import "../style/OAuth.css";

const OAuth = (authenticated) => {

  function handleSuccessfulLogin() {
    console.log(authenticated)
    authenticated.setAuthenticated(true);
  }
  return (
    <div className="OAuth">
      <GoogleLogin
        onSuccess={handleSuccessfulLogin}
        onError={() => console.log("error")}
        auto_select={true}
        text= "signin_with"
        shape= "rectangular"
        width="300px"
      />
    </div>
  );
};

export default OAuth;
