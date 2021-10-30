import './index.scss'
import React from 'react'
import { ButtonS } from '../../components/Button'

export function MyWishList(props) {
    const { wishPost, wishLight } = props.location.state
    const wishState = ['待点亮', '待实现', '已实现']
    const goWishDetail = (id) => {
        props.history.push('/mywish/detail/' + id)
    }
    const formatTime = (t) => {
        const len = t.length
        let time = t.slice(0, len - 1)
        time = time.replace("T", " ")
        return time
    }

    return (
        <>
            <div className="div-postlist">
                <b>我投递的小幸运</b>
                <ul>
                    {wishPost.map(wish => {
                        let time = formatTime(wish.creat_at)
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
                                    <p className="text-wishtime">{time}</p>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                <b>我点亮的小幸运</b>
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
                                    <p className="text-wishtime">{wish.creat_at}</p>
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
        </>
    )

}