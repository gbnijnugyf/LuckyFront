import './index.scss'
import { ButtonS } from '../../components/Button'
import { formatTime } from '../../common/global'
import { useLocation, useNavigate } from 'react-router-dom'

export function MyWishList(props) {
    
    const navigate = useNavigate();
    let wish = useLocation();
    // console.log(wish);
    

    const goWishDetail = (id) => {
        navigate('/detail/' + id);
    }

    return (
        <>
            <div className="div-wishlist-toppadding" />
            <div className="div-wishlist">
                <h3>我许下的愿望</h3>
                <hr />
                <ul>
                    {wish.state.wishPost.map(wish => {
                        return <WishItem time={wish.creat_at} wish={wish} key={wish.wish_id} onClick={() => { goWishDetail(wish.wish_id) }} />
                    })}
                </ul >
                <h3>我点亮的愿望</h3>
                <hr />
                <ul>
                    {wish.state.wishLight.map(wish => {
                        return <WishItem time={wish.light_at} wish={wish} key={wish.wish_id} onClick={() => { goWishDetail(wish.wish_id) }} />
                    })}
                </ul >
                <div className="div-listbottom">
                    <p>你还剩{7 - wish.state.wishLight.length}次实现小幸运的机会哦~</p>
                    <hr></hr>
                    <p>人家也是有底线的</p>
                </div>
            </div >
        </>
    )
}

function WishItem(props) {
    const { wish } = props
    const time = wish.state === 1 ? formatTime(wish.light_at) : formatTime(wish.creat_at)
    // console.log("get wish successful!")
    // console.log(wish);

    return (
        <li className="item-wish" onClick={props.onClick}>
            <p className="text-detail">{wish.wish}</p>
            <div className="status">
                <ButtonS style={{
                    background: "#FFFFFF",
                    color: wish.state === 0 ? "#1DCB1D" : "#F25C33",
                    fontSize: "medium",
                    fontFamily: "PingFangSC",
                    fontWeight: "Bold",
                    padding: "0 0.5em"
                }}>
                    {wish.state === 0 ?
                        "未实现" :
                        wish.state === 1 ?
                            "已点亮" :
                            "已实现"}</ButtonS>
                <p className="text-wishtime">{time}</p>
            </div>
        </li>
    )
}