// import { IWishObject } from "../MyWish";
import { ACTION_INIT } from "./DetailPage";
import forwardimg from "../../static/images/forward.svg";
import { formatTime } from "../../common/global";
import { IUserInfo, IWishInfo } from "../../common/service";
import { Service } from "../../common/service";
import { ReactElement, useEffect, useState } from "react";
import { IBtnActionObject } from ".";
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
  // // const [actionState, setActionState] = useState<boolean>(); //设置按钮触发状态
  // let confirmAction = ACTION_INIT;
  const [confirmAction, setConfirmAction] =
    useState<IBtnActionObject>(ACTION_INIT); // 设置按钮触发
  useEffect(() => {
    Service.getManInfo(props.wish.user_id.toString()).then((res) => {
      setManInfo(res.data.data);
    });
  }, [props.wish]);

  // const changeShowConfirm = props.onChange.changeShowConfirm;
  // const changeConfirmContent = props.onChange.changeConfirmContent;
  // const changeConfirmAction = props.onChange.changeConfirmAction;
  const wish = props.wish;
  const isMine = props.isMine;

  const getForward = () => {
    if (wish.state === 0 && isMine/*1*/) {
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
    setConfirmAction({
      yes: () => {
        setShowConfirm(false);
        navigator.clipboard.writeText(window.location.href).then(()=>alert("已复制至剪贴板"))
      },
      no: () => {
        setShowConfirm(false);
      },
    });
    setShowConfirm(true);
  };

  return (
    <>
      <ConfirmPanel
        display={showConfirm}
        action={confirmAction}
        btnText={{yes:"复制",no:"取消"}}
      >
        {confirmContent}
      </ConfirmPanel>
      <div className="content">
        {getForward()}
        <div className="text">
          <div className="text-content">{props.wish.desire}</div>
        </div>
        <div className="wishInfo">
          <p>来自 {manInfo?.name}</p>
          <p>{formatTime(props.wish.created_at)}</p>
        </div>
      </div>
    </>
  );
}
