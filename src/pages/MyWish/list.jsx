import './index.scss'
import React from 'react'
import { ButtonS } from '../../components/Button'
import { useState, useEffect } from 'react'
import Service from '../../common/service'
function WishItem(props) {
    const forMatTime = (time) => {
        time = time.slice(0, time.length - 1)
        time = time.replace("T", " ")
        return time
    }
    const { wish, time } = props
    return (
        <li className="item-wish" key={wish.wish_id} onClick={props.onClick}>
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
                <p className="text-wishtime">{forMatTime(time)}</p>
            </div>
        </li>
    )

}

export function MyWishList(props) {

    let [wishLight, setWishLight] = useState([{
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

    let [wishPost, setWishPost] = useState([{
        wish_id: 123,
        wish: "asdkjfhakshdgf",
        state: 0,
        time: "2021-10-29T14:48:05Z"
    }, {
        wish_id: 123,
        wish: "asdkjfhakshdgf",
        state: 2,
        time: "akdfjhsdf"
    }, {
        wish_id: 123,
        wish: "asdkjfhakshdgf",
        state: 1,
        time: "akdfjhsdf"
    }, {
        wish_id: 123,
        wish: "asdkjfhakshdgf",
        state: 0,
        time: "akdfjhsdf"
    }, {
        wish_id: 123,
        wish: "asdkjfhakshdgf",
        state: 0,
        time: "akdfjhsdf"
    }, {
        wish_id: 123,
        wish: "asdkjfhakshdgf",
        state: 0,
        time: "akdfjhsdf"
    }])

    // 排序愿望为需要的顺序
    const sortWishes = (oldwishes) => {
        let sorted = []
        let priority = [1, 2, 0]
        for (let p = 0; p < priority.length; p++)
            for (let i = 0; i < oldwishes.length; i++)
                if (oldwishes[i].state === priority[p])
                    sorted.push(oldwishes[i]);

        return sorted;
    }


    useEffect(() => {

        setWishLight(sortWishes(wishLight));
        setWishPost(sortWishes(wishPost));

        // Service.getUserWishLight().then((res) => {
        //     setWishLight(sortWishes(res.data.wishes));
        // })
        // Service.getUserWishPost().then((res) => {
        //     setWishPost(sortWishes(res.data.wishes));
        // })
    }, [props.history])

    const goWishDetail = (id) => {
        props.history.push('/detail/' + id)
    }

    return (
        <>
            <div className="div-wishlist-toppadding" />
            <div className="div-wishlist">
                <h3>我许下的愿望</h3>
                <hr />
                <ul>
                    {wishPost.map(wish => {
                        return <WishItem time={wish.creat_at} wish={wish} onClick={() => { goWishDetail(wish.wish_id) }} />
                    })}
                </ul >
                <h3>我点亮的愿望</h3>
                <hr />
                <ul>
                    {wishLight.map(wish => {
                        return <WishItem time={wish.light_at} wish={wish} onClick={() => { goWishDetail(wish.wish_id) }} />
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