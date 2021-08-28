import React, { useState } from 'react'

import Button from '../../components/Button'

import './index.css'


export default function Detail() {

    const [isAlert, setIsAlert] = useState(false)
    const [content, setContent] = useState('')

    const handleAlert = (newcontent) => {

        setIsAlert(!isAlert)

        if (newcontent !== '')
            setContent(newcontent)

    }



    return (
        <div className='Detail'>
            <div className="wish"></div>
            {/* <div className="button">
                <div className="delete"></div>
                <div className="sure"></div>
            </div>
            <div className="underline"></div> */}
            <div className='alert' style={{ display: isAlert ? 'block' : 'none' }}></div>
            <div className="content" style={{ display: isAlert ? 'block' : 'none' }}><div className="text"><p>{content}</p></div><div className="sure" onClick={() => handleAlert('')}>确认</div><div className="cancel" onClick={() => handleAlert('')}>取消</div></div>
            <Button handleAlert={handleAlert} />
            <div className="msg"></div>
        </div>
    )
}
