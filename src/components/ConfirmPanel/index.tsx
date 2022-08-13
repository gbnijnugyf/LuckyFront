import "./index.scss"

export interface IConfirmPanelProps{
    display:boolean,
    action:string|any,//动态添加属性yes、no？？详见此文件行18、19、22
    btnText:string|any,//
    children:string|any
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
                        {props.btnText?.no ? props.btnText.no : "取消"}
                    </div>
                    <div className="confirmTrue" onClick={props.action.yes}>
                        {props.btnText?.yes ? props.btnText.yes : "确认"}
                    </div>
                </div>
            </div>

        </div>
    )
}