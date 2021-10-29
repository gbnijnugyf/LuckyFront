import './index.scss'
import { Switch, Route, Redirect } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Empty } from './empty.jsx'
import { MyWishList } from './list'
import Service from '../../common/service'


const Index = (props) => {
    const [wishPost, setWishPost] = useState([])
    const [wishLight, setWishLight] = useState([])
    const [gotPost, setGotPost] = useState(false)
    const [gotLight, setGotLight] = useState(false)
    useEffect(() => {
        Service.getUserWishPost().then(res => {
            setWishPost(res.data)
            setGotPost(true)
        })
    }, [])
    useEffect(() => {
        Service.getUserWishLight().then(res => {
            console.log(res.data.wishes,'res')
            setWishLight(res.data)
            setGotLight(true)
        })
    }, [])
    useEffect(() => {
        if (gotPost && gotLight) {
            console.log(1112)
            if (wishPost?.length === 0 && wishLight?.length === 0) props.history.push("/mywish/empty")
            else props.history.push("/mywish/list", {wishPost, wishLight})
        }
    }, [gotLight, gotPost, props.history, wishLight, wishPost])

    return <></>
}

export default function MyWish(props) {
  
    return (
        <div>
            <Switch>
                <Route path="/mywish/index" component={Index} />
                <Route path="/mywish/empty" component={Empty} />
                <Route path="/mywish/list" component={MyWishList} />
                <Redirect to="/mywish/index" />
            </Switch>
        </div >
    )
}



