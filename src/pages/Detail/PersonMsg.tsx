import { useEffect, useState } from "react";
import { formatTime } from "../../common/global";
import { IWishInfo, Service } from "../../common/service";

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
      Service.getManInfo(wish.desire_id.toString()).then((res) => {
        let lightManInfo = res.data.data;
        setName(lightManInfo.name || "");
        setTime("于" + formatTime(wish.lighted_at) + "点亮");
        setQQ(lightManInfo.qq || "");
        setWechat(lightManInfo.wechat || "");
        setTel(lightManInfo.tel || "");
      });
    } else {
      Service.getManInfo(wish.light_id.toString()).then((res) => {
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
