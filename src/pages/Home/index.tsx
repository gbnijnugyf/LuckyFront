import { useEffect, useState } from "react";
import { ITagsObject } from "../../config/Global";
import { ButtonS } from "../../components/Button";
import { tags } from "../../config/Global";
import { Service } from "../../common/service";
import { useNavigate } from "react-router-dom";
import { fixRectShape, ResStatus } from "../../common/global";
import { useDispatch, useSelector } from "react-redux";
import { TipAction } from "../../stores/TipStore";
import "./index.scss";
import Mask from "../../components/Mask";
import { ReactComponent as Arrow } from "../../static/images/arrowRight.svg";

const Tips = () => {
  const [rects, setRects] = useState<
    Array<{ width: number; height: number; left: number; top: number }>
  >([]);
  const [arrows, setArrows] = useState<
    Array<{ left: number; top: number; transform?: string }>
  >([]);
  const [texts, setTexts] = useState<
    Array<{
      left?: number;
      top?: number;
      right?: number;
      bottom?: number;
      content: string;
    }>
  >([]);

  const dispatch = useDispatch();
  const showRule = useSelector<boolean, boolean>((state) => state);
  const [showLocal, setShowLocal] = useState(showRule);

  useEffect(() => {
    const [Rrule, Rtag, Rbutton] = [
      document.getElementsByClassName("rule")[0].getBoundingClientRect(),
      document.getElementsByClassName("tag")[0].getBoundingClientRect(),
      document.getElementById("btnHome")!.getBoundingClientRect(),
    ].map((rect) => {
      const { left, width, top, height } = rect;
      return { left, width, top, height };
    });
    fixRectShape(Rrule, { x: 20, y: 10 });
    fixRectShape(Rtag, { x: -20, y: 10 });
    fixRectShape(Rbutton, { x: 10, y: 10 });
    setRects([Rrule, Rtag, Rbutton]);
    setShowLocal(showRule);
  }, [showRule]);
  useEffect(() => {
    if (rects.length < 3) return;
    const [Rrule, Rtag, Rbutton] = rects;
    const rulearrow = {
      left: Rrule.left - 50,
      top: Rrule.top + Rrule.height / 2 - 10,
    };
    const tagArrow = {
      left: Rtag.left + Rtag.width / 2 - 25,
      top: Rtag.top - 50,
      transform: "rotate(90deg)",
    };
    const buttonArrow = {
      left: Rbutton.left + Rbutton.width / 2 - 25,
      top: Rbutton.top - 50,
      transform: "rotate(90deg)",
    };
    setArrows([rulearrow, tagArrow, buttonArrow]);
  }, [rects]);
  useEffect(() => {
    if (arrows.length < 3) return;
    const [rulearrow, tagArrow, buttonArrow] = arrows;
    const tagText = {
      left: tagArrow.left - 60,
      bottom: window.innerHeight - tagArrow.top + 40,
      content: "选择要查看的愿望类型",
    };
    const ruleText = {
      right: window.innerWidth - rulearrow.left + 15,
      left: 10,
      top: rulearrow.top - 20,
      content: "在这里查看详细规则",
    };
    const buttonText = {
      left: buttonArrow.left - 60,
      bottom: window.innerHeight - buttonArrow.top + 40,
      content: "在这里许下愿望",
    };
    setTexts([tagText, ruleText, buttonText]);
  }, [arrows]);

  return (
    <div
      className="rule-alert-2"
      onClick={() => dispatch({ type: TipAction.HIDE })}
      style={{ display: showLocal ? "block" : "none" }}
    >
      <div className="rule-content">
        <Mask rects={rects}></Mask>
        {arrows.map((arrow) => (
          <Arrow style={arrow}></Arrow>
        ))}
        {texts.map((text) => (
          <div
            style={{
              ...text,
              fontSize: "1.5rem",
              fontFamily: "Tensentype-MaiHeiJ",
              fontWeight: 500,
              color: "#FFFFFF",
            }}
          >
            {text.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    Service.checkUserEmail().then((res) => {
      if (res.status === ResStatus.Error) {
        navigate("/login/bindemail");
      }
    });
  }, [navigate]);

  const goWishes = (tag: ITagsObject) => {
    navigate(`/wishpool/wish/${tag.enName}`, {
      state: { category: tag.category },
    });
  };

  const goSend = () => {
    navigate("/tagscreen/fillwish");
  };

  return (
    <div className="panel-home">
      <ButtonS id="btnSeeMyWish" onClick={() => navigate("/detail/list")}>
        查看我的愿望与点亮
      </ButtonS>
      <div className="tags">
        {tags.map((tag) => (
          <div onClick={() => goWishes(tag)} className="tag" key={tag.category}>
            {tag.name}
          </div>
        ))}
      </div>
      <ButtonS onClick={goSend} id="btnHome">
        投递我的小幸运
      </ButtonS>
      <Tips />
    </div>
  );
}
