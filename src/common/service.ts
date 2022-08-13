import axios, { AxiosRequestConfig } from 'axios';
import 'whatwg-fetch';

// const BASEURL = window.location.href.slice(0, window.location.href.indexOf('/', 10)) + "/api"

// function GlobalAxios(url, data = {}, method = String) {

// const BASEURL = window.location.href.slice(0, window.location.href.indexOf('/', 10)) + "/api" //部署环境用
const BASEURL = "http://127.0.0.1:4523/m1/1379753-0-default"


function IsToken(props : _config):_config {
    const token = localStorage.getItem('token');
    // console.log("IsToken:")
    // console.log(token)
    props.data.token = token;
    return props;
}
async function GlobalAxiosToPost(props: _config) {
    props = IsToken(props);
    const response = await axios.post(props.url, props.data);
    // console.log(props.data)
    return response;
}
async function GlobalAxiosToGet(props: _config) {
    props = IsToken(props);
    const response = await axios.get(props.url)
    return response;
}

async function GlobalAxios(props: _config) {//
    let response = null;
    if (props.method === "post")
        response = await GlobalAxiosToPost(props)
    else
        response = await GlobalAxiosToGet(props)
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
        // window.location.href(redirectpos)
        window.location.href = redirectpos
    }
    else if (response.status !== 0) {
        alert(response.data.msg)
        return response;
    }
    return response;
}

/*
async function GlobalAxios(config = {}) {
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
// export interface _object{
//     Object: Object,
//     token: string  
// }

export interface _config {
    url: string,
    data: any,  //IsToken中需要加入token属性
    method: string
}

export interface PostProps {
    url: URL,
    data: {//[key:String]?:any
        data?: object,
        email?: string,
        idcard_number?: string,
        password?: string,
        wishMan_name?: string,
        wishMan_QQ?: string,
        wishMan_Wechat?: string,
        wishMan_Tel?: string,
        wish?: string,
        type?: string,
        wish_id?: string,
        light_name?: string,
        light_tel?: string,
        light_qq?: string,
        light_wechat?: string,
        message?: string
    },
    method: string
}

export interface GetProps {
    url: URL,
    data: URL,
    method: string
}

// type RequestProps = 
// {
//     postProp: PostProps,
//     getProps?: never
// } |
// {
//     postProp?:never,
//     getProp: GetProps
// }

// export interface RequestProps {
//     postProps?: PostProps,
//     getProps?: GetProps
// }


function toConfig(props: PostProps | GetProps): _config {

    if (props.url && props.data && props.method) {
        let config: _config = {
            url: props.url.toString(),
            data: props.data,
            method: props.method
        };
        return config;
    }
    else {
        let config: _config = {
            url: "",
            data: "",
            method: ""
        }
        return config;
    }
}

let Service = {
    //绑定邮箱

    bindEmail(email: string) {
        //console.log("请求1")
        return GlobalAxios(toConfig({
            url: new URL(BASEURL + '/user/email'),
            data: {
                email: email
            }, method: "post"
        }))
    },

    //whut登录
    whutLogin() {
        //console.log("请求2")

        return GlobalAxios(toConfig({
            url: new URL(BASEURL + '/whutlogin'),
            data: {
                data: {}
            },
            method: "post"
        }))
    },

    //ccnu登录
    ccnuLogin(idcard_number: string, password: string) {
        //console.log("请求3")

        return GlobalAxios(toConfig({
            url: new URL(BASEURL + '/ccnulogin'),
            data: {
                idcard_number: idcard_number,
                password: password
            },
            method: "post"
        }))
    },

    //查询邮箱是否绑定
    checkUserEmail() {
        //console.log("请求4")

        let url_ = new URL(BASEURL + '/user/email/check')
        return GlobalAxios(toConfig({
            url: url_,
            data: {},
            method: "post"
        }))
    },

    //发出自己的愿望
    postWish(name: string, QQ: string, weChat: string, tel: string, wish: string, type: string) {
        //console.log("请求5")

        return GlobalAxios(toConfig({
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
    lightWishOn(id: string, name: string, tel: string, qq: string, wechat: string) {
        //console.log("请求6")

        return GlobalAxios(toConfig({
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
    getWishDetail(id: string) {
        //console.log("请求7")

        let url = new URL(BASEURL + '/wishes/details');
        url.searchParams.append("wish_id", id);
        url.searchParams.append("time", (new Date().getTime()).toString());
        return GlobalAxios(toConfig({ url: url, data: url, method: "get" }));
    },

    //查找点亮人信息
    getLightManInfo(id: string) {
        //console.log("请求8")

        let url = new URL(BASEURL + '/user/info/lightman')
        url.searchParams.append("wish_id", id)
        url.searchParams.append("time", (new Date().getTime()).toString())
        return GlobalAxios(toConfig({ url: url, data: url, method: "get" }))
    },

    //获取自己点亮的愿望
    getUserWishLight() {
        //console.log("请求9")

        let url = new URL(BASEURL + '/wishes/user/light')
        url.searchParams.append("time", (new Date().getTime()).toString())
        // console.log(toConfig({ url: url, data: url, method: "get" }))
        return GlobalAxios(toConfig({ url: url, data: url, method: "get" }))

    },

    //获取自己投递的愿望
    getUserWishPost() {
        //console.log("请求10")

        let url = new URL(BASEURL + '/wishes/user/post')
        url.searchParams.append("time", (new Date().getTime()).toString())
        return GlobalAxios(toConfig({ url: url, data: url, method: "get" }))
    },

    //根据分类获取愿望
    getWishByCategories(category: string) {
        //console.log("请求11")

        let url = new URL(BASEURL + '/wishes/categories')
        url.searchParams.append("categories", category)
        url.searchParams.append("time", (new Date().getTime()).toString())
        // console.log(toConfig({ url: url, data: url, method: "get" }))
        return GlobalAxios(toConfig({ url: url, data: url, method: "get" }))
    },

    //删除愿望
    deleteWish(wish_id: string) {
        //console.log("请求12")
        let axiosProp2: AxiosRequestConfig = {
            url: BASEURL + `/wishes?wish_id=${wish_id}`
        }

        return axios.delete(BASEURL + `/wishes?wish_id=${wish_id}`, axiosProp2)
    },

    //放弃点亮别人的愿望
    giveUpLightWish(wish_id: string, msg: string) {
        //console.log("请求13")

        return GlobalAxios(toConfig({
            url: new URL(BASEURL + `/wishes/giveup`),
            data: {
                wish_id: wish_id,
                message: msg
            },
            method: "post"
        }))
    },

    //实现别人的愿望
    achieveWish(wish_id: string) {
        //console.log("请求14")

        return GlobalAxios(toConfig({
            url: new URL(BASEURL + `/wishes/achieve`),
            data: {
                wish_id: wish_id
            }, method: "post"
        }))
    },

}



export default Service;