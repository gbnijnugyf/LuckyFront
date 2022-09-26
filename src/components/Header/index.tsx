import { useEffect, useState } from "react";
import { ButtonS } from "../../components/Button";
import "./index.scss";
import rulebutton from "../../static/images/rulebutton.png";
import logo from "../../static/images/logo.png";
import arrowRight from "../../static/images/arrowRight.png";
import { useLocation } from "react-router-dom";

function Header() {

  const location = useLocation();
  // const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const [key, setKey] = useState("");

  const handleShow = () => {
    setIsShow(!isShow);
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
    if (key === "tagscreen") {
      return (
        <div
          className="rule-alert-2"
          onClick={handleShow}
          style={{ display: isShow ? "block" : "none" }}
        >

          {/* TODO：规则灰色遮罩 */}
          <div className="rule-content">
            <div className="toRuleBtn">
              在这里查看详细规则&nbsp;&nbsp;
              <img className="arrowRight" src={arrowRight} alt="arrow" />
              <div className="lightArea"></div>
            </div>
            <div className="toTag"></div>
            <div className="toTagText">safasdfsda</div>
            <div>fasdadf</div>
            <div>fsda</div>
          </div>
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
            <div className="rule-text" >
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
              id="btnRuleShow"
              onClick={handleShow}
            >
              我知道了
            </ButtonS>
          </div>
        </div>
      );
    }
  };

  // let title = getTitle();

  return (
    <div className="header">
      <div className="comp-header">
        <div className="rule-button"
          style={{ display: location.pathname.match(/login/) ? "none" : "flex" }}
          onClick={handleShow}>
          {/* TODO：图片下附“规则”二字 */}
          <img src={rulebutton} alt="rulebutton" />
        </div>
        {/* TODO：logo居中问题 */}
        <img className="logo" src={logo} alt="logo" />
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
