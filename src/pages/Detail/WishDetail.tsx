// import { IWishObject } from "../MyWish";
import { IOnChange } from "./DetailPage";
import forwardimg from "../../static/images/forward.svg";
import { formatTime } from "../../common/global";
import { IUserInfo, IWishInfo } from "../../common/service";
import { Service } from "../../common/service";
import { useEffect, useState } from "react";

interface IWishDetail {
  wish: IWishInfo;
  isMine: boolean;
  onChange: IOnChange;
  pathname: string;
}

export default function WishDetail(props: IWishDetail) {
  const [manInfo, setManInfo] = useState<IUserInfo>();

  useEffect(()=>{
    Service.getManInfo(props.wish.user_id.toString()).then((res) => {
      setManInfo(res.data.data);
    });
  }, [props.wish])
  

  const changeShowConfirm = props.onChange.changeShowConfirm,
    changeConfirmContent = props.onChange.changeConfirmContent,
    changeConfirmAction = props.onChange.changeConfirmAction;
  const wish = props.wish;
  const isMine = props.isMine;

  const getForward = () => {
    if (wish.state === 0 && isMine) {
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
        <div className="text-content">{props.wish.desire}</div>
      </div>
      <div className="wishInfo">
        <p>来自 {manInfo?.name}</p>
        <p>{formatTime(props.wish.created_at)}</p>
      </div>
    </div>
  );
}
