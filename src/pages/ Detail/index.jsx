import React, { useState } from 'react'

import Button from '../../components/Button'

import './index.css'


export default function Detail() {

    const [isAlert, setIsAlert] = useState(false)
    const [content, setContent] = useState('')
    const [isSure, setIsSure] = useState(false)
    const [isLong, setIsLong] = useState(false)
    // const [msg, setMsg] = useState({name:'旷旷',time:'2021-09-01 00:00', contact:{}})

    const handleAlert = (newContent) => {

        setIsAlert(!isAlert)
        if (typeof newContent === 'string'){
            if(newContent.length > 15)
                setIsLong(true)
            else 
                setIsLong(false)
            setContent(newContent)
        }
        else if (typeof newContent === 'number' && newContent === 1)
            confirmSure()
    }

    const confirmSure = () => { 
        setIsSure(true)
     }



    return (
        <div className='Detail'>
            <div className="wish"></div>
            <div className='alert' style={{ display: isAlert ? 'block' : 'none' }}></div>
            <div className="content"
                style={{ display: isAlert ? 'block' : 'none' }}>
                <div className={isLong?'long-text':'text'}>
                    <span>{content}</span>
                </div>
                <div className="sure" onClick={() => handleAlert(1)}>确认</div>
                <div className="cancel" onClick={() => handleAlert(0)}>取消</div></div>
            <Button handleAlert={handleAlert} isSure={isSure}/>
            <div className="msg">
                <div className="msg-text">
                    <p className='h'>许愿人</p>
                    <p className='name'>某某A</p>
                </div> 
                <div className="msg-number">
                    <p>于 2021-09-01&nbsp;&nbsp;00:00 许愿</p>
                    <p>联系方式 : QQ : 1204312199</p>
                    <p>电话 : 82088208820</p>
                </div>
            </div>
        </div>
    )
}
