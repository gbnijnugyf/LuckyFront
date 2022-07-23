import './index.scss'
import React from 'react'
import { ButtonS } from '../../components/Button'
import { useState, useEffect } from 'react'
import Service from '../../common/service'
import { formatTime } from '../../common/global'
function WishItem(props) {
    const { wish } = props
    const time = wish.state === 1 ? formatTime(wish.light_at) : formatTime(wish.creat_at)
    return (
        <li className="item-wish" onClick={props.onClick}>
            <p className="text-detail">{wish.wish}</p>
            <div className="status">
                <ButtonS style={{
                    background: "#FFFFFF",
                    color: wish.state === 0 ? "#1DCB1D" : "#F25C33",
                    fontSize: "medium",
                    fontFamily: "PingFangSC",
                    fontWeight: "Bold",
                    padding: "0 0.5em"
                }}>
                    {wish.state === 0 ?
                        "未实现" :
                        wish.state === 1 ?
                            "已点亮" :
                            "已实现"}</ButtonS>
                <p className="text-wishtime">{time}</p>
            </div>
        </li>
    )

}

export function MyWishList(props) {

    let [wishLight, setWishLight] = useState([])

    let [wishPost, setWishPost] = useState([])

    // 排序愿望为需要的顺序
    const sortWishes = (oldwishes) => {
        let sorted = []
        const priority = [1, 2, 0]
        for (let p = 0; p < priority.length; p++)
            for (let i = 0; i < oldwishes.length; i++)
                if (oldwishes[i].state === priority[p])
                    sorted.push(oldwishes[i]);

        return sorted;
    }


    useEffect(() => {
        Service.getUserWishLight().then((res) => {
            setWishLight(sortWishes(res.data));
        })
        Service.getUserWishPost().then((res) => {
            setWishPost(sortWishes(res.data));
        })
    }, [props.history])

    const goWishDetail = (id) => {
        // props.history.push('/detail/' + id)
    }

    return (
        <>
            <div className="div-wishlist-toppadding" />
            <div className="div-wishlist">
                <h3>我许下的愿望</h3>
                <hr />
                <ul>
                    {wishPost.map(wish => {
                        return <WishItem time={wish.creat_at} wish={wish} key={wish.wish_id} onClick={() => { goWishDetail(wish.wish_id) }} />
                    })}
                </ul >
                <h3>我点亮的愿望</h3>
                <hr />
                <ul>
                    {wishLight.map(wish => {
                        return <WishItem time={wish.light_at} wish={wish} key={wish.wish_id} onClick={() => { goWishDetail(wish.wish_id) }} />
                    })}
                </ul >
                <div className="div-listbottom">
                    <p>你还剩{7 - wishLight.length}次实现小幸运的机会哦~</p>
                    <hr></hr>
                    <p>人家也是有底线的</p>
                </div>
            </div >
        </ >
    )

}