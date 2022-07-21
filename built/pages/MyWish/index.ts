"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.scss");
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var empty_jsx_1 = require("./empty.jsx");
var list_1 = require("./list");
var service_1 = require("../../common/service");
var Index = function (props) {
    var _a = (0, react_1.useState)([]), wishPost = _a[0], setWishPost = _a[1];
    var _b = (0, react_1.useState)([]), wishLight = _b[0], setWishLight = _b[1];
    var _c = (0, react_1.useState)(false), gotPost = _c[0], setGotPost = _c[1];
    var _d = (0, react_1.useState)(false), gotLight = _d[0], setGotLight = _d[1];
    (0, react_1.useEffect)(function () {
        service_1.default.getUserWishPost().then(function (res) {
            setWishPost(res.data);
            setGotPost(true);
        });
    }, []);
    (0, react_1.useEffect)(function () {
        service_1.default.getUserWishLight().then(function (res) {
            setWishLight(res.data);
            setGotLight(true);
        });
    }, []);
    (0, react_1.useEffect)(function () {
        if (gotPost && gotLight) {
            if ((wishPost === null || wishPost === void 0 ? void 0 : wishPost.length) === 0 && (wishLight === null || wishLight === void 0 ? void 0 : wishLight.length) === 0)
                props.history.push("/mywish/empty");
            else
                props.history.push("/mywish/list", { wishPost: wishPost, wishLight: wishLight });
        }
    }, [gotLight, gotPost, props.history, wishLight, wishPost]);
    return <></>;
};
function MyWish(props) {
    return (<div>
            <react_router_dom_1.Switch>
                <react_router_dom_1.Route path="/mywish/index" component={Index}/>
                <react_router_dom_1.Route path="/mywish/empty" component={empty_jsx_1.Empty}/>
                <react_router_dom_1.Route path="/mywish/list" component={list_1.MyWishList}/>
                <react_router_dom_1.Redirect to="/mywish/index"/>
            </react_router_dom_1.Switch>
        </div>);
}
exports.default = MyWish;
