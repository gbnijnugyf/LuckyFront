import { Service } from "../../common/service";
import "./loginSchools.scss";
import { ButtonL } from "../../components/Button";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginPannel } from "./WhutLogin";

export function LoginCCNU() {
  const navigate = useNavigate();
  const [ccnuId, setCcnuId] = useState("");
  const [ccnuPwd, setCcnuPwd] = useState("");

  const handleCcnuId = (e: ChangeEvent<HTMLInputElement>) => {
    setCcnuId(e.target.value);
  };

  const handleCcnuPwd = (e: ChangeEvent<HTMLInputElement>) => {
    setCcnuPwd(e.target.value);
  };
  const goVerify = () => {
    if (ccnuId === "") {
      alert("请输入学号");
    } else if (ccnuPwd === "") {
      alert("请输入密码");
    } else {
      Service.ccnuLogin(ccnuId, ccnuPwd).then((res) => {
        if (res.status === 0) {
          localStorage.setItem("token", res.data.data.token as string);
          navigate("/tagscreen/home");
        } else alert("用户名或密码错误");
      });
    }
  };
  return (
    <LoginPannel text="我是华小师">
      <div className="panel-login-ccnu">
        <ul>
          <li>
            <label>学号：</label>
            <input value={ccnuId} onChange={handleCcnuId}></input>
          </li>
          <li>
            <label>密码：</label>
            <input
              type="password"
              value={ccnuPwd}
              onChange={handleCcnuPwd}
            ></input>
          </li>
        </ul>
        <p>（密码为华师一站式平台密码）</p>
        <ButtonL onClick={goVerify} >
          {"下一步"}
        </ButtonL>
      </div>

    </LoginPannel>
  );
}

export function BindEmail() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const goBind = () => {
    Service.bindEmail(email).then(() => {
      navigate("/tagscreen/home");
    });
  };

  return (
    <LoginPannel text="邮箱绑定">
      <div className="panel-login-ccnu">
        <p className="tip-email">
          填写邮箱地址，可以及时
          <br />
          查收愿望状态哦~
        </p>
        <li>
          <label className="label-email">邮箱：</label>
          <input
            className="input-email"
            onChange={handleEmail}
            value={email}
          ></input>
        </li>
        <ButtonL onClick={goBind} >
          完成
        </ButtonL>
      </div>

    </LoginPannel>
  );
}
