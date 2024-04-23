import { Button } from "@mui/material";
import "./Login.scss";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";

const Login = () => {
  const signIn = () => {
    signInWithPopup(auth, provider).catch((err) => {
      alert(err.message);
    });
  };

  return (
    <div className="login">
      <div className="loginLogo">
        <img src="./discordLogo.png" alt="" />
      </div>

      <Button onClick={signIn}>ログイン</Button>
    </div>
  );
};

export default Login;
