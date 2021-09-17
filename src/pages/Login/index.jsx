import bgimg from './images/bg.png'
import birdimg from './images/bird.png'
import underlineimg from './images/underline.png'

import './index.css'



export default function Login(props) {

    const goWHUT = () => {
        alert("你好武理帅哥/美女")
        props.history.push("/home")
    }
    const goCCNU = () => {
        alert("你好华师美女/帅哥")
        props.history.push("/home")
    }

    return (
        <div>
            <div className="login">
                <BackGround src={bgimg} />
                <p className="text-title">小幸运</p>
                <p className="text-subtitle">相遇，就是这么妙不可言</p>
                <div className="div-school">
                    <Btn text="我是武小理" onClick={goWHUT} />
                    <Btn text="我是华小师" onClick={goCCNU} />
                </div>
            </div>
        </div>
    )
}

function Btn(props) {
    return (
        <div className="btn-school" onClick={props.onClick}>
            <img class="birdimg" src={birdimg} alt="" />
            <img class="underlineimg" src={underlineimg} alt="" />
            <p class="text-school">{props.text}</p>
        </div>
    )
}

function BackGround(prop) {
    return (
        <img className="background-image" src={prop.src} alt="" />
    )
}