import React, { useEffect } from "react";

import { ButtonS } from "../../components/Button";
import { tags } from "../../config/Global";
import "./index.scss";
import Service from "../../common/service";
import { useNavigate } from "react-router-dom";

export default function Home(props) {
  let navigate = useNavigate();
  // 检查是否绑定邮箱
  // let IsEmailBind = 1;
  // useEffect(() => {
  //   if(IsEmailBind === 1) navigate("/login/bindemail");
  // })

  useEffect(() => {
    Service.checkUserEmail().then((res) => {
      // console.log(res)
      if (res.status === -1) {
        navigate("/login/bindemail");
      }
      // props.history.push("/login/bindemail")
    });
  });

  const goWishes = (tag) => {
    navigate(`/wish/${tag.enName}`, { category: tag.category });

    // props.history.push(`/wish/${tag.enName}`, { category: tag.category })
  };

  const goSend = () => {
    navigate('/send');
    // props.history.push('/send')
  };

  return (
    <div className="panel-home">
      <div className="tags">
        {tags.map((tag) => {
          return (
            <div
              onClick={() => goWishes(tag)}
              className="tag"
              key={tag.category}
            >
              {tag.name}
            </div>
          );
        })}
      </div>
      <ButtonS
        onClick={() => goSend(tags)}
        style={{ background: "#FFFFFF", color: "#F25125", marginTop: "10%" }}
      >
        投递我的小幸运
      </ButtonS>
    </div>
  );
}
