import "./index.scss"

import Service from '../../common/service'
import { ButtonL } from '../../components/Button'
import { ChangeEvent, MouseEventHandler, ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface IRegisterPannel{
    text:string,
    onClick?:React.MouseEventHandler<HTMLDivElement>,
    btnText:string,
    children:ReactNode
}

function RegisterPannel(props:IRegisterPannel) {
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

interface ICheckbtnHandleProps{
    state:number,
    HtmlElement:HTMLButtonElement
}
interface ICheckbtnProps{
    text:string,
    onClick?:React.MouseEventHandler<HTMLButtonElement>,
    state:number,
    classname:string
    // HtmlElement:HTMLButtonElement
}

function CheckbtnHandle(props:ICheckbtnHandleProps){
    
    if(props.state === 1){        //中断计时
        props.HtmlElement.setAttribute("disabled", "false");
        props.HtmlElement.value = "重新获取验证码"
    }   
    else{
        let time = 60;
        let retry = setInterval(
            ()=>{
                props.HtmlElement.setAttribute("disabled", "true");
                props.HtmlElement.className = "checked";
            },
            1000
        )
        setTimeout(() => {
            props.HtmlElement.value = "("+(--time)+"后重新获取）";
            clearInterval(retry);
        }, 60000);
    }  
    return undefined;
}

function Checkbtn(props:ICheckbtnProps){
    useEffect(
        ()=>{
            
        }
    )

    return (
        <>
        <button className="checkbtn" onClick={CheckbtnHandle()}>{props.text}</button>
        </>
    )
}


export function Register() {
    const navigate = useNavigate();
    const [WhutId, setWhutId] = useState('')
    const [WhutPwd, setWhutPwd] = useState('')

    const handleWhutId = (e:ChangeEvent<HTMLInputElement>) => {
        setWhutId(e.target.value)
    }

    const handleWhutPwd = (e:ChangeEvent<HTMLInputElement>) => {
        setWhutPwd(e.target.value)
    }
    const goVerify = () => {
        if (WhutId === "") {
            alert("请输入邮箱")
        } else if (WhutPwd === "") {
            alert("请输入密码")
        } else {
            Service.WhutLogin(WhutId, WhutPwd).then(res => {
                // console.log(res)
                res.status = 0; //鉴权测试
                if (res.status === 0) {    
                    localStorage.setItem('token', res.data.data.token as string)
                    navigate('/tagscreen/home');
                    // props.history.push('/')
                }
                else alert('邮箱或密码错误');
            })
        }
    }
    return (
        <RegisterPannel text="掌上吾理账号注册" onClick={goVerify} btnText="确定">
            <div className="panel-login">
                <ul>
                    <li>
                        <label>邮箱：</label>
                        <input className="email" value={WhutId} onChange={handleWhutId}></input>
                    </li>
                    <li>
                        <label>验证码：</label>
                        <input className="checkemail" type="password" value={WhutPwd} onChange={handleWhutPwd}></input>
                        <button className="checkbtn">获取验证码</button>
                        <Checkbtn classname="checkbtn" text="" state={1}></Checkbtn>
                    
                    </li>
                    <li>
                        <label>密码：</label>
                        <input type="password" value={WhutPwd} onChange={handleWhutPwd}></input>
                    </li>
                    <li>
                        <label>确认密码：</label>
                        <input type="password" value={WhutPwd} onChange={handleWhutPwd}></input>
                    </li>
                </ul>
            </div>
        </RegisterPannel>
    )
}

// export function Register(){
//     return (
//         <>
//         fdsa
//         </>
//     )
// }

