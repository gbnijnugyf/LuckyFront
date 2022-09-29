import "./index.scss";

import { Service } from "../../common/service";
import { ChangeEvent, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonL } from "../../components/Button";

export interface IRegisterPannel {
  text: string;
  children: ReactNode;
}

function RegisterPannel(props: IRegisterPannel) {
  return (
    <div className="login-pannel">
      <p className="text-login-title">{props.text}</p>
      {props.children}
    </div>
  );
}

export function Register() {
  const [signature, setSignature] = useState("");//用于存放邮箱验证id
  const [btnId, setBtnId] = useState("checkbtn");
  const [btnText, setBtnText] = useState("获取验证码");
  const navigate = useNavigate();
  const [whutEmail, setWhutEmail] = useState("");
  const [whutCheckEmail, setWhutCheckEmail] = useState<boolean>(false);
  const [whutInputEmail, setWhutInputEmail] = useState("");
  const [whutPwd, setWhutPwd] = useState("");
  const [whutIsPwd, setWhutIsPwd] = useState("");

  const handleWhutId = (e: ChangeEvent<HTMLInputElement>) => {
    setWhutEmail(e.target.value);
  };

  const handleWhutPwd = (e: ChangeEvent<HTMLInputElement>) => {
    setWhutPwd(e.target.value);
  };
  const handleWhutCheckEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setWhutInputEmail(e.target.value);
  };
  const handleWhutIsPwd = (e: ChangeEvent<HTMLInputElement>) => {
    setWhutIsPwd(e.target.value);
  };

  //TODO fix bug
  const goGetEVV = (email: string) => {
    if (email === "") {
      alert("请输入邮箱");
      return;
    }
    Service.whutSendEmail(email).then((res) => {
      const resData = res.data;
      if (resData.signature) {
        //返回验证码成功
        setWhutCheckEmail(true);
        setSignature(res.data.signature);
        let time = 60;
        let retry: NodeJS.Timer;
        retry = setInterval(() => {
          setBtnId("checked");
          setBtnText("（" + --time + "s后重新获取）");
          if (time === 0) {
            setBtnText("重新获取");
            setBtnId("checkbtn");
            clearInterval(retry);
          }
        }, 1000);
      } else {
        alert("请输入正确邮箱");
        return undefined;
      }

    });
  };

  async function goVerify() {
    const pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{6,20}');

    if (whutEmail === "") {
      alert("请输入邮箱");
    } else if (whutInputEmail === "") {
      alert("请输入验证码");
    } else if (whutPwd === "") {
      alert("请设置密码");
    } else if (!pwdRegex.test(whutPwd)) {
      alert("密码应为6~20位字母数字组合");
    } else if (whutIsPwd === "") {
      alert("请确认密码");
    } else if (whutPwd !== whutIsPwd) {
      alert("两次密码输入不一致");
    } else {
      if (whutCheckEmail) {
        let res = await Service.whutRegister(whutEmail, whutPwd, signature, whutInputEmail)

        const resData = res.data;
        if (resData.uid) {
          alert("注册成功");
          navigate("login/whut");
        } else {
          alert("邮箱已被注册"); //若邮箱已被注册，弹窗提醒
        }

      } else {
        alert("验证码错误"); //此处改为弹窗提醒，并刷新“获取验证码按钮”
      }
    }
  }

  return (
    <RegisterPannel
      text="掌理账号注册">
      <div className="panel-register">
        <ul>
          <li>
            <label>邮箱：</label>
            <input
              className="email"
              value={whutEmail}
              onChange={handleWhutId}
            ></input>
          </li>
          <li>
            <label className="check">验证码：</label>
            <input
              className="checkemail"
              value={whutInputEmail}
              onChange={handleWhutCheckEmail}
            ></input>
            <button id={btnId} onClick={() => goGetEVV(whutEmail)}>
              {btnText}
            </button>
          </li>
          <li>
            <label>密码：</label>
            <input
              minLength={6}
              maxLength={20}
              type="password"
              value={whutPwd}
              onChange={handleWhutPwd}
            ></input>
          </li>
          <li>
            <label>确认密码：</label>
            <input
              minLength={6}
              maxLength={20}
              type="password"
              value={whutIsPwd}
              onChange={handleWhutIsPwd}
            ></input>
          </li>
        </ul>
        <ButtonL onClick={goVerify}>确定</ButtonL>
      </div>
    </RegisterPannel>
  );
}
