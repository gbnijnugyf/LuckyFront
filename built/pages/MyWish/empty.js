"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empty = void 0;
var Button_1 = require("../../components/Button");
require("./index.scss");
function Empty(props) {
    var goSendWish = function () {
        props.history.push("/send");
    };
    return (<div className="div-leaf-empty" align="center">
            <div className="text-empty">
                空空如也~
                <br />
                你还没有许愿呢~
                <br />
                人还是要多许愿的
                <br />
                万一就实现了呢~
            </div>
            <Button_1.ButtonS onClick={goSendWish} style={{ background: "white", color: "#F25125", "fontSize": "x-large" }}>
                投递我的小幸运
            </Button_1.ButtonS>
        </div>);
}
exports.Empty = Empty;
