import React, { useState } from 'react'

import Service from '../../common/service'
import ink from '../../static/images/ink.svg'
import { tags } from '../../config/Global'
import { ButtonS } from '../../components/Button'
import paperplane from '../../static/images/paperplane.svg'
import './index.scss'

export default function Send(props) {

    const [showTag, setShowTag] = useState(false) //控制标签弹窗
    const [tagName, setTagName] = useState('选择标签') //控制选择标签后的显示
    const [wishContent, setWishContent] = useState('把你的小幸运放进小纸条吧~听说160字以内的愿望更容易实现哦~') //控制 textarea
    const [nameValue, setNameValue] = useState('') //控制 name input
    const [numberValue, setNumberValue] = useState('') //控制 number input
    const [tel, setTel] = useState('') // 控制tel input
    const [selectValue, setSelectValue] = useState('QQ')// 控制select的值
    const [categories, setCategories] = useState(9) // 控制愿望分类
    // 处理填写愿望的字数限制
    const handleWishContent = (e) => {
        if (e.target.value.length > 160) {
            setWishContent(e.target.value.substr(0, 161));
            alert('不能写下更多了哦')
        }
        setWishContent(e.target.value)
    }
    // 处理 name input
    const handleNameValue = (e) => {
        setNameValue(e.target.value)
    }
    // 处理 number input
    const handleNumberValue = (e) => {
        setNumberValue(e.target.value)
    }
    // 处理 tel input
    const handleTelValue = (e) => {
        setTel(e.target.value)
    }
    // 处理 select options
    const handleSelectValue = (e) => {
        setSelectValue(e.target.value)
    }
    // 处理点击发送后的提交失败/成功
    const goSubmit = () => {
        // 判断必填项
        if (nameValue === '') {
            alert('你的小幸运还没有署名哦～')
        } else if (numberValue === '')
            alert('留下联系方式可以及时收获你的小幸运哦')
        else {
            switch (selectValue) {
                case 'QQ':
                    Service.postWish(nameValue, numberValue, "", tel, wishContent, categories)
                        .then(props.history.push('/home'))
                    break;
                case '微信':
                    Service.postWish(nameValue, "", numberValue, tel, wishContent, categories)
                        .then(props.history.push('/home'))
                    break;
                default:
            }
        }
    }
    // 处理选择标签的点击事件
    const changeTagName = (name) => {
        setShowTag(false)
        setTagName(name)
        tags.forEach((tag) => {
            if (tag.name === name) setCategories(tag.category)
        })
    }
    // 打开选择标签页
    const goSelectTag = () => {
        setShowTag(true)
    }
    return (
        <div className='send'>
            <div className="mask" style={{ display: showTag ? 'flex' : 'none' }} >
                <div className="tags">{
                    tags.map((tag) => {
                        return (
                            <div onClick={() => changeTagName(tag.name)} className="tag" key={tag.name}>
                                <p>{tag.name}</p>
                            </div>)
                    })
                }</div>
            </div>
            <div className="sendbc">
                <img className="ink" src={ink} alt="" />
                <ButtonS onClick={goSelectTag} style={{
                    background: "white",
                    fontFamily: "MicrosoftJhengHeiUIRegular, Microsoft JhengHei UI",
                    color: "#f25125",
                    alignSelf: "flex-end",
                    margin: "2em 2em 0 0",
                    fontSize: "medium"
                }}>
                    {"# " + tagName}
                </ButtonS>
                <textarea className='notes' placeholder={wishContent} onChange={handleWishContent}></textarea>
                <div className="send-msg">
                    <div className="name">
                        <p>投递人：</p>
                        <input type="text" placeholder='必填内容哦～' value={nameValue} onChange={handleNameValue} />
                    </div>
                    <div className="number">
                        <p>联系方式：</p>
                        <select value={selectValue} onChange={handleSelectValue}>
                            <option value="QQ">QQ</option>
                            <option value="WeChat">微信</option>
                        </select>
                        <input type="text" id="connect" placeholder='必填内容哦～' value={numberValue} onChange={handleNumberValue} /><br />
                        <p>或 Tel：</p>
                        <input type="text" id="tel" placeholder='选填内容哦～' value={tel} onChange={handleTelValue} style={{ marginLeft: '2em' }} />
                    </div>
                </div>
                <h6>填写电话可以确保第一时间知道你的愿望状态哦~</h6>
                <ButtonS onClick={goSubmit} style={{ background: "white", color: "#f25125", margin: "0.5em 0" }}>
                    <img src={paperplane} alt="" style={{ paddingBottom: "0.2em" }} /> 完成
                </ButtonS>
            </div >
        </div>
    )
}
