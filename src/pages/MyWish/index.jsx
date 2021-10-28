import './index.scss'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import { Switch, Route } from 'react-router-dom'
import React from 'react'
import { Empty } from './empty.jsx'
import { MyWishList } from './list'
import { MyWishDetail } from './detail'

export default function MyWish(props) {

    return (
        <div>
            <Switch>
                <Route path="/mywish/empty" component={Empty} />
                <Route path="/mywish/list" component={MyWishList} />
                <Route path="/mywish/detail" component={MyWishDetail} />
                <Redirect to="/mywish/list" />
            </Switch>
        </div >
    )
}


