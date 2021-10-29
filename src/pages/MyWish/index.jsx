import './index.scss'
import { Switch, Route } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Empty } from './empty.jsx'
import { MyWishList } from './list'
import Service from '../../common/service'

export default function MyWish(props) {
    const [wishPost, setWishPost] = useState([])
    const [wishLight, setWishLight] = useState([])
    const [gotStatus, setGotStatus] = useState({"Post": false, "Light":false})
    useEffect(() => {
        Service.getUserWishPost().then(res => {
            setWishPost(res.data.wishes)
            setGotStatus((status) => {
                status.Post = true
                return status
            })
        })
    }, [])
    useEffect(() => {
        Service.getUserWishLight().then(res => {
            setWishLight(res.data.wishes)
            setGotStatus((status) => {
                status.Light = true
                console.log(status)
                return status
            })
        })
    }, [])
    useEffect(() => {
        if (gotStatus.Post && gotStatus.Light) {
        if (wishPost?.length === 0 && wishLight?.length === 0) props.history.push("/mywish/empty")
        else props.history.push("/mywish/list")
    }
    }, [gotStatus, props.history, wishLight, wishPost])
    return (
        <div>
            <Switch>
                <Route path="/mywish/empty" component={Empty} />
                <Route path="/mywish/list" render={() => <MyWishList wishPost={wishPost} wishLight={wishLight} />} />
            </Switch>
        </div >
    )
}


