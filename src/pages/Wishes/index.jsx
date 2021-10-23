import React, { useState, useEffect } from 'react'
import ConfirmPanel from '../../components/ConfirmPanel'
import { ButtonS } from '../../components/Button'
import calendar from '../../static/images/calendar.svg'
import leaf from '../../static/images/leaf.svg'
import Service from '../../common/service'
import './index.scss'

const WishItem = (props) => {
    return (
        <div key={props.wish.wishman_name} className="wish-item" style={props.style}
            onTouchStart={props.onTouchStart} onTouchMove={props.onTouchMove} onTouchEnd={props.onTouchEnd} >
            <img src={leaf} className="wish-img" alt="" />
            <div className="underline"></div>
            <div className="underline"></div>
            <div className="underline"></div>
            <div className="underline"></div>
            <p className="content">{props.wish.wish}</p>
            <div className="msg">
                <p>{props.wish.school === 0 ? '华小师' : '武小理'}</p>
                <p>{props.wish.wishman_name}</p>
            </div>
        </div>

    )
}



export default function Wishes(props) {
    // 拿着这个分类去发请求
    const { category } = props.location.state

    const moveState = { img1: 0, img2: 10, img3: 20 }
    const [move, setMove] = useState(moveState) // 树叶动画相关状态
    const [startX, setStartX] = useState() // 树叶动画相关状态
    const [update, setUpDate] = useState(false) // 控制动画以及愿望内容的更新
    const [appear, setAppear] = useState({ cover: false, input: false, alert: false })
    const [display, setDisplay] = useState(false);// 弹出确认框
    const [light, setLight] = useState(false)
    const [wishes, setWishes] = useState(
        [{ "id": 0, "content": "nihaonihao1nihaonihao1nihaonihao1nihaonihao1nihaonihao1nihaonihao1", "school": "爸大", "name": "tcy" },
        { "id": 1, "content": "nihaonihao2", "school": "爸大", "name": "tcy" },
        { "id": 2, "content": "nihaonihao3", "school": "爸大", "name": "tcy" },
        { "id": 3, "content": "nihaonihao3", "school": "爸大", "name": "tcy" }
        ]
    )
    const [name, setName] = useState()
    const [number, setNumber] = useState()
    useEffect(() => {
        Service.getWishByCategories(category).then((res) => {
            setWishes(res.data)
      }) 
    },[category])
    const handleName = (e) => {
        setName(e.target.value)
    }
    const handleNumber = (e) => {
        setNumber(e.target.value)
    }
    // Start/Move/End 都是控制愿望刷新动画的相关函数
    const onTouchStart = (e) => {
        const touch = e.targetTouches[0]
        setStartX({ start: touch.pageX, move: '' })

    }
    const onTouchMove = (e) => {
        const touch = e.targetTouches[0]
        const move_X = ((touch.pageX - startX.start) / 5)
        setStartX(startX)
        setMove({ img1: move_X, img2: 10, img3: 20 })
    }
    const onTouchEnd = () => {
        setUpDate(true)
        if (move.img1 < -25) {
            setMove({ img1: -90, img2: 0, img3: 10 })
        }
        else if (move.img1 > 20) {
            setMove({ img1: 90, img2: 0, img3: 10 })
        }
        else {
            setMove({ img1: 0, img2: 10, img3: 20 })
            return
        }
        // 刷新愿望
        setTimeout(() => {
            setUpDate(false)
            let newWishSource = wishes
            newWishSource.push(newWishSource[0])
            newWishSource.splice(0, 1)
            setWishes(newWishSource)
            // 刷新动画
            setMove(moveState)
            // if (wishes.length <= 2) {
            //     setRely(!rely) // 原本的意思就是愿望刷新就剩2个改变依赖调用hooks再发送一次请求刷新愿望列表
            // }
        }, 200)
    }
    // 查看我的点亮
    const goMyWish = () => {
        props.history.push('/mywish')
    }
    const SendMessage = () => {
        //TODO: 发送逻辑
        handleAlert();
    }
    // 处理遮罩
    const handleAlert = () => {
        setLight(false);
        setDisplay(false);
    }
    // 处理点亮愿望
    const handleLight = () => {
        setLight(true);
    }
    const showConfirm = () => {
        setDisplay(true);
    }

    return (
        <div className='wishpage'>

            <ConfirmPanel display={display} action={{ "yes": light ? SendMessage : handleLight, "no": handleAlert }} >
                {light ? (
                    <div className="input-msg" >
                        <p className='info'>填写联系方式，方便他来联系你哦～</p>
                        <div className="form">
                            <div className="name">
                                投递人 :
                                <input type="text" placeholder='必填内容哦～' onChange={handleName} value={name} style={{ marginLeft: "2em" }} />
                            </div>
                            <div className="number">
                                联系方式 :
                                <select style={{ color: 'rgb(239, 96, 63)' }}>
                                    <option value="QQ">QQ</option>
                                    <option value="WeChat">微信</option>
                                </select>
                                <input type="text" placeholder='必填内容哦～' onChange={handleNumber} value={number} style={{ marginLeft: ".3em", width: "30%" }} />
                            </div>
                            <div className="tel">
                                或 Tel :
                                <input type="text" placeholder='选填内容哦～' style={{ marginLeft: '2.3em' }} />
                            </div>
                        </div>
                    </div>
                ) : <p style={{ fontSize: "medium" }}>确认要帮TA实现这个愿望吗</p>}
            </ConfirmPanel>

            <ButtonS
                onClick={goMyWish}
                style={{
                background: "#F59D65",
                color: "white",
                marginTop: "13em",
                alignSelf: "flex-start",
                padding: "0.4em 0.7em",
                fontSize: "medium"
            }}>
                <img style={{ transform: "scale(3) translate(2%, 12%)" }} src={calendar} alt="" />
                查看我的点亮
            </ButtonS>
            <div className='wishes'>
                <WishItem className="wish-img"
                    wish={wishes[0]}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    style={{
                        left: `${move.img1}vw`,
                        transition: update ? 'all 0.2s' : 'none',
                        zIndex: "101"
                    }} />
                <WishItem className="wish-img"
                    wish={wishes[1]}
                    style={{
                        left: `${move.img2}vw`,
                        transition: update ? 'all 0.2s' : 'none',
                        zIndex: "100"
                    }} />
                <WishItem className="wish-img"
                    wish={wishes[2]}
                    style={{
                        left: `${move.img3}vw`,
                        transition: update ? 'all 0.2s' : 'none',
                        zIndex: "99"
                    }} />
                <WishItem className="img1 wish-img"
                    wish={wishes[2]}
                    style={{
                        left: `20vw`,
                        zIndex: "98"
                    }} />
            </div>
            <ButtonS style={{ position: "fixed", background: "#F59D65A0", color: "#FFFFFFA0", top: "65vh", right: "-1em", zIndex: "301", }}>
                左右滑查看更多许愿哦~
            </ButtonS>
            <ButtonS onClick={showConfirm} style={{ background: "white", color: "#F59D65", marginTop: "22.5em" }}>
                点亮TA的小幸运
            </ButtonS>
        </div >
    )
}
