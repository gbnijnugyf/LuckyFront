import React from 'react'

import './index.scss'


export function ButtonL(props) {

    return (
        <div className="button-large" onClick={props.onClick}>
            {props.children}
        </div>
    )
}

export function ButtonS(props) {

    return (
        <div className="button-small" onClick={props.onClick} style={props.style}>
            {props.children}
        </div>
    )
}
