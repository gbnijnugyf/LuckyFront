import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import Home from '../Home'
import Header from '../../components/Header'

export default function Admin() {
    return (
        <div>
            <Header></Header>
            <Switch>
                <Route path='/home' component={Home}></Route>
                <Redirect to='/home'></Redirect>
            </Switch>
        </div>

    )
}
