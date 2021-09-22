import './loginSchools.css'
import nextbtn from './images/button.png'

export function LoginWHUT(props) {

    const goVerify = () => {
        props.history.push("/")
    }


    return (
        <div>
            <LoginPannel text="我是武小理" onClick={goVerify}>
                <form className="panel-login">
                    <li>
                        <label>校园卡号：</label>
                        <input></input>
                    </li>
                    <li>
                        <label>密码：</label>
                        <input type="password"></input>
                    </li>
                    <p className="text-tip">（身份证后六位或指挥理工大密码）</p>
                </form>
            </LoginPannel>
        </div>
    )
}


export function LoginCCNU(props) {

    const goVerify = () => {
        props.history.push("/")
    }
    return (
        <LoginPannel text="我是华小师" onClick={goVerify}>
            <form className="panel-login">
                <li>
                    <label>学号：</label>
                    <input></input>
                </li>
                <li>
                    <label>密码：</label>
                    <input type="password"></input>
                </li>
            </form>
        </LoginPannel>
    )
}

function LoginPannel(props) {
    return (
        <div>
            <p className="text-login-title">{props.text}</p>
            {props.children}

            <img className="btn-next" src={nextbtn} alt="" onClick={props.onClick}></img>
        </div>
    )
}
