import { ReactNode } from "react";
import "./index.scss";
import "./btndif.scss"

interface IBtnL {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
}
interface IBtnS {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: { [key: string]: string };
  children: ReactNode;
  id?:string
}

export function ButtonL(props: IBtnL) {
  return (
    <div className="button-large" onClick={props.onClick}>
      {props.children}
    </div>
  );
}

export function ButtonS(props: IBtnS) {
  return (
    <div className="button-small" id={props.id} onClick={props.onClick} style={props.style}>
      {props.children}
    </div>
  );
}
