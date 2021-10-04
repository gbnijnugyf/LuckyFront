import './loginSchools.scss'
import { ButtonL } from '../../components/Button'

function LoginPannel(props) {
    return (
        <div className="login-pannel">
            <p className="text-login-title">{props.text}</p>
            {props.children}
            <ButtonL onClick={props.onClick} text={props.btnText} />
        </div>
    )
}

export function LoginWHUT(props) {

    const goVerify = () => {
        props.history.push("/login/bindemail")
    }

    return (
        <LoginPannel text="我是武小理" onClick={goVerify} btnText="下一步">
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
                <p className="tip-login">（身份证后六位或智慧理工大密码）</p>
            </form>
        </LoginPannel>
    )
}

export function LoginCCNU(props) {

    const goVerify = () => {
        props.history.push("/login/bindemail")
    }
    return (
        <LoginPannel text="我是华小师" onClick={goVerify} btnText="下一步">
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
        <LoginPannel text="邮箱绑定" onClick={goBind} btnText="完成">
            <form className="panel-login">
                <p className="tip-email">填写邮箱地址，可以及时<br />
                    查收愿望状态哦~</p>
                <li>
                    <label className="label-email">邮箱：</label>
                    <input className="input-email"></input>
                </li>
            </form>
        </LoginPannel>
    )
}