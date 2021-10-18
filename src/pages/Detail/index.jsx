import React, { useState } from 'react'
import { ButtonS } from '../../components/Button'
import ConfirmPanel from '../../components/ConfirmPanel'

import './index.scss'

const DetailLine = (props) => {
    return (
        <div className="p-content">
            <p>{props.text}</p>
            <hr />
        </div>
    )
}

const WishDetail = () => {
    return (
        <div className="wish">
            <DetailLine text="帮我修锅帮我修锅帮我修锅"></DetailLine>
            <DetailLine text="帮我修锅帮我修锅帮我修锅"></DetailLine>
            <DetailLine text="帮我修锅帮我修锅帮我修锅"></DetailLine>
            <DetailLine text="帮我修锅帮我修锅帮我修锅"></DetailLine>
            <DetailLine text="帮我修锅帮我修锅帮我修锅"></DetailLine>
            <p className='p-name'>
                来自&nbsp;&nbsp; 李东哲
            </p>
            <p className='p-time'>2021.10.10 12 : 54</p>
        </div>
    )
}

const PersonMsg = () => {
    return (
        <div className="msg">
            <div className="msg-text">
                <p className='h'>许愿人</p>
                <p className='name'>李东哲</p>
            </div>
            <div className="msg-info">
                <p>于 2021-09-01&nbsp;&nbsp;00:00许愿</p>
                <p style={{ marginTop: "0.5em", textAlign: "left" }}>联系方式 :</p>
                <ul className="msg-number">
                    <li> QQ : 2601548431</li>
                    <li>电话 : 15373815535</li>
                </ul>
            </div>
        </div>
    )
}

const AbandonBoard = (props) => {
    return (
        <div className='msg-borad'><p>你想要放弃这个愿望，<br />建议给对方留言说明原因哦：</p>
            <div className='options'>
                <div><input type="radio" name='msg' value='' /></div>
                <p>刚刚误触了点亮按钮，不好意思啦～</p>
            </div>
            <div className='options'>
                <div> <input type="radio" name='msg' value='aa' /></div>
                <p>最近有点忙，短时间没有精力实现愿望了，抱歉</p>
            </div>
            <div className='options'>
                <div><input type='radio' name='msg' value='aa' /></div>
                <div>
                    <p>留言给对方：</p>
                    <input type="text" placeholder='输入其他原因' className='reason' />
                </div>
            </div>
        </div>
    )
}


export default function Detail() {

    const [showConfirm, setShowConfirm] = useState(false) // 设置遮罩状态
    const [confirmContent, setConfirmContent] = useState('') // 设置弹窗内容
    const [btnText, setBtnText] = useState({}); // 设置按钮文本
    const [confirmAction, setConfirmAction] = useState({}); // 设置按钮触发

    // 确认愿望实现
    const pressAchieve = () => {
        setConfirmAction(() => {
            confirmAction.yes = () => {
                setShowConfirm(false);
                //TODO: 确认实现愿望后续操作
            }
            confirmAction.no = () => {
                setShowConfirm(false)
            }
            return confirmAction;
        })
        setConfirmContent(
            <>
                <p style={{ alignSelf: "flex-start" }}>
                    确认已经实现这个愿望了嘛？
                </p>
                <p style={{ alignSelf: "flex-start", textAlign: "start" }}>
                    若确认，我们将发邮件提醒TA来确认你已经实现了TA的愿望
                </p>
            </>
        );
        setShowConfirm(true);

    }
    // 点击放弃愿望
    const pressAbandon = () => {
        setConfirmAction(() => {
            confirmAction.yes = pressReallyAbandon;
            confirmAction.no = () => {
                setShowConfirm(false)
            }
            return confirmAction;
        })
        setConfirmContent(
            <p>确认放弃这个愿望吗？</p>
        )
        setShowConfirm(true);
    }

    // 点击确定放弃
    const pressReallyAbandon = () => {

        setConfirmAction(() => {
            confirmAction.yes = () => {
                setShowConfirm(false);
                setBtnText({});
                //TODO: 放弃愿望结果过程
            }
            confirmAction.no = () => {
                setShowConfirm(false);
                setBtnText({});
                //TODO: 不发送留言
            }
            return confirmAction;
        })
        setConfirmContent(
            <AbandonBoard />
        )
        setBtnText({
            yes: "发送",
            no: "不留言"
        })
    }

    return (
        <div className='Detail'>
            <WishDetail />
            <div className="panel-button">
                <ButtonS onClick={pressAbandon}
                    style={{ background: "#FFFFFF", color: "#F25125", width: "6em" }}>
                    删除这个心愿
                </ButtonS>
                <ButtonS onClick={pressAchieve}
                    style={{ background: "#FF7A59", color: "#FFFFFF", width: "6em", marginLeft: "2em" }}>
                    确认实现
                </ButtonS>
            </div>
            <hr />
            <PersonMsg />
            <ConfirmPanel display={showConfirm} action={confirmAction} btnText={btnText} >
                {confirmContent}
            </ConfirmPanel>
        </div >
    )
}