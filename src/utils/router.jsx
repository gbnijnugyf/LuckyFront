import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Redirect } from 'react-router'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Send from '../pages/Send'
import Detail from '../pages/Detail'
import Wishes from '../pages/Wishes'
import Header from '../components/Header'
import MyWish from '../pages/MyWish'

export default function Router() {
    // TODO: add login logical
    let isLogin = false;
    return (
        <>
            {isLogin ? <Header></Header> : null}
            <Switch>
                <Route path='/login' component={Login}></Route>
                <Route path='/home' component={Home}></Route>
                <Route path='/send' component={Send}></Route>
                <Route path='/detail' component={Detail}></Route>
                <Route path='/wish' component={Wishes}></Route>
                <Route path='/mywish' component={MyWish}></Route>
                <Redirect to={isLogin ? '/home' : '/login'}></Redirect>
            </Switch>
        </>
    )
}

