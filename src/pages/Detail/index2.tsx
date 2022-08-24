import forwardimg from "../../static/images/forward.svg";
import { ReactElement, useEffect, useState } from "react";
import { Service } from "../../common/service";
import { IWishObject } from "../MyWish";
import { formatTime } from "../../common/global";
import ConfirmPanel from "../../components/ConfirmPanel";
import { useNavigate } from "react-router-dom";
import { type } from "os";
import { ButtonS } from "../../components/Button";
import { template } from "@babel/core";
const INITNUM: number = -9;
function KILLUNDEFINED(value: string | undefined) { return value ? value : "" }

type IOnChange = {
    changeShowConfirm: (props: boolean) => void,
    changeConfirmContent: (props: ReactElement) => void,
    changeBtnText: (props1: string, props2: string) => void,
    changeConfirmAction: (props1: () => void, props2: () => void) => void,
}

interface IWishDetail {
    wish: IWishObject,
    isMine: boolean,
    onChange: IOnChange,
    pathname: string
}

interface IPersonMsg {
    wish: IWishObject,
    isMine: boolean
}

export interface IBtnStateObject<T = any> {
    yes: T,
    no: T
}

interface IDetailChange {
    onChange: IOnChange,
    goOtherPage: (props: string) => void
}

interface IDetailPageProps {
    wish: IWishObject,
    DetailChange: IDetailChange,
    chooseReturn:number
}



function WishDetail(props: IWishDetail) {
    const {
        changeShowConfirm,
        changeConfirmContent,
        changeBtnText,
        changeConfirmAction,
    } = props.onChange;
    const { isMine, wish } = props;


    const getForward = () => {
        if (wish.state === 0 && isMine) {
            return (
                <img
                    src={forwardimg}
                    onClick={showForward}
                    className="forward"
                    alt=""
                />
            );
        }
    };
    const showForward = () => {
        changeConfirmContent(
            <>
                <p>快去复制以下链接</p>
                <p>将你的愿望分享出去吧~</p>
                <p
                    style={{
                        width: "80%",
                        wordBreak: "break-all",
                    }}
                >
                    {window.location.href}
                </p>
            </>
        );
        changeConfirmAction(
            () => {
                changeShowConfirm(false);
            },
            () => {
                changeShowConfirm(false);
            }
        );
        changeShowConfirm(true);
    };

    return (
        <div className="content">
            {getForward()}
            <div className="text">
                <div className="text-content">{props.wish.wish}</div>
            </div>
            <div className="wishInfo">
                <p>来自 {props.wish.wishman_inform?.wishMan_name}</p>
                <p>{formatTime(props.wish.creat_at)}</p>
            </div>
        </div>
    )
}



function PersonMsg(props: IPersonMsg) {
    const { wish, isMine } = props
    const [name, setName] = useState("");
    const [time, setTime] = useState("");
    const [QQ, setQQ] = useState("");
    const [wechat, setWechat] = useState("");
    const [tel, setTel] = useState("");
    useEffect(() => {
        if (isMine) {
            Service.getLightManInfo(wish.wish_id.toString()).then((res) => {
                let lightman = res.data.data;
                setName(KILLUNDEFINED(lightman.light_name));
                setTime("于" + formatTime(wish.light_at) + "点亮");
                setQQ(KILLUNDEFINED(lightman.light_qq));
                setWechat(KILLUNDEFINED(lightman.light_wechat));
                setTel(KILLUNDEFINED(lightman.light_tel));
            });
        } else {
            setName(KILLUNDEFINED(wish.wishman_inform?.wishMan_name));
            setTime("于" + formatTime(wish.creat_at) + "许愿");
            setQQ(KILLUNDEFINED(wish.wishman_inform?.wishMan_QQ));
            setWechat(KILLUNDEFINED(wish.wishman_inform?.wishMan_Wechat));
            setTel(KILLUNDEFINED(wish.wishman_inform?.wishMan_Tel));
        }
    }, [isMine, wish]);

    return (
        <div className="msg">
            <div className="msg-text">
                <p className="h">{isMine ? "点亮人" : "许愿人"}</p>
                <p className="name">{name}</p>
            </div>
            <div className="msg-info">
                <p>{time}</p>
                <p style={{ marginTop: "0.5em", textAlign: "left" }}>联系方式 :</p>
                <ul className="msg-number">
                    {QQ ? <li>QQ：{QQ}</li> : null}
                    {wechat ? <li>微信：{wechat}</li> : null}
                    {tel ? <li>电话：{tel}</li> : null}
                </ul>
            </div>
        </div>
    );
};


//Detail核心显示部分

function DetailPage(props: IDetailPageProps) {
    const {
        changeShowConfirm,
        changeConfirmContent,
        changeBtnText,
        changeConfirmAction,
    } = props.DetailChange.onChange;
    const goOtherPage = props.DetailChange.goOtherPage;
    const achieved = props.wish.state === 2;
    const [currentIndex, setCurrentIndex] = useState("wuchu");
    // let currentIndex = "wuchu";
    // let otherMsg = "";

    type IMsgs = {
        [key: string]: string
    }
    const msgs: IMsgs = {
        wuchu: "刚刚误触了点亮按钮，不好意思啦~",
        mang: "最近有点忙，短时间没有精力实现愿望了，抱歉",
        other: ""//占位
    };

    //select元素抽象
    interface IHandleSelectProps {
        allOption: string[],
        onChangeAction: [option: string, setOption: React.Dispatch<React.SetStateAction<string>>],
        selectSttyle?: React.CSSProperties
    }
    function handleSelect(props: IHandleSelectProps) {
        return (
            <select
                onChange={(e) => { props.onChangeAction[1](e.target.value); }}
                style={{ color: "rgb(239, 96, 63)" }}
            >
                <>
                    {props.allOption.map((option) => {
                        <option value={option}>{option}</option>
                    })}
                </>
            </select>
        )
    }
    //input元素抽象
    interface IHandleInputProps {
        type: string,
        onChangeAction: [inputState: string, setInputState: React.Dispatch<React.SetStateAction<string>>]
        // onChange: (props: any) => void,
        name?: string,
        classname?: string,
        style?: React.CSSProperties,
        value?: string,
        placeholder?: string,
        defaultChecked?: boolean,
        defaultValue?: string
    }
    function handleInput(props: IHandleInputProps) {
        return (
            <input
                type={props.type}
                onChange={(e) => { props.onChangeAction[1](e.target.value); }}
            >
            </input>
        )
    }

    //弹窗抽象
    function handlePopWindows(
        yesHandle: () => void = () => { goOtherPage("/detail/index"); },
        Content: ReactElement,
        noHandle: () => void = () => { changeShowConfirm(false); },
        btnText1: string = "",
        btnText2: string = ""
    ) {
        changeConfirmAction(yesHandle, noHandle);
        changeConfirmContent(Content);
        changeShowConfirm(true);
        changeBtnText(btnText1, btnText2);
    }



    // 别人的愿望，我已经点亮/实现 ———— 点击实现愿望
    const pressAchieve = handlePopWindows(() => {
        changeShowConfirm(false);
        Service.achieveWish(props.wish.wish_id.toString());
        goOtherPage("/detail/index");
    }, <>
        <p style={{ alignSelf: "flex-start" }}>确认已经实现这个愿望了嘛？</p>
        <p style={{ alignSelf: "flex-start", textAlign: "start" }}>
            若确认，我们将发邮件提醒TA来确认你已经实现了TA的愿望
        </p>
    </>)


    // 别人的愿望，我已经点亮/实现 ———— 点击确定放弃
    const pressReallyAbandon = () => {

        function ReasonInput(
            type: string,
            name: string,
            value: string,
            reason: string,
            defaultChecked?: boolean
        ): ReactElement {
            let tagdoc = (value === "mang" ? " " : null);

            return (
                <div className="options">
                    <div>
                        {tagdoc}
                        <input
                            type={type}
                            name={name}
                            value={value}
                            defaultChecked={defaultChecked ? defaultChecked : false}
                            onChange={(e) => { setCurrentIndex(e.target.value) }}
                        />
                    </div>
                    {value !== "ohter" ? <p>{reason}</p> :
                        <div>
                            <p>留言给对方：</p>
                            {handleInput({type:"text", onChangeAction:[currentIndex, setCurrentIndex], placeholder:"输入其他原因", classname:"reason", defaultValue:currentIndex})}
                        </div>}
                </div>
            )
        }

        handlePopWindows(
            () => {
                changeShowConfirm(false);
                changeBtnText("", "");
                let message = currentIndex === "other" ? msgs["other"] : msgs["wuchu"];
                Service.giveUpLightWish(props.wish.wish_id.toString(), message).then(() => {
                    goOtherPage("/detail/index");
                });
            },
            <>
                <form className="msg-borad">
                    <p>
                        你想要放弃这个愿望，
                        <br />
                        建议给对方留言说明原因哦：
                    </p>
                    {ReasonInput("radio", "msg", "wuchu", msgs["wuchu"], true)}
                    {ReasonInput("radio", "msg", "mang", msgs["mang"])}
                    {ReasonInput("radio", "msg", "other", msgs["other"])}

                </form>
            </>,
            () => {
                changeShowConfirm(false);
                changeBtnText("", "");
                Service.giveUpLightWish(props.wish.wish_id.toString()).then(() => {
                    goOtherPage("/detail/index");
                });
            },
            "发送", "不留言"
        )

    };

    // 别人的愿望，我已经点亮/实现 ———— 点击放弃愿望
    const pressAbandon = handlePopWindows(pressReallyAbandon, <p>确认放弃这个愿望吗？</p>)

    // 别人的愿望，没人实现 ———— 点击确定点亮
    const pressReallyLight = () => {
        const [name, setName] = useState("");
        const [option, setOption] = useState("QQ");
        const [number, setNumber] = useState("");
        const [tel, setTel] = useState("");
        handlePopWindows(
            () => {
                let id = props.wish.wish_id;
                let [qq, wechat] = option === "QQ" ? [number, ""] : ["", number];
                Service.lightWishOn(id.toString(), name, tel, qq, wechat).then((res) => {
                    if (res.data.status === 0) {
                        alert("点亮成功~");
                        goOtherPage("/detail/index");
                    } else {
                        alert(res.data.msg);
                    }
                });
                changeShowConfirm(false);
            },
            <div className="input-msg">
                <p className="info">填写联系方式，方便他来联系你哦～</p>
                <div className="form">
                    <div className="name">
                        投递人 :
                        {handleInput({ type: "text", onChangeAction: [name, setName], classname: "name", placeholder: "必填内容哦～", defaultValue: name })}
                    </div>
                    <div className="number">
                        联系方式 :
                        {handleSelect({ allOption: ["QQ", "WeChat"], onChangeAction: [option, setOption] })}
                        {handleInput({ type: "text", onChangeAction: [number, setNumber], placeholder: "必填内容哦～", defaultValue: number, style: { marginLeft: ".3em", width: "30%" } })}
                    </div>
                    <div className="tel">
                        或 Tel :
                        {handleInput({ type: "text", onChangeAction: [tel, setTel], placeholder: "选填内容哦～", defaultValue: tel })}
                    </div>
                </div>
            </div>,
            () => { changeShowConfirm(false); },
            "发送"
        )
    }

    // 别人的愿望，没人实现 ———— 点击点亮
    const pressLight = handlePopWindows(
        pressReallyLight,
        <p style={{ fontSize: "medium" }}>确认要帮TA实现这个愿望吗？</p>
    )

    switch (props.chooseReturn) {
        case 1: {
            return (
                <>
                    <div className="panel-button">
                        <ButtonS
                            onClick={achieved ? undefined : () => pressAbandon}
                            style={{ background: "#FFFFFF", color: "#F25125", width: "6em" }}
                        >
                            放弃实现
                        </ButtonS>
                        <ButtonS
                            onClick={achieved ? undefined : () => pressAchieve}
                            style={{
                                background: achieved ? "#C0C0C0" : "#FF7A59",
                                color: "#FFFFFF",
                                width: "6em",
                                marginLeft: "2em",
                            }}
                        >
                            {achieved ? "已经实现" : "确认实现"}
                        </ButtonS>
                    </div>
                    <hr />
                    <PersonMsg wish={props.wish} isMine={false} />
                </>
            );
        };
        case 2: {
            return (
                <ButtonS
                    onClick={()=>pressLight}
                    style={{ background: "#FFFFFF", color: "#F25125", width: "6em" }}
                >
                    点亮这个心愿
                </ButtonS>
            );
        }
        default: break;
    }
}



export default function Detail() {
    const BTNTEXT_INIT: IBtnStateObject<string> = { yes: "", no: "" };
    const ACTION_INIT: IBtnStateObject<() => void> = { yes: () => { }, no: () => { } };
    const CONTENT_INIT: ReactElement = <></>;
    const WISH_INIT: IWishObject = {
        creat_at: "",
        light_at: "",
        light_user: INITNUM,//to do -- 改成具体数字，问后端要接口
        school: INITNUM,//to do -- 改成具体数字，问后端要接口
        state: INITNUM,//to do -- 改成具体数字，问后端要接口
        type: INITNUM,//to do -- 改成具体数字，问后端要接口
        wish: "",
        wish_id: INITNUM,
        wishman_inform: {
            wishMan_name: "",
            wishMan_QQ: "",
            wishMan_Wechat: "",
            wishMan_Tel: ""
        }
    };

    const [showConfirm, setShowConfirm] = useState(false); // 设置遮罩状态
    const [confirmContent, setConfirmContent] = useState(CONTENT_INIT); // 设置弹窗内容
    const [btnText, setBtnText] = useState(BTNTEXT_INIT); // 设置按钮文本
    const [confirmAction, setConfirmAction] = useState(ACTION_INIT); // 设置按钮触发
    const [wish, setWish] = useState(WISH_INIT); // 愿望内容
    const [isMine, setIsMine] = useState(false); // 是不是自己的愿望
    const navigate = useNavigate();

    const goOtherPage = (path: string) => {
        navigate(path)
    };

    //change model
    const onChange: IOnChange = {

        changeShowConfirm(confirm: boolean) {
            setShowConfirm(confirm);
        },

        changeConfirmContent(content: ReactElement) {
            setConfirmContent(content);
        },

        changeBtnText(btn1: string = btnText.yes, btn2: string = btnText.no) {
            setBtnText({
                yes: btn1,
                no: btn2
            })
        },

        changeConfirmAction(action1: () => void = confirmAction.yes, action2: () => void = confirmAction.no) {
            setConfirmAction({
                yes: action1,
                no: action2
            })
        }

    }
    const DetailChange = {
        onChange,
        goOtherPage
    }

    useEffect(() => {
        let id = location.pathname.split('/').pop();
        if (!id) return;
        Service.getWishDetail(id).then((res) => {
            setWish(res.data.data);
            Service.getUserWishPost().then((res) => {
                res.data.data.forEach((wish) => {
                    if (!id) return;
                    if (wish.wish_id === parseInt(id)) {
                        setIsMine(true);
                    }
                })
            })
        })
    }, [location.pathname])

    return (
        <div className="Detail">
            <WishDetail
                wish={wish}
                isMine={isMine}
                onChange={onChange}
                pathname={location.pathname}
            />
            {/*<div className="other">
                {
                    [
                        [
                            <OtherNotLighted wish={wish} onChange={onChange} />, // 别人的愿望，我未点亮
                            <OtherLighted wish={wish} onChange={onChange} />, // 别人的愿望，我已点亮
                            <OtherLighted wish={wish} onChange={onChange} />, // 别人的愿望，我已实现
                        ],
                        [
                            <MineNotLighted wish={wish} onChange={onChange} />, // 我的愿望，无人点亮
                            <MineLighted wish={wish} onChange={onChange} />, // 我的愿望，有人点亮
                            <MineLighted wish={wish} onChange={onChange} />, // 我的愿望，已经实现
                        ],
                    ][isMine ? 1 : 0][wish.state]
                }
            </div>*/}
            <ConfirmPanel
                display={showConfirm}
                action={confirmAction}
                btnText={btnText}
            >
                {confirmContent}
            </ConfirmPanel>
        </div>
    )
}