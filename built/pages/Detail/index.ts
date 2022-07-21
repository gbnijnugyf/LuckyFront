"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Button_1 = require("../../components/Button");
var ConfirmPanel_1 = require("../../components/ConfirmPanel");
var service_1 = require("../../common/service");
var forward_svg_1 = require("../../static/images/forward.svg");
require("./index.scss");
var global_1 = require("../../common/global");
var WishDetail = function (props) {
    var _a = (0, react_1.useState)(true), needForward = _a[0], setNeedForward = _a[1];
    var _b = props.onChange, changeShowConfirm = _b.changeShowConfirm, changeConfirmContent = _b.changeConfirmContent, changeBtnText = _b.changeBtnText, changeConfirmAction = _b.changeConfirmAction;
    var isMine = props.isMine, wish = props.wish;
    //bad use
    var getForward = function () {
        if (isMine && wish.state === 0) {
            return <img src={forward_svg_1.default} onClick={showForward} className="forward" alt=""/>;
        }
    };
    var showForward = function () {
        changeConfirmContent(<>
                <p>快去复制以下链接</p>
                <p>将你的愿望分享出去吧~</p>
                <p style={{
                width: "80%",
                wordBreak: "break-all"
            }}>{window.location.href}</p>
            </>);
        changeConfirmAction(function () { changeShowConfirm(false); }, function () { changeShowConfirm(false); });
        changeShowConfirm(true);
    };
    return (<div className="content">
            {getForward()}
            <div className="text">
                <div className="text-content">
                    {props.wish.wish}
                </div>
            </div>
            <div className="wishInfo">
                <p>来自 {props.wish.wishman_name}</p>
                <p>{(0, global_1.formatTime)(props.wish.creat_at)}</p>
            </div>
        </div>);
};
var PersonMsg = function (props) {
    var isMine = props.isMine, wish = props.wish;
    var _a = (0, react_1.useState)(""), name = _a[0], setName = _a[1];
    var _b = (0, react_1.useState)(""), time = _b[0], setTime = _b[1];
    var _c = (0, react_1.useState)(""), QQ = _c[0], setQQ = _c[1];
    var _d = (0, react_1.useState)(""), wechat = _d[0], setWechat = _d[1];
    var _e = (0, react_1.useState)(""), tel = _e[0], setTel = _e[1];
    (0, react_1.useEffect)(function () {
        if (isMine) {
            service_1.default.getLightManInfo(wish.wish_id).then(function (res) {
                setName(res.data.light_name);
                setTime("于" + (0, global_1.formatTime)(wish.light_at) + "点亮");
                setQQ(res.data.light_qq);
                setWechat(res.data.light_wechat);
                setTel(res.data.light_tel);
            });
        }
        else {
            setName(wish.wishman_name);
            setTime("于" + (0, global_1.formatTime)(wish.creat_at) + "许愿");
            setQQ(wish.wishman_qq);
            setWechat(wish.wishman_wechat);
            setTel(wish.wishman_tel);
        }
    }, [isMine, wish]);
    return (<div className="msg">
            <div className="msg-text">
                <p className='h'>{isMine ? "点亮人" : "许愿人"}</p>
                <p className='name'>{name}</p>
            </div>
            <div className="msg-info">
                <p>{time}</p>
                <p style={{ marginTop: "0.5em", textAlign: "left" }}>联系方式 :</p>
                <ul className="msg-number">
                    {QQ ? <li>QQ：{QQ}</li> : null}
                    {wechat ? <li>微信：{wechat}</li> : null}
                    {tel ? <li>电话：{tel}</li> : null}
                </ul>
            </div>
        </div>);
};
// 别人的愿望，我已经点亮/实现
var OtherLighted = function (props) {
    var _a = props.onChange, goOtherPage = _a.goOtherPage, changeShowConfirm = _a.changeShowConfirm, changeConfirmContent = _a.changeConfirmContent, changeBtnText = _a.changeBtnText, changeConfirmAction = _a.changeConfirmAction;
    var currentIndex = "wuchu";
    var otherMsg = "";
    var msgs = {
        "wuchu": "刚刚误触了点亮按钮，不好意思啦~",
        "mang": "最近有点忙，短时间没有精力实现愿望了，抱歉"
    };
    var achieved = props.wish.state === 2;
    // 点击已经实现愿望
    var pressAchieve = function () {
        changeConfirmAction(function () {
            changeShowConfirm(false);
            service_1.default.achieveWish(props.wish.wish_id);
            goOtherPage("/mywish");
        }, function () {
            changeShowConfirm(false);
        });
        changeConfirmContent(<>
                <p style={{ alignSelf: "flex-start" }}>
                    确认已经实现这个愿望了嘛？
                </p>
                <p style={{ alignSelf: "flex-start", textAlign: "start" }}>
                    若确认，我们将发邮件提醒TA来确认你已经实现了TA的愿望
                </p>
            </>);
        changeShowConfirm(true);
    };
    // 点击放弃愿望
    var pressAbandon = function () {
        changeConfirmAction(pressReallyAbandon, function () { changeShowConfirm(false); });
        changeConfirmContent(<p>确认放弃这个愿望吗？</p>);
        changeShowConfirm(true);
    };
    var handleRadioChange = function (e) {
        currentIndex = e.target.value;
    };
    // 点击确定放弃
    var pressReallyAbandon = function () {
        changeConfirmAction(function () {
            changeShowConfirm(false);
            changeBtnText('', '');
            var message = currentIndex === 'other' ? otherMsg : msgs[currentIndex];
            service_1.default.giveUpLightWish(props.wish.wish_id, message).then(function () {
                goOtherPage("/mywish");
            });
        }, function () {
            changeShowConfirm(false);
            changeBtnText('', '');
            service_1.default.giveUpLightWish(props.wish.wish_id).then(function () {
                goOtherPage("/mywish");
            });
        });
        changeConfirmContent(<form className='msg-borad'><p>你想要放弃这个愿望，<br />建议给对方留言说明原因哦：</p>
                <div className='options'>
                    <div><input type="radio" name='msg' value='wuchu' defaultChecked={true} onChange={handleRadioChange}/></div>
                    <p>刚刚误触了点亮按钮，不好意思啦~</p>
                </div>
                <div className='options'>
                    <div> <input type="radio" name='msg' value='mang' onChange={handleRadioChange}/></div>
                    <p>最近有点忙，短时间没有精力实现愿望了，抱歉</p>
                </div>
                <div className='options'>
                    <div><input type='radio' name='msg' value='other' onChange={handleRadioChange}/></div>
                    <div>
                        <p>留言给对方：</p>
                        <input type="text" placeholder='输入其他原因' className='reason' onChange={function (e) { otherMsg = e.target.value; }} defaultValue={otherMsg}/>
                    </div>
                </div>
            </form>);
        changeBtnText("发送", "不留言");
    };
    return (<>
            <div className="panel-button">
                <Button_1.ButtonS onClick={achieved ? null : pressAbandon} style={{ background: "#FFFFFF", color: "#F25125", width: "6em" }}>
                    放弃实现
                </Button_1.ButtonS>
                <Button_1.ButtonS onClick={achieved ? null : pressAchieve} style={{ background: achieved ? "#C0C0C0" : "#FF7A59", color: "#FFFFFF", width: "6em", marginLeft: "2em" }}>
                    {achieved ? "已经实现" : "确认实现"}
                </Button_1.ButtonS>
            </div>
            <hr />
            <PersonMsg wish={props.wish} isMine={false}/>
        </>);
};
// 别人的愿望，没人实现
var OtherNotLighted = function (props) {
    var _a = props.onChange, goOtherPage = _a.goOtherPage, changeShowConfirm = _a.changeShowConfirm, changeConfirmContent = _a.changeConfirmContent, changeBtnText = _a.changeBtnText, changeConfirmAction = _a.changeConfirmAction;
    var name = "";
    var number = "";
    var tel = "";
    var _b = (0, react_1.useState)("QQ"), option = _b[0], setOption = _b[1];
    var handleName = function (e) {
        name = e.target.value;
    };
    var handleNumber = function (e) {
        number = e.target.value;
    };
    var handleTel = function (e) {
        tel = e.target.value;
    };
    var handleOption = function (e) {
        setOption(e.target.value);
    };
    var pressLight = function () {
        changeConfirmContent(<p style={{ fontSize: "medium" }}>确认要帮TA实现这个愿望吗？</p>);
        changeConfirmAction(ReallyLight, function () {
            changeShowConfirm(false);
        });
        changeShowConfirm(true);
    };
    var ReallyLight = function () {
        changeConfirmContent(<div className="input-msg">
                <p className='info'>填写联系方式，方便他来联系你哦～</p>
                <div className="form">
                    <div className="name">
                        投递人 :
                        <input type="text" className="name" placeholder='必填内容哦～' onChange={handleName} defaultValue={name}/>
                    </div>
                    <div className="number">
                        联系方式 :
                        <select onChange={handleOption} style={{ color: 'rgb(239, 96, 63)' }}>
                            <option value="QQ">QQ</option>
                            <option value="WeChat">微信</option>
                        </select>
                        <input type="text" placeholder='必填内容哦～' onChange={handleNumber} defaultValue={number} style={{ marginLeft: ".3em", width: "30%" }}/>
                    </div>
                    <div className="tel">
                        或 Tel :
                        <input type="text" placeholder='选填内容哦～' onChange={handleTel} defaultValue={tel}/>
                    </div>
                </div>
            </div>);
        changeBtnText("发送");
        changeConfirmAction(function () {
            var id = props.wish.wish_id;
            var _a = option === 'QQ' ? [number, ""] : ["", number], qq = _a[0], wechat = _a[1];
            service_1.default.lightWishOn(id, name, tel, qq, wechat).then(function (res) {
                if (res.status === 0) {
                    alert("点亮成功~");
                    goOtherPage("/mywish");
                }
                else {
                    alert(res.msg);
                }
            });
            changeShowConfirm(false);
        }, function () {
            changeShowConfirm(false);
        });
    };
    return (<Button_1.ButtonS onClick={pressLight} style={{ background: "#FFFFFF", color: "#F25125", width: "6em" }}>
            点亮这个心愿
        </Button_1.ButtonS>);
};
// 我的愿望，没人实现
var MineNotLighted = function (props) {
    var _a = props.onChange, goOtherPage = _a.goOtherPage, changeShowConfirm = _a.changeShowConfirm, changeConfirmContent = _a.changeConfirmContent, changeConfirmAction = _a.changeConfirmAction;
    var pressDelete = function () {
        changeConfirmContent(<p style={{ fontSize: "medium" }}>确认删除这个愿望吗？</p>);
        changeConfirmAction(function () {
            service_1.default.deleteWish(props.wish.wish_id).then(function () {
                alert("删除成功");
                goOtherPage("/mywish");
            });
            changeShowConfirm(false);
        }, function () {
            changeShowConfirm(false);
        });
        changeShowConfirm(true);
    };
    return (<Button_1.ButtonS onClick={pressDelete} style={{ background: "#FFFFFF", color: "#F25125", width: "6em" }}>
            删除这个心愿
        </Button_1.ButtonS>);
};
var MineLighted = function (props) {
    var _a = props.onChange, goOtherPage = _a.goOtherPage, changeShowConfirm = _a.changeShowConfirm, changeConfirmContent = _a.changeConfirmContent, changeBtnText = _a.changeBtnText, changeConfirmAction = _a.changeConfirmAction;
    var wish = props.wish;
    var achieved = wish.state === 2;
    var pressDelete = function () {
        changeConfirmContent(<p style={{ fontSize: "medium" }}>确认删除这个愿望吗？</p>);
        changeConfirmAction(function () {
            service_1.default.deleteWish(props.wish.wish_id).then(function () {
                alert("删除成功");
                goOtherPage("/mywish");
            });
            changeShowConfirm(false);
        }, function () {
            changeShowConfirm(false);
        });
        changeShowConfirm(true);
    };
    var pressAchieve = function () {
        changeConfirmAction(function () {
            changeShowConfirm(false);
            service_1.default.achieveWish(props.wish.wish_id).then(function () {
                goOtherPage("/mywish");
            });
        }, function () {
            changeShowConfirm(false);
        });
        changeConfirmContent(<p style={{ alignSelf: "flex-start" }}>
                确认愿望已经实现了吗？
            </p>);
        changeShowConfirm(true);
    };
    return (<>
            <div className="panel-button">
                <Button_1.ButtonS onClick={achieved ? null : pressDelete} style={{ background: "#FFFFFF", color: "#F25125", width: "6em" }}>
                    删除这个心愿
                </Button_1.ButtonS>
                <Button_1.ButtonS onClick={achieved ? null : pressAchieve} style={{ background: achieved ? "#C0C0C0" : "#FF7A59", color: "#FFFFFF", width: "6em", marginLeft: "2em" }}>
                    {achieved ? "已经实现" : "确认实现"}
                </Button_1.ButtonS>
            </div>
            <hr />
            <PersonMsg wish={wish} isMine={true}/>
        </>);
};
function Detail(props) {
    var _a = (0, react_1.useState)(false), showConfirm = _a[0], setShowConfirm = _a[1]; // 设置遮罩状态
    var _b = (0, react_1.useState)(''), confirmContent = _b[0], setConfirmContent = _b[1]; // 设置弹窗内容
    var _c = (0, react_1.useState)({}), btnText = _c[0], setBtnText = _c[1]; // 设置按钮文本
    var _d = (0, react_1.useState)({}), confirmAction = _d[0], setConfirmAction = _d[1]; // 设置按钮触发
    var _e = (0, react_1.useState)({}), wish = _e[0], setWish = _e[1]; // 愿望内容
    var _f = (0, react_1.useState)(true), isMine = _f[0], setIsMine = _f[1]; // 是不是自己的愿望
    var goOtherPage = function (path) {
        props.history.push(path);
    };
    var changeShowConfirm = function (confirm) {
        setShowConfirm(confirm);
    };
    var changeConfirmContent = function (content) {
        setConfirmContent(content);
    };
    var changeBtnText = function (yes, no) {
        setBtnText({
            'yes': yes ? yes : btnText.yes,
            'no': no ? no : btnText.no
        });
    };
    var changeConfirmAction = function (yes, no) {
        setConfirmAction({
            'yes': yes ? yes : confirmAction.yes,
            'no': no ? no : confirmAction.no
        });
    };
    (0, react_1.useEffect)(function () {
        var id = props.location.pathname.split('/').pop();
        id = parseInt(id);
        service_1.default.getWishDetail(id).then(function (res) {
            setWish(res.data);
            service_1.default.getUserWishPost().then(function (res) {
                // res.data.wishes.forEach((wish) => {
                //     if (wish.wish_id === id)
                //         setIsMine(true)
                // })
            });
        });
    }, [props.location.pathname]);
    var onChange = {
        changeShowConfirm: changeShowConfirm,
        changeConfirmContent: changeConfirmContent,
        changeBtnText: changeBtnText,
        changeConfirmAction: changeConfirmAction,
        goOtherPage: goOtherPage
    };
    return (<div className='Detail'>
            <WishDetail wish={wish} isMine={isMine} onChange={onChange} pathname={props.location.pathname}/>
            <div className="other">
                {[
            [
                <OtherNotLighted wish={wish} onChange={onChange}/>,
                <OtherLighted wish={wish} onChange={onChange}/>,
                <OtherLighted wish={wish} onChange={onChange}/> // 别人的愿望，我已实现
            ],
            [
                <MineNotLighted wish={wish} onChange={onChange}/>,
                <MineLighted wish={wish} onChange={onChange}/>,
                <MineLighted wish={wish} onChange={onChange}/> // 我的愿望，已经实现
            ]
        ][isMine ? 1 : 0][wish.state]}
            </div>
            <ConfirmPanel_1.default display={showConfirm} action={confirmAction} btnText={btnText}>
                {confirmContent}
            </ConfirmPanel_1.default>
        </div>);
}
exports.default = Detail;
