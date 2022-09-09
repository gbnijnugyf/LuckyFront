import "./index.scss";
import { useEffect, useState } from "react";
import { Service, IWishInfo } from "../../common/service";
import { Outlet, useNavigate } from "react-router-dom";
const INITNUM: number = -2;


// export interface IWishObject {
//   creat_at: string;
//   light_at: string;
//   light_user: number; //to do -- 改成具体数字，问后端要接口
//   school?: number; //to do -- 改成具体数字，问后端要接口
//   state: number; //to do -- 改成具体数字，问后端要接口
//   type: number; //to do -- 改成具体数字，问后端要接口
//   wish: string;
//   wish_id: number;
//   wishman_inform?: IWishManInformation;
// }

export const Index = () => {
  let WISHPOST_INIT: Array<IWishInfo> = [
    {
      created_at: "",
      lighted_at: "",
      finished_at:"",
      state: -1,
      type: 0,
      desire: "",
      desire_id: "",
      light_id:INITNUM,//TODO 初始化number待定
      user_id:INITNUM,
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
    Service.get_postedWishInfo().then((res) => {
      setWishPost(sortWishes(res.data.data));
      setGotPost(true);
    });
  }, [wishPost]);
  useEffect(() => {
    Service.get_lightedWishInfo().then((res) => {
      setWishLight(sortWishes(res.data.data));
      setGotLight(true);
    });
  }, [wishLight]);

  useEffect(() => {
    if (gotPost && gotLight) {
      if (wishPost.length === 0 && wishLight.length === 0) {
        navigate("/detail/empty");
      } else {
        navigate("/detail/list", { state: { wishPost, wishLight } });
      }
    }
  }, [gotLight, gotPost, wishLight, wishPost, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
};
