import { Service } from "../../common/service";
import "./WhutLogin.scss";
import { ButtonL } from "../../components/Button";
import { ChangeEvent, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface ILoginPannel {
  text: "我是武小理" | "我是华小师" | "邮箱绑定";
  children: ReactNode;
}

export function LoginPannel(props: ILoginPannel) {
  return (
    <div className="login-pannel">
      <p className="text-login-title">{props.text}</p>
      {props.children}
    </div>
  );
}

export function LoginWhut() {
  const navigate = useNavigate();
  const [whutId, setWhutId] = useState("");
  const [whutPwd, setWhutPwd] = useState("");

  const handleWhutId = (e: ChangeEvent<HTMLInputElement>) => {
    setWhutId(e.target.value);
  };

  const handleWhutPwd = (e: ChangeEvent<HTMLInputElement>) => {
    setWhutPwd(e.target.value);
  };
  const goVerify = () => {
    if (whutId === "") {
      alert("请输入邮箱");
    } else if (whutPwd === "") {
      alert("请输入密码");
    } else {
      Service.whutLogin().then((res) => {
        if (res.data.status === 0) {
          localStorage.setItem("token", res.data.data);
          navigate("/tagscreen/home");
        } else {
          console.log(res);
          alert("邮箱或密码错误")};
      });
    }
  };
  return (
    <LoginPannel text="我是武小理">
      <div className="panel-login-whut">
        <ul>
          <li>
            <label>邮箱：</label>
            <input value={whutId} onChange={handleWhutId}></input>
          </li>
          <li>
            <label>密码：</label>
            <input
              type="password"
              value={whutPwd}
              onChange={handleWhutPwd}
            ></input>
          </li>
        </ul>
        <GoOhterLoginPage path="/login/whut/whutRegister" goRegister="快速注册一个吧！">
          请使用掌上吾理账号登录，
          <br />
          还没有？
        </GoOhterLoginPage>
        <GoOhterLoginPage path="/login/whut/whutFindPwd" goRegister="找回密码">
          忘记密码？
        </GoOhterLoginPage>
        <ButtonL onClick={goVerify}>确定</ButtonL>
      </div>
    </LoginPannel>
  );
}

interface IGoOhterLoginPage {
  path: string;
  goRegister: string;
  children: ReactNode;
}

export function GoOhterLoginPage(props: IGoOhterLoginPage) {
  const navigate = useNavigate();

  return (
    <p>
      {props.children}
      <span onClick={() => navigate(props.path)}>{props.goRegister}</span>
    </p>
  );
}
