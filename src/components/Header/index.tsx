import { useEffect, useState } from "react";
import "./index.scss";
import rulebutton from "../../static/images/rulebutton.png";
import logo from "../../static/images/logo.png";
import arrowRight from "../../static/images/arrowRight.png";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TipAction } from "../../stores/TipStore";

function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const showRule = useSelector<boolean>((state) => state);
  const [key, setKey] = useState("");


  const handleShow = () => {};

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

  const Alert = () => {
    switch (key) {
      case "tagscreen": {
        return (
          <div
            className="rule-alert-2"
            onClick={handleShow}
            style={{ display: showRule ? "block" : "none" }}
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
      }
    }
    return <> </>;
  };

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

        <Alert />
      </div>
    </div>
  );
}

export default Header;
