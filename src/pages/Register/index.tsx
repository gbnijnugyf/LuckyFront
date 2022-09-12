import "./index.scss";

import { Service } from "../../common/service";
import { ButtonL } from "../../components/Button";
import {
  ChangeEvent,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

let WhutEVV: string = ""; //全局变量用于接收返回验证码

export interface IRegisterPannel {
  text: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  btnText: string;
  children: ReactNode;
}

function RegisterPannel(props: IRegisterPannel) {
  return (
    <div className="login-pannel">
      <p className="text-login-title">{props.text}</p>
      {props.children}
      <ButtonL onClick={props.onClick}>{props.btnText}</ButtonL>
    </div>
  );
}

interface ICheckbtnHandleProps {
  state: number;
  HtmlElement: HTMLButtonElement;
}
interface ICheckbtnProps {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  state: number;
  classname: string;
  // HtmlElement:HTMLButtonElement
}

function CheckbtnHandle() {
  let H = document.getElementById("checkbtn");
  let time = 60;
  let retry = setInterval(() => {
    // H?.setAttribute("disabled", "true")
    if (H?.id !== undefined) {
      H.id = "checked";
    }
    if (H?.innerHTML !== undefined) {
      H.innerHTML = "（" + --time + "s后重新获取）";
    }
  }, 1000);
  setTimeout(() => {
    if (H?.innerHTML !== undefined) {
      H.innerHTML = "重新获取";
      if (H?.id !== undefined) {
        H.id = "checkbtn";
      }
      clearInterval(retry);
    }
  }, 60000);

  return;
}

// function CheckbtnHandle(props:ICheckbtnHandleProps){

//     if(props.state === 1){        //中断计时
//         props.HtmlElement.setAttribute("disabled", "false");
//         props.HtmlElement.value = "重新获取验证码"
//     }
//     else{
//         let time = 60;
//         let retry = setInterval(
//             ()=>{
//                 props.HtmlElement.setAttribute("disabled", "true");
//                 props.HtmlElement.className = "checked";
//             },
//             1000
//         )
//         setTimeout(() => {
//             props.HtmlElement.value = "("+(--time)+"后重新获取）";
//             clearInterval(retry);
//         }, 60000);
//     }
//     return undefined;
// }

export function Register() {
  const [btnState, setBtnState] = useState(1);
  const [btnId, setBtnId] = useState("checkbtn");
  const [btnText, setBtnText] = useState("获取验证码");
  const navigate = useNavigate();
  // const [WhutEVV, setWhutEVV] = useState('')
  const [whutEmail, setWhutEmail] = useState("");
  const [whutCheckEmail, setWhutCheckEmail] = useState("");
  const [whutPwd, setWhutPwd] = useState("");
  const [whutIsPwd, setWhutIsPwd] = useState("");

  const handleWhutId = (e: ChangeEvent<HTMLInputElement>) => {
    setWhutEmail(e.target.value);
  };

  const handleWhutPwd = (e: ChangeEvent<HTMLInputElement>) => {
    setWhutPwd(e.target.value);
  };
  const handleWhutCheckEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setWhutCheckEmail(e.target.value);
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
    Service.whutCheckEmail(email).then((res) => {
      const resData = res.data;
      if (resData.status === 1) {
        //返回验证码成功
        {
          let time = 60;
          let retry = setInterval(() => {
            setBtnId("checked");
            setBtnText("（" + --time + "s后重新获取）");
          }, 1000);
          setTimeout(() => {
            setBtnText("重新获取");
            setBtnId("checkbtn");
            clearInterval(retry);
          }, 60000);
        }
        // return function () { return resData.data.emailVV }
        console.log(resData.data);
        WhutEVV = resData.data.emailVV;
        console.log(WhutEVV);
      } else {
        alert("请输入正确邮箱");
        return undefined;
      }
    });
    // setWhutCheckEmail(WhutEVV)
  };

  function goVerify(whutEVV: string) {
    if (whutEmail === "") {
      alert("请输入邮箱");
    } else if (whutCheckEmail === "") {
      alert("请输入验证码");
    } else if (whutPwd === "") {
      alert("请设置密码");
    } else if (whutPwd.length < 6) {
      alert("密码应为6~12位");
    } else if (whutIsPwd === "") {
      alert("请确认密码");
    } else if (whutPwd !== whutIsPwd) {
      alert("两次密码输入不一致");
    } else {
      if (whutCheckEmail === whutEVV) {
        Service.whutRegister(whutEmail, whutPwd).then((res) => {
          const resData = res.data;
          if (resData.data.state === 1) {
            alert("注册成功");
            navigate("login/whut");
          } else {
            alert(resData.msg); //若邮箱已被注册，弹窗提醒
          }
        });
      } else {
        console.log(WhutEVV);
        alert("验证码错误"); //此处改为弹窗提醒，并刷新“获取验证码按钮”
      }
    }
  }

  return (
    <RegisterPannel
      text="掌上吾理账号注册"
      onClick={() => {
        console.log(WhutEVV);
        goVerify(WhutEVV);
      }}
      btnText="确定"
    >
      <div className="panel-login">
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
            <label>验证码：</label>
            <input
              className="checkemail"
              value={whutCheckEmail}
              onChange={handleWhutCheckEmail}
            ></input>
            {/* <button className="checkbtn">获取验证码</button> */}
            <button id={btnId} onClick={() => goGetEVV(whutEmail)}>
              {btnText}
            </button>
          </li>
          <li>
            <label>密码：</label>
            <input
              minLength={6}
              maxLength={12}
              type="password"
              value={whutPwd}
              onChange={handleWhutPwd}
            ></input>
          </li>
          <li>
            <label>确认密码：</label>
            <input
              minLength={6}
              maxLength={12}
              type="password"
              value={whutIsPwd}
              onChange={handleWhutIsPwd}
            ></input>
          </li>
        </ul>
      </div>
    </RegisterPannel>
  );
}
