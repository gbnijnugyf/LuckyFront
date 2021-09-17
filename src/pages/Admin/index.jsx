import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

import Login from '../Login'
import Home from '../Home'
import Send from '../Send'
import Detail from '../ Detail'
import Wishes from '../Wishes'
import Header from '../../components/Header'

export default function Admin() {
    // TODO to be fixed
    let loginsign = true;
    return (
        <div>
            {loginsign ? null : <Header></Header>}
            <Switch>
                <Route path='/login' component={Login}></Route>
                <Route path='/home' component={Home}></Route>
                <Route path='/send' component={Send}></Route>
                <Route path='/detail' component={Detail}></Route>
                <Route path='/wish' component={Wishes}></Route>
                <Redirect to={loginsign ? '/login' : '/home'}></Redirect>
            </Switch>
        </div>

    )
}

