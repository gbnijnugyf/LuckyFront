import React, { useEffect, useState } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Redirect } from 'react-router'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Send from '../pages/Send'
import Detail from '../pages/Detail'
import Wishes from '../pages/Wishes'
import Header from '../components/Header'
import MyWish from '../pages/MyWish'

function Router(props) {
    // 不能通过浏览器地址栏直接跳转页面 不然只要有token就会一直停在detail页面
    // useEffect(() => {
    //     const token = localStorage.getItem('token')
    //     if (token) {
    //         setIsLogin(true)
    //         props.history.push("/home")
    //     }
    // }, [props.history])
    return (
        <>
            {props.location.pathname.match(/login/) ? null : <Header></Header>}
            <div className="content">
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/home' component={Home}></Route>
                    <Route path='/send' component={Send}></Route>
                    <Route path='/detail' component={Detail}></Route>
                    <Route path='/wish/:tag' component={Wishes}></Route>
                    <Route path='/mywish' component={MyWish}></Route>
                    <Redirect to='/login'></Redirect>
                </Switch>
            </div>
        </>
    )
}

export default withRouter(Router)
