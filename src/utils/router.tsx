import { useEffect } from "react";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Send from "../pages/Send";
import cookie from "react-cookies";
import Detail from "../pages/Detail";
import { Notfound } from "../pages/Detail/notfound";
import Wishes from "../pages/Wishes";
import Header from "../components/Header";
import { Empty } from "../pages/MyWish/empty";
import { MyWishList } from "../pages/MyWish/list";
import { LoginMain } from "../pages/Login/index";
import { BindEmail, LoginCCNU } from "../pages/Login/loginSchools";

import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { LoginWhut } from "../pages/Login/WhutLogin";
import { Register } from "../pages/Register";
import "./router.scss";
import { FindPwd } from "../pages/Login/WhutFindPwd";

function Router() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    let token = cookie.load("jwt_token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/tagscreen/home", {state:{school:"unknown"}});
    }
    if (
      !localStorage.getItem("token") &&
      !location.pathname.startsWith("/login")
    ) {
      navigate("/login");
    }
  }, [navigate, location]);

  return (
    <>
      {/* TODO fixthis */}
      <div className="bg">
        {/* TODO:content增加定高，定高待计算 */}
        <div className="content">
          <Routes>
            {/*小幸运2.0之路由重构*/}
            {/* 启动页面 */}
            <Route path="login/*" element={<Login />}>
              <Route path="ccnu" element={<LoginCCNU />} />
              <Route path="bindemail" element={<BindEmail />} />
              <Route path="whut" element={<LoginWhut />} />
              <Route path="whut/whutRegister" element={<Register />} />
              <Route path="whut/whutFindPwd" element={<FindPwd />} />
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
              <Route path="empty" element={<Empty />} />
              <Route path="list" element={<MyWishList />} />
              <Route path="notfound" element={<Notfound />} />
              <Route path="*" element={<Detail />} />
            </Route>
            <Route
              index
              element={
                <Navigate
                  to={
                    localStorage.getItem("token") === null
                      ? "/login"
                      : "/tagscreen/home"
                  }
                  state={{school:"ccnu"}}
                  replace
                />
              }
            />
            <Route
              path="*"
              element={
                <Navigate
                  to={
                    localStorage.getItem("token") === null
                      ? "/login"
                      : "/detail/notfound"
                  }
                  replace
                />
              }
            />
          </Routes>
        </div>
        <Header></Header>
      </div>
    </>
  );
}

export default Router;
