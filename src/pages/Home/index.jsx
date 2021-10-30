import React from 'react'

import { ButtonS } from '../../components/Button'
import { tags } from '../../config/Global'
import './index.scss'



export default function Home(props) {


    const goWishes = (tag) => {
        props.history.push(`/wish/${tag.enName}`, { category: tag.category })
    }

    const goSend = () => {
        props.history.push('/send')
    }

    return (
        <div className="panel-home">
            <div className="tags">
                {
                    tags.map((tag) => {
                        return (
                            <div onClick={() => goWishes(tag)} className="tag" key={tag.category}>
                                {tag.name}
                            </div>
                        );
                    })
                }
            </div>
            <ButtonS onClick={() => goSend(tags)} style={{ background: "#FFFFFF", color: "#F25125", marginTop: "10%" }}>
                投递我的小幸运
            </ButtonS>
        </div >
    )
}