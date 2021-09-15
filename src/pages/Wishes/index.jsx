import React, { useState} from 'react'
import { useEffect } from 'react/cjs/react.development'

import './index.css'

export default function Wishes(props) {
    const { tagName } = props.history.location.state || { }

    const [moveX, setmoveX] = useState(-10)
    const [startX, setStartX] = useState()
    const [update, setUpDate] = useState({ isUpdate: false, isShow: true })
    const [opacity, setOpacity] = useState(1)
    const [wish, setWish] = useState([])
    const [appear, setAppear] = useState({ cover: false, input: false, alert: false })
    const [rely, setRely] = useState(true)

    // if(wish.length < 5)
    //     setRelay(false);
    // else    
    //     setRelay(true)

    // 禁止touch默认事件
    // useEffect(() => {
    //     touchImg.current.addEventListener("touchmove", { passive: false })
    // })
    //useEffect获取到wishSorce 
    // let rely = wish.length < 5 ? true : false
    useEffect(() => { 
        // const wishSource = getSouce啥的
        setWish([`希望每个人都能收获自己的小幸运哦～我的愿望池--${tagName}`, '我是接下来的愿望哦',1,2,3,4,5,6,7,8,9,10])
    },[rely, tagName])


    const handleTouchStart = (e) => {
        const touch = e.targetTouches[0]
        setStartX({ start: touch.pageX, move: '' })
    }

    const handleTouchMove = (e) => {
        const touch = e.targetTouches[0]
        const move_X = ((touch.pageX - startX.start) / 5) - 10
        setStartX(startX)
        setmoveX(move_X)
        setOpacity(Math.abs(moveX / 60))
    }

    const handleTouchEnd = () => {
        if (moveX < -30) {
            setUpDate({ isUpdate: true, isShow: true })
            setmoveX(-90)
        }
        else if (moveX > 20) {
            setUpDate({ isUpdate: true, isShow: true })
            setmoveX(90)
        }
        else{
            setmoveX(-10)
            return
        }
            

        setTimeout(() => {
            setUpDate({isUpdate: false, isShow: false })
            setmoveX(-10)
            setOpacity(0)
            // 刷新愿望
            let newWishSource  = wish
            newWishSource.splice(0,1)
            setWish(newWishSource)
            if(wish.length < 3){
                setRely(!rely)
            }
            setTimeout(() => {
                setUpDate({ isUpdate: false, isShow: true })
            }, 10)
        }, 500)
    }

    const handleLight = () => {
        setAppear(state => {
            return { cover: true, input: true, alert: !state.alert }
        })
    }

    const handleAlert = () => {
        setAppear(state => {
            return { cover: !state.cover, alert: !state.alert }
        })
    }

    const handleSend = () => {
        setAppear({ cover: false, input: false, alert: false })
    }

    return (
        <div className='wishpage'>
            <div className="cover" style={{ display: appear.cover ? 'block' : 'none' }}>
            </div>
            <div className="alert" style={{ display: appear.alert ? 'block' : 'none' }}><div className="content">
                <div className="text">
                    <p>确认要帮TA实现这个愿望吗</p>
                </div>
                <div className="sure" onClick={handleLight}>确认</div>
                <div className="cancel" onClick={handleAlert}>取消</div></div></div>
            <div className="input-msg" style={{ display: appear.input ? 'block' : 'none' }}>
                <p className='h3'>填写联系方式，方便他来联系你哦～</p>
                <div className="form">
                    <div className="name">投递人  : <input type="text" placeholder='必填内容哦～' /></div>
                    <div className="number"><p style={{ display: 'inline-block' }}>联系方式  :</p>
                        <select style={{ color: 'rgb(239, 96, 63)', marginBottom: '1vh' }}>
                            <option value="QQ">QQ</option>
                            <option value="WeChat">微信</option>
                        </select>
                        <input type="text" placeholder='必填内容哦～' />
                        <br />
                        <p style={{ display: 'inline-block' }}>或 Tel  : </p><input type="text" placeholder='选填内容哦～' style={{ marginLeft: '9vw' }} />
                    </div>
                    <div className="send" onTouchStart={handleSend}></div>
                </div>
            </div>
            <div className="wishes">
                <div className="img1"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{
                        left: `${moveX}vw`,
                        transition: update.isUpdate ? 'all 0.2s' : 'none',
                        display: update.isShow ? 'block' : 'none'
                    }} >
                    <p> {wish[0]}</p>
                    <div className="underline ud1"></div>
                    <div className="underline ud2"></div>
                    <div className="underline ud3"></div>
                    <div className="underline ud4"></div>
                    <div className="msg"><span>华小师</span><span>某同学</span></div>
                </div>
                <div className="img2">

                    <div style={{ opacity: opacity }}>
                        <p>{update.isShow?wish[1]:wish[0]}</p>
                        <div className="underline ud1"></div>
                        <div className="underline ud2"></div>
                        <div className="underline ud3"></div>
                        <div className="underline ud4"></div>
                    </div>

                </div>
                <div className="img3"></div>
            </div>
            <div className="checklight"></div>
            <div className="tip"></div>
            <div className="tolight" onTouchStart={handleAlert}></div>
        </div>
    )
}
