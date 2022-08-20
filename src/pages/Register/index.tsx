import "./index.scss"

import Service from '../../common/service'
import { ButtonL } from '../../components/Button'
import { ChangeEvent, MouseEventHandler, ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'



let WhutEVV: string = ""    //全局变量用于接收返回验证码

export interface IRegisterPannel {
    text: string,
    onClick?: React.MouseEventHandler<HTMLDivElement>,
    btnText: string,
    children: ReactNode
}

function RegisterPannel(props: IRegisterPannel) {
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

interface ICheckbtnHandleProps {
    state: number,
    HtmlElement: HTMLButtonElement
}
interface ICheckbtnProps {
    text: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    state: number,
    classname: string
    // HtmlElement:HTMLButtonElement
}

function CheckbtnHandle() {
    let H = document.getElementById("checkbtn");
    let time = 60;
    let retry = setInterval(
        () => {
            // H?.setAttribute("disabled", "true")
            if (H?.id !== undefined) {
                H.id = "checked";
            }
            if (H?.innerHTML !== undefined) { H.innerHTML = "（" + (--time) + "s后重新获取）"; }

        },
        1000
    )
    setTimeout(() => {
        if (H?.innerHTML !== undefined) {
            H.innerHTML = "重新获取";
            if (H?.id !== undefined) {
                H.id = "checkbtn";
            }
            clearInterval(retry);
        }
    }, 60000)

    return
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



export function Register() {
    const navigate = useNavigate();
    // const [WhutEVV, setWhutEVV] = useState('')
    const [WhutEmail, setWhutEmail] = useState('')
    const [WhutCheckEmail, setWhutCheckEmail] = useState('')
    const [WhutPwd, setWhutPwd] = useState('')
    const [WhutIsPwd, setWhutIsPwd] = useState('')

    const handleWhutId = (e: ChangeEvent<HTMLInputElement>) => {
        setWhutEmail(e.target.value)
    }

    const handleWhutPwd = (e: ChangeEvent<HTMLInputElement>) => {
        setWhutPwd(e.target.value)
    }
    const handleWhutCheckEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setWhutCheckEmail(e.target.value)
    }
    const handleWhutIsPwd = (e: ChangeEvent<HTMLInputElement>) => {
        setWhutIsPwd(e.target.value)
    }



    const goGetEVV = (email: string) => {
        if (email === "") {
            alert('请输入邮箱')
            return
        }
        Service.whutRegisterCheckEmail(email).then(res => {
            const resData = res.data;
            if (resData.status === 1) {//返回验证码成功
                console.log(resData)

                // CheckbtnHandle() //由于程序本身逻辑运行时间过长，使用“内联形式”
                {
                    let H = document.getElementById("checkbtn");
                    let time = 60;
                    let retry = setInterval(
                        () => {
                            // H?.setAttribute("disabled", "true")
                            if (H?.id !== undefined) {
                                H.id = "checked";
                            }
                            if (H?.innerHTML !== undefined) { H.innerHTML = "（" + (--time) + "s后重新获取）"; }

                        },
                        1000
                    )
                    setTimeout(() => {
                        if (H?.innerHTML !== undefined) {
                            H.innerHTML = "重新获取";
                            if (H?.id !== undefined) {
                                H.id = "checkbtn";
                            }
                            clearInterval(retry);
                        }
                    }, 60000)

                }
                // return function () { return resData.data.emailVV }
                console.log(resData.data)
                WhutEVV = resData.data.emailVV
                console.log(WhutEVV)

            }
            else {
                alert('请输入正确邮箱')
                return undefined
            }
        })
        // setWhutCheckEmail(WhutEVV)
    }

    function goVerify(WhutEVV: string) {
        if (WhutEmail === "") {
            alert("请输入邮箱")
        }
        else if (WhutCheckEmail === "") {
            alert("请输入验证码")
        }
        else if (WhutPwd === "") {
            alert("请设置密码")
        }
        else if (WhutIsPwd === "") {
            alert("请确认密码")
        }
        else if (WhutPwd !== WhutIsPwd) {
            alert("两次密码输入不一致")
        }
        else {

            if (WhutCheckEmail === WhutEVV) {
                Service.whutRegister(WhutEmail, WhutPwd).then(res => {
                    const resData = res.data;
                    if (resData.data.state === 1) {
                        alert("注册成功");
                        navigate('login/whut');
                    }
                    else {
                        alert(resData.msg);//若邮箱已被注册，弹窗提醒

                    }
                })
            }
            else {
                console.log(WhutEVV)
                alert("验证码错误")//此处改为弹窗提醒，并刷新“获取验证码按钮”
            }
        }

    }

    return (
        <RegisterPannel text="掌上吾理账号注册" onClick={() => {console.log(WhutEVV); goVerify(WhutEVV)}} btnText="确定">
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
                        <button id="checkbtn" onClick={() => goGetEVV(WhutEmail)}>获取验证码</button>
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

