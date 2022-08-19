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

function CheckbtnHandle(){
    let H = document.getElementById("checkbtn");
    let time = 60;
    let retry = setInterval(
        ()=>{
            H?.setAttribute("disabled", "true")
            if(H?.id !== undefined){
                H.id = "checked";
            }
        },
        1000
    )
    setTimeout(()=>{
        if(H?.innerHTML !== undefined){
            H.innerHTML = "("+(--time)+"s后重新获取）";
            clearInterval(retry);
        }
    }, 60000)
}

// function CheckbtnHandle(props:ICheckbtnHandleProps){
    
//     if(props.state === 1){        //中断计时
//         props.HtmlElement.setAttribute("disabled", "false");
//         props.HtmlElement.value = "重新获取验证码"
//     }   
//     else{
//         let time = 60;
//         let retry = setInterval(
//             ()=>{
//                 props.HtmlElement.setAttribute("disabled", "true");
//                 props.HtmlElement.className = "checked";
//             },
//             1000
//         )
//         setTimeout(() => {
//             props.HtmlElement.value = "("+(--time)+"后重新获取）";
//             clearInterval(retry);
//         }, 60000);
//     }  
//     return undefined;
// }

function Checkbtn(props:ICheckbtnProps){
    useEffect(
        ()=>{
            
        }
    )

    return (
        <>
        <button className="checkbtn" onClick={()=>{console.log('测试1')}}>{props.text}</button>
        </>
    )
}


export function Register() {
    const navigate = useNavigate();
    const [WhutEmail, setWhutEmail] = useState('')
    const [WhutCheckEmail, setWhutCheckEmail] = useState('')
    const [WhutPwd, setWhutPwd] = useState('')
    const [WhutIsPwd, setWhutIsPwd] = useState('')

    const handleWhutId = (e:ChangeEvent<HTMLInputElement>) => {
        setWhutEmail(e.target.value)
    }

    const handleWhutPwd = (e:ChangeEvent<HTMLInputElement>) => {
        setWhutPwd(e.target.value)
    }
    const handleWhutCheckEmail = (e:ChangeEvent<HTMLInputElement>) => {
        setWhutCheckEmail(e.target.value)
    }
    const handleWhutIsPwd = (e:ChangeEvent<HTMLInputElement>) => {
        setWhutIsPwd(e.target.value)
    }

    const goGetEVV = (email:string)=>{
        Service.whutRegisterCheckEmail(email).then(res=>{
            const resData = res.data;
            if(resData.status === 1){//返回验证码成功
                console.log(resData)
                CheckbtnHandle()
            }
        })
        return undefined
    }

    const goVerify = () => {
        if (WhutEmail === "") {
            alert("请输入邮箱")
        }
        else if(WhutCheckEmail === ""){
            alert("请输入验证码")
        }
        else if(WhutPwd === ""){
            alert("请设置密码")
        }
        else if(WhutIsPwd === ""){
            alert("请确认密码")
        }
        else if(WhutPwd !== WhutIsPwd){
            alert("两次密码输入不一致")
        }
        else{
            Service.whutRegisterCheckEmail(WhutEmail).then(res=>{
                const resData = res.data;
                if(resData.data.emailVV === WhutCheckEmail){
                    Service.whutRegister(WhutEmail, WhutPwd).then(res=>{
                        const resData = res.data;
                        if(resData.data.state === 1){
                            alert("注册成功");
                            navigate('login/whut');
                        }
                        else{
                            alert(resData.msg);//若邮箱已被注册，弹窗提醒

                        }
                    })
                }
                else{
                    alert("验证码错误")//此处改为弹窗提醒，并刷新“获取验证码按钮”
                }
            })
        }
    }
    // const goVerify = () => {
    //     if (WhutEmail === "") {
    //         alert("请输入邮箱")
    //     } else if (WhutPwd === "") {
    //         alert("请输入密码")
    //     } else {
    //         Service.WhutLogin(WhutEmail, WhutPwd).then(res => {
    //             // console.log(res)
    //             res.status = 0; //鉴权测试
    //             if (res.status === 0) {    
    //                 localStorage.setItem('token', res.data.data.token as string)
    //                 navigate('/tagscreen/home');
    //                 // props.history.push('/')
    //             }
    //             else alert('邮箱或密码错误');
    //         })
    //     }
    // }
    return (
        <RegisterPannel text="掌上吾理账号注册" onClick={goVerify} btnText="确定">
            <div className="panel-login">
                <ul>
                    <li>
                        <label>邮箱：</label>
                        <input className="email" value={WhutEmail} onChange={handleWhutId}></input>
                    </li>
                    <li>
                        <label>验证码：</label>
                        <input className="checkemail" value={WhutCheckEmail} onChange={handleWhutCheckEmail}></input>
                        {/* <button className="checkbtn">获取验证码</button> */}
                        <button id="checkbtn" onClick={goGetEVV(WhutEmail)}>获取验证码</button>
                        {/* <Checkbtn classname="checkbtn" text="" state={1} onClick={goGetEVV(WhutEmail, this)}></Checkbtn> */}
                        
                    </li>
                    <li>
                        <label>密码：</label>
                        <input type="password" value={WhutPwd} onChange={handleWhutPwd}></input>
                    </li>
                    <li>
                        <label>确认密码：</label>
                        <input type="password" value={WhutIsPwd} onChange={handleWhutIsPwd}></input>
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

