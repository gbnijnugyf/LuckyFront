import './index.scss'
import React from 'react'
import { ButtonS } from '../../components/Button'
import { useState, useEffect } from 'react'
import Service from '../../common/service'
function WishItem(props) {
    const { wish } = props

    const wishState = ['待实现', '已实现']
    const goWishDetail = (id) => {
        props.history.push('/mywish/detail/' + wish.id)
    }

    return (
        <li className="item-wish" key={wish.wish_id} onClick={goWishDetail}>
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

}

export function MyWishList(props) {

    let [wishes, setWishes] = useState([{
        wish_id: 123,
        wish: "asdkjfhakshdgf",
        state: 1,
        time: "akdfjhsdf"
    }, {
        wish_id: 123,
        wish: "asdkjfhakshdgf",
        state: 1,
        time: "akdfjhsdf"
    }, {
        wish_id: 123,
        wish: "asdkjfhakshdgf",
        state: 1,
        time: "akdfjhsdf"
    }, {
        wish_id: 123,
        wish: "asdkjfhakshdgf",
        state: 1,
        time: "akdfjhsdf"
    }, {
        wish_id: 123,
        wish: "asdkjfhakshdgf",
        state: 1,
        time: "akdfjhsdf"
    }, {
        wish_id: 123,
        wish: "asdkjfhakshdgf",
        state: 1,
        time: "akdfjhsdf"
    }])

    useEffect(() => {
        Service.getUserWish().then((res) => {
            console.log(res)
            if (res.data.wishes.length === 0)
                props.history.push('/mywish/empty')
            else
                setWishes(res.data.wishes);
        })
    }, [props.history])

    return (
        <>
            <div className="div-wishlist-toppadding" />
            <div className="div-wishlist">
                <p>我点亮的愿望</p>
                <ul>
                    {wishes.map(wish => {
                        return <WishItem wish={wish} />
                    })}
                </ul >
                <p>我实现的愿望</p>
                <ul>
                    {wishes.map(wish => {
                        return <WishItem wish={wish} />
                    })}
                </ul >
                <div className="div-listbottom">
                    <p>你还剩{7 - wishes.length}次实现小幸运的机会哦~</p>
                    <hr></hr>
                    <p>人家也是有底线的</p>
                </div>
            </div >
        </ >
    )

}