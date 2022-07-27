import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'whatwg-fetch';
const BASEURL = window.location.href.slice(0, window.location.href.indexOf('/', 10)) + "/api"


/*function Fetch(url, opt = {}) {
    const token = localStorage.getItem('token')


    opt.method = opt.method || 'GET';
    opt.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    opt.headers.token = token
    if (opt.body) {
        opt.body = JSON.stringify(opt.body)
    }

    opt.body = JSON.stringify(opt.data) || null;
    if (opt.formdata) {
        opt.body = opt.formdata;
    }
    return fetch(url, opt)
        .then(response => {
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
        })
        .catch(e => {
            alert(`服务端错误：${e.message}`)
            throw e;
        })
}
*/
function myAxios(url, data = {}, method = String) {
    // let navigate = useNavigate();
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
                // navigate('/login');
                // 重定向到根目录，重新登录
                // let redirectpos = window.location.href
                // redirectpos = redirectpos.slice(0, redirectpos.indexOf('/', 10) + 1)
                // window.location.href(redirectpos)
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
        return myAxios(new URL(BASEURL + '/user/email'), {
            email: email
        }, "post")
    },

    //whut登录
    whutLogin() {
        return myAxios(new URL(BASEURL + '/whutlogin'), {
            data: {}
        }, "post")
    },

    //ccnu登录
    ccnuLogin(idcard_number, password) {
        return myAxios(new URL(BASEURL + '/ccnulogin'), {
            idcard_number: idcard_number,
            password: password
        }, "post")
    },

    //查询邮箱是否绑定
    checkUserEmail() {
        return myAxios(new URL(BASEURL + '/user/email/check'), {}, "post")
    },

    //发出自己的愿望
    postWish(name, QQ, weChat, tel, wish, type) {
        return myAxios(new URL(BASEURL + '/wishes/add'), {
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
        return myAxios(new URL(BASEURL + '/wishes/light'), {
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
        return myAxios(url, url, "get");
    },

    //查找点亮人信息
    getLightManInfo(id) {
        let url = new URL(BASEURL + '/user/info/lightman')
        url.searchParams.append("wish_id", id)
        url.searchParams.append("time", new Date().getTime())
        return myAxios(url, url, "get")
    },

    //获取自己点亮的愿望
    getUserWishLight() {
        let url = new URL(BASEURL + '/wishes/user/light')
        url.searchParams.append("time", new Date().getTime())
        return myAxios(url, url, "get")

    },

    //获取自己投递的愿望
    getUserWishPost() {
        let url = new URL(BASEURL + '/wishes/user/post')
        url.searchParams.append("time", new Date().getTime())
        return myAxios(url, url, "get")
    },

    //根据分类获取愿望
    getWishByCategories(category) {
        let url = new URL(BASEURL + '/wishes/categories')
        url.searchParams.append("categories", category)
        url.searchParams.append("time", new Date().getTime())
        return myAxios(url, url, "get")
    },

    //删除愿望
    deleteWish(wish_id) {
        return axios.delete(BASEURL + `/wishes?wish_id=${wish_id}`, BASEURL + `/wishes?wish_id=${wish_id}`)
    },

    //放弃点亮别人的愿望
    giveUpLightWish(wish_id, msg) {
        return myAxios(BASEURL + `/wishes/giveup`, {
            wish_id: wish_id,
            message: msg
        }, "post")
    },

    //实现别人的愿望
    achieveWish(wish_id) {
        return myAxios(BASEURL + `/wishes/achieve`, {
            wish_id: wish_id
        }, "post")
    },

}

/*
let Service = {
    // 绑定邮箱
    bindEmail(email) {
        return Fetch(new URL(BASEURL + '/user/email'), {
            method: "POST",
            data: {
                email: email
            }
        })
    },
    // whut登陆  我暂时测不了 未加入代码
    whutLogin() {
        return Fetch(new URL(BASEURL + '/whutlogin'), {
            method: "POST",
            data: {}
        })
    },
    // ccnu登陆 （ok 已加入代码
    ccnuLogin(idcard_number, password) {
        return Fetch(new URL(BASEURL + '/ccnulogin'), {
            method: "POST",
            data: {
                idcard_number: idcard_number,
                password: password
            }
        })
    },
    // 查询邮箱是否绑定
    checkUserEmail() {
        return Fetch(new URL(BASEURL + '/user/email/check'), {
            method: 'POST',
        })
    },
    // 发出自己的愿望 ok 已加入代码
    postWish(name, QQ, weChat, tel, wish, type) {
        return Fetch(new URL(BASEURL + '/wishes/add'), {
            method: 'POST',
            data: {
                wishMan_name: name,
                wishMan_QQ: QQ,
                wishMan_Wechat: weChat,
                wishMan_Tel: tel,
                wish: wish,
                type: type
            }
        })
    },
    // 点亮别人的愿望 ok APIfox测了 不知道加在哪儿 点亮有个表单要填写啊
    lightWishOn(id, name, tel, qq, wechat) {
        return Fetch(new URL(BASEURL + '/wishes/light'), {
            method: 'POST',
            data: {
                wish_id: id,
                light_name: name,
                light_tel: tel,
                light_qq: qq,
                light_wechat: wechat
            }
        })
    },
    // 查看愿望详情 ok 已加入代码
    getWishDetail(id) {
        let url = new URL(BASEURL + '/wishes/details')
        url.searchParams.append("wish_id", id)
        url.searchParams.append("time", new Date().getTime())
        return Fetch(url)
    },// 查找点亮人信息 
    getLightManInfo(id) {

        let url = new URL(BASEURL + '/user/info/lightman')
        url.searchParams.append("wish_id", id)
        url.searchParams.append("time", new Date().getTime())
        return Fetch(url)
    },
    // 获取自己点亮的愿望 已加入代码 
    getUserWishLight() {
        let url = new URL(BASEURL + '/wishes/user/light')
        url.searchParams.append("time", new Date().getTime())
        return Fetch(url)

    },
    // 获取自己投递的愿望 已加入代码 
    getUserWishPost() {
        let url = new URL(BASEURL + '/wishes/user/post')
        url.searchParams.append("time", new Date().getTime())
        return Fetch(url)
    },
    // 根据分类获取愿望 ok 已加入代码
    getWishByCategories(category) {
        let url = new URL(BASEURL + '/wishes/categories')
        url.searchParams.append("categories", category)
        url.searchParams.append("time", new Date().getTime())
        return Fetch(url)
    },
    // 删除愿望 ok 未加入代码
    deleteWish(wish_id) {
        return Fetch(BASEURL + `/wishes?wish_id=${wish_id}`, {
            method: 'DELETE'
        })
    },
    // 放弃点亮别人的愿望 ok  未加入代码
    giveUpLightWish(wish_id, msg) {
        return Fetch(BASEURL + `/wishes/giveup`, {
            method: 'POST',
            data: {
                wish_id: wish_id,
                message: msg
            }
        })
    },
    // 实现别人的愿望 ok  未加入代码
    achieveWish(wish_id) {
        return Fetch(BASEURL + `/wishes/achieve`, {
            method: 'POST',
            data: {
                wish_id: wish_id
            }
        })
    },
};
*/

export default Service;