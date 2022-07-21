"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var service_1 = require("../../common/service");
var ink_svg_1 = require("../../static/images/ink.svg");
var Global_1 = require("../../config/Global");
var Button_1 = require("../../components/Button");
var paperplane_svg_1 = require("../../static/images/paperplane.svg");
require("./index.scss");
function Send(props) {
    var _a = (0, react_1.useState)(false), showTag = _a[0], setShowTag = _a[1]; //控制标签弹窗
    var _b = (0, react_1.useState)('选择标签'), tagName = _b[0], setTagName = _b[1]; //控制选择标签后的显示
    var _c = (0, react_1.useState)(''), wishContent = _c[0], setWishContent = _c[1]; //控制 textarea
    var _d = (0, react_1.useState)(''), nameValue = _d[0], setNameValue = _d[1]; //控制 name input
    var _e = (0, react_1.useState)(''), numberValue = _e[0], setNumberValue = _e[1]; //控制 number input
    var _f = (0, react_1.useState)(''), tel = _f[0], setTel = _f[1]; // 控制tel input
    var _g = (0, react_1.useState)('QQ'), selectValue = _g[0], setSelectValue = _g[1]; // 控制select的值
    var _h = (0, react_1.useState)(-1), category = _h[0], setCategory = _h[1]; // 控制愿望分类
    var _j = (0, react_1.useState)(true), isInk = _j[0], setIsInk = _j[1];
    var handleNoneInk = function () {
        setIsInk(false);
    };
    var handleShowInk = function () {
        setIsInk(true);
    };
    // 处理填写愿望的字数限制
    var handleWishContent = function (e) {
        if (document.hasFocus()) {
            setIsInk(false);
        }
        if (e.target.value.length > 160) {
            setWishContent(e.target.value.substr(0, 161));
            alert('不能写下更多了哦');
        }
        setWishContent(e.target.value);
    };
    // 处理 name input
    var handleNameValue = function (e) {
        setNameValue(e.target.value);
    };
    // 处理 number input
    var handleNumberValue = function (e) {
        setNumberValue(e.target.value);
    };
    // 处理 tel input
    var handleTelValue = function (e) {
        setTel(e.target.value);
    };
    // 处理 select options
    var handleSelectValue = function (e) {
        setSelectValue(e.target.value);
    };
    // 处理点击发送后的提交失败/成功
    var goSubmit = function () {
        // 判断必填项
        if (wishContent === '') {
            alert('你还没有填写内容哦~');
        }
        else if (category === -1) {
            alert('你还没有选择标签分类哦~');
        }
        else if (nameValue === '') {
            alert('你的小幸运还没有署名哦～');
        }
        else if (numberValue === '') {
            alert('留下联系方式可以及时收获你的小幸运哦');
        }
        else {
            var QQ = selectValue === 'QQ' ? numberValue : "";
            var wechat = selectValue === 'WeChat' ? numberValue : "";
            service_1.default.postWish(nameValue, QQ, wechat, tel, wishContent, category)
                .then(function () {
                alert('投递成功！');
                props.history.push('/home');
            });
        }
    };
    // 处理选择标签的点击事件
    var changeTagName = function (name, category) {
        setShowTag(false);
        setTagName(name);
        setCategory(category);
    };
    // 打开选择标签页
    var goSelectTag = function () {
        setShowTag(true);
    };
    return (<div className='send'>
            <div className="mask" style={{ display: showTag ? 'flex' : 'none' }}>
                <div className="tags">{Global_1.tags.map(function (tag, index) {
            return (<div onClick={function () { return changeTagName(tag.name, index + 1); }} className="tag" key={tag.name}>
                                <p>{tag.name}</p>
                            </div>);
        })}</div>
            </div>
            <div className="sendbc">
                <img className="ink" style={{ display: isInk ? 'block' : 'none' }} src={ink_svg_1.default} alt=""/>
                <Button_1.ButtonS onClick={goSelectTag} style={{
            background: "white",
            fontFamily: "MicrosoftJhengHeiUIRegular, Microsoft JhengHei UI",
            color: "#f25125",
            alignSelf: "flex-end",
            margin: "2em 2em 0 0",
            fontSize: "medium"
        }}>
                    {"# " + tagName}
                </Button_1.ButtonS>
                <textarea onBlur={handleShowInk} onFocus={handleNoneInk} className='notes' placeholder={'把你的小幸运放进小纸条吧~听说160字以内的愿望更容易实现哦~'} value={wishContent} onChange={handleWishContent}></textarea>
                <div className="send-msg">
                    <div className="name">
                        <p>投递人：</p>
                        <input type="text" placeholder='必填内容哦～' value={nameValue} onChange={handleNameValue}/>
                    </div>
                    <div className="number">
                        <p>联系方式：</p>
                        <select value={selectValue} onChange={handleSelectValue}>
                            <option value="QQ">QQ</option>
                            <option value="WeChat">微信</option>
                        </select>
                        <input type="text" id="connect" placeholder='必填内容哦～' value={numberValue} onChange={handleNumberValue}/><br />
                        <p>或 Tel：</p>
                        <input type="text" id="tel" placeholder='选填内容哦～' value={tel} onChange={handleTelValue} style={{ marginLeft: '2em' }}/>
                    </div>
                </div>
                <h6>填写电话可以确保第一时间知道你的愿望状态哦~</h6>
                <Button_1.ButtonS onClick={goSubmit} style={{ background: "white", color: "#f25125", margin: "0.5em 0" }}>
                    <img src={paperplane_svg_1.default} alt="" style={{ paddingBottom: "0.2em" }}/> 完成
                </Button_1.ButtonS>
            </div>
        </div>);
}
exports.default = Send;
