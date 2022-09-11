import { ReactNode } from "react";
import { IBtnActionObject, IBtnStateObject } from "../../pages/Detail";
import "./index.scss";

interface IConfirmPanelProps {
  display: boolean;
  // action: IAction;
  action: IBtnActionObject;
  btnText?: IBtnStateObject<string>;
  children: ReactNode;
  onChangeOther?:()=>void//其他渲染
}

export default function ConfirmPanel(props: IConfirmPanelProps) {
  setTimeout(()=>props.display && props.onChangeOther ?props.onChangeOther():null)//其他渲染
  
  
  return (
    <div className="mask" style={{ display: props.display ? "flex" : "none" }}>
      <div className="infoPanel">
        <div className="textPanel">{props.children}</div>
        <div className="confirmPanel">
          <div className="confirmFalse" onClick={()=>{props.action.no()}}>
            {props.btnText?.no ? props.btnText?.no : "取消"}
          </div>
          <div className="confirmTrue" onClick={()=>{props.action.yes()}}>
            {props.btnText?.yes ? props.btnText?.yes : "确认"}
          </div>
        </div>
      </div>
    </div>
  );
}
