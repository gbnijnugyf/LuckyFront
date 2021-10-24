import "./index.scss"

export default function ConfirmPanel(props) {
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