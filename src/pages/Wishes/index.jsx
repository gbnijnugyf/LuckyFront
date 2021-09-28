import React, { useState } from 'react'

import './index.css'

export default function Wishes(props) {
    // const { tagName } = props.history.location.state || { } 先拿到这个Home传过来的标签，根据标签(id)去发请求
    // 定义愿望数组
    const wishes = [
        {
            name: '张旷',
            school: '华小师',
            wish: '我是要超越李劲哲的男人'
        },
        {
            name: '李劲哲',
            school: '华小师',
            wish: '小小张旷还企图超越我？'
        },
        {
            name: '汤鲜柠',
            school: '武小理',
            wish: '我当个假数据看看哈'
        },
        {
            name: '王丰',
            school: '华小师',
            wish: '刘宇乐是305大爹啊！'
        }
    ]
    const [moveX, setmoveX] = useState(-10) // 控制树叶的动画状态
    const [startX, setStartX] = useState() // 树叶动画相关状态
    const [update, setUpDate] = useState({ isUpdate: false, isShow: true }) // 控制动画以及愿望内容的更新
    const [opacity, setOpacity] = useState(1) // 控制愿望的渐变效果
    const [appear, setAppear] = useState({ cover: false, input: false, alert: false }) // 还是动画状态
    const [wish, setWish] = useState(wishes)  // 愿望(请求过来的wish)
    const [rely, setRely] = useState(true) // 调用useEffect发送请求的依赖？或许后续可以通过lazyLoad代替

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
    // useEffect(() => { 
    //     // const wishSource = getSouce啥的
    //     setWish(wishes)
    // },[rely, tagName, wishes])


    // Start/Move/End 都是控制愿望刷新动画的相关函数
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
        else {
            setmoveX(-10)
            return
        }
        setTimeout(() => {
            setUpDate({ isUpdate: false, isShow: false })
            setmoveX(-10)
            setOpacity(0)
            // 刷新愿望
            let newWishSource = wish
            newWishSource.splice(0, 1)
            setWish(newWishSource)
            if (wish.length < 3) {
                setRely(!rely) // 原本的意思就是愿望刷新就剩2个改变依赖调用hooks再发送一次请求刷新愿望列表
            }
            setTimeout(() => {
                setUpDate({ isUpdate: false, isShow: true })
            }, 10)
        }, 500)
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
                    <div className="name">投递人  : <input type="text" placeholder='必填内容哦～' onChange={handleName} /></div>
                    <div className="number"><p style={{ display: 'inline-block' }}>联系方式  :</p>
                        <select style={{ color: 'rgb(239, 96, 63)', marginBottom: '1vh' }}>
                            <option value="QQ">QQ</option>
                            <option value="WeChat">微信</option>
                        </select>
                        <input type="text" placeholder='必填内容哦～' onChange={handleNumber} />
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
                    <p> {wish[0].wish}</p>
                    <div className="underline ud1"></div>
                    <div className="underline ud2"></div>
                    <div className="underline ud3"></div>
                    <div className="underline ud4"></div>
                    <div className="msg"><span>{wish[0].school}</span><span>{wish[0].name}</span></div>
                </div>
                <div className="img2">
                    <div style={{ opacity: opacity }}>
                        <p>{update.isShow ? wish[1].wish : wish[0].wish}</p>
                        <div className="underline ud1"></div>
                        <div className="underline ud2"></div>
                        <div className="underline ud3"></div>
                        <div className="underline ud4"></div>
                        <div className="msg"><span>{update.isShow ? wish[1].school : wish[0].school}</span><span>{update.isShow ? wish[1].name : wish[0].name}</span></div>
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
