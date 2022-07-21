"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Button_1 = require("../../components/Button");
var Global_1 = require("../../config/Global");
require("./index.scss");
var service_1 = require("../../common/service");
function Home(props) {
    // 检查是否绑定邮箱
    (0, react_1.useEffect)(function () {
        service_1.default.checkUserEmail().then(function (res) {
            if (res.status === -1)
                props.history.push("/login/bindemail");
        });
    }, [props.history]);
    var goWishes = function (tag) {
        props.history.push("/wish/".concat(tag.enName), { category: tag.category });
    };
    var goSend = function () {
        props.history.push('/send');
    };
    return (<div className="panel-home">
            <div className="tags">
                {Global_1.tags.map(function (tag) {
            return (<div onClick={function () { return goWishes(tag); }} className="tag" key={tag.category}>
                                {tag.name}
                            </div>);
        })}
            </div>
            <Button_1.ButtonS onClick={function () { return goSend(Global_1.tags); }} style={{ background: "#FFFFFF", color: "#F25125", marginTop: "10%" }}>
                投递我的小幸运
            </Button_1.ButtonS>
        </div>);
}
exports.default = Home;
