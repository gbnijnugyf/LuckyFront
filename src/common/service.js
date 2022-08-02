import 'whatwg-fetch';
import axios from "axios"
// const BASEURL = window.location.href.slice(0, window.location.href.indexOf('/', 10)) + "/api" //部署环境用
const BASEURL = "http://127.0.0.1:4523/m1/1379753-0-default"
/*
function Fetch(url, opt = {}) {
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
        })
        .then(res => {
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

export default Service;
*/
function IsToken(props) {
    const token = localStorage.getItem('token');
    // console.log("IsToken:")
    // console.log(token)
    props.data.token = token;
    return props;
}
async function myAxiosToPost(props) {
    props = IsToken(props);
    const response = await axios.post(props.url, props.data);
    // console.log(props.data)
    return response;
}
async function myAxiosToGet(props) {
    props = IsToken(props);
    const response = await axios.get(props.url)
    return response;
}

async function myAxios(props) {
    let response = null;
    if (props.method === "post")
        response = await myAxiosToPost(props)
    else
        response = await myAxiosToGet(props)
    // console.log(response)

    if (response.statusText === 'OK') {
        return response;
    }
    else if (response.status === -2) {
        alert(response.data.msg)
        localStorage.removeItem('token')

        // 重定向到根目录，重新登录
        let redirectpos = window.location.href
        redirectpos = redirectpos.slice(0, redirectpos.indexOf('/', 10) + 1)
        window.location.href(redirectpos)
    }
    else if (response.status !== 0) {
        alert(response.data.msg)
        return response;
    }
    return response;
}

/*
async function myAxios(config = {}) {
    console.log("发送请求！")

    const token = localStorage.getItem('token');
    config.data.token = token;


    return axios(config).then(response => {
        console.log(response)
        if (response.statusText === 'OK') {
            return (
                res => {
                    return new Promise((resolve, _) => {
                        resolve(res);
                    }
                    )
                })
        }
        else if (response.statusText !== 'OK') {
            return (
                res => {
                    return new Promise((_, reject) => {
                        reject(res);
                    }
                    )
                })
        }
        else if (response.status === -2) {
            alert(response.msg)
            localStorage.removeItem('token')
            // 重定向到根目录，重新登录
            let redirectpos = window.location.href
            redirectpos = redirectpos.slice(0, redirectpos.indexOf('/', 10) + 1)
            window.location.href(redirectpos)
        }
        else {
            if (response.status !== 0) {
                alert(response.msg)
            }
            return response;
        }

    }).catch(e => {
        alert(`服务端错误：${e.message}`);
        throw e;
    })



    // return axios(url, data, method).then(response => {
    //         if (response.ok) {
    //             return response.json().then(res => {
    //                 console.log(res)
    //                 return res;
    //             });
    //         } else {
    //             return response.json().then(res => {
    //                 return new Promise((_, reject) => {
    //                     reject(res);
    //                 });
    //             });
    //         }
    //     }).then(res => {
    //         if (res.status === -2) {
    //             alert(res.msg)
    //             localStorage.removeItem('token')
    //             // 重定向到根目录，重新登录
    //             let redirectpos = window.location.href
    //             redirectpos = redirectpos.slice(0, redirectpos.indexOf('/', 10) + 1)
    //             window.location.href(redirectpos)
    //         }
    //         else {
    //             if (res.status !== 0) {
    //                 alert(res.msg)
    //             }
    //             return res;
    //         }
    //     }).catch(e => {
    //         alert(`服务端错误：${e.message}`);
    //         throw e;
    //     })

}
*/

function toConfig(props) {
    let config = {
        url: props.url,
        data: props.data,
        method: props.method
    }
    return config;
}

let Service = {
    //绑定邮箱

    bindEmail(email) {
        console.log("请求1")
        return myAxios(toConfig({
            url: new URL(BASEURL + '/user/email'),
            data: {
                email: email
            }, method: "post"
        }))
    },

    //whut登录
    whutLogin() {
        console.log("请求2")

        return myAxios(toConfig({
            url: new URL(BASEURL + '/whutlogin'),
            data: {
                data: {}
            },
            method: "post"
        }))
    },

    //ccnu登录
    ccnuLogin(idcard_number, password) {
        console.log("请求3")

        return myAxios({
            url: new URL(BASEURL + '/ccnulogin'),
            data: {
                idcard_number: idcard_number,
                password: password
            },
            method: "post"
        })
    },

    //查询邮箱是否绑定
    checkUserEmail() {
        console.log("请求4")

        let url_ = new URL(BASEURL + '/user/email/check')
        return myAxios(toConfig({
            url: url_,
            data: {},
            method: "post"
        }))
    },

    //发出自己的愿望
    postWish(name, QQ, weChat, tel, wish, type) {
        console.log("请求5")

        return myAxios(toConfig({
            url: new URL(BASEURL + '/wishes/add'),
            data: {
                wishMan_name: name,
                wishMan_QQ: QQ,
                wishMan_Wechat: weChat,
                wishMan_Tel: tel,
                wish: wish,
                type: type

            },
            method: "post"
        }))
    },

    //点亮别人的愿望
    lightWishOn(id, name, tel, qq, wechat) {
        console.log("请求6")

        return myAxios(toConfig({
            url: new URL(BASEURL + '/wishes/light'),
            data: {
                wish_id: id,
                light_name: name,
                light_tel: tel,
                light_qq: qq,
                light_wechat: wechat

            },
            method: "post"
        }))
    },

    //查看愿望详情
    getWishDetail(id) {
        console.log("请求7")

        let url = new URL(BASEURL + '/wishes/details');
        url.searchParams.append("wish_id", id);
        url.searchParams.append("time", new Date().getTime());
        return myAxios(toConfig({ url: url, data: url, method: "get" }));
    },

    //查找点亮人信息
    getLightManInfo(id) {
        console.log("请求8")

        let url = new URL(BASEURL + '/user/info/lightman')
        url.searchParams.append("wish_id", id)
        url.searchParams.append("time", new Date().getTime())
        return myAxios(toConfig({ url: url, data: url, method: "get" }))
    },

    //获取自己点亮的愿望
    getUserWishLight() {
        console.log("请求9")

        let url = new URL(BASEURL + '/wishes/user/light')
        url.searchParams.append("time", new Date().getTime())
        // console.log(toConfig({ url: url, data: url, method: "get" }))
        return myAxios(toConfig({ url: url, data: url, method: "get" }))

    },

    //获取自己投递的愿望
    getUserWishPost() {
        console.log("请求10")

        let url = new URL(BASEURL + '/wishes/user/post')
        url.searchParams.append("time", new Date().getTime())
        return myAxios(toConfig({ url: url, data: url, method: "get" }))
    },

    //根据分类获取愿望
    getWishByCategories(category) {
        console.log("请求11")

        let url = new URL(BASEURL + '/wishes/categories')
        url.searchParams.append("categories", category)
        url.searchParams.append("time", new Date().getTime())
        // console.log(toConfig({ url: url, data: url, method: "get" }))
        return myAxios(toConfig({ url: url, data: url, method: "get" }))
    },

    //删除愿望
    deleteWish(wish_id) {
        console.log("请求12")

        return axios.delete(BASEURL + `/wishes?wish_id=${wish_id}`, BASEURL + `/wishes?wish_id=${wish_id}`)
    },

    //放弃点亮别人的愿望
    giveUpLightWish(wish_id, msg) {
        console.log("请求13")

        return myAxios(toConfig({
            url: BASEURL + `/wishes/giveup`,
            data: {
                wish_id: wish_id,
                message: msg
            },
            method: "post"
        }))
    },

    //实现别人的愿望
    achieveWish(wish_id) {
        console.log("请求14")

        return myAxios(toConfig({
            url: BASEURL + `/wishes/achieve`,
            data: {
                wish_id: wish_id
            }, method: "post"
        }))
    },

}



export default Service;