import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'whatwg-fetch';
const BASEURL = window.location.href.slice(0, window.location.href.indexOf('/', 10)) + "/api"

function GlobalAxios(url, data = {}, method = String) {

    const token = localStorage.getItem('token');

    method = method || 'get';
    data.token = token;

    return (
        axios(url, data, method).then(response => {
            if (response.ok) {
                return response.json().then(res => {
                    return res;
                });
            } else {
                return response.json().then(res => {
                    return new Promise((_, reject) => {
                        reject(res);
                    });
                });
            }
        }).then(res => {
            if (res.status === -2) {
                alert(res.msg)
                localStorage.removeItem('token')
                // 重定向到根目录，重新登录
                let redirectpos = window.location.href
                redirectpos = redirectpos.slice(0, redirectpos.indexOf('/', 10) + 1)
                window.location.href(redirectpos)
            }
            else {
                if (res.status !== 0) {
                    alert(res.msg)
                }
                return res;
            }
        }).catch(e => {
            alert(`服务端错误：${e.message}`);
            throw e;
        })
    )
}

let Service = {
    //绑定邮箱
    bindEmail(email) {
        return GlobalAxios(new URL(BASEURL + '/user/email'), {
            email: email
        }, "post")
    },

    //whut登录
    whutLogin() {
        return GlobalAxios(new URL(BASEURL + '/whutlogin'), {
            data: {}
        }, "post")
    },

    //ccnu登录
    ccnuLogin(idcard_number, password) {
        return GlobalAxios(new URL(BASEURL + '/ccnulogin'), {
            idcard_number: idcard_number,
            password: password
        }, "post")
    },

    //查询邮箱是否绑定
    checkUserEmail() {
        return GlobalAxios(new URL(BASEURL + '/user/email/check'), {}, "post")
    },

    //发出自己的愿望
    postWish(name, QQ, weChat, tel, wish, type) {
        return GlobalAxios(new URL(BASEURL + '/wishes/add'), {
            wishMan_name: name,
            wishMan_QQ: QQ,
            wishMan_Wechat: weChat,
            wishMan_Tel: tel,
            wish: wish,
            type: type

        }, "post")
    },

    //点亮别人的愿望
    lightWishOn(id, name, tel, qq, wechat) {
        return GlobalAxios(new URL(BASEURL + '/wishes/light'), {
            wish_id: id,
            light_name: name,
            light_tel: tel,
            light_qq: qq,
            light_wechat: wechat

        }, "post")
    },
    //查看愿望详情
    getWishDetail(id) {
        let url = new URL(BASEURL + '/wishes/details');
        url.searchParams.append("wish_id", id);
        url.searchParams.append("time", new Date().getTime());
        return GlobalAxios(url, url, "get");
    },

    //查找点亮人信息
    getLightManInfo(id) {
        let url = new URL(BASEURL + '/user/info/lightman')
        url.searchParams.append("wish_id", id)
        url.searchParams.append("time", new Date().getTime())
        return GlobalAxios(url, url, "get")
    },

    //获取自己点亮的愿望
    getUserWishLight() {
        let url = new URL(BASEURL + '/wishes/user/light')
        url.searchParams.append("time", new Date().getTime())
        return GlobalAxios(url, url, "get")

    },

    //获取自己投递的愿望
    getUserWishPost() {
        let url = new URL(BASEURL + '/wishes/user/post')
        url.searchParams.append("time", new Date().getTime())
        return GlobalAxios(url, url, "get")
    },

    //根据分类获取愿望
    getWishByCategories(category) {
        let url = new URL(BASEURL + '/wishes/categories')
        url.searchParams.append("categories", category)
        url.searchParams.append("time", new Date().getTime())
        return GlobalAxios(url, url, "get")
    },

    //删除愿望
    deleteWish(wish_id) {
        return axios.delete(BASEURL + `/wishes?wish_id=${wish_id}`, BASEURL + `/wishes?wish_id=${wish_id}`)
    },

    //放弃点亮别人的愿望
    giveUpLightWish(wish_id, msg) {
        return GlobalAxios(BASEURL + `/wishes/giveup`, {
            wish_id: wish_id,
            message: msg
        }, "post")
    },

    //实现别人的愿望
    achieveWish(wish_id) {
        return GlobalAxios(BASEURL + `/wishes/achieve`, {
            wish_id: wish_id
        }, "post")
    },

}

export default Service;