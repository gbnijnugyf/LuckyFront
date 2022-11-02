import React, { useState, useEffect, ChangeEvent } from "react";
import ConfirmPanel from "../../components/ConfirmPanel";
import { ButtonS } from "../../components/Button";
import "./index.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { fixRectShape, IWishInfoName, WishState } from "../../common/global";
import { Service } from "../../common/service";
import { useDispatch, useSelector } from "react-redux";
import { TipAction } from "../../stores/TipStore";
import Mask from "../../components/Mask";
import { ReactComponent as Arrow } from "../../static/images/arrowRight.svg";

const FALSE_0: number = 0;

export interface IWishesObject {
  wish: string;
  school: number;
  wishman_name: string;
  wish_id?: string;
}

export interface IWishItemProps {
  className: string;
  wish: IWishInfoName;
  onTouchStart?: React.TouchEventHandler<HTMLDivElement>;
  onTouchMove?: React.TouchEventHandler<HTMLDivElement>;
  onTouchEnd?: React.TouchEventHandler<HTMLDivElement>;
  setStyleID: number;
  style: React.CSSProperties;
}

const WishItem = (props: IWishItemProps) => {
  const { wish, onTouchStart, onTouchMove, onTouchEnd, style } = props;
  return (
    <div
      key={wish?.view_user.name}
      className="wish-item"
      style={style}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="content">
        <div className="contentText">
          <div className="content-word">{wish.view_desire.desire}</div>
          <div className="msg">
            <p>
              {wish.view_user.school.toString() === ""
                ? ""
                : wish.view_user.school.toString() === FALSE_0.toString()
                ? "华小师"
                : "武小理"}
            </p>{" "}
            <p>
              {wish.view_user.name.length > 0
                ? wish.view_user.name.charAt(0) + "同学"
                : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  const showRule = useSelector<boolean>((state) => state);

  useEffect(() => {
    const [Rrule, Rbtn1, Rbutton] = [
      document.getElementsByClassName("rule")[0].getBoundingClientRect(),
      document.getElementById("btnSeeMyWish")!.getBoundingClientRect(),
      document.getElementById("btnLight")!.getBoundingClientRect(),
    ].map((rect) => {
      const { left, width, top, height } = rect;
      return { left, width, top, height };
    });
    fixRectShape(Rrule, { x: 20, y: 10 });
    fixRectShape(Rbtn1, { x: -15, y: 5 });
    fixRectShape(Rbutton, { x: 10, y: 5 });
    setRects([Rrule, Rbtn1, Rbutton]);
  }, [showRule]);
  useEffect(() => {
    if (rects.length < 3) return;
    const [Rrule, Rbtn1, Rbutton] = rects;
    const rulearrow = {
      left: Rrule.left - 50,
      top: Rrule.top + Rrule.height / 2 - 10,
    };
    const btn1Arrow = {
      left: Rbtn1.left + Rbtn1.width / 2 - 25,
      top: Rbtn1.top + Rbtn1.height + 30,
      transform: "rotate(-90deg)",
    };
    const buttonArrow = {
      left: Rbutton.left + Rbutton.width / 2 - 25,
      top: Rbutton.top - 50,
      transform: "rotate(90deg)",
    };
    setArrows([rulearrow, btn1Arrow, buttonArrow]);
  }, [rects]);
  useEffect(() => {
    if (arrows.length < 3) return;
    const [rulearrow, btn1Arrow, buttonArrow] = arrows;
    const btn1Text = {
      left: btn1Arrow.left - 60,
      top: btn1Arrow.top + 50,
      content: "在这里查看详细规则",
    };
    const ruleText = {
      right: window.innerWidth - rulearrow.left + 15,
      left: 10,
      top: rulearrow.top - 20,
      content: "在这里查看你点亮的愿望哦~",
    };
    const buttonText = {
      left: buttonArrow.left - 60,
      bottom: window.innerHeight - buttonArrow.top + 40,
      content: "在这里帮她实现心愿",
    };
    setTexts([btn1Text, ruleText, buttonText]);
  }, [arrows]);

  return (
    <div
      className="rule-alert-2"
      onClick={() => dispatch({ type: TipAction.HIDE })}
      style={{ display: showRule ? "block" : "none" }}
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
export interface IStartX {
  start: any; //touch.pageX和e.targetTouches[0]不知道是啥类型，详见130，131
  move: string;
}

export default function Wishes() {
  const navigate = useNavigate();
  // 拿着这个分类去发请求
  let STARTINIT: IStartX = {
    start: "",
    move: "",
  };

  interface ILocationState<T> {
    category: T;
  }
  let WISH_INIT: IWishInfoName = {
    view_desire: {
      desire_id: "",
      desire: "",
      lighted_at: "",
      created_at: "",
      finished_at: "",
      state: WishState.初始化,
      type: 0,
      light_id: -1,
      user_id: -1,
    },
    view_user: {
      school: 0,
      name: "",
    },
  };
  let WISHES_INIT: IWishInfoName[] = [WISH_INIT, WISH_INIT, WISH_INIT];
  const category = (useLocation().state as ILocationState<string>).category;

  const [showTip, setShowTip] = useState(true);
  const moveState = { img1: 0, img2: 10, img3: 20 };
  const [move, setMove] = useState(moveState); // 树叶动画相关状态
  const topState = [1.5, 0, -1.5];
  const [top, setTop] = useState(topState); // 树叶动画相关状态
  const [startX, setStartX] = useState(STARTINIT); // 树叶动画相关状态
  const [update, setUpdate] = useState(false); // 控制动画以及愿望内容的更新
  const [display, setDisplay] = useState(false); // 弹出确认框
  const [light, setLight] = useState(false); //显示light点亮前panel
  const [lightBtn, setLightBtn] = useState(true); // 点亮按钮是否存在
  const [wishes, setWishes] = useState<Array<IWishInfoName>>(WISHES_INIT);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [tel, setTel] = useState("");
  const [option, setOption] = useState("QQ");
  const [geted, setGeted] = useState<boolean>(true);
  const refreshWishes = () => {
    Service.getWishByCategories(category).then((res) => {
      let wishes = res.data.data;

      if (res.data.data.length === 0) {
        setLightBtn(false);
        let wish: IWishInfoName = {
          view_desire: {
            desire_id: "",
            desire: "",
            lighted_at: "",
            created_at: "",
            finished_at: "",
            state: -1,
            type: 0,
            light_id: -1,
            user_id: -1,
          },
          view_user: {
            name: "",
            school: 0,
          },
        };
        wishes.push(wish);
      } else {
        wishes = res.data.data;
        setLightBtn(true);
      }
      while (wishes.length < 3) {
        wishes = wishes.concat(wishes);
      }
      setWishes(wishes);
    });
  };
  // 获取愿望
  useEffect(refreshWishes, [category, lightBtn]);

  useEffect(() => {
    setInterval(() => {
      setShowTip(false);
    }, 5000);
  }, []);

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
  };
  const handleTel = (e: ChangeEvent<HTMLInputElement>) => {
    setTel(e.target.value);
  };
  const handleOption = (e: ChangeEvent<HTMLSelectElement>) => {
    setOption(e.target.value);
  };

  // Start/Move/End 都是控制愿望刷新动画的相关函数
  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (event) => {
    //e:ChangeEvent<HTMLDivElement>替换为any，targeTouches类型未知
    const touch = event.targetTouches[0];
    setStartX({ start: touch.pageX, move: "" });
  };
  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    //e:ChangeEvent<HTMLDivElement>替换为any，targeTouches类型未知
    const touch = e.targetTouches[0];
    const move_X = (touch.pageX - startX.start) / 5;
    setStartX(startX);
    setMove({ img1: move_X, img2: 10, img3: 20 });
  };
  const onTouchEnd = () => {
    setUpdate(true);
    if (move.img1 < -25) {
      setMove({ img1: -90, img2: 0, img3: 10 });
      setTop([1.5, 1.5, 0]);
    } else if (move.img1 > 20) {
      setMove({ img1: 90, img2: 0, img3: 10 });
      setTop([1.5, 1.5, 0]);
    } else {
      setMove({ img1: 0, img2: 10, img3: 20 });
      setTop([1.5, 0, -1.5]);
      return;
    }
    // 刷新愿望
    setTimeout(() => {
      setUpdate(false);
      let newWishSource = wishes;
      if (!newWishSource) return;
      newWishSource.push(newWishSource[0]);
      newWishSource.splice(0, 1);
      setWishes(newWishSource);
      // 刷新动画
      setMove(moveState);
      setTop(topState);
    }, 200);
  };
  // 查看我的点亮
  const goMyWish = () => {
    navigate("/detail/list");
    // props.history.push('/mywish')
  };
  const lightWish = () => {
    if (name === "") alert("还没有填写姓名哦~");
    else if (number === "") alert("还没有填写联系方式哦~");
    //TODO:手机号应该为选填项
    else if (tel === "") alert("还没有填写手机号哦~");
    else {
      if (!wishes) return;
      if (wishes[0].view_desire.desire_id !== undefined) {
        let id = wishes[0].view_desire.desire_id;
        let [qq, wechat] = option === "QQ" ? [number, ""] : ["", number];
        Service.lightWish(id, name, tel, qq, wechat).then((res) => {
          if (res.status === 0) {
            alert("点亮成功~");
            refreshWishes();
          } else {
            alert(res.data.msg); //返回失败信息
          }
        });
        handleAlert();
      }
    }
  };
  // 处理遮罩
  const handleAlert = () => {
    setLight(false);
    setDisplay(false);
  };
  // 处理点亮愿望
  const handleLight = () => {
    setLight(true);
  };
  const showConfirm = async () => {
    await Service.getLightedWishInfo().then((res) => {
      if (res.data.data.length < 5) {
        setDisplay(true);
        return;
      } else {
        res.data.data.forEach((wish) => {
          if (wish.state === 2) {
            setDisplay(true);
          }
        });
        if (display) return;
        else alert("你有5个点亮还未实现哦~先完成一个吧");
      }
    });
  };

  const getUserPre = function () {
    if (!geted) return;

    //先获取用户已存在信息
    Service.getManInfo().then((res) => {
      let manInfo = res.data.data;
      if (manInfo.name !== "") {
        setName(manInfo.name);
      }
      if (manInfo.qq !== "") {
        //默认QQ为联系方式
        setNumber(manInfo.qq);
        setOption("QQ");
      } else if (manInfo.qq === "" && manInfo.wechat !== "") {
        //QQ为空，微信为联系方式
        setNumber(manInfo.wechat);
        setOption("微信");
      }
      setTel(manInfo.tel);
    });
    setGeted(false);
  };

  return (
    <div className="wishpage">
      <ConfirmPanel
        display={display}
        onShow={getUserPre}
        onChoose={(res) => {
          res ? (light ? lightWish() : handleLight()) : handleAlert();
        }}
      >
        {light ? (
          <>
            <p className="info">填写联系方式，方便他来联系你哦～</p>

            <div className="input-msg">
              <div className="form">
                <div className="name">
                  点亮人 :
                  <input
                    type="text"
                    placeholder="必填内容哦～"
                    onChange={handleName}
                    defaultValue={name}
                    style={{ marginLeft: "2em" }}
                  />
                </div>
                <div className="number">
                  联系方式 :
                  <select
                    onChange={handleOption}
                    style={{ color: "rgb(239, 96, 63)" }}
                  >
                    <option value="QQ">QQ</option>
                    <option value="WeChat">微信</option>
                  </select>
                  <input
                    type="text"
                    placeholder="必填内容"
                    onChange={handleNumber}
                    defaultValue={number}
                    style={{ marginLeft: ".3em", width: "32%" }}
                  />
                </div>
                <div className="tel">
                  或 Tel :
                  <input
                    type="text"
                    placeholder="必填内容"
                    onChange={handleTel}
                    defaultValue={tel}
                    style={{ marginLeft: "2.3em" }}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <p style={{ fontSize: "medium" }}>确认要帮TA实现这个愿望吗</p>
        )}
      </ConfirmPanel>

      <ButtonS id="btnSeeMyWish" onClick={goMyWish}>
        查看我的愿望与点亮
      </ButtonS>
      <div className="wishes">
        {/* TODO：愿望前后页斜着错开堆叠 */}
        <WishItem
          className="wish-img1"
          wish={wishes[0]}
          setStyleID={0}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            marginTop: `${top[0]}em`,
            left: `${move.img1}vw`,
            transition: update ? "all 0.5s ease-out" : "none",
            zIndex: 101,
          }}
        />
        <WishItem
          className="wish-img2"
          wish={wishes[1]}
          setStyleID={1}
          style={{
            marginTop: `${top[1]}em`,
            left: `${move.img2}vw`,
            transition: update ? "all 0.2s" : "none",
            zIndex: 100,
          }}
        />
        <WishItem
          className="wish-img3"
          wish={wishes[2]}
          setStyleID={2}
          style={{
            marginTop: `${top[2]}em`,
            left: `${move.img3}vw`,
            transition: update ? "all 0.2s" : "none",
            zIndex: 99,
          }}
        />
        <WishItem
          className="img1 wish-img"
          wish={wishes[2]}
          setStyleID={2}
          style={{
            marginTop: `-1.5em`,
            left: `20vw`,
            zIndex: 98,
          }}
        />
      </div>
      <ButtonS
        id="sideAlert"
        style={{
          display: showTip ? "absolute" : "none",
        }}
      >
        左右滑查看更多许愿哦~
      </ButtonS>
      <ButtonS
        id="btnLight"
        onClick={showConfirm}
        style={{
          display: lightBtn ? "relative" : "none",
        }}
      >
        点亮TA的小幸运
      </ButtonS>
      <Tips />
    </div>
  );
}
