import React from 'react'
import tag from './images/tag.svg'
import './index.css'


export default function Home(props) {

    const goSend = () => {
        props.history.push('/send')
    }

    return (
        <div>
            {/* <Header></Header> */}
            <div className="tags">
                <div className="tag"><img src={tag} alt="" /><p>影音</p></div>
                <div className="tag"><img src={tag} alt="" /><p>游戏</p></div>
                <div className="tag"><img src={tag} alt="" /><p>美食</p></div>
                <div className="tag"><img src={tag} alt="" /><p>学习</p></div>
                <div className="tag"><img src={tag} alt="" /><p>运动</p></div>
                <div className="tag"><img src={tag} alt="" /><p>交友</p></div>
                <div className="tag"><img src={tag} alt="" /><p>打卡</p></div>
                <div className="tag"><img src={tag} alt="" /><p>动漫</p></div>
                <div className="tag"><img src={tag} alt="" /><p>其它</p></div>
                <div className="send-button" onClick={goSend}>投递我的小幸运</div>
            </div>
        </div>
    )
}
