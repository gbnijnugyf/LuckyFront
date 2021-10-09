import React from 'react'

import './index.scss'

export default function Button(props) {
    console.log(props);

    const handleSure = (content) => {
        props.handleAlert(content)
    }

    const { wishType } = props
    const otherWish = (
        <div className="otherWish" style={{ justifyContent: props.isSure ? 'center' : 'space-between' }}>
            <div className="giveUp" style={{ display: props.isSure ? 'none' : 'block' }} onClick={() => handleSure('确认放弃这个愿望吗?')} ></div>
            <div className="sure-other" style={{ display: props.isSure ? 'none' : 'block' }}
                onClick={() => handleSure(`确认已经实现这个愿望了嘛?\n若确认，我们将发邮件提醒TA来确认你已经实现了TA的愿望`)}></div>
            <div className="sured-other" style={{ display: props.isSure ? 'block' : 'none' }}></div>
        </div>
    )

    const myWish = (
        <div className="myWish">
            <div className={props.isSure ? 'deleted' : 'delete'} onClick={() => handleSure('确认要删除这个愿望')}>
            </div>
            <div className={props.isSure ? 'sured-my' : 'sure-my'} onClick={() => handleSure('确认愿望已经实现了吗')}>
            </div>
        </div>
    )


    return (
        <div>
            <div className="button">
                {wishType ? myWish : otherWish}
            </div>
            <div className="underline"></div>
        </div>
    )
}

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
