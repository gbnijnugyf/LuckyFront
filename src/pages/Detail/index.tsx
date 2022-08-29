import { ReactElement, useEffect, useState } from "react";
import { Service } from "../../common/service";
import { IWishObject } from "../MyWish";
import ConfirmPanel from "../../components/ConfirmPanel";
import { useLocation, useNavigate } from "react-router-dom";
import DetailPage, { IDetailChange, IOnChange } from "./DetailPage";
import WishDetail from "./WishDetail";
const INITNUM: number = -9;

export interface IBtnStateObject<T = string> {
  yes: T;
  no: T;
}
export type IBtnActionObject = (response: boolean) => void;

const BTNTEXT_INIT: IBtnStateObject<string> = { yes: "", no: "" };
// const ACTION_INIT: IBtnStateObject<() => void> = {
//   yes: () => {},
//   no: () => {},
// };
const ACTION_INIT: IBtnActionObject = () => {};

const WISH_INIT: IWishObject = {
  creat_at: "",
  light_at: "",
  light_user: INITNUM, //TODO -- 改成具体数字，问后端要接口
  school: INITNUM, //TODO -- 改成具体数字，问后端要接口
  state: INITNUM, //TODO -- 改成具体数字，问后端要接口
  type: INITNUM, //TODO -- 改成具体数字，问后端要接口
  wish: "",
  wish_id: INITNUM,
  wishman_inform: {
    wishMan_name: "",
    wishMan_QQ: "",
    wishMan_Wechat: "",
    wishMan_Tel: "",
  },
};

export default function Detail() {
  const location = useLocation();

  const [showConfirm, setShowConfirm] = useState(false); // 设置遮罩状态
  const [confirmContent, setConfirmContent] = useState<ReactElement>(); // 设置弹窗内容
  const [btnText, setBtnText] = useState(BTNTEXT_INIT); // 设置按钮文本
  const [confirmAction, setConfirmAction] =
    useState<IBtnActionObject>(ACTION_INIT); // 设置按钮触发
  const [wish, setWish] = useState(WISH_INIT); // 愿望内容
  const [isMine, setIsMine] = useState(false); // 是不是自己的愿望
  const navigate = useNavigate();

  const goOtherPage = (path: string) => {
    navigate(path);
  };

  //change model
  const onChange: IOnChange = {
    changeShowConfirm(confirm: boolean) {
      setShowConfirm(confirm);
    },

    changeConfirmContent(content: ReactElement) {
      setConfirmContent(content);
    },

    changeBtnText(btn1: string = btnText.yes, btn2: string = btnText.no) {
      setBtnText({
        yes: btn1,
        no: btn2,
      });
    },

    // changeConfirmAction(
    //   action1: () => void = confirmAction.yes,
    //   action2: () => void = confirmAction.no
    // ) {
    //   setConfirmAction({
    //     yes: action1,
    //     no: action2,
    //   });
    // },
    changeConfirmAction(action1: () => void, action2: () => void) {
      setConfirmAction((response: boolean) => {
        if(response) action1;
        else action2
        return;
        // response ? action1 : action2; Expected an assignment or function call and instead saw an expression
      });
    },
  };
  const DetailChange = {
    onChange,
    goOtherPage,
  };

  useEffect(() => {
    let id = location.pathname.split("/").pop();
    if (!id) return;
    Service.getWishDetail(id).then((res) => {
      setWish(res.data.data);
      Service.getUserWishPost().then((res) => {
        res.data.data.forEach((wish) => {
          if (!id) return;
          if (wish.wish_id === parseInt(id)) {
            setIsMine(true);
          }
        });
      });
    });
  }, [location.pathname]);

  return (
    <div className="Detail">
      <WishDetail
        wish={wish}
        isMine={isMine}
        onChange={onChange}
        pathname={location.pathname}
      />
      <div className="other">
        <DetailPage wish={wish} isMine={isMine} detailChange={DetailChange} />
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
