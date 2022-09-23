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

export const ACTION_INIT = () => { };
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
        goOtherPage("/detail/list");
      },
      noHandle = () => {
        setShowConfirm(false);
      },
      content = <>获取文本失败</>,
      btnText1,
      btnText2,
    } = props;

    setShowConfirm(true);
    setConfirmAction(() => (res: boolean) => {
      if (res) yesHandle();
      else noHandle();
    });
    setConfirmContent(content);
    setBtnText({ yes: btnText1, no: btnText2 });
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
          goOtherPage("/detail/list");
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
        setShowConfirm(false);
        setBtnText({ yes: "", no: "" });
        Service.giveUpLightWish(props.wish.desire_id).then(() => {
          goOtherPage("/detail/list");
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
        goOtherPage("/detail/list");
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

  // 我的愿望，没人实现 ———— 点击删除
  // 我的愿望，有人点亮 ———— 点击删除
  function pressDelete() {
    handlePopWindows({
      yesHandle: () => {
        Service.deleteWish(props.wish.desire_id).then(() => {
          alert("删除成功");
          goOtherPage("/detail/list");
        });
        setShowConfirm(false);
      },
      content: <p style={{ fontSize: "medium" }}>确认删除这个愿望吗？</p>,
    });
  }


  // wish.state
  // 0: 未实现、未点亮
  // 1: 已点亮
  // 2: 已实现

  // 据条件（wish.state / props.isMine / achieved）返回jsx.element
  // 别人点亮并实现我的√ 未渲染               state==2 && isMine==true && achieved==true
  // 我点亮并实现别人的√√                     state==2 && isMine==false && achieved==true
  // 别人点亮但未实现我的√√ mock很难实现       state==1 && isMine==true && achieved==false
  // 我点亮但未实现别人的√√                   state==1 && isMine==false && achieved==false
  // 别人未点亮我√√  mock很难实现               state==0 && isMine==true && achieved==false

  if (props.wish.state === 1 || props.wish.state === 2) {

    let isMine = props.isMine;//方便修改值to mock
    // isMine = ((!props.wish.state && achieved) ? false : true)//手动mock
    // console.log(props.wish.state, isMine, achieved)

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
        <div className="PersonId">{isMine ? "点亮人" : "许愿人"}</div>
        <PersonMsg wish={props.wish} isMine={isMine} />

        <div className="panel-button">
          <ButtonS
            id="Abandon-Delete"
            onClick={
              achieved ? undefined : isMine ? pressDelete : pressAbandon
            }
            style={{
              display: isMine ? "" : (achieved ? "none" : ""),
            }}
          >
            {isMine ? "删除这个心愿" : "放弃实现"}
          </ButtonS>
          <ButtonS
            onClick={achieved ? undefined : pressAchieve}
            id={achieved? (isMine?"Achieved":"Achieved2"):"toAchieve"}
          >  
            {achieved ? "已实现" : "确认实现"}
          </ButtonS>
        </div>
      </>
    );
  } else if (props.wish.state === 0) {
    // 我的愿望，没人实现
    //不会出现别人的愿望没人实现（即此页面不会出现用户点亮别人愿望）
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
          id="btnDelete"
          onClick={pressDelete}
        >
          删除这个心愿
        </ButtonS>
      </>
    );
  } else {
    return <>{alert("props.wish.state Error!!!")}</>;
  }
}
