"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonS = exports.ButtonL = void 0;
var react_1 = require("react");
require("./index.scss");
function ButtonL(props) {
    return (<div className="button-large" onClick={props.onClick}>
            {props.children}
        </div>);
}
exports.ButtonL = ButtonL;
function ButtonS(props) {
    return (<div className="button-small" onClick={props.onClick} style={props.style}>
            {props.children}
        </div>);
}
exports.ButtonS = ButtonS;
