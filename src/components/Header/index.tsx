import { useEffect, useState } from "react";
import "./index.scss";
import rulebutton from "../../static/images/rulebutton.png";
import logo from "../../static/images/logo.png";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TipAction } from "../../stores/TipStore";

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
    </div>
  );
}

export default Header;
