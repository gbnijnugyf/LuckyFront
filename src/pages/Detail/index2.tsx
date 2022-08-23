import forwardimg from "../../static/images/forward.svg";
import { ReactElement, useEffect, useState } from "react";
import { Service } from "../../common/service";
import { IWishObject } from "../MyWish";
import { formatTime } from "../../common/global";
import ConfirmPanel from "../../components/ConfirmPanel";
import { useNavigate } from "react-router-dom";
import { type } from "os";
import { ButtonS } from "../../components/Button";
const INITNUM: number = -9;
function KILLUNDEFINED(value:string|undefined){return value?value:""} 

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

interface IPersonMsg{
    wish:IWishObject,
    isMine:boolean
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
    DetailChange: IDetailChange
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

function PersonMsg(props:IPersonMsg)  {
    const {wish, isMine} = props
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
    let currentIndex = "wuchu";
    let otherMsg = "";

    const msgs = [
        "刚刚误触了点亮按钮，不好意思啦~",
        "最近有点忙，短时间没有精力实现愿望了，抱歉",
        ""//占位
    ];

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



    // 点击实现愿望
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


    // 点击确定放弃
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
                            onChange={(e) => { currentIndex = e.target.value; }}
                        />
                    </div>
                    {value !== "ohter" ? <p>{reason}</p> :
                        <div>
                            <p>留言给对方：</p>
                            <input
                                type="text"
                                placeholder="输入其他原因"
                                className="reason"
                                onChange={(e) => {
                                    otherMsg = e.target.value;
                                }}
                                defaultValue={otherMsg} />
                        </div>}
                </div>
            )
        }

        handlePopWindows(
            () => {
                changeShowConfirm(false);
                changeBtnText("", "");
                let message = currentIndex === "other" ? otherMsg : msgs[0];
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
                    {ReasonInput("radio", "msg", "wuchu", msgs[0], true)}
                    {ReasonInput("radio", "msg", "mang", msgs[1])}
                    {ReasonInput("radio", "msg", "other", msgs[2])}

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

    // 点击放弃愿望
    const pressAbandon = handlePopWindows(pressReallyAbandon, <p>确认放弃这个愿望吗？</p>)
    
    return (
        <>
            <div className="panel-button">
                <ButtonS
                    onClick={achieved ? undefined : ()=>pressAbandon}
                    style={{ background: "#FFFFFF", color: "#F25125", width: "6em" }}
                >
                    放弃实现
                </ButtonS>
                <ButtonS
                    onClick={achieved ? undefined : ()=>pressAchieve}
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