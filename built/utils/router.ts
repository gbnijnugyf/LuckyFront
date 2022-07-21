"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_router_1 = require("react-router");
var Login_1 = require("../pages/Login");
var Home_1 = require("../pages/Home");
var Send_1 = require("../pages/Send");
var react_cookies_1 = require("react-cookies");
var Detail_1 = require("../pages/Detail");
var Wishes_1 = require("../pages/Wishes");
var Header_1 = require("../components/Header");
var MyWish_1 = require("../pages/MyWish");
function Router(props) {
    // 保存WHUT登录后返回的token
    (0, react_1.useEffect)(function () {
        var token = react_cookies_1.default.load('jwt_token');
        if (token) {
            localStorage.setItem('token', token);
            props.history.push("/");
        }
        if (!localStorage.getItem("token")) {
            props.history.push("/login");
        }
    }, [props.history]);
    return (<>
            {props.location.pathname.match(/login/) ? null : <Header_1.default></Header_1.default>}
            <div className="content">
                <react_router_dom_1.Switch>
                    <react_router_dom_1.Route path='/login' component={Login_1.default}></react_router_dom_1.Route>
                    <react_router_dom_1.Route path='/home' component={Home_1.default}></react_router_dom_1.Route>
                    <react_router_dom_1.Route path='/send' component={Send_1.default}></react_router_dom_1.Route>
                    <react_router_dom_1.Route path='/detail' component={Detail_1.default}></react_router_dom_1.Route>
                    <react_router_dom_1.Route path='/wish/:tag' component={Wishes_1.default}></react_router_dom_1.Route>
                    <react_router_dom_1.Route path='/mywish' component={MyWish_1.default}></react_router_dom_1.Route>
                    <react_router_1.Redirect to={localStorage.getItem("token") === null ? '/login' : '/home'}></react_router_1.Redirect>
                </react_router_dom_1.Switch>
            </div>
        </>);
}
exports.default = (0, react_router_dom_1.withRouter)(Router);
