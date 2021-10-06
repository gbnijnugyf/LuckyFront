import React, { useState } from 'react'

import ink from './images/ink.svg'
import tagimg from './images/tag.svg'
import { ButtonS } from '../../components/Button'
import paperplane from '../../static/images/paperplane.svg'
import './index.scss'



export default function Send(props) {


    const [isTagShow, setIsTagShow] = useState(false) //控制选择标签弹窗
    const [isAlert, setIsAlert] = useState(false)// 控制警示弹窗(没填信息会弹出来)
    const [isCover, setIsCover] = useState(false)// 控制遮罩
    const [content, setContent] = useState('')// 控制弹窗内容
    const [tagName, setTagName] = useState('# 选择标签') //控制选择标签后的显示

    // 获得标签列表
    // TODO bug
    const tags = [{}]


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

    const WishInput = (props) => {

        const { handleIsAlert } = props

        const [value, setValue] = useState('把你的小幸运放进小纸条吧~听说160字以内的愿望更容易实现哦~') //控制 textarea
        const [nameValue, setNameValue] = useState('') //控制 name input
        const [numberValue, setNumberValue] = useState('') //控制 number input


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
        const handleNameValue = (e) => {
            setNameValue(e.target.value)
        }

        // 处理 number input
        const handleNumberValue = (e) => {
            setNumberValue(e.target.value)
        }

        // 处理点击发送后的提交失败/成功
        const handleInput = () => {
            if (numberValue === '')
                handleIsAlert('留下联系方式可以及时收获你的小幸运哦')
            else if (nameValue === '')
                handleIsAlert('你的小幸运还没有署名哦～')
            else
                props.history.push('/home')
        }

        return (
            <div className="sendbc">
                <ButtonS onClick={goSelectTag} style={{
                    background: "white",
                    "font-family": "MicrosoftJhengHeiUIRegular, Microsoft JhengHei UI",
                    "color": "#f25125",
                    "align-self": "flex-end",
                    "margin": "2em 3em 0 0",
                    "font-size": "medium"
                }}>
                    {tagName}
                </ButtonS>
                <textarea className='notes' value={value} onChange={handleValue}>
                </textarea>
                <div className="send-msg">
                    <div className="name">投递人  :<input type="text" placeholder='必填内容哦～' value={nameValue} onChange={handleNameValue} /></div>
                    <div className="number"><p>联系方式  :</p>
                        <select>
                            <option value="QQ">QQ</option>
                            <option value="WeChat">微信</option>
                        </select>
                        <input type="text" placeholder='必填内容哦～' value={numberValue} onChange={handleNumberValue} /><br />
                        <p>或 Tel  : </p><input type="text" placeholder='选填内容哦～' style={{ marginLeft: '6vw' }} />
                    </div>
                    <h6>填写电话可以确保第一时间知道你的愿望状态哦~</h6>
                </div>
                <ButtonS onClick={handleInput} style={{ background: "white", "color": "#f25125" }}>
                    <img src={paperplane} alt="" style={{"padding-bottom":"0.2em"}} /> 完成
                </ButtonS>
            </div >
        )
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
            <WishInput handleIsAlert={handleIsAlert} />
        </div>
    )
}
