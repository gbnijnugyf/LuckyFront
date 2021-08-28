import React from 'react'

import './index.css'

export default function Button(props) {
    const handleSure = (content) => {
        props.handleAlert(content)
    }

    return (
        <div>
            <div className="button">
                <div className="delete" onClick={() => handleSure('确认要删除这个愿望')}></div>
                <div className="sure" onClick={() => handleSure('确认愿望已经实现了吗')}></div>
            </div>
            <div className="underline"></div>
        </div>
    )
}
