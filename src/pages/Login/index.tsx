import "./index.scss";
import { Outlet, useNavigate } from "react-router-dom";

export interface IBtnProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}

function Btn(props: IBtnProps) {
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
    navigate("/login/whut")
};

  const goCCNU = () => {
    navigate("/login/ccnu");
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
