import { useEffect, useState } from "react";
import { IWishInfo, Service } from "../../common/service";
import { useLocation, useNavigate } from "react-router-dom";
import DetailPage from "./DetailPage";
import WishDetail from "./WishDetail";
const INITNUM: number = -9;

export interface IBtnStateObject<T = string> {
  yes: T;
  no: T;
}

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


  const [wish, setWish] = useState(WISH_INIT); // 愿望内容
  const [isMine, setIsMine] = useState(false); // 是不是自己的愿望
  const navigate = useNavigate();

  const goOtherPage = (path: string) => {
    navigate(path);
  };

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
    </div>
  );
}
