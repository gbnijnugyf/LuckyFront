import React from 'react'

import { ButtonS } from '../../components/Button'
import tagimg from './images/tag.svg'
import './index.scss'



export default function Home(props) {

    // const [tags, setTags] = useState()
    const tags = [
        { name: '影音', enName: 'video',category: 1 },
        { name: '游戏', enName: 'game', category: 2 },
        { name: '美食', enName: 'food', category: 3 },
        { name: '学习', enName: 'study', category: 4 },
        { name: '运动', enName: 'sport', category: 5 },
        { name: '交友', enName: 'friend', category: 6 },
        { name: '打卡', enName: 'trip', category: 7 },
        { name: '动漫', enName: 'cartoon', category: 8 },
        { name: '其他', enName: 'other', category: 9 }
    ]

    const goWishes = (tag) => {
        props.history.push(`/wish/${tag.enName}`, {category: tag.category})
    }

    const goSend = (tags) => {
        props.history.push('/send', { tags })
    }

    return (
        <div className="panel-home">
            <div className="tags">
                {
                    tags.map((i) => {
                        return (
                            <div onClick={() => goWishes(i)}
                                className="tag" key={i.name}>
                                <img src={tagimg} alt="" />
                                <p>
                                    {i.name}
                                </p>
                            </div>);
                    })
                }
            </div>
            <ButtonS onClick={() => goSend(tags)} style={{ background: "##FFFFFF", textcolor: "#F25125" }}>
                投递我的小幸运
            </ButtonS>
        </div>
    )
}