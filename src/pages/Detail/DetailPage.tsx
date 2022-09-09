import { ReactElement, useState } from "react";
import { IWishInfo, Service } from "../../common/service";
import { ButtonS } from "../../components/Button";
// import { IWishObject } from "../MyWish";
import PersonMsg from "./PersonMsg";

export interface IOnChange {
  changeShowConfirm: (props: boolean) => void;
  changeConfirmContent: (props: ReactElement) => void;
  changeBtnText: (props1: string, props2: string) => void;
  changeConfirmAction: (props1: () => void, props2: () => void) => void;
}

export interface IDetailChange {
  onChange: IOnChange;
  goOtherPage: (props: string) => void;
}

interface IDetailPageProps {
  wish: IWishInfo;
  detailChange: IDetailChange;
  isMine: boolean;
}

//Detail核心显示部分

export default function DetailPage(props: IDetailPageProps) {
  const {
    changeShowConfirm,
    changeConfirmContent,
    changeBtnText,
    changeConfirmAction,
  } = props.detailChange.onChange;
  const goOtherPage = props.detailChange.goOtherPage;
  const achieved = props.wish.state === 2;
  const [currentIndex, setCurrentIndex] = useState("wuchu");

  type IMsgs = {
    [key: string]: string;
  };
  const msgs: IMsgs = {
    wuchu: "刚刚误触了点亮按钮，不好意思啦~",
    mang: "最近有点忙，短时间没有精力实现愿望了，抱歉",
    other: "", //占位
  };

  //select元素抽象
  interface IHandleSelectProps {
    allOption: string[];
    onChangeAction: [
      option: string,
      setOption: React.Dispatch<React.SetStateAction<string>>
    ];
    selectSttyle?: React.CSSProperties;
  }
  function handleSelect(props: IHandleSelectProps) {
    return (
      <select
        onChange={(e) => {
          props.onChangeAction[1](e.target.value);
        }}
        style={{ color: "rgb(239, 96, 63)" }}
      >
        <>
          {props.allOption.forEach((option) => {
            <option value={option}>{option}</option>;
          })}
        </>
      </select>
    );
  }
  //input元素抽象
  interface IHandleInputProps {
    type: string;
    onChangeAction: [
      inputState: string,
      setInputState: React.Dispatch<React.SetStateAction<string>>
    ];
    name?: string;
    classname?: string;
    style?: React.CSSProperties;
    value?: string;
    placeholder?: string;
    defaultChecked?: boolean;
    defaultValue?: string;
  }
  function handleInput(props: IHandleInputProps) {
    return (
      <input
        type={props.type}
        onChange={(e) => {
          props.onChangeAction[1](e.target.value);
        }}
      ></input>
    );
  }

  //弹窗抽象
  function handlePopWindows(
    yesHandle: () => void = () => {
      goOtherPage("/detail/index");
    },
    Content: ReactElement,
    noHandle: () => void = () => {
      changeShowConfirm(false);
    },
    btnText1: string = "",
    btnText2: string = ""
  ) {
    changeConfirmAction(yesHandle, noHandle);
    changeConfirmContent(Content);
    changeShowConfirm(true);
    changeBtnText(btnText1, btnText2);
  }
  // 别人的愿望，没人实现 ———— 点击确定点亮
  function PressReallyLight() {
    const [name, setName] = useState("");
    const [option, setOption] = useState("QQ");
    const [number, setNumber] = useState("");
    const [tel, setTel] = useState("");
    handlePopWindows(
      () => {
        let id = props.wish.desire_id;
        let [qq, wechat] = option === "QQ" ? [number, ""] : ["", number];
        Service.lightWish(id, name, tel, qq, wechat).then(
          (res) => {
            if (res.data.status === 0) {
              alert("点亮成功~");
              goOtherPage("/detail/index");
            } else {
              alert(res.data.msg);
            }
          }
        );
        changeShowConfirm(false);
      },
      <div className="input-msg">
        <p className="info">填写联系方式，方便他来联系你哦～</p>
        <div className="form">
          <div className="name">
            投递人 :
            {handleInput({
              type: "text",
              onChangeAction: [name, setName],
              classname: "name",
              placeholder: "必填内容哦～",
              defaultValue: name,
            })}
          </div>
          <div className="number">
            联系方式 :
            {handleSelect({
              allOption: ["QQ", "WeChat"],
              onChangeAction: [option, setOption],
            })}
            {handleInput({
              type: "text",
              onChangeAction: [number, setNumber],
              placeholder: "必填内容哦～",
              defaultValue: number,
              style: { marginLeft: ".3em", width: "30%" },
            })}
          </div>
          <div className="tel">
            或 Tel :
            {handleInput({
              type: "text",
              onChangeAction: [tel, setTel],
              placeholder: "选填内容哦～",
              defaultValue: tel,
            })}
          </div>
        </div>
      </div>,
      () => {
        changeShowConfirm(false);
      },
      "发送"
    );
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
                setCurrentIndex(e.target.value);
              }}
            />
          </div>
          {value !== "ohter" ? (
            <p>{reason}</p>
          ) : (
            <div>
              <p>留言给对方：</p>
              {handleInput({
                type: "text",
                onChangeAction: [currentIndex, setCurrentIndex],
                placeholder: "输入其他原因",
                classname: "reason",
                defaultValue: currentIndex,
              })}
            </div>
          )}
        </div>
      );
    }

    handlePopWindows(
      () => {
        changeShowConfirm(false);
        changeBtnText("", "");
        let message = currentIndex === "other" ? msgs["other"] : msgs["wuchu"];
        Service.giveUpLightWish(props.wish.desire_id.toString(), message).then(
          () => {
            goOtherPage("/detail/index");
          }
        );
      },
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
      </>,
      () => {
        changeShowConfirm(false);
        changeBtnText("", "");
        Service.giveUpLightWish(props.wish.desire_id.toString()).then(() => {
          goOtherPage("/detail/index");
        });
      },
      "发送",
      "不留言"
    );
  }

  // 别人的愿望，我已经点亮/实现 ———— 点击实现愿望
  // 我的愿望，有人点亮 ———— 点击实现
  function pressAchieve() {
    handlePopWindows(
      () => {
        changeShowConfirm(false);
        Service.achieveWish(props.wish.desire_id.toString());
        goOtherPage("/detail/index");
      },
      <>
        <p style={{ alignSelf: "flex-start" }}>确认已经实现这个愿望了吗？</p>
        {props.isMine ? null : (
          <p style={{ alignSelf: "flex-start", textAlign: "start" }}>
            若确认，我们将发邮件提醒TA来确认你已经实现了TA的愿望
          </p>
        )}
      </>
    );
  }

  // 别人的愿望，我已经点亮/实现 ———— 点击放弃愿望
  function pressAbandon() {
    handlePopWindows(pressReallyAbandon, <p>确认放弃这个愿望吗？</p>);
  }

  // 别人的愿望，没人实现 ———— 点击点亮
  function pressLight() {
    handlePopWindows(
      PressReallyLight,
      <p style={{ fontSize: "medium" }}>确认要帮TA实现这个愿望吗？</p>
    );
  }

  // 我的愿望，没人实现 ———— 点击删除
  // 我的愿望，有人点亮 ———— 点击删除
  function pressDelete() {
    handlePopWindows(() => {
      Service.deleteWish(props.wish.desire_id.toString()).then(() => {
        alert("删除成功");
        goOtherPage("/detail/index");
      });
      changeShowConfirm(false);
    }, <p style={{ fontSize: "medium" }}>确认删除这个愿望吗？</p>);
  }

  if (props.wish.state === 1 || props.wish.state === 2) {
    // 别人的愿望，我已经点亮/实现 // 我的愿望，有人点亮
    let divDisplay: string = "";
    if ((!props.isMine && achieved )?true:false) {
      divDisplay = "none";
    }

    return (
      <>
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
        {/*一直刷新 */}
      </>
    );
  } else if (props.wish.state === 0) {
    // 别人的愿望，没人实现// 我的愿望，没人实现
    return (
      <ButtonS
        onClick={pressLight}
        style={{ background: "#FFFFFF", color: "#F25125", width: "6em" }}
      >
        -{props.isMine ? "删除" : "点亮"}这个心愿
      </ButtonS>
    );
  } else {
    return <>{alert("props.wish.state Error!!!")}</>;
  }
}
