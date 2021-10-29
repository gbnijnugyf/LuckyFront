import { useEffect } from 'react'
import './index.scss'
import React, { useState } from 'react'
import { ButtonS } from '../../components/Button'
import Service from '../../common/service'


export function MyWishList(props) {
    const { wishPost, wishLight } = props
    console.log(props)
    const wishState = ['待实现', '已实现']
    const goWishDetail = (id) => {
        props.history.push('/mywish/detail', { id: id })
    }

    return (
        <div>
            <div className="div-wishlist-toppadding" />
            <div className="div-wishlist">
                <ul>
                    {wishPost.map(wish => {
                        return (
                            <li className="item-wish" key={wish.wish_id} onClick={() => goWishDetail(wish.wish_id)}>
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
                    <p>你还剩{7 - wishLight.length}次实现小幸运的机会哦~</p>
                    <hr></hr>
                    <p>人家也是有底线的</p>
                </div>
            </div>
        </div >
    )

}