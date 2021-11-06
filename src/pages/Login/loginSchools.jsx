import { useState } from 'react'
import Service from '../../common/service'

import './loginSchools.scss'
import { ButtonL } from '../../components/Button'
import { useEffect } from 'react/cjs/react.development'

function LoginPannel(props) {
    return (
        <div className="login-pannel">
            <p className="text-login-title">{props.text}</p>
            {props.children}
            <ButtonL onClick={props.onClick} >
                {props.btnText}
            </ButtonL>
        </div>
    )
}


export function LoginCCNU(props) {
    const [ccnuId, setCcnuId] = useState('')
    const [ccnuPwd, setCcnuPwd] = useState('')

    const handleCcnuId = (e) => {
        setCcnuId(e.target.value)
    }

    const handleCcnuPwd = (e) => {
        setCcnuPwd(e.target.value)
    }
    const goVerify = () => {
        Service.ccnuLogin(ccnuId, ccnuPwd).then(res => {
            if (res.status === 0) {
                localStorage.setItem('token', res.data)
                props.history.push('/')
            }
            else alert('用户名或密码错误');
        })
    }
    return (
        <LoginPannel text="我是华小师" onClick={goVerify} btnText="下一步">
            <form className="panel-login">
                <ul>
                    <li>
                        <label>学号：</label>
                        <input value={ccnuId} onChange={handleCcnuId}></input>
                    </li>
                    <li>
                        <label>密码：</label>
                        <input type="password" value={ccnuPwd} onChange={handleCcnuPwd}></input>
                    </li>
                </ul>
            </form>
        </LoginPannel>
    )
}

export function BindEmail(props) {

    const [email, setEmail] = useState('')

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const goBind = () => {
        Service.bindEmail(email).then(() => {
            props.history.push("/home")
        })
    }

    return (
        <LoginPannel text="邮箱绑定" onClick={goBind} btnText="完成">
            <form className="panel-login">
                <p className="tip-email">填写邮箱地址，可以及时<br />
                    查收愿望状态哦~</p>
                <li>
                    <label className="label-email">邮箱：</label>
                    <input className="input-email" onChange={handleEmail} value={email} ></input>
                </li>
            </form>
        </LoginPannel>
    )
}