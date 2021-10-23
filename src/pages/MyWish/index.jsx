import { useEffect } from 'react'
import './index.scss'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import { Switch, Route } from 'react-router-dom'
import WishItemimg from "./images/WishItem.png"
import Trueimg from "./images/Yes.png"
import NotTrueimg from "./images/Not.png"
import React, { useState } from 'react'
import { ButtonS } from '../../components/Button'
import Service from '../../common/service'

export default function MyWish(props) {

    useEffect(() => {
        Service.getUserWish().then((res) => {
            if (res.data.length !== 0) props.history.push('/mywish/list', {wishList: res.data})
        })
    }, [props.history])

    return (
        <div>
            <Switch>
                <Route path="/mywish/empty" component={Empty} />
                <Route path="/mywish/list" component={MyWishList} />
                <Route path="/mywish/detail" component={MyWishDetail} />
            </Switch>
        </div >
    )
}

export function Empty(props) {

    const goSendWish = () => {
        props.history.push("/send")
    }


    return (
        <div className="div-leaf-empty" align="center">
            <div className="text-empty">
                空空如也~
                <br />
                你还没有许愿呢~
                <br />
                人还是要多许愿的
                <br />
                万一就实现了呢~
            </div>
            <ButtonS onClick={goSendWish} style={{ background: "white", color: "#F25125", "fontSize": "x-large" }}>
                投递我的小幸运
            </ButtonS>
        </div>
    )

}

export function MyWishList(props) {
    const { wishes } = props.location.state.wishList
    const wishState = ['待实现','待实现','已实现']
    return (
        <div>
            <div className="div-wishlist-toppadding" />
            <div className="div-wishlist">
                <ul>
                    {wishes.map(wish => {
                        return (
                            <li className="item-wish" key={wish.wish_id}>
                                <p className="text-detail">{wish.wish}</p>
                                <div className="status">
                                    <ButtonS style={{
                                        background: "#FFFFFF",
                                        color: wish.status ? "#F25C33" : "#1DCB1D",
                                        fontSize: "medium",
                                        fontFamily: "PingFangSC",
                                        fontWeight: "Bold",
                                        padding: "0 0.5em"

                                    }}>
                                        {wishState[wish.state]}</ButtonS>
                                    <p className="text-wishtime">{wish.time}</p>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                <div className="div-listbottom">
                    <p>你还剩{7 - wishes.length}次实现小幸运的机会哦~</p>
                    <hr></hr>
                    <p>人家也是有底线的</p>
                </div>
            </div>
        </div >
    )

}

export function MyWishDetail(props) {

    const [isAlert, setIsAlert] = useState(false)
    const [content, setContent] = useState('')
    const [isSure, setIsSure] = useState(false)
    const [isLong, setIsLong] = useState(false)
    const [msg, setMsg] = useState({ name: '旷旷', time: '2021-09-01 00:00', contact: {} })

    const handleAlert = (newContent) => {

        setIsAlert(!isAlert)
        if (typeof newContent === 'string') {
            if (newContent.length > 15)
                setIsLong(true)
            else
                setIsLong(false)
            setContent(newContent)
        }
        else if (typeof newContent === 'number' && newContent === 1)
            confirmSure()
    }

    const confirmSure = () => {
        setIsSure(true)
    }



    return (
        <div className='Detail'>
            <div className="wish"></div>
            <div className='alert' style={{ display: isAlert ? 'block' : 'none' }}></div>
            <div className="content"
                style={{ display: isAlert ? 'block' : 'none' }}>
                <div className={isLong ? 'long-text' : 'text'}>
                    <span>{content}</span>
                </div>
                <div className="sure" onClick={() => handleAlert(1)}>确认</div>
                <div className="cancel" onClick={() => handleAlert(0)}>取消</div>
            </div>
            <Button handleAlert={handleAlert} isSure={isSure} />
        </div>


    )
}



function Button(props) {

    const [isSure, setIsSure] = useState(false)

    const handleSure = (content) => {
        props.handleAlert(content)
    }
    const goDeleteWish = () => {

    }

    return (
        <div>
            <div className="button">
                <div className="otherWish" style={{ justifyContent: 'center' }}>
                    <ButtonS onClick={goDeleteWish} style={{ background: "white", color: "#F25125", "fontSize": "x-large" }}>
                        删除这个心愿
                    </ButtonS>
                </div>
            </div>
        </div>
    )
}
