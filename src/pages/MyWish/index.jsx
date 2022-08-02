import "./index.scss";
import React, { useEffect, useState } from "react";
import { Empty } from "./empty.jsx";
import { MyWishList } from "./list";
import Service from "../../common/service";
import { Link, Route, Brow, BrowserRouter, Outlet, useNavigate } from "react-router-dom";
import { click } from "@testing-library/user-event/dist/click";

export const Index = (props) => {
  let navigate = useNavigate();

  const [wishPost, setWishPost] = useState([]);
  const [wishLight, setWishLight] = useState([]);
  const [gotPost, setGotPost] = useState(false);
  const [gotLight, setGotLight] = useState(false);

  // 排序愿望为需要的顺序
  const sortWishes = (oldwishes) => {   //此处mock用例state值有问题，暂未修改mock
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
      console.log(res.data)
      setWishPost(sortWishes(res.data.data.wishes));
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
        console.log("empty!");
        navigate("/mywish/empty");

      }
      // props.history.push("/mywish/empty");
      else {
        console.log("list!");//此处路由跳转后，list文件中的WishItem组件再次发出请求，并没有引用此处的通过路由传送的参数

        navigate("/mywish/list", { state: {wishPost, wishLight}})//传值到List但没有引用？
      } // props.history.push("/mywish/list", { wishPost, wishLight });{} 
    }
  }, [gotLight, gotPost, wishLight, wishPost]);

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
