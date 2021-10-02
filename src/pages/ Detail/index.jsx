import React, { useState } from 'react'

import Button from '../../components/Button'

import './index.css'

const WishDetail = () => {
    return (
        <div className="wish">
            <p className='p-content'>啊啊啊啊我是一个愿望就随便写IE啦想看看换行啥的我受不了了好慢哲课怎么办吗啊我在开班会也忒无聊了再加点呗看看有没有写满哦吼哦吼哦吼</p>
            <div className="underline ud1"></div>
            <div className="underline ud2"></div>
            <div className="underline ud3"></div>
            <div className="underline ud4"></div>
            <p className='p-name'>
                来自&nbsp;&nbsp; 某同学
            </p>
            <p className='p-time'>2021.7.29 18: 24</p>
        </div>
    )
}

const PersonMsg = () => {
    return (
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
    )
}

const MsgBorad = (props) => {
    const { handleAlert } = props

    return (
        <div className='msg-borad'>
            <div className="msg-content">
                <p>你想要放弃这个愿望,</p>
                <p>建议给对方留言说明原因哦 ：</p>
                <br />
                <br />
                <div className='options'>
                    <div><input type="radio" name='msg' value='' /></div>
                    <p>刚刚误触了点亮按钮，不好意思啦～</p>
                </div>
                <br />
                <div className='options'>
                    <div> <input type="radio" name='msg' value='aa' /></div>
                    <p>最近有点忙，短时间没有精力实现愿望了，抱歉</p>
                </div>
                <br />
                <div className='options'>
                    <div><input type='radio' name='msg' value='aa' /></div>
                    <p>
                        留言给对方：
                        <input type="text" placeholder='输入其他原因' className='reson' />
                    </p>
                </div>
            </div>
            <div className='no-msg' onClick={() => handleAlert('不留言')}>不留言</div>
            <div className='sure-msg'>发送</div>
        </div>
    )
}


function Detail() {


    const [isAlert, setIsAlert] = useState(false) // 设置遮罩状态
    const [content, setContent] = useState({ text: '', isLong: false }) // 设置弹窗内容
    const [isSure, setIsSure] = useState(false) // 设置愿望状态
    const [borad, setBorad] = useState(false) //设置留言板

    // Effect里面判断该愿望是自己的还是其他人的愿望 然后拿到愿望的值渲染 这里应该不需要放state的  然后更改状态 通过props传入button组件
    const [wishType, setWishType] = useState(false)

    const handleAlert = (newContent) => {
        //  设置遮罩
        setIsAlert(!isAlert)
        // 判断弹窗内容设置样式
        if (typeof newContent === 'string') {
            if (newContent.length > 15) setContent({ text: newContent, isLong: true })
            else if (newContent === '不留言') {
                setIsAlert(false)
                setBorad(false)
            }
            else setContent({ text: newContent, isLong: false })
        }
        else if (typeof newContent === 'number' && newContent === 1)
            confirmSure()
    }

    const confirmSure = () => {
        switch (content.text) {
            case '确认已经实现这个愿望了嘛?\n若确认，我们将发邮件提醒TA来确认你已经实现了TA的愿望':
                setIsSure(true)
                break;

            case '确认放弃这个愿望吗?':
                setIsAlert(true)
                setBorad(true)
                break;

            case '确认要删除这个愿望':
                break;

            case '确认愿望已经实现了吗':
                break
            default:
        }
    }



    return (
        <div className='Detail'>
            <WishDetail />
            <div className='alert' style={{ display: isAlert ? 'block' : 'none' }}></div>
            {borad ? <MsgBorad handleAlert={handleAlert} /> : <div></div>}
            <div className="content"
                style={{ display: isAlert ? borad ? 'none' : 'block' : 'none' }}>
                <div className={content.isLong ? 'long-text' : 'text'}>
                    <span>{content.text}</span>
                </div>
                <div className="sure" onClick={() => handleAlert(1)}>确认</div>
                <div className="cancel" onClick={() => handleAlert(0)}>取消</div></div>
            <Button handleAlert={handleAlert} isSure={isSure} wishType={wishType} />
            <PersonMsg />
        </div>
    )
}





export default Detail
