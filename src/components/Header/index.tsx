import { useEffect, useState } from "react";
import "./index.scss";
import rulebutton from "../../static/images/rulebutton.png";
import logo from "../../static/images/logo.png";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TipAction } from "../../stores/TipStore";
import { ButtonS } from "../Button";

const Tips = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const showRule = useSelector<boolean>((state) => state);

  const setIsShow = (state: boolean) =>
    dispatch({ type: state ? TipAction.SHOW : TipAction.HIDE });

  const handleShow = () => {
    setIsShow(!showRule);
  };

  return (
    <div
      className="rule-container"
      style={{
        display:
          showRule &&
          !location.pathname.match(/^\/(wishpool\/wish)|(tagscreen\/home)/) //两个特殊页面提示的屏蔽
            ? "flex"
            : "none",
      }}
    >
      <div className="cover" />
      <div
        className="rule-alert"
        style={{ display: showRule ? "flex" : "none" }}
      >
        <div className="rule-text">
          1.这次活动男生女生都可以许愿哦~你一共有5次许愿的机会，快来遇见你的小幸运吧~
          <br />
          2.将你的愿望打上标签，它会被投入相应的愿望池中，听说这样愿望更容易被兴趣相似的人发现哦~
          <br />
          3.选择不同的愿望分区进入，更容易找到直击你心灵的愿望哦~
          <br />
          4.你有7次点亮心愿的机会，可以通过点亮愿望池中随机出现的心愿，帮助TA实现这份小幸运~
          <br />
          5.点亮她人心愿后可查看到她的联系方式，便于帮助她实现心愿~同时也也留下你的联系方式，方便TA联系你~
          <br />
          6.一个愿望只有一次实现机会~被点亮后将暂时不会出现在首页愿望池，被实现后将不会再出现在愿望池。
          <br />
          7.确认点亮他人愿望后，被你点亮的许愿人将能看到你的姓名等基本信息。
          <br />
          8.一次只能同时点亮2个愿望，如果点亮了无法实现记得及时放弃实现。由对方确认实现了愿望才能接着点亮下一个哦。
        </div>
        <ButtonS id="btnRuleShow" onClick={handleShow}>
          我知道了
        </ButtonS>
      </div>
    </div>
  );
};
function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const showRule = useSelector<boolean>((state) => state);
  const [key, setKey] = useState("");

  useEffect(() => {
    setKey(location.pathname.split("/")[1]);
  }, [location.pathname]);

  useEffect(() => {
    if (key === "/wishpool/wish") {
      let used = localStorage.getItem("wish_tip");
      if (!used) {
        dispatch({ type: TipAction.SHOW });
        localStorage.setItem("wish_tip", "true"); //类型“boolean”的参数不能赋给类型“string”的参数
      }
    } else if (key === "/tagscreen/home") {
      let used = localStorage.getItem("other_tip");
      if (!used) {
        dispatch({ type: TipAction.SHOW });
        localStorage.setItem("other_tip", "true"); //类型“boolean”的参数不能赋给类型“string”的参数
      }
    }
  }, [key, dispatch]);

  return (
    <div className="header">
      <div className="comp-header">
        <div className="logo-rule">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div
            className="rule"
            style={{
              display: location.pathname.match(/login/) ? "none" : "",
            }}
            onClick={() =>
              dispatch({ type: showRule ? TipAction.HIDE : TipAction.SHOW })
            }
          >
            <div className="img-rule">
              <img src={rulebutton} alt="rulebutton" />
            </div>
            <div className="text-rule">规则</div>
          </div>
        </div>
      </div>
      <Tips />
    </div>
  );
}

export default Header;
