import { useEffect, useState } from "react";
import { formatTime } from "../../common/global";
import { Service } from "../../common/service";
import { IWishObject } from "../MyWish";

interface IPersonMsg {
  wish: IWishObject;
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
      Service.getLightManInfo(wish.wish_id.toString()).then((res) => {
        let lightman = res.data.data;
        setName(lightman.light_name || "");
        setTime("于" + formatTime(wish.light_at) + "点亮");
        setQQ(lightman.light_qq || "");
        setWechat(lightman.light_wechat || "");
        setTel(lightman.light_tel || "");
      });
    } else {
      setName(wish.wishman_inform?.wishMan_name || "");
      setTime("于" + formatTime(wish.creat_at) + "许愿");
      setQQ(wish.wishman_inform?.wishMan_QQ || "");
      setWechat(wish.wishman_inform?.wishMan_Wechat || "");
      setTel(wish.wishman_inform?.wishMan_Tel || "");
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
