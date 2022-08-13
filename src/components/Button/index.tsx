// import React from 'react'

import './index.scss'

export interface IBtnL{
    onClick:()=>void,
    children:string|any   
}
export interface IBtnS{
    onClick:()=>void,
    style:{[key:string]:string},
    children:string|any
}

export function ButtonL(props:IBtnL) {

    return (
        <div className="button-large" onClick={props.onClick}>
            {props.children}
        </div>
    )
}

export function ButtonS(props:IBtnS) {

    return (
        <div className="button-small" onClick={props.onClick} style={props.style}>
            {props.children}
        </div>
    )
}
