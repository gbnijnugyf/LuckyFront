import React, { useEffect } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Redirect } from 'react-router'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Send from '../pages/Send'
import cookie from 'react-cookies'
import Detail from '../pages/Detail'
import Wishes from '../pages/Wishes'
import Header from '../components/Header'
import MyWish from '../pages/MyWish'
function Router(props) {

    // 保存WHUT登录后返回的token
    useEffect(() => {
        let token = cookie.load('jwt_token');
        if (token) {
            localStorage.setItem('token', token)
            props.history.push("/")
        }
        if (!localStorage.getItem("token")) {
            props.history.push("/login")
        }
    }, [props.history])




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
                    <Redirect to={localStorage.getItem("token") === null ? '/login' : '/home'}></Redirect>
                </Switch>
            </div>
        </>
    )
}

export default withRouter(Router)
