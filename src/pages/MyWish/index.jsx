import "./index.scss";
import { useEffect, useState } from "react";
// import { Empty } from "./empty.jsx";
// import { MyWishList } from "./list";
import Service from "../../common/service";
import { Outlet, useNavigate } from "react-router-dom";
// import { click } from "@testing-library/user-event/dist/click";

export const Index = (props) => {
  const navigate = useNavigate();
  const [wishPost, setWishPost] = useState([]);
  const [wishLight, setWishLight] = useState([]);
  const [gotPost, setGotPost] = useState(false);
  const [gotLight, setGotLight] = useState(false);
  // console.log(inform)
  // inform.state.notfound = true

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
      // console.log(res.data)
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
