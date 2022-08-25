import { IWishObject } from "../MyWish";
import { IOnChange } from "./DetailPage";
import forwardimg from "../../static/images/forward.svg";
import { formatTime } from "../../common/global";

interface IWishDetail {
  wish: IWishObject;
  isMine: boolean;
  onChange: IOnChange;
  pathname: string;
}

export default function WishDetail(props: IWishDetail) {
  const changeShowConfirm = props.onChange.changeShowConfirm,
    changeConfirmContent = props.onChange.changeConfirmContent,
    changeConfirmAction = props.onChange.changeConfirmAction;
  const { isMine, wish } = props;

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
        <div className="text-content">{props.wish.wish}</div>
      </div>
      <div className="wishInfo">
        <p>来自 {props.wish.wishman_inform?.wishMan_name}</p>
        <p>{formatTime(props.wish.creat_at)}</p>
      </div>
    </div>
  );
}
