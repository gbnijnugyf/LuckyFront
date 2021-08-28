import React, { useState } from 'react'
import tagimg from './images/tag.svg'
import './index.css'



export default function Home(props) {

    const [tags, setTags] = useState([
        { name: '影音' },
        { name: '游戏' },
        { name: '美食' },
        { name: '学习' },
        { name: '运动' },
        { name: '交友' },
        { name: '打卡' },
        { name: '动漫' },
        { name: '其他' }])

    const goWishes = (tagName) => {
        props.history.push('/wish', { tagName })
    }

    const goSend = (tags) => {
        props.history.push('/send', { tags })
    }

    return (
        <div>
            {/* <Header></Header> */}
            <div className="tags">
                {/* <div className="tag"><img src={tag} alt="" /><p>影音</p></div>
                <div className="tag"><img src={tag} alt="" /><p>游戏</p></div>
                <div className="tag"><img src={tag} alt="" /><p>美食</p></div>
                <div className="tag"><img src={tag} alt="" /><p>学习</p></div>
                <div className="tag"><img src={tag} alt="" /><p>运动</p></div>
                <div className="tag"><img src={tag} alt="" /><p>交友</p></div>
                <div className="tag"><img src={tag} alt="" /><p>打卡</p></div>
                <div className="tag"><img src={tag} alt="" /><p>动漫</p></div>
                <div className="tag"><img src={tag} alt="" /><p>其它</p></div> */}
                {
                    tags.map((tag) => {
                        return <div onClick={() => goWishes(tag.name)} className="tag" key={tag.name}><img src={tagimg} alt="" /><p>{tag.name}</p></div>
                    })
                }
                <div className="send-button" onClick={() => goSend(tags)}>投递我的小幸运</div>
            </div>
        </div>
    )
}
