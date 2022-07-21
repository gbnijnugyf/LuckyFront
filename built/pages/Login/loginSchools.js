"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BindEmail = exports.LoginCCNU = void 0;
var react_1 = require("react");
var service_1 = require("../../common/service");
require("./loginSchools.scss");
var Button_1 = require("../../components/Button");
function LoginPannel(props) {
    return (<div className="login-pannel">
            <p className="text-login-title">{props.text}</p>
            {props.children}
            <Button_1.ButtonL onClick={props.onClick}>
                {props.btnText}
            </Button_1.ButtonL>
        </div>);
}
function LoginCCNU(props) {
    var _a = (0, react_1.useState)(''), ccnuId = _a[0], setCcnuId = _a[1];
    var _b = (0, react_1.useState)(''), ccnuPwd = _b[0], setCcnuPwd = _b[1];
    var handleCcnuId = function (e) {
        setCcnuId(e.target.value);
    };
    var handleCcnuPwd = function (e) {
        setCcnuPwd(e.target.value);
    };
    var goVerify = function () {
        if (ccnuId === "") {
            alert("请输入学号");
        }
        else if (ccnuPwd === "") {
            alert("请输入密码");
        }
        else {
            service_1.default.ccnuLogin(ccnuId, ccnuPwd).then(function (res) {
                if (res.status === 0) {
                    localStorage.setItem('token', res.data);
                    props.history.push('/');
                }
                else
                    alert('用户名或密码错误');
            });
        }
    };
    return (<LoginPannel text="我是华小师" onClick={goVerify} btnText="下一步">
            <div className="panel-login">
                <ul>
                    <li>
                        <label>学号：</label>
                        <input value={ccnuId} onChange={handleCcnuId}></input>
                    </li>
                    <li>
                        <label>密码：</label>
                        <input type="password" value={ccnuPwd} onChange={handleCcnuPwd}></input>
                    </li>
                </ul>
            </div>
        </LoginPannel>);
}
exports.LoginCCNU = LoginCCNU;
function BindEmail(props) {
    var _a = (0, react_1.useState)(''), email = _a[0], setEmail = _a[1];
    var handleEmail = function (e) {
        setEmail(e.target.value);
    };
    var goBind = function () {
        service_1.default.bindEmail(email).then(function () {
            props.history.push("/home");
        });
    };
    return (<LoginPannel text="邮箱绑定" onClick={goBind} btnText="完成">
            <div className="panel-login">
                <p className="tip-email">填写邮箱地址，可以及时<br />
                    查收愿望状态哦~</p>
                <li>
                    <label className="label-email">邮箱：</label>
                    <input className="input-email" onChange={handleEmail} value={email}></input>
                </li>
            </div>
        </LoginPannel>);
}
exports.BindEmail = BindEmail;
