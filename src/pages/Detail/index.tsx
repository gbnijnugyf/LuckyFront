import { useEffect, useState } from "react";
import { IWishInfo, Service } from "../../common/service";
// import { IWishObject } from "../MyWish";
import { useLocation, useNavigate } from "react-router-dom";
import DetailPage from "./DetailPage";
import WishDetail from "./WishDetail";
const INITNUM: number = -9;

export interface IBtnStateObject<T = string> {
  yes: T;
  no: T;
}
export type IBtnActionObject = { yes: () => void; no: () => void };
// export type IBtnActionObject = (response: boolean) => void;

// const BTNTEXT_INIT: IBtnStateObject<string> = { yes: "", no: "" };
// const ACTION_INIT: IBtnActionObject = {
//   yes: () => console.log("yes"),
//   no: () => console.log("no"),
// };

const WISH_INIT: IWishInfo = {
  desire_id: "",
  desire: "",
  lighted_at: "",
  created_at: "",
  finished_at: "",
  state: 0,
  type: 0,
  light_id: INITNUM,
  user_id: INITNUM,
};

export default function Detail() {
  const location = useLocation();

  // const [showConfirm, setShowConfirm] = useState(false); // 设置遮罩状态
  // const [confirmContent, setConfirmContent] = useState<ReactElement>(); // 设置弹窗内容
  // const [btnText, setBtnText] = useState(BTNTEXT_INIT); // 设置按钮文本
  // // const [actionState, setActionState] = useState<boolean>(); //设置按钮触发状态
  // const [confirmAction, setConfirmAction] =
  //   useState<IBtnActionObject>(ACTION_INIT); // 设置按钮触发
  const [wish, setWish] = useState(WISH_INIT); // 愿望内容
  const [isMine, setIsMine] = useState(false); // 是不是自己的愿望
  const navigate = useNavigate();

  const goOtherPage = (path: string) => {
    navigate(path);
  };

  //change model

  // function changeShowConfirm(confirm: boolean) {
  //   setShowConfirm(confirm);
  // }

  // function changeConfirmContent(content: ReactElement) {
  //   setConfirmContent(content);
  // }

  // function changeBtnText(
  //   btn1: string = btnText.yes,
  //   btn2: string = btnText.no
  // ) {
  //   setBtnText({
  //     yes: btn1,
  //     no: btn2,
  //   });
  // }

  // function changeConfirmAction(action1: () => void, action2: () => void) {
  //   console.log("into change")
  //   confirmAction = {
  //     yes: action1 ,
  //     no: action2
  //   };
  // }

  // const DetailChange = {
  //   changeShowConfirm,
  //   changeConfirmContent,
  //   changeBtnText,
  //   changeConfirmAction,
  //   goOtherPage,
  // };

  useEffect(() => {
    let id = location.pathname.split("/").pop();
    if (!id) return;
    Service.getWishDetail(id).then((res) => {
      setWish(res.data.data.view_desire);
      Service.getPostedWishInfo().then((res) => {
        res.data.data.forEach((wish) => {
          if (!id) return;
          if (wish.desire_id === id) {
            setIsMine(true);
          }
        });
      });
    });
  }, [location.pathname]);

  return (
    <div className="Detail">
      <WishDetail wish={wish} isMine={isMine} pathname={location.pathname} />
      <div className="other">
        <DetailPage wish={wish} isMine={isMine} detailChange={goOtherPage} />
      </div>
      {/* <ConfirmPanel
        display={showConfirm}
        action={confirmAction}
        btnText={btnText}
      >
        {confirmContent}
      </ConfirmPanel> */}
    </div>
  );
}
