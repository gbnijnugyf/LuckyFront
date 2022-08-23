import "./index.scss";
import { useEffect, useState } from "react";
// import { Empty } from "./empty.jsx";
// import { MyWishList } from "./list";
import {Service, IWishManInformation } from "../../common/service";
import { Outlet, useNavigate } from "react-router-dom";
const INITNUM: number = -9;

// import { click } from "@testing-library/user-event/dist/click";

export interface IWishObject {
  creat_at: string,
  light_at: string,
  light_user: number,//to do -- 改成具体数字，问后端要接口
  school?: number,//to do -- 改成具体数字，问后端要接口
  state: number,//to do -- 改成具体数字，问后端要接口
  type: number,//to do -- 改成具体数字，问后端要接口
  wish: string,
  wish_id: number,
  wishman_inform?: IWishManInformation
}


export const Index = () => {
  let WISHPOST_INIT: Array<IWishObject> = [{
    creat_at: "",
    light_at: "",
    light_user: INITNUM,//to do -- 改成具体数字，问后端要接口
    school: INITNUM,//to do -- 改成具体数字，问后端要接口
    state: INITNUM,//to do -- 改成具体数字，问后端要接口
    type: INITNUM,//to do -- 改成具体数字，问后端要接口
    wish: "",
    wish_id: INITNUM,
    // wishman_inform: {
    //   wishMan_name: "",
    //   wishMan_QQ: "",
    //   wishMan_Tel: "",
    //   wishMan_Wechat: ""
    // }
  }]



  const navigate = useNavigate();
  const [wishPost, setWishPost] = useState(WISHPOST_INIT);
  const [wishLight, setWishLight] = useState(WISHPOST_INIT);
  const [gotPost, setGotPost] = useState(false);
  const [gotLight, setGotLight] = useState(false);
  // console.log(inform)
  // inform.state.notfound = true

  // 排序愿望为需要的顺序
  const sortWishes = (oldwishes: Array<IWishObject>) => {
    let sorted = []
    const priority = [1, 2, 0]
    for (let p = 0; p < priority.length; p++)
      for (let i = 0; i < oldwishes.length; i++)
        if (oldwishes[i].state === priority[p])
          sorted.push(oldwishes[i]);

    return sorted;
  }

  useEffect(() => {
    Service.getUserWishPost().then((res) => {
      setWishPost(sortWishes(res.data.data));
      // console.log(wishPost)
      setGotPost(true);
    });
  }, []);
  useEffect(() => {
    Service.getUserWishLight().then((res) => {

      setWishLight(sortWishes(res.data.data));

      setGotLight(true);
    });
  }, []);

  useEffect(() => {
    if (gotPost && gotLight) {
      if (wishPost.length === 0 && wishLight.length === 0) {
        navigate("/detail/empty");
      }
      else {
        navigate("/detail/list", { state: { wishPost, wishLight } })
      }
    }
  }, [gotLight, gotPost, wishLight, wishPost, navigate]);

  return <>
    <Outlet />
  </>;
};

// export default function MyWish() {
//   return (
//     <div>
//       <Outlet />
//       {/* <Link to="/mywish/index" /> */}
//     </div>
//   );
// }
