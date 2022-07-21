"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.scss");
function ConfirmPanel(props) {
    var _a, _b;
    return (<div className="mask" style={{ display: props.display ? 'flex' : 'none' }}>
            <div className="infoPanel">
                <div className="textPanel">
                    {props.children}
                </div>
                <div className="confirmPanel">
                    <div className="confirmFalse" onClick={props.action.no}>
                        {((_a = props.btnText) === null || _a === void 0 ? void 0 : _a.no) ? props.btnText.no : "取消"}
                    </div>
                    <div className="confirmTrue" onClick={props.action.yes}>
                        {((_b = props.btnText) === null || _b === void 0 ? void 0 : _b.yes) ? props.btnText.yes : "确认"}
                    </div>
                </div>
            </div>

        </div>);
}
exports.default = ConfirmPanel;
