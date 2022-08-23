import React, { useEffect } from "react";
import { ITagsObject } from "../../config/Global";
import { ButtonS } from "../../components/Button";
import { tags } from "../../config/Global";
import "./index.scss";
import {Service} from "../../common/service";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    Service.checkUserEmail().then((res) => {
      // console.log(res)
      if (res.status === -1) {
        navigate("/login/bindemail");
      }
      // props.history.push("/login/bindemail")
    });
  });

  const goWishes = (tag:ITagsObject) => {
    navigate(`/wishpool/wish/${tag.enName}`, { state: { category: tag.category } });

    // props.history.push(`/wish/${tag.enName}`, { category: tag.category })
  };

  const goSend = () => {
    navigate('/tagscreen/fillwish');
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
        onClick={() => goSend()}//此处goSend函数参数删去tags，因为不知道有啥用（也不需要参数）。。
        style={{ background: "#FFFFFF", color: "#F25125", marginTop: "10%" }}
      >
        投递我的小幸运
      </ButtonS>
    </div>
  );
}
