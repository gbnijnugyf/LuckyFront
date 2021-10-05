import './index.scss'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import { Switch, Route } from 'react-router-dom'
import WishItemimg from "./images/WishItem.png"
import Trueimg from "./images/Yes.png"
import NotTrueimg from "./images/Not.png"
import React, { useState } from 'react'
import { ButtonS } from '../../components/Button'

export default function MyWish(props) {

    return (
        <div>
            <Switch>
                <Route path="/mywish/empty" component={Empty} />
                <Route path="/mywish/list" component={MyWishList} />
                <Route path="/mywish/detail" component={MyWishDetail} />
                <Redirect to="/mywish/empty" />
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
            <ButtonS onClick={goSendWish} style={{ background: "white", color: "#F25125", "font-size": "x-large" }}>
                投递我的小幸运
            </ButtonS>
        </div>
    )

}

export function MyWishList(props) {
    let wishList = [
        {
            "id": 0,
            "detail": "愿望内容啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧",
            "status": true,
            "time": "2021.3.7 12:21"
        }, {
            "id": 0,
            "detail": "愿望内容啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧",
            "status": false,
            "time": "2021.3.7sadasdas  12:21"
        }, {
            "id": 0,
            "detail": "愿望内容啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧",
            "status": false,
            "time": "2021.3.7sadasdas  12:21"
        }, {
            "id": 0,
            "detail": "愿望内容啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧",
            "status": false,
            "time": "2021.3.7sadasdas  12:21"
        }, {
            "id": 0,
            "detail": "愿望内容啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧",
            "status": false,
            "time": "2021.3.7sadasdas  12:21"
        }, {
            "id": 0,
            "detail": "愿望内容啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧",
            "status": false,
            "time": "2021.3.7sadasdas  12:21"
        }, {
            "id": 0,
            "detail": "愿望内容啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧",
            "status": false,
            "time": "2021.3.7sadasdas  12:21"
        }, {
            "id": 0,
            "detail": "愿望内容啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧",
            "status": false,
            "time": "2021.3.7sadasdas  12:21"
        }
    ]

    return (
        <div>
            <div className="div-wishlist-toppadding" />
            <div className="div-wishlist">
                <ol>
                    {wishList.map(wish => {
                        return (
                            <li className="item-wish">
                                <img className="img-wishitem" src={WishItemimg} alt="" />
                                <p className="text-detail">{wish.detail}</p>
                                <img className="img-status" src={wish.status ? Trueimg : NotTrueimg} alt="" />
                                <p className="text-wishtime">{wish.time}</p>
                            </li>
                        )
                    })}
                </ol>
                <div className="div-listbottom">
                    <p>你还剩{7 - wishList.length}次实现小幸运的机会哦~</p>
                    <hr></hr>
                    <p>人家也是有底线的</p>
                </div>
            </div>
        </div>
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
                    <ButtonS onClick={goDeleteWish} style={{ background: "white", color: "#F25125", "font-size": "x-large" }}>
                        删除这个心愿
                    </ButtonS>
                </div>
            </div>
        </div>
    )
}
