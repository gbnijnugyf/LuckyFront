import "./index.scss";
import { ButtonS } from "../../components/Button";
import { formatTime } from "../../common/global";
import { useNavigate } from "react-router-dom";
import { IWishInfo, Service } from "../../common/service";
import { useEffect, useState } from "react";
import ItemClip from "../../static/images/ItemClip.png"
import ItemMedal from "../../static/images/ItemMedal.png"
import classNames from "classnames";
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
      state: -1,
      type: 0,
      desire: "",
      desire_id: "",
      light_id: INITNUM,//TODO 初始化number待定
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

  //以上为index导入--to合并两个文件


  // const navigate = useNavigate();


  // const wishPost = wishState.wishPost;
  // const wishLight = wishState.wishLight;



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
      <img id="itemSign" src={wish.state === 2?ItemMedal :ItemClip} alt="clip"/>

    </li>
  );
}
