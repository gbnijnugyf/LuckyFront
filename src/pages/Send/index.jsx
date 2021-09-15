import React, { useState } from 'react'

import ink from './images/ink.svg'
import send from './images/send.png'
import tagimg from './images/tag.svg'

import './index.css'

export default function Send(props) {

    const [value, setValue] = useState('把你的小幸运放进小纸条吧~听说160字以内的愿望更容易实现哦~')
    const [nameValue, setNameValue] = useState('')
    const [numberValue, setNumberValue] = useState('')
    const [isTagShow, setIsTagShow] = useState(false)
    const [isAlert, setIsAlert] = useState(false)
    const [isCover, setIsCover] = useState(false)
    const [content, setContent] = useState('')
    const [tagName, setTagName] = useState('#选择标签')

    const { tags } = props.location.state || { }



    const handleTagName = (name) => {
        setIsCover(!isCover)
        setIsTagShow(!isTagShow)
        setTagName(name)

    }

    const handleIsAlert = (str) => {
        setIsAlert(!isAlert)
        setContent(str)
        setIsCover(!isCover)
        setTimeout(() => {
            setIsAlert(false)
            setIsCover(false)
        }, 1000)
    }

    const handleValue = (e) => {
        let newValue = e.target.value
        setValue(newValue)
        if (value.length > 160) {
            newValue = newValue.substr(0, 161);
            setValue(newValue)
            handleIsAlert('不能写下更多了哦')
        }

    }

    const handleNameValue = (e) => {
        setNameValue(e.target.value)
    }

    const handleNumberValue = (e) => {
        setNumberValue(e.target.value)
    }

    const handleInput = () => {
        if (numberValue === '')
            handleIsAlert('留下联系方式可以及时收获你的小幸运哦')
        else if (nameValue === '')
            handleIsAlert('你的小幸运还没有署名哦～')
        else
        props.history.push('/home')
    }

    const goSelectTag = () => {
        setIsCover(!isCover)
        setIsTagShow(!isTagShow)
    }



    return (
        <div>
            <div className='send'>
                <div className="alert" style={{ display: isCover ? 'block' : 'none' }} ></div>
                <div className="select-tag" style={{ display: isTagShow ? 'block' : 'none' }}>
                    <div className='tagcontent'>
                        {
                            tags.map((tag) => {
                                return <div onClick={() => handleTagName(tag.name)} className="tag" key={tag.name}><img src={tagimg} alt="" /><p>{tag.name}</p></div>
                            })
                        }
                    </div>
                </div>
                <div className="content" style={{ display: isAlert ? 'block' : 'none' }}><span>{content}</span></div>
                <div className="ink"><img src={ink} alt=''></img></div>
                <div className="sendbc">
                    <div className="input">
                        <textarea className='notes' value={value} onChange={handleValue}>
                        </textarea>
                        <div className="send-msg">
                            <div className="name">投递人  :<input type="text" placeholder='必填内容哦～' value={nameValue} onChange={handleNameValue} /></div>
                            <div className="number"><p>联系方式  :</p>
                                <select>
                                    <option value="QQ">QQ</option>
                                    <option value="WeChat">微信</option>
                                </select>
                                <input type="text" placeholder='必填内容哦～' onChange={handleNumberValue} /><br />
                                <p>或 Tel  : </p><input type="text" placeholder='选填内容哦～' style={{ marginLeft: '6vw' }} />
                            </div>
                            <h6>填写电话可以确保第一时间知道你的愿望状态哦~</h6>
                        </div>
                    </div></div>
                <div className="select" onClick={goSelectTag}>{tagName}</div>
                <div className="tosend" onClick={handleInput}><img src={send} alt="" /></div>
            </div>
        </div >

    )
}
