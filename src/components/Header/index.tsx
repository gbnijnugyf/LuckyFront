import React, { useEffect, useState } from "react";
import { ButtonS } from "../../components/Button";
import "./index.scss";
import rulebutton from "../../static/images/rulebutton.svg";
import backbutton from "../../static/images/backbutton.svg";
import logo from "../../static/images/logo.svg";
import arrowimg from "../../static/images/arrow.svg";
import { useLocation, useNavigate } from "react-router-dom";

interface ITitleList {
  [key: string]: string;
}

const titleList: ITitleList = {
  "/tagscreen/home": "标签页",
  "/tagscreen/fillwish": "投递我的小幸运",
  "/detail/list": "愿望详情",
  "/detail/empty": "愿望详情",
  "/wishpool/wish": "我的愿望池",
  "/mywish": "我的愿望池",
};

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const [key, setKey] = useState("");

  const handleShow = () => {
    setIsShow(!isShow);
  };
  const handleBack = () => {
    if (location.pathname.includes("/detail/list")) {
      navigate(-2); //'-2'是因为父级路由为判断愿望详情，会再次跳转至list或empty页面
    } else {
      navigate(-1);
    }
  };

  const getTitle = () => {
    //URL改变导致获取title的函数也要改变
    let key = location.pathname;
    let ckey = key;
    let index = key.indexOf("/", 2);
    if (index === -1) {
      return titleList[key];
    } else {
      key = key.slice(0, index);
      let index2 = ckey.indexOf("/", index + 1);
      if (index2 === -1) {
        return titleList[ckey];
      } else {
        ckey = ckey.slice(0, index2);
        return titleList[ckey]; //通过路由截取数组titlelist的索引key
      }
    }
  };

  useEffect(() => {
    setKey(location.pathname.split("/")[1]);
  }, [location.pathname]);

  useEffect(() => {
    if (key === "/wishpool/wish") {
      let used = localStorage.getItem("wish_tip");
      if (!used) {
        setIsShow(true);
        localStorage.setItem("wish_tip", "true"); //类型“boolean”的参数不能赋给类型“string”的参数
      }
    } else if (key === "/tagscreen/home") {
      let used = localStorage.getItem("other_tip");
      if (!used) {
        setIsShow(true);
        localStorage.setItem("other_tip", "true"); //类型“boolean”的参数不能赋给类型“string”的参数
      }
    }
  }, [key]);

  const getAlert = () => {
    if (key === "wishpool") {
      return (
        <div
          className="rule-alert-2"
          onClick={handleShow}
          style={{ display: isShow ? "block" : "none" }}
        >
          <p className="tipalert" style={{ top: "13vh", right: "20vw" }}>
            点击这里查看规则
          </p>
          <img
            src={arrowimg}
            className="imgalert"
            style={{ top: "7vh", right: "15vw" }}
            alt=""
          />
          <p className="tipalert" style={{ top: "20vh", left: "20vw" }}>
            在这里查看你点亮的愿望哦~
          </p>
          <img
            src={arrowimg}
            className="imgalert"
            style={{ top: "27vh", left: "25vw", transform: "rotate(150deg)" }}
            alt=""
          />
          <p className="tipalert" style={{ top: "70vh", left: "30vw" }}>
            在这里帮TA实现心愿
          </p>
          <img
            src={arrowimg}
            className="imgalert"
            style={{ top: "75vh", left: "40vw", transform: "rotate(120deg)" }}
            alt=""
          />
        </div>
      );
    } else {
      return (
        <div
          className="rule-container"
          style={{ display: isShow ? "flex" : "none" }}
        >
          <div
            className="rule-alert"
            style={{ display: isShow ? "flex" : "none" }}
          >
            <div className="rule-text">
              1.这次活动男生女生都可以许愿哦~<p>你一共有5次许愿的机会</p>
              ，快来遇见你的小幸运吧~
              <br />
              2.将你的愿望打上标签，它会被投入相应的愿望池中，听说这样愿望更容易被兴趣相似的人发现哦~
              <br />
              3.选择不同的愿望分区进入，更容易找到直击你心灵的愿望哦~
              <br />
              4.<p>你有7次点亮心愿的机会</p>
              ,可以通过点亮愿望池中随机出现的心愿，帮助TA实现这份小幸运~
              <br />
              5.点亮TA人心愿后可查看到TA的联系方式，便于帮助TA实现心愿~同时也也留下你的联系方式，方便TA联系你~
              <br />
              6.<p>一个愿望只有一次实现机会~</p>
              被点亮后将暂时不会出现在首页愿望池，被实现后将不会再出现在愿望池。
              <br />
              7.确认点亮他人愿望后，被你点亮的许愿人将能看到你的姓名等基本信息。
              <br />
              8.<p>一次只能同时点亮2个愿望</p>
              ，如果点亮了无法实现记得及时放弃实现。由对方确认实现了愿望才能接着点亮下一个哦。
            </div>
            <ButtonS
              onClick={handleShow}
              style={{
                background: "#FF7A59",
                color: "#FFFFFF",
                width: "6em",
                marginTop: "1em",
              }}
            >
              我知道了
            </ButtonS>
          </div>
        </div>
      );
    }
  };

  let title = getTitle();

  return (
    <div className="header">
      <div className="comp-header">
        <img
          className="back-button" //回退按钮
          src={backbutton}
          style={{ opacity: title === "标签页" ? 0 : 1 }}
          onClick={title === "标签页" ? undefined : handleBack}
          alt=""
        />
        <p className="comp-header-text">{title}</p>
        <img
          className="rule-button"
          src={rulebutton}
          onClick={handleShow}
          alt=""
        />
        <img className="logo" src={logo} alt="" />
        {getAlert()}
        <div
          className="cover"
          style={{ display: isShow ? "block" : "none" }}
        ></div>
      </div>
    </div>
  );
}

export default Header;
