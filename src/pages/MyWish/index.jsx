import "./index.scss";
import React, { useEffect, useState } from "react";
import { Empty } from "./empty.jsx";
import { MyWishList } from "./list";
import Service from "../../common/service";
import { Link, Route, Routes } from "react-router-dom";

const Index = (props) => {
  const [wishPost, setWishPost] = useState([]);
  const [wishLight, setWishLight] = useState([]);
  const [gotPost, setGotPost] = useState(false);
  const [gotLight, setGotLight] = useState(false);
  useEffect(() => {
    Service.getUserWishPost().then((res) => {
      setWishPost(res.data);
      setGotPost(true);
    });
  }, []);
  useEffect(() => {
    Service.getUserWishLight().then((res) => {
      setWishLight(res.data);
      setGotLight(true);
    });
  }, []);
  useEffect(() => {
    if (gotPost && gotLight) {
      if (wishPost?.length === 0 && wishLight?.length === 0) {
      }
      // props.history.push("/mywish/empty");
      else {
      } // props.history.push("/mywish/list", { wishPost, wishLight });{}
    }
  }, [gotLight, gotPost, props.history, wishLight, wishPost]);

  return <></>;
};

export default function MyWish(props) {
  return (
    <div>
      <Routes>
        <Route path="/mywish/index" component={Index} />
        <Route path="/mywish/empty" component={Empty} />
        <Route path="/mywish/list" component={MyWishList} />
        <Link to="/mywish/index" />
      </Routes>
    </div>
  );
}
