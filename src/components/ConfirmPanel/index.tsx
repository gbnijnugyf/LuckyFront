import { ReactNode } from "react";
import { IBtnStateObject } from "../../pages/Detail";
import "./index.scss";
interface IConfirmPanelProps {
  display: boolean;
  action: IBtnStateObject<() => void>;
  btnText?: IBtnStateObject<string>;
  children: ReactNode;
}

export default function ConfirmPanel(props: IConfirmPanelProps) {
  return (
    <div className="mask" style={{ display: props.display ? "flex" : "none" }}>
      <div className="infoPanel">
        <div className="textPanel">{props.children}</div>
        <div className="confirmPanel">
          <div className="confirmFalse" onClick={props.action.no}>
            {props.btnText?.no !== "" ? props.btnText?.no : "取消"}
          </div>
          <div className="confirmTrue" onClick={props.action.yes}>
            {props.btnText?.yes !== "" ? props.btnText?.yes : "确认"}
          </div>
        </div>
      </div>
    </div>
  );
}
