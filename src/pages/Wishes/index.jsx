import React, { useState, useEffect } from 'react'

import './index.css'

const Wish = (props) => {
    // 三张img
    // 思路1:划走第一张 2，3两张左移动，第四张代替第三张的位置，然后2变1，3变2，4变3，再多1个4
    // 思路2:类似轮播图，一划掉后瞬间归位 其他的也复原 但可能会有闪动的bug
    const { handleTouchStart, handleTouchEnd, handleTouchMove, move, update, wish, opacity } = props
    // let wishImg = [1, 2, 3]
    return (
        <div className='wishes'>
            {wish.map((item, index) => {
                let jsx
                const { content, name, school } = item
                switch (index) {
                    case 0:
                        jsx = (
                            <div
                                key={name}
                                className="img1 wish-img"
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                                style={{
                                    left: `${move.img1}vw`,
                                    transition: update ? 'all 0.2s' : 'none',
                                }} >
                                <p> {content}</p>
                                <div className="underline ud1"></div>
                                <div className="underline ud2"></div>
                                <div className="underline ud3"></div>
                                <div className="underline ud4"></div>
                                <div className="msg">
                                    <span>{school}</span>
                                    <span>{name}</span></div>
                            </div>
                        )
                        break;
                    case 1:
                        jsx = (
                            <div
                                key={name}
                                className="img2 wish-img"
                                style={{
                                    transition: update ? 'all 0.2s' : 'none',
                                    left: `${move.img2}vw`
                                }}>
                                <div style={{ opacity: opacity }}>
                                    <p>{content}</p>
                                    <div className="underline ud1"></div>
                                    <div className="underline ud2"></div>
                                    <div className="underline ud3"></div>
                                    <div className="underline ud4"></div>
                                    <div className="msg">
                                        <span>{school}</span>
                                        <span>{name}</span></div>
                                </div>
                            </div>
                        )
                        break;
                    case 2:
                        jsx = (<div
                            key={name}
                            className="img3"
                            style={{
                                transition: update ? 'all 0.2s' : 'none',
                                left: `${move.img3}vw`
                            }}>
                        </div>)
                        break;
                    default:
                        break;
                }

                return jsx
            })}
            <div className={move.img2 === 0 ? '' : 'img4'}></div>
        </div>
    )
}


export default function Wishes(props) {
    // const { tagName } = props.history.location.state || { } 先拿到这个Home传过来的标签，根据标签(id)去发请求
    // 定义初始化动画状态
    const moveState = { img1: -10, img2: 0, img3: 10 }
    const [move, setMove] = useState(moveState) // 树叶动画相关状态
    const [startX, setStartX] = useState() // 树叶动画相关状态
    const [update, setUpDate] = useState(false) // 控制动画以及愿望内容的更新
    const [opacity, setOpacity] = useState(0) // 控制愿望的渐变效果
    const [appear, setAppear] = useState({ cover: false, input: false, alert: false }) // 还是动画状态
    const [wish, setWish] = useState([
        {
            name: '张旷',
            school: '华小师',
            content: '我是要超越李劲哲的男人'
        },
        {
            name: '李劲哲',
            school: '华小师',
            content: '小小张旷还企图超越我？'
        },
        {
            name: '汤鲜柠',
            school: '武小理',
            content: '我当个假数据看看哈'
        },
        {
            name: '王丰',
            school: '华小师',
            content: '刘宇乐是305大爹啊！'
        },
        {
            name: '王jy',
            school: '华小师',
            content: '刘宇乐是305大爹啊！'
        },
        {
            name: 'sxz',
            school: '华小师',
            content: '刘宇乐是305大爹啊！'
        }
    ])  // 愿望(请求过来的wish)
    const [rely, setRely] = useState(0)
    // 控制表单
    const [name, setName] = useState()
    const [number, setNumber] = useState()

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleNumber = (e) => {
        setNumber(e.target.value)
    }


    // 在这里拿数据得到wishes 上面是假数据
    useEffect(() => {
        // const wishSource = getSouce啥的
        const wishes = [
            {
                name: '张旷',
                school: '华小师',
                content: '我是要超越李劲哲的男人'
            },
            {
                name: '李劲哲',
                school: '华小师',
                content: '小小张旷还企图超越我？'
            },
            {
                name: '汤鲜柠',
                school: '武小理',
                content: '我当个假数据看看哈'
            },
            {
                name: '王丰',
                school: '华小师',
                content: '刘宇乐是305大爹啊！'
            },
            {
                name: '王jy',
                school: '华小师',
                content: '刘宇乐是305大爹啊！'
            },
            {
                name: 'sxz',
                school: '华小师',
                content: '刘宇乐是305大爹啊！'
            }
        ]
        setWish((wish) => {
            return [...wish, ...wishes]
        })
    }, [rely])


    // Start/Move/End 都是控制愿望刷新动画的相关函数
    const handleTouchStart = (e) => {
        const touch = e.targetTouches[0]
        setStartX({ start: touch.pageX, move: '' })

    }
    const handleTouchMove = (e) => {
        const touch = e.targetTouches[0]
        const move_X = ((touch.pageX - startX.start) / 5) - 10
        setStartX(startX)
        setMove({ img1: move_X, img2: 0, img3: 10 })
        setOpacity(Math.abs(move.img1 / 50))
    }
    const handleTouchEnd = () => {
        setUpDate(true)
        if (move.img1 < -25) {
            setMove({ img1: -90, img2: -10, img3: 0 })
        }
        else if (move.img1 > 20) {
            setMove({ img1: 90, img2: -10, img3: 0 })
        }
        else {
            setMove({ img1: -10, img2: 0, img3: 10 })
            setOpacity(0)
            return
        }
        // 刷新愿望
        setTimeout(() => {
            setUpDate(false)
            setOpacity(0)
            let newWishSource = wish
            newWishSource.splice(0, 1)
            setWish(newWishSource)
            // 刷新动画
            setMove(moveState)
            if (wish.length <= 2) {
                setRely(!rely) // 原本的意思就是愿望刷新就剩2个改变依赖调用hooks再发送一次请求刷新愿望列表
            }
        }, 200)
    }
    // 处理点亮愿望
    const handleLight = () => {
        setAppear(state => {
            return { cover: true, input: true, alert: !state.alert }
        })
    }
    // 处理遮罩
    const handleAlert = () => {
        setAppear(state => {
            return { cover: !state.cover, alert: !state.alert }
        })
    }
    // 处理确认点亮愿望
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
                    <div className="name">投递人  : <input type="text" placeholder='必填内容哦～' onChange={handleName} value={name} /></div>
                    <div className="number"><p style={{ display: 'inline-block' }}>联系方式  :</p>
                        <select style={{ color: 'rgb(239, 96, 63)', marginBottom: '1vh' }}>
                            <option value="QQ">QQ</option>
                            <option value="WeChat">微信</option>
                        </select>
                        <input type="text" placeholder='必填内容哦～' onChange={handleNumber} value={number} />
                        <br />
                        <p style={{ display: 'inline-block' }}>或 Tel  : </p><input type="text" placeholder='选填内容哦～' style={{ marginLeft: '9vw' }} />
                    </div>
                    <div className="send" onTouchStart={handleSend}></div>
                </div>
            </div>
            <Wish handleTouchStart={handleTouchStart}
                handleTouchMove={handleTouchMove}
                handleTouchEnd={handleTouchEnd}
                move={move}
                update={update}
                wish={wish}
                opacity={opacity} />
            <div className="checklight"></div>
            <div className="tip"></div>
            <div className="tolight" onTouchStart={handleAlert}></div>
        </div>
    )
}
