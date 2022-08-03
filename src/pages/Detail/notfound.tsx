import { useNavigate } from "react-router-dom"
import './index.scss'

export function Notfound(){
    let notfound = true
    // const navigate = useNavigate();
    // alert('这个愿望不见了呢！');
    return <>
        
        <p className="notfound">这个愿望不见了呢<br/>~</p>
    </>
}

export default Notfound