import { useEffect, useState } from "react";
import { formatTime } from "../../common/global";
import { IWishInfo, Service } from "../../common/service";
<<<<<<< HEAD
// import { IWishObject } from "../MyWish";
=======
>>>>>>> e2e34745c5c0b2f1096b6c7ee6c1a69360ad81b3

interface IPersonMsg {
  wish: IWishInfo;
  isMine: boolean;
}

export default function PersonMsg(props: IPersonMsg) {
  const { wish, isMine } = props;
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [QQ, setQQ] = useState("");
  const [wechat, setWechat] = useState("");
  const [tel, setTel] = useState("");

  useEffect(() => {
    if (isMine) {
<<<<<<< HEAD
      Service.getManInfo(wish.desire_id.toString()).then((res) => {
        let lightManInfo = res.data.data;
        setName(lightManInfo.name || "");
        setTime("于" + formatTime(wish.lighted_at) + "点亮");
        setQQ(lightManInfo.qq || "");
        setWechat(lightManInfo.wechat || "");
        setTel(lightManInfo.tel || "");
=======
      Service.getLightManInfo(wish.desire_id.toString()).then((res) => {
        let lightManInfo = res.data.data;
        setName(lightManInfo.light_name || "");
        setTime("于" + formatTime(wish.lighted_at) + "点亮");
        setQQ(lightManInfo.light_qq || "");
        setWechat(lightManInfo.light_wechat || "");
        setTel(lightManInfo.light_tel || "");
>>>>>>> e2e34745c5c0b2f1096b6c7ee6c1a69360ad81b3
      });
    } else {
      Service.getManInfo(wish.light_id.toString()).then((res) => {
        // setWishManInfo(res.data.data);
        let wishManInfo = res.data.data;
        setName(wishManInfo?.name || "");
        setTime("于" + formatTime(wish.created_at) + "许愿");
        setQQ(wishManInfo?.qq || "");
        setWechat(wishManInfo?.wechat || "");
        setTel(wishManInfo?.tel || "");
      });
    }
  }, [isMine, wish]);

  return (
    <div className="msg">
      <div className="msg-text">
        <p className="h">{isMine ? "点亮人" : "许愿人"}</p>
        <p className="name">{name}</p>
      </div>
      <div className="msg-info">
        <p>{time}</p>
        <p style={{ marginTop: "0.5em", textAlign: "left" }}>联系方式 :</p>
        <ul className="msg-number">
          {QQ ? <li>QQ：{QQ}</li> : null}
          {wechat ? <li>微信：{wechat}</li> : null}
          {tel ? <li>电话：{tel}</li> : null}
        </ul>
      </div>
    </div>
  );
}
