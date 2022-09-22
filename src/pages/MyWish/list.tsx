import "./index.scss";
import { ButtonS } from "../../components/Button";
import { formatTime } from "../../common/global";
import { useLocation, useNavigate } from "react-router-dom";
import { IWishInfo } from "../../common/service";
import classNames from "classnames";
import ItemClip from "../../static/images/ItemClip.png"

export interface IWishState {
  wishLight: Array<IWishInfo>;
  wishPost: Array<IWishInfo>;
}

export function MyWishList() {
  const navigate = useNavigate();
  let wishState = useLocation().state as IWishState;
  let wishPost = wishState.wishPost;
  let wishLight = wishState.wishLight;

  const goWishDetail = (id: string) => {
    navigate("/detail/" + id);
  };

  return (
    <>
      <div className="div-wishlist-toppadding" />
      <p>点击卡片可以查看愿望详情以及更改愿望状态哦~</p>
      <div className="div-wishlist">
        <h3>我许下的愿望</h3>
        <hr />
        <ul>
          {wishPost.map((wish) => {
            return (
              <WishItem
                time={wish.created_at}
                wish={wish}
                key={parseInt(wish.desire_id)}
                onClick={() => {
                  goWishDetail(wish.desire_id.toString());
                }}
              />
            );
          })}
        </ul>
        <h3>我点亮的愿望</h3>
        <hr />
        <ul>
          {wishLight.map((wish) => {
            return (
              <WishItem
                time={wish.lighted_at}
                wish={wish}
                key={parseInt(wish.desire_id)}
                onClick={() => {
                  goWishDetail(wish.desire_id.toString());
                }}
              />
            );
          })}
        </ul>
        <div className="div-listbottom">
          <p>你还剩{7 - wishLight.length}次实现小幸运的机会哦~</p>
          <hr></hr>
          <p>人家也是有底线的</p>
        </div>
      </div>
    </>
  );
}

interface IWishItemProps {
  time: string;
  wish: IWishInfo;
  key: number;
  onClick: React.MouseEventHandler<HTMLLIElement> | undefined;
}


function WishItem(props: IWishItemProps) {
  const { wish } = props;
  const time =
    wish.state === 1 ? formatTime(wish.lighted_at) : formatTime(wish.created_at);
  const randomBG = [//愿望背景颜色随机
    "yellow",
    "orange",
    "red",
    "pink"
  ]
  const random = Math.floor(Math.random() * 3);
  return (
    <li className={classNames("item-wish", randomBG[random])} onClick={props.onClick}>
      <div className="wish-content">
      <p className="text-detail">{wish.desire}</p>
      <div className="status">
        <ButtonS
          style={{
            color: "#577DAB",
            fontSize: "large"
          }}
        >
          {wish.state === 0 ? "未实现" : wish.state === 1 ? "已点亮" : "已实现"}
        </ButtonS>
        <p className="text-wishtime">{time}</p>
      </div>
      </div>
      <img src={ItemClip} alt="clip"/>

    </li>
  );
}
