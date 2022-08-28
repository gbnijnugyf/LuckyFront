import { ReactNode } from "react";
import { IBtnActionObject, IBtnStateObject } from "../../pages/Detail";
import "./index.scss";
interface IConfirmPanelProps {
  display: boolean;
  action: IBtnActionObject;
  // action: IBtnStateObject<() => void>;
  btnText?: IBtnStateObject<string>;
  children: ReactNode;
}

export default function ConfirmPanel(props: IConfirmPanelProps) {
  return (
    <div className="mask" style={{ display: props.display ? "flex" : "none" }}>
      <div className="infoPanel">
        <div className="textPanel">{props.children}</div>
        <div className="confirmPanel">
          <div className="confirmFalse" onClick={()=>props.action.action(false)}>
            {props.btnText?.no !== "" ? props.btnText?.no : "取消"}
          </div>
          <div className="confirmTrue" onClick={()=>props.action.action(true)}>
            {props.btnText?.yes !== "" ? props.btnText?.yes : "确认"}
          </div>
        </div>
      </div>
    </div>
  );
}
