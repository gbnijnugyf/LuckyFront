"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.scss");
var react_router_dom_1 = require("react-router-dom");
var loginSchools_jsx_1 = require("./loginSchools.jsx");
function Btn(props) {
    return (<div className="btn-school" onClick={props.onClick}>
            <div className="birdimg"/>
            <p className="text-school">{props.text}</p>
        </div>);
}
function LoginMain(props) {
    var goWHUT = function () {
        var position = window.location.href;
        var continueurl = position.slice(0, position.indexOf('/', 10));
        var posturl = continueurl + "/api/login/whut/callback";
        window.location.href = "https://ias.sso.itoken.team/portal.php?posturl=".concat(encodeURIComponent(posturl), "&continueurl=").concat(encodeURIComponent(continueurl));
    };
    var goCCNU = function () {
        props.history.push("/login/ccnu");
    };
    return (<div className='login-main'>
            <p className="text-title">小幸运</p>
            <p className="text-subtitle">相遇，就是这么妙不可言</p>
            <div className="div-school">
                <Btn text="我是武小理" onClick={goWHUT}/>
                <Btn text="我是华小师" onClick={goCCNU}/>
            </div>
        </div>);
}
function Login(props) {
    return (<div className="login">
            <react_router_dom_1.Switch>
                <react_router_dom_1.Route path="/login/ccnu" component={loginSchools_jsx_1.LoginCCNU}/>
                <react_router_dom_1.Route path="/login/bindemail" component={loginSchools_jsx_1.BindEmail}/>
                <react_router_dom_1.Route path="/login" component={LoginMain}/>
            </react_router_dom_1.Switch>
        </div>);
}
exports.default = Login;
