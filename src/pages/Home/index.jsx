import React from 'react'
import tag from './images/tag.svg'
import './index.css'


export default function Home() {

    return (
        <div>
            {/* <Header></Header> */}
            <div className="tags">
                <div className="tag"><img src={tag} alt="" /></div>
                <div className="tag"><img src={tag} alt="" /></div>
                <div className="tag"><img src={tag} alt="" /></div>
                <div className="tag"><img src={tag} alt="" /></div>
                <div className="tag"><img src={tag} alt="" /></div>
                <div className="tag"><img src={tag} alt="" /></div>
                <div className="tag"><img src={tag} alt="" /></div>
                <div className="tag"><img src={tag} alt="" /></div>
                <div className="tag"><img src={tag} alt="" /></div>
                <div className="send-button">投递我的小幸运</div>
            </div>
        </div>
    )
}
