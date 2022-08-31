import {Service} from '../../common/service'
import './WhutLogin.scss'
import { ButtonL } from '../../components/Button'
import { ChangeEvent, ReactNode, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'

export interface ILoginPannel{
    text:string,
    onClick?:React.MouseEventHandler<HTMLDivElement>,
    btnText:string,
    children:ReactNode
}

function LoginPannel(props:ILoginPannel) {
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


export function LoginWhut() {
    const navigate = useNavigate();
    const [whutId, setWhutId] = useState('')
    const [whutPwd, setWhutPwd] = useState('')

    const handleWhutId = (e:ChangeEvent<HTMLInputElement>) => {
        setWhutId(e.target.value)
    }

    const handleWhutPwd = (e:ChangeEvent<HTMLInputElement>) => {
        setWhutPwd(e.target.value)
    }
    const goVerify = () => {
        if (whutId === "") {
            alert("请输入邮箱")
        } else if (whutPwd === "") {
            alert("请输入密码")
        } else {
            Service.whutLogin(whutId, whutPwd).then(res => {
                // console.log(res)
                res.status = 0; //鉴权测试
                if (res.status === 0) {    
                    localStorage.setItem('token', res.data.data)
                    navigate('/tagscreen/home');
                    // props.history.push('/')
                }
                else alert('邮箱或密码错误');
            })
        }
    }
    return (
        <LoginPannel text="我是武小理" onClick={goVerify} btnText="下一步">
            <div className="panel-login">
                <ul>
                    <li>
                        <label>邮箱：</label>
                        <input value={whutId} onChange={handleWhutId}></input>
                    </li>
                    <li>
                        <label>密码：</label>
                        <input type="password" value={whutPwd} onChange={handleWhutPwd}></input>
                    </li>
                </ul>
            </div>
            <GoRegister text='' goRegister='快速注册一个吧！' navigate_={navigate}>
            请使用掌上吾理账号登录，<br/>还没有？
            </GoRegister>
        </LoginPannel>
    )
}


interface IGoRegisterProps{
    text: string,
    goRegister: string,
    children:ReactNode,
    navigate_:NavigateFunction
}

export function GoRegister(props:IGoRegisterProps){
    // const navigate = useNavigate();
    // console.log(navigate)


    return (
        <p>
        ( {props.children}<a onClick={()=>{props.navigate_("whutRgister")}}>{props.goRegister}</a>)
        </p>
    )
}
// export function BindEmail() {
//     const navigate = useNavigate();

//     const [email, setEmail] = useState('')

//     const handleEmail = (e:ChangeEvent<HTMLInputElement>) => {
//         setEmail(e.target.value)
//     }
//     const goBind = () => {
//         Service.bindEmail(email).then(() => {
//             navigate('/tagscreen/home');
//             // props.history.push("/home")
//         })
//     }

//     return (
//         <LoginPannel text="邮箱绑定" onClick={goBind} btnText="完成">
//             <div className="panel-login">
//                 <p className="tip-email">填写邮箱地址，可以及时<br />
//                     查收愿望状态哦~</p>
//                 <li>
//                     <label className="label-email">邮箱：</label>
//                     <input className="input-email" onChange={handleEmail} value={email} ></input>
//                 </li>
//             </div>
//         </LoginPannel>
//     )
// }