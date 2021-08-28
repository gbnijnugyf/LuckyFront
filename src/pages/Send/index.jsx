import React, { useState } from 'react'

import ink from './images/ink.svg'
import send from './images/send.svg'
import tagimg from './images/tag.svg'

import './index.css'

export default function Send(props) {

    const [value, setValue] = useState('把你的小幸运放进小纸条吧~听说160字以内的愿望更容易实现哦~')
    // const [isAlert, setIsAlert] = useState(false)
    const [isCover, setIsCover] = useState(false)
    // const [content, setContent] = useState('')
    const [tagName, setTagName] = useState('#选择标签')

    const { tags } = props.location.state || { }



    const handleTagName = (name) => {
        setIsCover(!isCover)
        setTagName(name)
    }

    // const handleIsAlert = (str) => {
    //     setIsAlert(!isAlert)
    //     setContent(str)
    // }

    const handleValue = (e) => {
        let value = e.target.value
        setValue(value)
    }

    const goSelectTag = () => {
        setIsCover(!isCover)
    }



    return (
        <div>
            <div className='send'>
                <div className="alert" onClick={goSelectTag} style={{ display: isCover ? 'block' : 'none' }} ></div>
                <div className="select-tag" style={{ display: isCover ? 'block' : 'none' }}>
                    <div className='tagcontent'>
                        {
                            tags.map((tag) => {
                                return <div onClick={() => handleTagName(tag.name)} className="tag" key={tag.name}><img src={tagimg} alt="" /><p>{tag.name}</p></div>
                            })
                        }
                    </div>
                </div>
                {/* <div className="content" style={{ display: isAlert ? 'block' : 'none' }}>{content}</div> */}
                <div className="ink"><img src={ink} alt=''></img></div>
                <div className="sendbc">
                    <div className="input">
                        <textarea className='notes' value={value} onChange={handleValue}>
                        </textarea>
                        <div className="send-msg">
                            <div className="name">投递人  :<input type="text" placeholder='必填内容哦～' /></div>
                            <div className="number"><p>联系方式  :</p>
                                <select>
                                    <option value="QQ">QQ</option>
                                    <option value="WeChat">微信</option>
                                </select>
                                <input type="text" placeholder='必填内容哦～' /><br />
                                <p>或 Tel  : </p><input type="text" placeholder='选填内容哦～' />
                            </div>
                            <h6>填写电话可以确保第一时间知道你的愿望状态哦~</h6>
                        </div>
                    </div></div>
                <div className="select" onClick={goSelectTag}>{tagName}</div>
                <div className="tosend"><img src={send} alt="" /></div>
            </div>
        </div >

    )
}
