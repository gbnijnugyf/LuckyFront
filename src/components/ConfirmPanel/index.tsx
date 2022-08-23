//TS_rebuild
// import { MouseEventHandler, ReactNode } from "react";
// import "./index.scss";

// type Choice = "yes" | "no";
// export interface IConfirmPanelProps {
//   display: boolean;
//   action: Partial<Record<Choice, MouseEventHandler<HTMLDivElement>>>;
//   btnText: Partial<Record<Choice, string>>;
//   children?: ReactNode;
// }

// export default function ConfirmPanel(props: IConfirmPanelProps) {
//   const { display, action, btnText, children } = props;
//   return (
//     <div className="mask" style={{ display: display ? "flex" : "none" }}>
//       <div className="infoPanel">
//         <div className="textPanel">{children}</div>
//         <div className="confirmPanel">
//           <div className="confirmFalse" onClick={action.no}>
//             {btnText.no ?? "取消"}
//           </div>
//           <div className="confirmTrue" onClick={action.yes}>
//             {btnText.yes ?? "确认"}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


//ts暂时没改好，测试用jsx
//to do -- 用于detail，TS不好改，估计也得重写
import { ReactNode } from "react"
import { IBtnStateObject } from "../../pages/Detail/index2"
import "./index.scss"
interface IConfirmPanelProps{
    display:boolean,
    action:IBtnStateObject<() => void>,
    btnText?:IBtnStateObject<string>,
    children:ReactNode
}

export default function ConfirmPanel(props:IConfirmPanelProps) {
    return (
        <div className="mask" style={{ display: props.display ? 'flex' : 'none' }}>
            <div className="infoPanel">
                <div className="textPanel">
                    {props.children}
                </div>
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
    )
}