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

export function FindPwd() {
    const [whutEmail, setWhutEmail] = useState("");
    const [whutInputEmail, setWhutInputEmail] = useState("");
    const [whutPwd, setWhutPwd] = useState("");
    const [time, setTime] = useState(-1);
    const [whutIsPwd, setWhutIsPwd] = useState("");
    const [signature, setSignature] = useState<string>();
    const navigate = useNavigate();
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
  
    const goGetEVV = async (email: string) => {
      if (email === "") {
        alert("请输入邮箱");
        return;
      }
      try {
        const res = await Service.whutSendEmail(email);
        const { signature } = res.data;
        //返回验证码成功
        setSignature(signature);
        console.log(signature);
        // 倒计时
        setTime(60);
        const retry = setInterval(() => {
          setTime((prevTime) => {
            const newTime = prevTime - 1;
            if (newTime === 0) {
              clearInterval(retry);
            }
            return newTime;
          });
        }, 1000);
      }
      catch (error) {
        alert(error);
      }
    };
  
    async function goVerify() {
      const pwdRegex = new RegExp("(?=.*[0-9])(?=.*[a-zA-Z]).{6,20}");
      console.log(signature);
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
      } else if (!signature) {
        // 当用户没有请求验证码乱输的时候
        alert("认证错误，请重新请求验证码！");
      } else {
        try {
          let res = await Service.whutRestore(whutEmail, whutPwd, signature, whutInputEmail);
          if (res.status === 200) {
            alert("找回成功");
            navigate("/login/whut");
          }
        } catch (error) {
            console.log(error);
            alert(error);
        }
      }
    }
  
    return (
      <>
        <RegisterPannel text="掌理账号找回">
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
                <button
                  id={time > 0 ? "checked" : "checkbtn"}
                  disabled={time > 0}
                  onClick={() => goGetEVV(whutEmail)}
                >
                  {time > 0
                    ? `${time}后重新获取`
                    : time === 0
                      ? "重新获取"
                      : "获取验证码"}
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
      </>
    );
  }
  
