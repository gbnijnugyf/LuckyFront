import React from 'react'
import { ButtonS } from '../../components/Button'
import tagimg from './images/tag.svg'
import './index.scss'



export default function Home(props) {

    // const [tags, setTags] = useState()
    const tags = [
        { name: '影音' },
        { name: '游戏' },
        { name: '美食' },
        { name: '学习' },
        { name: '运动' },
        { name: '交友' },
        { name: '打卡' },
        { name: '动漫' },
        { name: '其他' }
    ]

    const goWishes = (tagName) => {
        props.history.push('/wish', { tagName })
    }

    const goSend = (tags) => {
        props.history.push('/send', { tags })
    }

    return (
        <div className="panel-home">
            <div className="tags">
                {
                    tags.map((tag) => {
                        return (
                            <div onClick={() => goWishes(tag.name)} className="tag" key={tag.name}>
                                {tag.name}
                            </div>);
                    })
                }
            </div>
            <ButtonS onClick={() => goSend(tags)} style={{ background: "#FFFFFF", color: "#F25125", fontSize: "x-large", marginTop: "1em" }}>
                投递我的小幸运
            </ButtonS>
        </div >
    )
}