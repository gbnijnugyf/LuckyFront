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

// interface IConfirmPanelProps {
//   display: boolean;
//   action: IBtnActionObject;
//   btnText?: IBtnStateObject<string>;
//   children: ReactNode;
//   userInfoPreview?:()=>void//提前获取用户信息
// }

// export default function ConfirmPanel(props: IConfirmPanelProps) {
//   setTimeout(()=>props.display && props.userInfoPreview ?props.userInfoPreview():null)
  
  
//   return (
//     <div className="mask" style={{ display: props.display ? "flex" : "none" }}>
//       <div className="infoPanel">
//         <div className="textPanel">{props.children}</div>
//         <div className="confirmPanel">
//           <div className="confirmFalse" onClick={()=>{console.log("dianjiquxiao:"+props.action);props.action(false)}}>
//             {props.btnText?.no ? props.btnText?.no : "取消"}
//           </div>
//           <div className="confirmTrue" onClick={()=>{console.log("dianjiqueren");props.action(true)}}>
//             {props.btnText?.yes ? props.btnText?.yes : "确认"}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }