import './index.scss'
import { Switch, Route } from 'react-router-dom'
import { LoginWHUT, LoginCCNU, BindEmail } from './loginSchools.jsx'
import cookie from 'react-cookies'
import { useEffect } from 'react'


function Btn(props) {
    return (
        <div className="btn-school" onClick={props.onClick}>
            <div className="birdimg" />
            <p className="text-school">{props.text}</p>
        </div>
    )
}

function LoginMain(props) {

    // 保存WHUT登录后返回的token
    useEffect(() => {
        let token = cookie.load('jwt_token');
        if (token) {
            localStorage.setItem('token', token)
            props.history.push("/")
        }
    }, [props.history])


    const goWHUT = () => {
        window.location.href = "https://ias.sso.itoken.team/portal.php?posturl=https%3A%2F%2Fipandai.club%2Fapi%2Flogin%2Fwhut%2Fcallback&continueurl=https://ipandai.club"
    }
    const goCCNU = () => {
        props.history.push("/login/ccnu")
    }

    return (
        <div className='login-main'>
            <p className="text-title">小幸运</p>
            <p className="text-subtitle">相遇，就是这么妙不可言</p>
            <div className="div-school">
                <Btn text="我是武小理" onClick={goWHUT} />
                <Btn text="我是华小师" onClick={goCCNU} />
            </div >
        </div>
    )
}

export default function Login(props) {


    return (
        <div className="login">
            <Switch>
                <Route path="/login/whut" component={LoginWHUT} />
                <Route path="/login/ccnu" component={LoginCCNU} />
                <Route path="/login/bindemail" component={BindEmail} />
                <Route path="/login" component={LoginMain} />
            </Switch>
        </div>
    )
}