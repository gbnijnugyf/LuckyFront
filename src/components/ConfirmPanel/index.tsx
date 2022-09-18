import { useEffect } from "react";
import { ReactNode } from "react";
import "./index.scss";

interface IConfirmPanelProps {
  display: boolean;
  onChoose: (response: boolean) => void;
  btnTextYes?: string;
  btnTextNo?: string;
  children: ReactNode;
  // 当 display 由 false 变 true 时触发
  onShow?: () => void;
}

export default function ConfirmPanel(props: IConfirmPanelProps) {
  const {
    display,
    onChoose,
    btnTextYes = "确认",
    btnTextNo = "取消",
    children,
    onShow = () => {},
  } = props;
  // TODO: 需要测试
  useEffect(() => {
    if (display) onShow();
  }, [display, onShow]);
  return (
    <div className="mask" style={{ display: display ? "flex" : "none" }}>
      <div className="infoPanel">
        <div className="textPanel">{children}</div>
        <div className="confirmPanel">
          <div
            className="confirmFalse"
            onClick={() => {
              onChoose(false);
            }}
          >
            {btnTextNo}
          </div>
          <div
            className="confirmTrue"
            onClick={() => {
              onChoose(true);
            }}
          >
            {btnTextYes}
          </div>
        </div>
      </div>
    </div>
  );
}
