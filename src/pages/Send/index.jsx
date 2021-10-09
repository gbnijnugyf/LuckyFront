import React, { useState } from 'react'

import Service from '../../common/service'
import ink from './images/ink.svg'
import send from './images/send.png'
import tagimg from './images/tag.svg'

import './index.scss'

const WishInput = (props) => {

    const { handleIsAlert, content } = props

    const [value, setValue] = useState('把你的小幸运放进小纸条吧~听说160字以内的愿望更容易实现哦~') //控制 textarea
    const [name, setName] = useState('') //控制 name input
    const [select, setSelect] = useState('QQ')// 控制select
    const [qqOrWechat, setqqOrWechat] = useState('') //控制 QQorWechat的值
    const [tel, setTel] = useState('')

    // 处理填写愿望的字数限制
    const handleValue = (e) => {
        let newValue = e.target.value
        setValue(newValue)
        if (value.length > 160) {
            newValue = newValue.substr(0, 161);
            setValue(newValue)
            handleIsAlert('不能写下更多了哦')
        }

    }
    // 处理 name input
    const handleName = (e) => {
        setName(e.target.value)
    }
    // 处理选择内容
    const handleSelect = (e) => {
        setSelect(e.target.value)
    }
    // 处理 QQ or Wechat
    const handleQqOrWechat = (e) => {
        setqqOrWechat(e.target.value)
    }
    // 处理电话号码
    const handleTel = (e) => {
        setTel(e.target.value)
    }
    // 处理点击发送后的提交失败/成功
    const handleInput = () => {
        if (qqOrWechat === '')
            handleIsAlert('留下联系方式可以及时收获你的小幸运哦')
        else if (name === '')
            handleIsAlert('你的小幸运还没有署名哦～')

        else {
            if (select === 'QQ') Service.postWish(name, qqOrWechat, '', tel, content)
            else Service.postWish(name, '', qqOrWechat, tel, content)
        }
    }


    return (
        <div className="sendbc">
            <textarea className='notes' value={value} onChange={handleValue}>
            </textarea>
            <div className="send-msg">
                <div className="name">投递人  :<input type="text" placeholder='必填内容哦～' value={name} onChange={handleName} /></div>
                <div className="number"><p>联系方式  :</p>
                    <select onChange={handleSelect}>
                        <option value="QQ">QQ</option>
                        <option value="WeChat">微信</option>
                    </select>
                    <input type="text" placeholder='必填内容哦～' value={qqOrWechat} onChange={handleQqOrWechat} /><br />
                    <p>或 Tel  : </p><input type="text" placeholder='选填内容哦～' onChange={handleTel} style={{ marginLeft: '6vw' }} />
                </div>
                <h6>填写电话可以确保第一时间知道你的愿望状态哦~</h6>
            </div>
            <div className="tosend" onClick={handleInput}><img src={send} alt="" /></div>
        </div>
    )
}


export default function Send(props) {


    const [isTagShow, setIsTagShow] = useState(false) //控制选择标签弹窗
    const [isAlert, setIsAlert] = useState(false)// 控制警示弹窗(没填信息会弹出来)
    const [isCover, setIsCover] = useState(false)// 控制遮罩
    const [content, setContent] = useState('')// 控制弹窗内容
    const [tagName, setTagName] = useState('#选择标签') //控制选择标签后的显示

    // 获得标签列表
    const { tags } = props.location.state || {}


    // 处理选择标签的点击事件
    const handleTagName = (name) => {
        setIsCover(!isCover)
        setIsTagShow(!isTagShow)
        setTagName(name)

    }

    // 处理弹窗警告
    const handleIsAlert = (str) => {
        setIsAlert(!isAlert)
        setContent(str)
        setIsCover(!isCover)
        setTimeout(() => {
            setIsAlert(false)
            setIsCover(false)
        }, 1000)
    }

    // 打开选择标签页
    const goSelectTag = () => {
        setIsCover(!isCover)
        setIsTagShow(!isTagShow)
    }

    return (
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
            <div className="select" onClick={goSelectTag}>{tagName}</div>
            <WishInput handleIsAlert={handleIsAlert} content={content} />
        </div>
    )
}
