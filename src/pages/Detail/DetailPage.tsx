import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IBtnStateObject } from ".";
import { IWishInfo, Service } from "../../common/service";
import { ButtonS } from "../../components/Button";
import ConfirmPanel from "../../components/ConfirmPanel";
import PersonMsg from "./PersonMsg";

interface IDetailPageProps {
  wish: IWishInfo;
  detailChange: (props: string) => void;
  isMine: boolean;
}
export const BTNTEXT_INIT: IBtnStateObject<string> = { yes: "", no: "" };

export const ACTION_INIT = () => {};
//Detail核心显示部分

export default function DetailPage(props: IDetailPageProps) {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false); // 设置遮罩状态
  const [confirmContent, setConfirmContent] = useState<ReactElement>(); // 设置弹窗内容
  const [btnText, setBtnText] = useState(BTNTEXT_INIT);
  const [confirmAction, setConfirmAction] = useState<(res: boolean) => void>(
    () => ACTION_INIT
  );
  const achieved = props.wish.state === 2;
  // const [currentIndex, setCurrentIndex] = useState("wuchu");
  let currentIndex = "wuchu";
  const goOtherPage = (path: string) => {
    navigate(path);
  };
  type IMsgs = {
    [key: string]: string;
  };
  const msgs: IMsgs = {
    wuchu: "刚刚误触了点亮按钮，不好意思啦~",
    mang: "最近有点忙，短时间没有精力实现愿望了，抱歉",
    other: "", //占位
  };

  interface IGetUserPre {
    name: string;
    number: {
      qq: string;
      wechat: string;
    };
    tel: string;
    option?: string;
  }
  //用户填写前获取用户信息
  const getUserPre = async () => {
    //先获取用户已存在信息
    let resAll: IGetUserPre = {
      name: "",
      number: {
        qq: "",
        wechat: "",
      },
      tel: "",
    };
    await Service.getManInfo("-1").then((res) => {
      let manInfo = res.data.data;
      if (manInfo.name !== "") {
        resAll.name = manInfo.name;
      }
      //联系方式(qq\wechat)
      if (manInfo.qq !== "") {
        //默认QQ为联系方式
        resAll.number.qq = manInfo.qq;
      } else if (manInfo.qq === "" && manInfo.wechat !== "") {
        //QQ为空，微信为联系方式
        resAll.number.wechat = manInfo.wechat;
      }
      //tel
      if (manInfo.tel !== "") {
        resAll.tel = manInfo.tel;
      }
    });

    return resAll;
  };

  //弹窗抽象, 调用弹出弹窗
  function handlePopWindows(props: {
    yesHandle?: () => void;
    noHandle?: () => void;
    content?: ReactElement;
    btnText1?: string;
    btnText2?: string;
  }) {
    const {
      yesHandle = () => {
        console.log("试图跳转");
        goOtherPage("/detail/index");
      },
      noHandle = () => {
        console.log("试图关闭弹窗");
        setShowConfirm(false);
      },
      content = <>获取文本失败</>,
      btnText1 = "",
      btnText2 = "",
    } = props;

    setShowConfirm(true);
    setConfirmAction(() => (res: boolean) => {
      if (res) yesHandle();
      else noHandle();
    });
    setConfirmContent(content);
    setBtnText({ yes: btnText1, no: btnText2 });
  }

  // 别人的愿望，没人实现 ———— 点击确定点亮
  async function PressReallyLight() {
    let Info = {
      name: "",
      option: "",
      number: "",
      tel: "",
    };
    //此处调用获取用户信息方法
    const a = await getUserPre();
    if (a.number.qq !== "") {
      Info.option = "QQ";
      Info.number = a.number.qq;
    } else {
      Info.option = "微信";
      Info.number = a.number.wechat;
    }
    Info.name = a.name;
    Info.tel = a.tel;
    handlePopWindows({
      yesHandle: () => {
        let id = props.wish.desire_id;
        let [qq, wechat] =
          Info.option === "QQ" ? [Info.number, ""] : ["", Info.number];

        Service.lightWish(id, Info.name, Info.tel, qq, wechat).then((res) => {
          if (res.data.status === 0) {
            alert("点亮成功~");
            goOtherPage("/detail/index");
          } else {
            alert(res.data.msg);
          }
        });
        setShowConfirm(false);
      },
      content: (
        <div className="input-msg">
          <p className="info">填写联系方式，方便他来联系你哦～</p>
          <div className="form">
            <div className="name">
              投递人 :
              <input
                type="text"
                placeholder="必填内容"
                onChange={(e) => (Info.name = e.target.value)}
                defaultValue={Info.name}
                style={{ marginLeft: ".3em", width: "60%" }}
              />
            </div>
            <div className="number">
              联系方式 :
              <select style={{ color: "rgb(239, 96, 63)" }}>
                <option value="QQ">QQ</option>
                <option value="WeChat">微信</option>
              </select>
              <input
                type="text"
                placeholder="必填内容"
                onChange={(e) => (Info.number = e.target.value)}
                defaultValue={Info.number}
                style={{ marginLeft: ".3em", width: "90%" }}
              />
            </div>
            <div className="tel">
              或 Tel :
              <input
                type="text"
                placeholder="必填内容"
                onChange={(e) => (Info.tel = e.target.value)}
                defaultValue={Info.tel}
                style={{ marginLeft: ".3em", width: "90%" }}
              />
            </div>
          </div>
        </div>
      ),
      noHandle: () => {
        console.log("试图关闭弹窗1");
        setShowConfirm(false);
      },
      btnText1: "发送",
      btnText2: "取消",
    });
  }
  // 别人的愿望，我已经点亮/实现 ———— 点击确定放弃
  function pressReallyAbandon() {
    function ReasonInput(
      type: string,
      name: string,
      value: string,
      reason: string,
      defaultChecked?: boolean
    ): ReactElement {
      let tagdoc = value === "mang" ? " " : null;

      return (
        <div className="options">
          <div>
            {tagdoc}
            <input
              type={type}
              name={name}
              value={value}
              defaultChecked={defaultChecked ? defaultChecked : false}
              onChange={(e) => {
                currentIndex = e.target.value;
              }}
            />
          </div>
          {value !== "other" ? (
            <p>{reason}</p>
          ) : (
            <div>
              <p>留言给对方：</p>
              <input
                type="text"
                onChange={(e) => (msgs[currentIndex] = e.target.value)}
                defaultValue={msgs["other"]}
                style={{ marginLeft: ".3em", width: "32%" }}
              />
            </div>
          )}
        </div>
      );
    }

    handlePopWindows({
      yesHandle: () => {
        setShowConfirm(false);
        setBtnText({ yes: "", no: "" });
        let message = currentIndex === "other" ? msgs["other"] : msgs["wuchu"];
        Service.giveUpLightWish(props.wish.desire_id, message).then(() => {
          goOtherPage("/detail/index");
        });
      },
      content: (
        <>
          <form className="msg-borad">
            <p>
              你想要放弃这个愿望，
              <br />
              建议给对方留言说明原因哦：
            </p>
            {ReasonInput("radio", "msg", "wuchu", msgs["wuchu"], true)}
            {ReasonInput("radio", "msg", "mang", msgs["mang"])}
            {ReasonInput("radio", "msg", "other", msgs["other"])}
          </form>
        </>
      ),
      noHandle: () => {
        console.log("试图关闭弹窗2");
        setShowConfirm(false);
        setBtnText({ yes: "", no: "" });
        Service.giveUpLightWish(props.wish.desire_id).then(() => {
          goOtherPage("/detail/index");
        });
      },
      btnText1: "发送",
      btnText2: "不留言",
    });
  }

  // 别人的愿望，我已经点亮/实现 ———— 点击实现愿望
  // 我的愿望，有人点亮 ———— 点击实现
  function pressAchieve() {
    handlePopWindows({
      yesHandle: () => {
        setShowConfirm(false);
        Service.achieveWish(props.wish.desire_id);
        goOtherPage("/detail/index");
      },
      content: (
        <>
          <p style={{ alignSelf: "flex-start" }}>确认已经实现这个愿望了吗？</p>
          {props.isMine ? null : (
            <p style={{ alignSelf: "flex-start", textAlign: "start" }}>
              若确认，我们将发邮件提醒TA来确认你已经实现了TA的愿望
            </p>
          )}
        </>
      ),
    });
  }

  // 别人的愿望，我已经点亮/实现 ———— 点击放弃愿望
  function pressAbandon() {
    handlePopWindows({
      yesHandle: pressReallyAbandon,
      content: <p>确认放弃这个愿望吗？</p>,
    });
  }

  // 别人的愿望，没人实现 ———— 点击点亮
  function pressLight() {
    handlePopWindows({
      yesHandle: PressReallyLight,
      content: <p style={{ fontSize: "medium" }}>确认要帮TA实现这个愿望吗？</p>,
    });
  }

  // 我的愿望，没人实现 ———— 点击删除
  // 我的愿望，有人点亮 ———— 点击删除
  function pressDelete() {
    handlePopWindows({
      yesHandle: () => {
        Service.deleteWish(props.wish.desire_id).then(() => {
          alert("删除成功");
          goOtherPage("/detail/index");
        });
        setShowConfirm(false);
      },
      content: <p style={{ fontSize: "medium" }}>确认删除这个愿望吗？</p>,
    });
  }

  if (props.wish.state === 1 || props.wish.state === 2) {
    // 别人的愿望，我已经点亮/实现 // 我的愿望，有人点亮
    let divDisplay: string = "";
    if (!(props.isMine ? true : achieved ? false : true)) {
      //隐藏该按钮
      divDisplay = "none";
    }

    return (
      <>
        <ConfirmPanel
          display={showConfirm}
          onChoose={confirmAction}
          btnTextYes={btnText.yes}
          btnTextNo={btnText.no}
        >
          {confirmContent}
        </ConfirmPanel>
        <div className="panel-button">
          <ButtonS
            onClick={
              achieved ? undefined : props.isMine ? pressDelete : pressAbandon
            }
            style={{
              background: "#FFFFFF",
              color: "#F25125",
              width: "6em",
              display: divDisplay,
            }}
          >
            {props.isMine ? "删除这个心愿" : "放弃实现"}
          </ButtonS>
          <ButtonS
            onClick={achieved ? undefined : pressAchieve}
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
        <PersonMsg wish={props.wish} isMine={props.isMine} />
      </>
    );
  } else if (props.wish.state === 0) {
    // 别人的愿望，没人实现// 我的愿望，没人实现
    return (
      <>
        <ConfirmPanel
          display={showConfirm}
          onChoose={confirmAction}
          btnTextYes={btnText.yes}
          btnTextNo={btnText.no}
        >
          {confirmContent}
        </ConfirmPanel>
        <ButtonS
          onClick={pressLight}
          style={{ background: "#FFFFFF", color: "#F25125", width: "6em" }}
        >
          {props.isMine ? "删除" : "点亮"}这个心愿
        </ButtonS>
      </>
    );
  } else {
    return <>{alert("props.wish.state Error!!!")}</>;
  }
}
