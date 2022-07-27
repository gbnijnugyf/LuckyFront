import React, { useEffect } from "react";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Send from "../pages/Send";
import cookie from "react-cookies";
import Detail from "../pages/Detail";
import Wishes from "../pages/Wishes";
import Header from "../components/Header";
import MyWish from "../pages/MyWish";

import { Index } from "../pages/MyWish/index";
import { Empty } from "../pages/MyWish/empty";
import { MyWishList} from "../pages/MyWish/list";
import { LoginMain } from "../pages/Login/index";
import { BindEmail, LoginCCNU } from "../pages/Login/loginSchools";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
function Router(props: any) {
  // 保存WHUT登录后返回的token
  const location = useLocation();
  if (1) {
    console.log(location);

  }

  useEffect(() => {
    let token = cookie.load("jwt_token");
    if (token) {
      localStorage.setItem("token", token);
      // props.history.push("/");
    }
    if (!localStorage.getItem("token")) {
      // props.history.push("/login");
    }
  }, [props.history]);

  return (
    <>
      {/* todo fixthis */}

      {/* {props.location.pathname.match(/login/) ? null : <Header></Header>} */}
      {location.pathname.match(/login/) ? null : <Header></Header>}
      <div className="content">
        <Routes>
          {/* <Route path="login/*" element={<Login />}></Route> */}
          <Route path="login/*" element={<Login />}>
            <Route path="ccnu" element={<LoginCCNU />} />
            <Route path="bindemail" element={<BindEmail />} />
            <Route path="*" element={<LoginMain />} />
          </Route>

          <Route path="home" element={<Home />}></Route>
          <Route path="send" element={<Send />}></Route>
          <Route path="detail" element={<Detail />}></Route>
          <Route path="wish/:tag" element={<Wishes />}></Route>
          <Route path="mywish" element={<MyWish />}>
            <Route path="/mywish/index" element={<Index/>} />
            <Route path="/mywish/empty" element={<Empty/>} />
            <Route path="/mywish/list" element={<MyWishList/>} />
          </Route>
          <Route
            path="*"
            element={<Navigate to={localStorage.getItem("token") === null ? '/login' : '/home'} replace />}
          />
        </Routes>
      </div>
    </>
  );
}

export default Router;
