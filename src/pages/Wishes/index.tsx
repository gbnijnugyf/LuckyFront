import React, { useState, useEffect, ChangeEvent } from 'react'
import ConfirmPanel from '../../components/ConfirmPanel'
import { ButtonS } from '../../components/Button'
import calendar from '../../static/images/calendar.svg'
import leaf from '../../static/images/leaf.svg'
import Service from '../../common/service'
import './index.scss'
import { useLocation, useNavigate } from 'react-router-dom'

export interface IWishesObject {
    wish: string,
    school: string,
    wishman_name: string,
    wish_id?: string
}

export interface IWishItemProps_ {
    className: string,
    wish: IWishesObject,
    onTouchStart?: (e: any) => void,
    onTouchMove?: (e: any) => void,
    onTouchEnd?: () => void,
    style: {
        left: string,
        transition?: string,
        zIndex: string
    }
}

export interface IonTouchStart_e {
    targetTouches: number,
}

export interface IHTMLonTouchStartElemmt extends HTMLElement {

}

const WishItem = (props: IWishItemProps_) => {

    return (
        <div key={props.wish?.wishman_name} className="wish-item" style={props.style}
            onTouchStart={props.onTouchStart} onTouchMove={props.onTouchMove} onTouchEnd={props.onTouchEnd} >
            <img src={leaf} className="wish-img" alt="" />
            <div className="content">
                <div className="content-word">
                    {props.wish?.wish}
                </div>
            </div>
            <div className="msg">

                <p>{props.wish.school === "" ? "" :
                    props.wish.school === '0' ? '华小师' : '武小理'}</p>
                <p>{props.wish.wishman_name.length > 0 ? props.wish.wishman_name.charAt(0) + "同学"
                    : ""}</p>
            </div>
        </div>

    )
}

export interface IstartX {
    start: any, //touch.pageX和e.targetTouches[0]不知道是啥类型，详见130，131
    move: string
}

export default function Wishes() {
    const navigate = useNavigate();
    // 拿着这个分类去发请求
    let start_init: IstartX = {
        start: "",
        move: ""
    }
    let wishes_init: Array<IWishesObject> = [
        { wish: "当前分类没有愿望哦~", school: "", wishman_name: "" },
        { wish: "当前分类没有愿望哦~", school: "", wishman_name: "" },
        { wish: "当前分类没有愿望哦~", school: "", wishman_name: "" }
    ]
    interface ILocationState {
        category: number
    }
    const category = (useLocation().state as ILocationState).category as number;
    console.log(category)
    // const { category } = props.location.state
    const [showTip, setShowTip] = useState(true)
    const moveState = { img1: 0, img2: 10, img3: 20 }
    const [move, setMove] = useState(moveState) // 树叶动画相关状态
    const [startX, setStartX] = useState(start_init) // 树叶动画相关状态
    const [update, setUpDate] = useState(false) // 控制动画以及愿望内容的更新
    const [display, setDisplay] = useState(false);// 弹出确认框
    const [light, setLight] = useState(false)
    const [lightBtn, setLightBtn] = useState(true) // 点亮按钮是否存在
    const [wishes, setWishes] = useState(wishes_init)
    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [tel, setTel] = useState("")
    const [option, setOption] = useState("QQ")
    const refreshWishes = () => {
        Service.getWishByCategories(category.toString()).then((res) => {
            // console.log(res.data.data)//service修改后data变成了第二层
            let wishes = []
            if (res.data.data.length === 0) {
                setLightBtn(false)
                let wish = { wish: "当前分类没有愿望哦~", school: "", wishman_name: "" }
                wishes.push(wish);
            } else {
                wishes = res.data.data
                setLightBtn(true)
            }
            while (wishes.length < 3) {
                wishes = wishes.concat(wishes)
            }
            setWishes(wishes)
        })
    }
    // 获取愿望
    useEffect(refreshWishes, [category, lightBtn])

    useEffect(() => {
        setInterval(() => {
            setShowTip(false)
        }, 5000)
    })

    const handleName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const handleNumber = (e: ChangeEvent<HTMLInputElement>) => {
        setNumber(e.target.value)
    }
    const handleTel = (e: ChangeEvent<HTMLInputElement>) => {
        setTel(e.target.value)
    }
    const handleOption = (e: ChangeEvent<HTMLSelectElement>) => {
        setOption(e.target.value)
    }

    // Start/Move/End 都是控制愿望刷新动画的相关函数
    const onTouchStart = (e: any) => {  //e:ChangeEvent<HTMLDivElement>替换为any，targeTouches类型未知
        const touch = e.targetTouches[0]
        setStartX({ start: touch.pageX, move: '' })

    }
    const onTouchMove = (e: any) => {//e:ChangeEvent<HTMLDivElement>替换为any，targeTouches类型未知
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
        navigate('/detail/index');
        // props.history.push('/mywish')
    }
    const LightWish = () => {
        if (name === "") alert("还没有填写姓名哦~")
        else if (number === "") alert("还没有填写联系方式哦~")
        else {
            if (typeof wishes[0].wish_id !== undefined) {
                let id = wishes[0].wish_id as string
                let [qq, wechat] = option === 'QQ' ? [number, ""] : ["", number]
                Service.lightWishOn(id, name, tel, qq, wechat).then((res:any) => {
                    if (res.status === 0) {
                        alert("点亮成功~")
                        refreshWishes()
                    } else {
                        alert(res.msg) //类型“AxiosResponse<any, any>”上不存在属性“msg” ,res暂时定义为any
                    }
                })
                handleAlert();
            }
        }
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

            <ConfirmPanel display={display} action={{ "yes": light ? LightWish : handleLight, "no": handleAlert }} >
                {light ? (
                    <div className="input-msg" >
                        <p className='info'>填写联系方式，方便他来联系你哦～</p>
                        <div className="form">
                            <div className="name">
                                点亮人 :
                                <input type="text" placeholder='必填内容哦～' onChange={handleName} value={name} style={{ marginLeft: "2em" }} />
                            </div>
                            <div className="number">
                                联系方式 :
                                <select onChange={handleOption} style={{ color: 'rgb(239, 96, 63)' }}>
                                    <option value="QQ">QQ</option>
                                    <option value="WeChat">微信</option>
                                </select>
                                <input type="text" placeholder='必填内容哦～' onChange={handleNumber} value={number} style={{ marginLeft: ".3em", width: "30%" }} />
                            </div>
                            <div className="tel">
                                或 Tel :
                                <input type="text" placeholder='选填内容哦～' onChange={handleTel} value={tel} style={{ marginLeft: '2.3em' }} />
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
                    fontSize: "medium",
                    zIndex: "999"
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
            <ButtonS style={{ position: "fixed", background: "#F59D65A0", color: "#FFFFFFA0", top: "65vh", right: "-1em", zIndex: "301", display: showTip ? "absolute" : "none" }}>
                左右滑查看更多许愿哦~
            </ButtonS>
            <ButtonS onClick={showConfirm} style={{ background: "white", color: "#F59D65", marginTop: "22.5em", zIndex: "999", display: lightBtn ? "relative" : "none" }}>
                点亮TA的小幸运
            </ButtonS>
        </div >
    )
}
