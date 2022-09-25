import { useNavigate } from "react-router-dom";
import "./index.scss";

export function Notfound() {
  const navigate = useNavigate();


  setTimeout(() => {
    navigate("/detail/list");
  }, 3000)



  return (
    <>
    {/* <div className="nav">5s后自动跳转</div> */}
      <p className="notfound">
        这个愿望不见了呢
        <br />~
      </p>
    </>
  );
}

export default Notfound;
