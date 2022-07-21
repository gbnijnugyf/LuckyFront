"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var react_router_dom_1 = require("react-router-dom");
var App_1 = require("./App");
var reportWebVitals_1 = require("./reportWebVitals");
react_dom_1.default.render(<react_router_dom_1.BrowserRouter>
        <react_1.default.StrictMode>
            <App_1.default />
        </react_1.default.StrictMode></react_router_dom_1.BrowserRouter>, document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
(0, reportWebVitals_1.default)();
