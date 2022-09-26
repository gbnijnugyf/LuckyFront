import { ACTION_INIT } from "./DetailPage";
import forwardimg from "../../static/images/forward.png";
import { formatTime } from "../../common/global";
import { IUserInfo, IWishInfo } from "../../common/service";
import { Service } from "../../common/service";
import { ReactElement, useEffect, useState } from "react";
import ConfirmPanel from "../../components/ConfirmPanel";

interface IWishDetail {
  wish: IWishInfo;
  isMine: boolean;
  pathname: string;
}

export default function WishDetail(props: IWishDetail) {
  const [manInfo, setManInfo] = useState<IUserInfo>();
  const [showConfirm, setShowConfirm] = useState(false); // 设置遮罩状态
  const [confirmContent, setConfirmContent] = useState<ReactElement>(); // 设置弹窗内容
  const [confirmAction, setConfirmAction] = useState<(res: boolean) => void>(
    () => ACTION_INIT
  ); // 设置按钮触发
  useEffect(() => {
    Service.getManInfo(props.wish.user_id.toString()).then((res) => {
      setManInfo(res.data.data);
    });
  }, [props.wish]);

  const wish = props.wish;
  const isMine = props.isMine;

  const GetForward = () => {
    if (wish.state === 0 && isMine) {
      return (
        <div className="forward">
          <img
            src={forwardimg}
            onClick={showForward}
            alt=""
          /><p>分享</p>
        </div>
      );
    }
    return null;
  };
  const showForward = () => {
    setConfirmContent(
      <>
        <p>快去复制以下链接</p>
        <p>将你的愿望分享出去吧~</p>
        <p
          id="copyBox"
          style={{
            width: "80%",
            wordBreak: "break-all",
          }}
        >
          {window.location.href}
        </p>
      </>
    );

    setConfirmAction(() => (res: boolean) => {
      if (res) {
        setShowConfirm(false);
        navigator.clipboard
          .writeText(window.location.href)
          .then(() => alert("已复制至剪贴板"));
      } else {
        setShowConfirm(false);
      }
    });
    setShowConfirm(true);
  };

  return (
    <>
      <ConfirmPanel
        display={showConfirm}
        onChoose={confirmAction}
        btnTextYes={"复制"}
        btnTextNo={"取消"}
      >
        {confirmContent}
      </ConfirmPanel>
      <GetForward/>
      <div className="content">
        <div className="text">
          <div className="text-content">{props.wish.desire}</div>
        </div>
        <div className="wishInfo">
          <p className="fromWho">
            <div id="fromText">来自&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div> {manInfo?.name}</div>
          </p>
          <p>{formatTime(props.wish.created_at)}</p>
        </div>
      </div>
    </>
  );
}
