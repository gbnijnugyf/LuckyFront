import { useEffect } from "react";
import { ITagsObject } from "../../config/Global";
import { ButtonS } from "../../components/Button";
import { tags } from "../../config/Global";
import "./index.scss";
import { Service } from "../../common/service";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    Service.checkUserEmail().then((res) => {
      if (res.status === -1) {
        navigate("/login/bindemail");
      }
    });
  });

  const goWishes = (tag: ITagsObject) => {
    navigate(`/wishpool/wish/${tag.enName}`, {
      state: { category: tag.category },
    });

  };

  const goSend = () => {
    navigate("/tagscreen/fillwish");
  };

  return (
    <div className="panel-home">
      <ButtonS
        id="btnSeeMyWish"
        onClick={() => navigate("/detail/list")}
      >
        查看我的愿望与点亮
      </ButtonS>
      <div className="tags">
        {tags.map((tag) =>
          <div
            onClick={() => goWishes(tag)}
            className="tag"
            key={tag.category}
          >
            {tag.name}
          </div>
        )}
      </div>
      <ButtonS
        onClick={goSend}
        id="btnHome"
      >
        投递我的小幸运
      </ButtonS>
    </div>
  );
}
