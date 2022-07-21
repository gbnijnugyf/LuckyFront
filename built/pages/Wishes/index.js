"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ConfirmPanel_1 = require("../../components/ConfirmPanel");
var Button_1 = require("../../components/Button");
var calendar_svg_1 = require("../../static/images/calendar.svg");
var leaf_svg_1 = require("../../static/images/leaf.svg");
var service_1 = require("../../common/service");
require("./index.scss");
var WishItem = function (props) {
    var _a, _b;
    return (<div key={(_a = props.wish) === null || _a === void 0 ? void 0 : _a.wishman_name} className="wish-item" style={props.style} onTouchStart={props.onTouchStart} onTouchMove={props.onTouchMove} onTouchEnd={props.onTouchEnd}>
            <img src={leaf_svg_1.default} className="wish-img" alt=""/>
            <div className="content">
                <div className="content-word">
                    {(_b = props.wish) === null || _b === void 0 ? void 0 : _b.wish}
                </div>
            </div>
            <div className="msg">
                <p>{props.wish.school === "" ? "" :
            props.wish.school === 0 ? '华小师' : '武小理'}</p>
                <p>{props.wish.wishman_name.length > 0 ? props.wish.wishman_name.charAt(0) + "同学"
            : ""}</p>
            </div>
        </div>);
};
function Wishes(props) {
    // 拿着这个分类去发请求
    var category = props.location.state.category;
    var _a = (0, react_1.useState)(true), showTip = _a[0], setShowTip = _a[1];
    var moveState = { img1: 0, img2: 10, img3: 20 };
    var _b = (0, react_1.useState)(moveState), move = _b[0], setMove = _b[1]; // 树叶动画相关状态
    var _c = (0, react_1.useState)(), startX = _c[0], setStartX = _c[1]; // 树叶动画相关状态
    var _d = (0, react_1.useState)(false), update = _d[0], setUpDate = _d[1]; // 控制动画以及愿望内容的更新
    var _e = (0, react_1.useState)(false), display = _e[0], setDisplay = _e[1]; // 弹出确认框
    var _f = (0, react_1.useState)(false), light = _f[0], setLight = _f[1];
    var _g = (0, react_1.useState)(true), lightBtn = _g[0], setLightBtn = _g[1]; // 点亮按钮是否存在
    var _h = (0, react_1.useState)([{ wish: "当前分类没有愿望哦~", school: "", wishman_name: "" },
        { wish: "当前分类没有愿望哦~", school: "", wishman_name: "" },
        { wish: "当前分类没有愿望哦~", school: "", wishman_name: "" }]), wishes = _h[0], setWishes = _h[1];
    var _j = (0, react_1.useState)(""), name = _j[0], setName = _j[1];
    var _k = (0, react_1.useState)(""), number = _k[0], setNumber = _k[1];
    var _l = (0, react_1.useState)(""), tel = _l[0], setTel = _l[1];
    var _m = (0, react_1.useState)("QQ"), option = _m[0], setOption = _m[1];
    var refreshWishes = function () {
        service_1.default.getWishByCategories(category).then(function (res) {
            var wishes = [];
            if (res.data.length === 0) {
                setLightBtn(false);
                var wish = { wish: "当前分类没有愿望哦~", school: "", wishman_name: "" };
                wishes.push(wish);
            }
            else {
                wishes = res.data;
                setLightBtn(true);
            }
            while (wishes.length < 3) {
                wishes = wishes.concat(wishes);
            }
            setWishes(wishes);
        });
    };
    // 获取愿望
    (0, react_1.useEffect)(refreshWishes, [category, lightBtn]);
    (0, react_1.useEffect)(function () {
        setInterval(function () {
            setShowTip(false);
        }, 5000);
    });
    var handleName = function (e) {
        setName(e.target.value);
    };
    var handleNumber = function (e) {
        setNumber(e.target.value);
    };
    var handleTel = function (e) {
        setTel(e.target.value);
    };
    var handleOption = function (e) {
        setOption(e.target.value);
    };
    // Start/Move/End 都是控制愿望刷新动画的相关函数
    var onTouchStart = function (e) {
        var touch = e.targetTouches[0];
        setStartX({ start: touch.pageX, move: '' });
    };
    var onTouchMove = function (e) {
        var touch = e.targetTouches[0];
        var move_X = ((touch.pageX - startX.start) / 5);
        setStartX(startX);
        setMove({ img1: move_X, img2: 10, img3: 20 });
    };
    var onTouchEnd = function () {
        setUpDate(true);
        if (move.img1 < -25) {
            setMove({ img1: -90, img2: 0, img3: 10 });
        }
        else if (move.img1 > 20) {
            setMove({ img1: 90, img2: 0, img3: 10 });
        }
        else {
            setMove({ img1: 0, img2: 10, img3: 20 });
            return;
        }
        // 刷新愿望
        setTimeout(function () {
            setUpDate(false);
            var newWishSource = wishes;
            newWishSource.push(newWishSource[0]);
            newWishSource.splice(0, 1);
            setWishes(newWishSource);
            // 刷新动画
            setMove(moveState);
            // if (wishes.length <= 2) {
            //     setRely(!rely) // 原本的意思就是愿望刷新就剩2个改变依赖调用hooks再发送一次请求刷新愿望列表
            // }
        }, 200);
    };
    // 查看我的点亮
    var goMyWish = function () {
        props.history.push('/mywish');
    };
    var LightWish = function () {
        if (name === "")
            alert("还没有填写姓名哦~");
        else if (number === "")
            alert("还没有填写联系方式哦~");
        else {
            var id = wishes[0].wish_id;
            var _a = option === 'QQ' ? [number, ""] : ["", number], qq = _a[0], wechat = _a[1];
            service_1.default.lightWishOn(id, name, tel, qq, wechat).then(function (res) {
                if (res.status === 0) {
                    alert("点亮成功~");
                    refreshWishes();
                }
                else {
                    alert(res.msg);
                }
            });
            handleAlert();
        }
    };
    // 处理遮罩
    var handleAlert = function () {
        setLight(false);
        setDisplay(false);
    };
    // 处理点亮愿望
    var handleLight = function () {
        setLight(true);
    };
    var showConfirm = function () {
        setDisplay(true);
    };
    return (<div className='wishpage'>

            <ConfirmPanel_1.default display={display} action={{ "yes": light ? LightWish : handleLight, "no": handleAlert }}>
                {light ? (<div className="input-msg">
                        <p className='info'>填写联系方式，方便他来联系你哦～</p>
                        <div className="form">
                            <div className="name">
                                点亮人 :
                                <input type="text" placeholder='必填内容哦～' onChange={handleName} value={name} style={{ marginLeft: "2em" }}/>
                            </div>
                            <div className="number">
                                联系方式 :
                                <select onChange={handleOption} style={{ color: 'rgb(239, 96, 63)' }}>
                                    <option value="QQ">QQ</option>
                                    <option value="WeChat">微信</option>
                                </select>
                                <input type="text" placeholder='必填内容哦～' onChange={handleNumber} value={number} style={{ marginLeft: ".3em", width: "30%" }}/>
                            </div>
                            <div className="tel">
                                或 Tel :
                                <input type="text" placeholder='选填内容哦～' onChange={handleTel} value={tel} style={{ marginLeft: '2.3em' }}/>
                            </div>
                        </div>
                    </div>) : <p style={{ fontSize: "medium" }}>确认要帮TA实现这个愿望吗</p>}
            </ConfirmPanel_1.default>

            <Button_1.ButtonS onClick={goMyWish} style={{
            background: "#F59D65",
            color: "white",
            marginTop: "13em",
            alignSelf: "flex-start",
            padding: "0.4em 0.7em",
            fontSize: "medium",
            zIndex: "999"
        }}>
                <img style={{ transform: "scale(3) translate(2%, 12%)" }} src={calendar_svg_1.default} alt=""/>
                查看我的点亮
            </Button_1.ButtonS>
            <div className='wishes'>
                <WishItem className="wish-img" wish={wishes[0]} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} style={{
            left: "".concat(move.img1, "vw"),
            transition: update ? 'all 0.2s' : 'none',
            zIndex: "101"
        }}/>
                <WishItem className="wish-img" wish={wishes[1]} style={{
            left: "".concat(move.img2, "vw"),
            transition: update ? 'all 0.2s' : 'none',
            zIndex: "100"
        }}/>
                <WishItem className="wish-img" wish={wishes[2]} style={{
            left: "".concat(move.img3, "vw"),
            transition: update ? 'all 0.2s' : 'none',
            zIndex: "99"
        }}/>
                <WishItem className="img1 wish-img" wish={wishes[2]} style={{
            left: "20vw",
            zIndex: "98"
        }}/>
            </div>
            <Button_1.ButtonS style={{ position: "fixed", background: "#F59D65A0", color: "#FFFFFFA0", top: "65vh", right: "-1em", zIndex: "301", display: showTip ? "absolute" : "none" }}>
                左右滑查看更多许愿哦~
            </Button_1.ButtonS>
            <Button_1.ButtonS onClick={showConfirm} style={{ background: "white", color: "#F59D65", marginTop: "22.5em", zIndex: "999", display: lightBtn ? "relative" : "none" }}>
                点亮TA的小幸运
            </Button_1.ButtonS>
        </div>);
}
exports.default = Wishes;
