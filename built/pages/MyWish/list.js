"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyWishList = void 0;
require("./index.scss");
var react_1 = require("react");
var Button_1 = require("../../components/Button");
var react_2 = require("react");
var service_1 = require("../../common/service");
var global_1 = require("../../common/global");
function WishItem(props) {
    var wish = props.wish;
    var time = wish.state === 1 ? (0, global_1.formatTime)(wish.light_at) : (0, global_1.formatTime)(wish.creat_at);
    return (<li className="item-wish" onClick={props.onClick}>
            <p className="text-detail">{wish.wish}</p>
            <div className="status">
                <Button_1.ButtonS style={{
            background: "#FFFFFF",
            color: wish.state === 0 ? "#1DCB1D" : "#F25C33",
            fontSize: "medium",
            fontFamily: "PingFangSC",
            fontWeight: "Bold",
            padding: "0 0.5em"
        }}>
                    {wish.state === 0 ?
            "未实现" :
            wish.state === 1 ?
                "已点亮" :
                "已实现"}</Button_1.ButtonS>
                <p className="text-wishtime">{time}</p>
            </div>
        </li>);
}
function MyWishList(props) {
    var _a = (0, react_2.useState)([]), wishLight = _a[0], setWishLight = _a[1];
    var _b = (0, react_2.useState)([]), wishPost = _b[0], setWishPost = _b[1];
    // 排序愿望为需要的顺序
    var sortWishes = function (oldwishes) {
        var sorted = [];
        var priority = [1, 2, 0];
        for (var p = 0; p < priority.length; p++)
            for (var i = 0; i < oldwishes.length; i++)
                if (oldwishes[i].state === priority[p])
                    sorted.push(oldwishes[i]);
        return sorted;
    };
    (0, react_2.useEffect)(function () {
        service_1.default.getUserWishLight().then(function (res) {
            setWishLight(sortWishes(res.data));
        });
        service_1.default.getUserWishPost().then(function (res) {
            setWishPost(sortWishes(res.data));
        });
    }, [props.history]);
    var goWishDetail = function (id) {
        props.history.push('/detail/' + id);
    };
    return (<>
            <div className="div-wishlist-toppadding"/>
            <div className="div-wishlist">
                <h3>我许下的愿望</h3>
                <hr />
                <ul>
                    {wishPost.map(function (wish) {
            return <WishItem time={wish.creat_at} wish={wish} key={wish.wish_id} onClick={function () { goWishDetail(wish.wish_id); }}/>;
        })}
                </ul>
                <h3>我点亮的愿望</h3>
                <hr />
                <ul>
                    {wishLight.map(function (wish) {
            return <WishItem time={wish.light_at} wish={wish} key={wish.wish_id} onClick={function () { goWishDetail(wish.wish_id); }}/>;
        })}
                </ul>
                <div className="div-listbottom">
                    <p>你还剩{7 - wishLight.length}次实现小幸运的机会哦~</p>
                    <hr></hr>
                    <p>人家也是有底线的</p>
                </div>
            </div>
        </>);
}
exports.MyWishList = MyWishList;
