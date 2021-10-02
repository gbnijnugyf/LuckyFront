import './loginSchools.css'
import nextbtn from './images/button.png'
import okbtn from './images/okbutton.png'

function LoginPannel(props) {
    return (
        <div className="login-pannel">
            <p className="text-login-title">{props.text}</p>
            {props.children}
            <img className="btn-next" src={props.btnImage} alt="" onClick={props.onClick}></img>
        </div>
    )
}

export function LoginWHUT(props) {

    const goVerify = () => {
        props.history.push("/login/bindemail")
    }

    return (
        <LoginPannel text="我是武小理" onClick={goVerify} btnImage={nextbtn}>
            <form className="panel-login">
                <ul>
                    <li>
                        <label>校园卡号：</label>
                        <input></input>
                    </li>
                    <li>
                        <label>密码：</label>
                        <input type="password"></input>
                    </li>
                </ul>
                <p className="text-tip">（身份证后六位或智慧理工大密码）</p>
            </form>
        </LoginPannel>
    )
}

export function LoginCCNU(props) {

    const goVerify = () => {
        props.history.push("/login/bindemail")
    }
    return (
        <LoginPannel text="我是华小师" onClick={goVerify} btnImage={nextbtn}>
            <form className="panel-login">
                <ul>
                    <li>
                        <label>学号：</label>
                        <input></input>
                    </li>
                    <li>
                        <label>密码：</label>
                        <input type="password"></input>
                    </li>
                </ul>
            </form>
        </LoginPannel>
    )
}

export function BindEmail(props) {
    const goBind = () => {
        props.history.push("/home")
    }

    return (
        <LoginPannel text="邮箱绑定" onClick={goBind} btnImage={okbtn}>
            <form className="panel-login">
                <p className="tip-email">填写邮箱地址，可以及时查收愿望状态哦~</p>
                <div>
                    <label className="label-email">邮箱：</label>
                    <input className="input-email"></input>
                </div>
            </form>
        </LoginPannel>
    )
}