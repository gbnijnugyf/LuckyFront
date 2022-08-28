// import React from 'react'

import { ReactNode } from "react";
import { JsxElement } from "typescript";
import "./index.scss";

interface IBtnL {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
}
interface IBtnS {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style: { [key: string]: string };
  children: ReactNode;
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
    <div className="button-small" onClick={props.onClick} style={props.style}>
      {props.children}
    </div>
  );
}
