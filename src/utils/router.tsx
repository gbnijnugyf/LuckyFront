import { useEffect } from "react";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Send from "../pages/Send";
import cookie from "react-cookies";
import Detail from "../pages/Detail";
import {Notfound} from "../pages/Detail/notfound";
import Wishes from "../pages/Wishes";
import Header from "../components/Header";
// import MyWish from "../pages/MyWish";

import { Index } from "../pages/MyWish/index";
import { Empty } from "../pages/MyWish/empty";
import { MyWishList } from "../pages/MyWish/list";
import { LoginMain } from "../pages/Login/index";
import { BindEmail, LoginCCNU } from "../pages/Login/loginSchools";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { LoginWhut } from "../pages/Login/WhutLogin";
import { Register } from "../pages/Register";
function Router() {
  // 保存WHUT登录后返回的token
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // console.log("路径变化")
    // console.log(history)
    let token = cookie.load("jwt_token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/tagscreen/home");
      // props.history.push("/");
    }
    if (!localStorage.getItem("token")) {
      navigate("/login");
      console.log(location)
      // props.history.push("/login");
    }
  }, [location.pathname, navigate, location]);

  return (
    <>
      {/* todo fixthis */}

      {/* {props.location.pathname.match(/login/) ? null : <Header></Header>} */}
      {location.pathname.match(/login/) ? null : <Header></Header>}
      <div className="content">

        <Routes>{/*小幸运2.0之路由重构*/}
          {/* 启动页面 */}
          <Route path="login/*" element={<Login />}>
            <Route path="ccnu" element={<LoginCCNU />} />
            <Route path="bindemail" element={<BindEmail />} />
            <Route path="whut" element={<LoginWhut/>}/>
            <Route path="whut/whutRgister" element={<Register/>}/>
            <Route path="*" element={<LoginMain />} />
          </Route>
          {/* 筛选页面 */}
          <Route path="tagscreen/*">
            <Route path="home" element={<Home />} />
            <Route path="fillwish" element={<Send />} />
          </Route>
          {/* 愿望池页面 */}
          <Route path="wishpool/*">
            <Route path="wish/:tag" element={<Wishes />} />
          </Route>
          {/* 愿望与点亮详情页面 */}
          <Route path="detail/*">
            <Route path="index" element={<Index />} />
            <Route path="empty" element={<Empty />} />
            <Route path="list" element={<MyWishList />} />
            <Route path="notfound" element={<Notfound />}/>
            <Route path="*" element={<Detail />} />
          </Route>
          <Route
            index
            element={<Navigate to={localStorage.getItem("token") === null ? '/login' : '/tagscreen/home'} replace />}
          />
          <Route
            path="*"
            element={<Navigate to={localStorage.getItem("token") === null ? '/login' : '/detail/notfound'} replace />}
          />
        </Routes>

        {/* <Routes>
          <Route path="login/*" element={<Login />}>
            <Route path="ccnu" element={<LoginCCNU />} />
            <Route path="bindemail" element={<BindEmail />} />
            <Route path="*" element={<LoginMain />} />
          </Route>
          <Route path="home" element={<Home />}></Route>
          <Route path="send" element={<Send />}></Route>
          <Route path="detail/*" element={<Detail />}></Route>
          <Route path="wish/:tag" element={<Wishes />}></Route>
          <Route path="mywish/*" element={<Index />}>
            <Route path="empty" element={<Empty />} />
            <Route path="list" element={<MyWishList />} />
          </Route>
          <Route
            path="*"
            element={<Navigate to={localStorage.getItem("token") === null ? '/login' : '/home'} replace />}
          />
        </Routes> */}
      </div>
    </>
  );
}

export default Router;
