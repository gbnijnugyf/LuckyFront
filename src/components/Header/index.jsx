import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import './index.css'
import rulebutton from './images/rulebutton.svg'
import backbutton from './images/backbutton.svg'
import logo from './images/logo.svg'

function Header(props) {
    const [isShow, setIsShow] = useState(false)
    const handleShow = () => {
        setIsShow(!isShow)
    }
    const handleBack = () => {
        // props.history.go(-1)
        console.log(props.history);
    }

    return (
        <div className='comp-header'>
            <div className="comp-header-text"><p>头部组件</p></div>
            <div className="rule-button" onClick={handleShow}><img src={rulebutton} alt="" /></div>
            <div className="back-button" onClick={handleBack}><img src={backbutton} alt="" /></div>
            <div className="logo"><img src={logo} alt=''></img></div>
            <div className="rule-alert" style={{ display: isShow ? 'block' : 'none' }}>
                <div className='rule-text'>
                    1.这次活动男生女生都可以许愿哦~<p>你一共有5次许愿的机会</p>，快来遇见你的小幸运吧~
                    <br />
                    2.将你的愿望打上标签，它会被投入相应的愿望池中，听说这样愿望更容易被兴趣相似的人发现哦~
                    <br />
                    3.选择不同的愿望分区进入，更容易找到直击你心灵的愿望哦~
                    <br />
                    4.<p>你有7次点亮心愿的机会</p>,可以通过点亮愿望池中随机出现的心愿，帮助TA实现这份小幸运~
                    <br />
                    5.点亮TA人心愿后可查看到TA的联系方式，便于帮助TA实现心愿~同时也也留下你的联系方式，方便TA联系你~
                    <br />
                    6<p>.一个愿望只有一次实现机会~</p>被点亮后将暂时不会出现在首页愿望池，被实现后将不会再出现在愿望池。
                    <br />
                    7.确认点亮他人愿望后，被你点亮的许愿人将能看到你的姓名等基本信息
                    <br />
                    8.<p>一次只能同时点亮2个愿望</p>，如果点亮了无法实现记得及时放弃实现。由对方确认实现了愿望才能接着点亮下一个哦。
                </div>
                <div className="close" onClick={handleShow}>我知道了</div>
            </div>
            <div className="cover" style={{ display: isShow ? 'block' : 'none' }} ></div>
        </div >
    )
}


export default withRouter(Header)