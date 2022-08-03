import { useEffect, useState } from "react";
import { ButtonS } from "../../components/Button";
import ConfirmPanel from "../../components/ConfirmPanel";
import Service from "../../common/service";
import forwardimg from "../../static/images/forward.svg";
import "./index.scss";
import { formatTime } from "../../common/global";
import { useLocation, useNavigate } from "react-router-dom";

const WishDetail = (props) => {
  // console.log(props)
  // const [needForward, setNeedForward] = useState(true);

  const {
    changeShowConfirm,
    changeConfirmContent,
    // changeBtnText,
    changeConfirmAction,
  } = props.onChange;
  const { isMine, wish } = props;

  //bad use
  const getForward = () => {
    if (wish.state === 0 && isMine) { //false
      return (
        <img
          src={forwardimg}
          onClick={showForward}
          className="forward"
          alt=""
        />
      );
    }
  };
  const showForward = () => {
    changeConfirmContent(
      <>
        <p>快去复制以下链接</p>
        <p>将你的愿望分享出去吧~</p>
        <p
          style={{
            width: "80%",
            wordBreak: "break-all",
          }}
        >
          {window.location.href}
        </p>
      </>
    );
    changeConfirmAction(
      () => {
        changeShowConfirm(false);
      },
      () => {
        changeShowConfirm(false);
      }
    );
    changeShowConfirm(true);
  };

  return (
    <div className="content">
      {getForward()}
      <div className="text">
        <div className="text-content">{props.wish.wish}</div>
      </div>
      <div className="wishInfo">
        <p>来自 {props.wish.wishman_name}</p>
        <p>{formatTime(props.wish.creat_at)}</p>
      </div>
    </div>
  );
};

const PersonMsg = (props) => {
  const { isMine, wish } = props;
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [QQ, setQQ] = useState("");
  const [wechat, setWechat] = useState("");
  const [tel, setTel] = useState("");
  useEffect(() => {
    if (isMine) {
      Service.getLightManInfo(wish.wish_id).then((res) => {
        setName(res.data.light_name);
        setTime("于" + formatTime(wish.light_at) + "点亮");
        setQQ(res.data.light_qq);
        setWechat(res.data.light_wechat);
        setTel(res.data.light_tel);
      });
    } else {
      setName(wish.wishman_name);
      setTime("于" + formatTime(wish.creat_at) + "许愿");
      setQQ(wish.wishman_qq);
      setWechat(wish.wishman_wechat);
      setTel(wish.wishman_tel);
    }
  }, [isMine, wish]);

  return (
    <div className="msg">
      <div className="msg-text">
        <p className="h">{isMine ? "点亮人" : "许愿人"}</p>
        <p className="name">{name}</p>
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
    </div>
  );
};

// 别人的愿望，我已经点亮/实现
const OtherLighted = (props) => {
  const {
    goOtherPage,
    changeShowConfirm,
    changeConfirmContent,
    changeBtnText,
    changeConfirmAction,
  } = props.onChange;

  let currentIndex = "wuchu";
  let otherMsg = "";

  const msgs = {
    wuchu: "刚刚误触了点亮按钮，不好意思啦~",
    mang: "最近有点忙，短时间没有精力实现愿望了，抱歉",
  };

  const achieved = props.wish.state === 2;

  // 点击已经实现愿望
  const pressAchieve = () => {
    changeConfirmAction(
      () => {
        changeShowConfirm(false);
        Service.achieveWish(props.wish.wish_id);
        goOtherPage("/detail/index");
      },
      () => {
        changeShowConfirm(false);
      }
    );
    changeConfirmContent(
      <>
        <p style={{ alignSelf: "flex-start" }}>确认已经实现这个愿望了嘛？</p>
        <p style={{ alignSelf: "flex-start", textAlign: "start" }}>
          若确认，我们将发邮件提醒TA来确认你已经实现了TA的愿望
        </p>
      </>
    );
    changeShowConfirm(true);
  };
  // 点击放弃愿望
  const pressAbandon = () => {
    changeConfirmAction(pressReallyAbandon, () => {
      changeShowConfirm(false);
    });
    changeConfirmContent(<p>确认放弃这个愿望吗？</p>);
    changeShowConfirm(true);
  };

  const handleRadioChange = (e) => {
    currentIndex = e.target.value;
  };

  // 点击确定放弃
  const pressReallyAbandon = () => {
    changeConfirmAction(
      () => {
        changeShowConfirm(false);
        changeBtnText("", "");
        let message = currentIndex === "other" ? otherMsg : msgs[currentIndex];
        Service.giveUpLightWish(props.wish.wish_id, message).then(() => {
          goOtherPage("/detail/index");
        });
      },
      () => {
        changeShowConfirm(false);
        changeBtnText("", "");
        Service.giveUpLightWish(props.wish.wish_id).then(() => {
          goOtherPage("/detail/index");
        });
      }
    );
    changeConfirmContent(
      <form className="msg-borad">
        <p>
          你想要放弃这个愿望，
          <br />
          建议给对方留言说明原因哦：
        </p>
        <div className="options">
          <div>
            <input
              type="radio"
              name="msg"
              value="wuchu"
              defaultChecked={true}
              onChange={handleRadioChange}
            />
          </div>
          <p>刚刚误触了点亮按钮，不好意思啦~</p>
        </div>
        <div className="options">
          <div>
            {" "}
            <input
              type="radio"
              name="msg"
              value="mang"
              onChange={handleRadioChange}
            />
          </div>
          <p>最近有点忙，短时间没有精力实现愿望了，抱歉</p>
        </div>
        <div className="options">
          <div>
            <input
              type="radio"
              name="msg"
              value="other"
              onChange={handleRadioChange}
            />
          </div>
          <div>
            <p>留言给对方：</p>
            <input
              type="text"
              placeholder="输入其他原因"
              className="reason"
              onChange={(e) => {
                otherMsg = e.target.value;
              }}
              defaultValue={otherMsg}
            />
          </div>
        </div>
      </form>
    );
    changeBtnText("发送", "不留言");
  };

  return (
    <>
      <div className="panel-button">
        <ButtonS
          onClick={achieved ? null : pressAbandon}
          style={{ background: "#FFFFFF", color: "#F25125", width: "6em" }}
        >
          放弃实现
        </ButtonS>
        <ButtonS
          onClick={achieved ? null : pressAchieve}
          style={{
            background: achieved ? "#C0C0C0" : "#FF7A59",
            color: "#FFFFFF",
            width: "6em",
            marginLeft: "2em",
          }}
        >
          {achieved ? "已经实现" : "确认实现"}
        </ButtonS>
      </div>
      <hr />
      <PersonMsg wish={props.wish} isMine={false} />
    </>
  );
};
// 别人的愿望，没人实现
const OtherNotLighted = (props) => {
  const {
    goOtherPage,
    changeShowConfirm,
    changeConfirmContent,
    changeBtnText,
    changeConfirmAction,
  } = props.onChange;
  let name = "";
  let number = "";
  let tel = "";
  const [option, setOption] = useState("QQ");

  const handleName = (e) => {
    name = e.target.value;
  };
  const handleNumber = (e) => {
    number = e.target.value;
  };
  const handleTel = (e) => {
    tel = e.target.value;
  };
  const handleOption = (e) => {
    setOption(e.target.value);
  };

  const pressLight = () => {
    changeConfirmContent(
      <p style={{ fontSize: "medium" }}>确认要帮TA实现这个愿望吗？</p>
    );
    changeConfirmAction(ReallyLight, () => {
      changeShowConfirm(false);
    });
    changeShowConfirm(true);
  };

  const ReallyLight = () => {
    changeConfirmContent(
      <div className="input-msg">
        <p className="info">填写联系方式，方便他来联系你哦～</p>
        <div className="form">
          <div className="name">
            投递人 :
            <input
              type="text"
              className="name"
              placeholder="必填内容哦～"
              onChange={handleName}
              defaultValue={name}
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
              placeholder="必填内容哦～"
              onChange={handleNumber}
              defaultValue={number}
              style={{ marginLeft: ".3em", width: "30%" }}
            />
          </div>
          <div className="tel">
            或 Tel :
            <input
              type="text"
              placeholder="选填内容哦～"
              onChange={handleTel}
              defaultValue={tel}
            />
          </div>
        </div>
      </div>
    );
    changeBtnText("发送");
    changeConfirmAction(
      () => {
        let id = props.wish.wish_id;
        let [qq, wechat] = option === "QQ" ? [number, ""] : ["", number];
        Service.lightWishOn(id, name, tel, qq, wechat).then((res) => {
          // console.log("已返回")
          // console.log(res)
          if (res.data.status === 0) {
            alert("点亮成功~");
            goOtherPage("/detail/index");
          } else {
            // console.log("点亮失败")
            alert(res.data.msg);
          }
        });
        changeShowConfirm(false);
      },
      () => {
        changeShowConfirm(false);
      }
    );
  };

  return (
    <ButtonS
      onClick={pressLight}
      style={{ background: "#FFFFFF", color: "#F25125", width: "6em" }}
    >
      点亮这个心愿
    </ButtonS>
  );
};
// 我的愿望，没人实现
const MineNotLighted = (props) => {
  const {
    goOtherPage,
    changeShowConfirm,
    changeConfirmContent,
    changeConfirmAction,
  } = props.onChange;

  const pressDelete = () => {
    changeConfirmContent(
      <p style={{ fontSize: "medium" }}>确认删除这个愿望吗？</p>
    );
    changeConfirmAction(
      () => {
        Service.deleteWish(props.wish.wish_id).then(() => {
          alert("删除成功");
          goOtherPage("/detail/index");
        });
        changeShowConfirm(false);
      },
      () => {
        changeShowConfirm(false);
      }
    );
    changeShowConfirm(true);
  };

  return (
    <ButtonS
      onClick={pressDelete}
      style={{ background: "#FFFFFF", color: "#F25125", width: "6em" }}
    >
      删除这个心愿
    </ButtonS>
  );
};

const MineLighted = (props) => {
  const {
    goOtherPage,
    changeShowConfirm,
    changeConfirmContent,
    // changeBtnText,
    changeConfirmAction,
  } = props.onChange;
  const wish = props.wish;
  let achieved = wish.state === 2;

  const pressDelete = () => {
    changeConfirmContent(
      <p style={{ fontSize: "medium" }}>确认删除这个愿望吗？</p>
    );
    changeConfirmAction(
      () => {
        Service.deleteWish(props.wish.wish_id).then(() => {
          alert("删除成功");
          goOtherPage("/detail/index");
        });
        changeShowConfirm(false);
      },
      () => {
        changeShowConfirm(false);
      }
    );
    changeShowConfirm(true);
  };
  const pressAchieve = () => {
    changeConfirmAction(
      () => {
        changeShowConfirm(false);
        Service.achieveWish(props.wish.wish_id).then(() => {
          goOtherPage("/detail/index");
        });
      },
      () => {
        changeShowConfirm(false);
      }
    );
    changeConfirmContent(
      <p style={{ alignSelf: "flex-start" }}>确认愿望已经实现了吗？</p>
    );
    changeShowConfirm(true);
  };

  return (
    <>
      <div className="panel-button">
        <ButtonS
          onClick={achieved ? null : pressDelete}
          style={{ background: "#FFFFFF", color: "#F25125", width: "6em" }}
        >
          删除这个心愿
        </ButtonS>
        <ButtonS
          onClick={achieved ? null : pressAchieve}
          style={{
            background: achieved ? "#C0C0C0" : "#FF7A59",
            color: "#FFFFFF",
            width: "6em",
            marginLeft: "2em",
          }}
        >
          {achieved ? "已经实现" : "确认实现"}
        </ButtonS>
      </div>
      <hr />
      <PersonMsg wish={wish} isMine={true} />
    </>
  );
};

export default function Detail(props) {
  // console.log(props)
  const navigate = useNavigate();
  let location = useLocation();
  const [showConfirm, setShowConfirm] = useState(false); // 设置遮罩状态
  const [confirmContent, setConfirmContent] = useState(""); // 设置弹窗内容
  const [btnText, setBtnText] = useState({}); // 设置按钮文本
  const [confirmAction, setConfirmAction] = useState({}); // 设置按钮触发
  const [wish, setWish] = useState({}); // 愿望内容
  const [isMine, setIsMine] = useState(false); // 是不是自己的愿望

  const goOtherPage = (path) => {
    navigate(path)
    //  // props.history.push(path)
  };

  const changeShowConfirm = (confirm) => {
    setShowConfirm(confirm);
  };

  const changeConfirmContent = (content) => {
    setConfirmContent(content);
  };

  const changeBtnText = (yes, no) => {
    setBtnText({
      yes: yes ? yes : btnText.yes,
      no: no ? no : btnText.no,
    });
  };

  const changeConfirmAction = (yes, no) => {
    setConfirmAction({
      yes: yes ? yes : confirmAction.yes,
      no: no ? no : confirmAction.no,
    });
  };

  useEffect(() => {
    let id = location.pathname.split("/").pop();
    id = parseInt(id);
    // console.log(id)
    Service.getWishDetail(id).then((res) => {
      setWish(res.data.data);
      Service.getUserWishPost().then((res) => {
        // console.log(res.data.data.wishes)
        // console.log(id)
        res.data.data.wishes.forEach((wish) => {
          if (wish.wish_id === id) {
            setIsMine(true)
          }
        })
      });
    });
  }, [location.pathname]);

  const onChange = {
    changeShowConfirm: changeShowConfirm,
    changeConfirmContent: changeConfirmContent,
    changeBtnText: changeBtnText,
    changeConfirmAction: changeConfirmAction,
    goOtherPage: goOtherPage,
  };
  return (
    <div className="Detail">
      <WishDetail
        wish={wish}
        isMine={isMine}
        onChange={onChange}
        pathname={location.pathname}
      />
      <div className="other">
        {
          [
            [
              <OtherNotLighted wish={wish} onChange={onChange} />, // 别人的愿望，我未点亮
              <OtherLighted wish={wish} onChange={onChange} />, // 别人的愿望，我已点亮
              <OtherLighted wish={wish} onChange={onChange} />, // 别人的愿望，我已实现
            ],
            [
              <MineNotLighted wish={wish} onChange={onChange} />, // 我的愿望，无人点亮
              <MineLighted wish={wish} onChange={onChange} />, // 我的愿望，有人点亮
              <MineLighted wish={wish} onChange={onChange} />, // 我的愿望，已经实现
            ],
          ][isMine ? 1 : 0][wish.state]
        }
      </div>
      <ConfirmPanel
        display={showConfirm}
        action={confirmAction}
        btnText={btnText}
      >
        {confirmContent}
      </ConfirmPanel>
    </div>
  );
}
