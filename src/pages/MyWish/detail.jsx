import { useEffect } from 'react'
import './index.scss'
import React, { useState } from 'react'
import { ButtonS } from '../../components/Button'
import Service from '../../common/service'
import ConfirmPanel from '../../components/ConfirmPanel'
import forwardimg from '../../static/images/forward.svg'



export function MyWishDetail(props) {
    const { id } = props.location.state
    const [wish, setWish] = useState({})


    useEffect(() => {
        Service.getWishDetail(id).then((res) => {
            setWish({
                content: res.data.wish,
                wishman_name: res.data.wishman_name,
                time: res.data.creat_at
            })
        })
    }, [id])

    const goDeleteWish = () => {

    }



    return (
        <div className='MywishDetail'>
            <ConfirmPanel action={{ 'yes': () => { }, 'no': () => { } }} />
            <div className="content" >
                <img src={forwardimg} onClick={() => { }} className="forward" alt="" />
                <div className="text">
                    {/* {wish.content} */}
                    kzlsdjgfaljsvhlszkxcnjvlasudfhgaldjsnvlkdfjhblsdokrfughlakjdfh
                </div>
                <div className="wishInfo">
                    <p>来自 某同学</p>
                    <p>今天真不错</p>
                </div>
            </div>
            <div className="button">
                <ButtonS onClick={goDeleteWish} style={{ background: "white", color: "#F25125" }}>
                    删除这个心愿
                </ButtonS>
            </div>
        </div>


    )
}