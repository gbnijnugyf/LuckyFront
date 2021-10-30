
import { ButtonS } from '../../components/Button'
import './index.scss'

export function Empty(props) {

    const goSendWish = () => {
        props.history.push("/send")
    }


    return (
        <div className="div-leaf-empty" align="center">
            <div className="text-empty">
                空空如也~
                <br />
                你还没有许愿呢~
                <br />
                人还是要多许愿的
                <br />
                万一就实现了呢~
            </div>
            <ButtonS onClick={goSendWish} style={{ background: "white", color: "#F25125", "fontSize": "x-large" }}>
                投递我的小幸运
            </ButtonS>
        </div>
    )

}
