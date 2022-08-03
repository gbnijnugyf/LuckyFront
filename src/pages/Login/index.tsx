import "./index.scss";
// import { LoginCCNU, BindEmail } from "./loginSchools.jsx";
// import cookie from "react-cookies";
// import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// import path from "path";

export interface BtnLogin {
  text: string;
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}

function Btn(props: BtnLogin) {
  return (
    <div className="btn-school" onClick={props.onClick}>
      <div className="birdimg" />
      <p className="text-school">{props.text}</p>
    </div>
  );
}

export function LoginMain() {
  const navigate = useNavigate();

  const goWHUT = () => {
    let position = window.location.href;
    let continueurl = position.slice(0, position.indexOf("/", 10));
    let posturl = continueurl + "/api/login/whut/callback";
    window.location.href = `https://ias.sso.itoken.team/portal.php?posturl=${encodeURIComponent(
      posturl
    )}&continueurl=${encodeURIComponent(continueurl)}`;
  };

  const goCCNU = () => {
    navigate("/login/ccnu");
    // props.history.push("/login/ccnu");
  };

  return (
    <div className="login-main">
      <p className="text-title">小幸运</p>
      <p className="text-subtitle">相遇，就是这么妙不可言</p>
      <div className="div-school">
        <Btn text="我是武小理" onClick={goWHUT} />
        <Btn text="我是华小师" onClick={goCCNU} />
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <div className="login">
      <Outlet />
    </div>
  );
}
