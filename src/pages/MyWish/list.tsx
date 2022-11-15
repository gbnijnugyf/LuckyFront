import "./index.scss";
import { ButtonS } from "../../components/Button";
import { formatTime, IWishInfo, WishState } from "../../common/global";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { Service } from "../../common/service";
const INITNUM: number = -2;

export interface IWishState {
  wishLight: Array<IWishInfo>;
  wishPost: Array<IWishInfo>;
}

export function MyWishList() {
  let WISHPOST_INIT: Array<IWishInfo> = [
    {
      created_at: "",
      lighted_at: "",
      finished_at: "",
      state: WishState.初始化,
      type: 0,
      desire: "",
      desire_id: "",
      light_id: INITNUM, //TODO 初始化number待定
      user_id: INITNUM,
    },
  ];

  const navigate = useNavigate();
  const [wishPost, setWishPost] = useState(WISHPOST_INIT);
  const [wishLight, setWishLight] = useState(WISHPOST_INIT);
  const [gotPost, setGotPost] = useState(false);
  const [gotLight, setGotLight] = useState(false);

  // 排序愿望为需要的顺序
  const sortWishes = (oldwishes: Array<IWishInfo>) => {
    let sorted = [];
    const priority = [1, 2, 0];
    for (let p = 0; p < priority.length; p++)
      for (let i = 0; i < oldwishes.length; i++)
        if (oldwishes[i].state === priority[p]) sorted.push(oldwishes[i]);

    return sorted;
  };

  useEffect(() => {
    Service.getPostedWishInfo().then((res) => {
      setWishPost(sortWishes(res.data.data));
      setGotPost(true);
    });
  }, []);
  useEffect(() => {
    Service.getLightedWishInfo().then((res) => {
      setWishLight(sortWishes(res.data.data));
      setGotLight(true);
    });
  }, []);

  useEffect(() => {
    if (gotPost && gotLight) {
      if (wishPost.length === 0 && wishLight.length === 0) {
        navigate("/detail/empty");
      }
    }
  }, [gotLight, gotPost, wishLight, wishPost, navigate]);
  const goWishDetail = (id: string) => {
    navigate("/detail/" + id);
  };

  return (
    <>
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
    wish.state === WishState.已点亮
      ? formatTime(wish.lighted_at)
      : formatTime(wish.created_at);
  const randomBG = [
    //愿望背景颜色随机
    "yellow",
    "orange",
    "red",
    "pink",
  ];
  const random = Math.floor(Math.random() * 3);
  const itemState = (wish.state === WishState.已实现 ? "medal" : "clip");


  return (
    <li
      className={classNames("item-wish", randomBG[random], itemState)}
      onClick={props.onClick}
    >
      <div className="wish-content">
        <p className="text-detail"><span>{wish.desire}</span></p>
        <div className="status">
          <ButtonS id="btnWishStatu" >
            {wish.state === WishState.未点亮
              ? "未实现"
              : wish.state === WishState.已点亮
                ? "已点亮"
                : "已实现"}
          </ButtonS>
          <p className="text-wishtime">{time}</p>
        </div>
      </div>
    </li>
  );
}