import axios from 'axios';
import 'whatwg-fetch';
import { IWishObject } from '../pages/MyWish';
import { IWishesObject } from '../pages/Wishes';

// const BASEURL = window.location.href.slice(0, window.location.href.indexOf('/', 10)) + "/api"

// function GlobalAxios(url, data = {}, method = String) {

// const BASEURL = window.location.href.slice(0, window.location.href.indexOf('/', 10)) + "/api" //部署环境用
const BASEURL = "http://127.0.0.1:4523/m1/1379753-0-default"

interface GlobalResponse<T> {
    data: T,
    msg: string,
    status: number
}

function IsToken(props: IConfig): IConfig {
    const token = localStorage.getItem('token');
    // console.log("IsToken:")
    // console.log(token)
    props.data.token = token;
    return props;
}
async function GlobalAxiosToPost<T>(props: IConfig) {
    props = IsToken(props);
    const response = await axios.post<GlobalResponse<T>>(props.url, props.data);
    // console.log(props.data)
    return response;
}
async function GlobalAxiosToGet<T>(props: IConfig) {
    props = IsToken(props);
    if (props.interf === "Light") {

    }
    else if (props.interf === "Post") {

    }
    const response = await axios.get<GlobalResponse<T>>(props.url)
    return response;
}
async function GlobalAxiosToDelete(props:IConfig) {
    props = IsToken(props);
    const response = await axios.delete(props.url, props.data)

    return response
}

async function GlobalAxios<T>(props: IConfig) {//
    let response = null;
    if (props.method === "post")
        response = await GlobalAxiosToPost<T>(props)
    else if(props.method === "get")
        response = await GlobalAxiosToGet<T>(props)
    else
        response = await GlobalAxiosToDelete(props)
    // const {data} = response;

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
    else if (response.data.status !== 0) {
        alert(response.data.msg)
        return response;
    }

    return response;
}

export interface IConfig {
    url: string,
    data: any,  //IsToken中需要加入token属性
    method: string,
    interf?: string
}

interface light_information {
    light_name?: string,
    light_tel?: string,
    light_qq?: string,
    light_wechat?: string,
}
interface wishMan_information{
    wishMan_name?: string,
    wishMan_QQ?: string,
    wishMan_Wechat?: string,
    wishMan_Tel?: string,
}

export interface PostProps {
    url: URL,
    data: {//[key:String]?:any
        data?: object,
        email?: string,
        idcard_number?: string,
        password?: string,
        wishMan_inform?:wishMan_information,
        wish?: string,
        type?: string,
        wish_id?: string,
        light_inform?:light_information,
        message?: string
    },
    method: string,
    interf?: string
}

export interface GetProps {
    url: URL,
    data: URL,
    method: string,
    interf?: string
}

interface DeleteProps{
    url:string,
    data:undefined,
    method:string
}


function toConfig(props: PostProps | GetProps|DeleteProps): IConfig {

    if (props.url && props.data && props.method) {
        if(props.method === "delete"){
            let config:IConfig = {
                url:props.url.toString(),
                data:undefined,
                method:"delete"
            }

            return config;
        }
        let config: IConfig = {
            url: props.url.toString(),
            data: props.data,
            method: props.method
        };
        if (props.interf !== undefined)
            config.interf = props.interf;
        return config;
    }
    else {
        let config: IConfig = {
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
        return GlobalAxios<{ email: string }>(toConfig({
            url: new URL(BASEURL + '/user/email'),
            data: {
                email: email
            }, method: "post"
        }))
    },

    //whut登录
    whutLogin() {
        //console.log("请求2")

        return GlobalAxios<{ data: {} }>(toConfig({
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

        return GlobalAxios<{
            idcard_number: string,
            password: string,
            token?: string
        }>(toConfig({
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
        return GlobalAxios<{}>(toConfig({
            url: url_,
            data: {},
            method: "post"
        }))
    },

    //发出自己的愿望
    postWish(name: string, QQ: string, weChat: string, tel: string, wish: string, type: string) {
        //console.log("请求5")

        return GlobalAxios<{
            wishMan_inform:wishMan_information,
            wish: string,
            type: string
        }>(toConfig({
            url: new URL(BASEURL + '/wishes/add'),
            data: {
                wishMan_inform:{
                    wishMan_name: name,
                    wishMan_QQ: QQ,
                    wishMan_Wechat: weChat,
                    wishMan_Tel: tel,
                },
                
                wish: wish,
                type: type
            },
            method: "post"
        }))
    },

    //点亮别人的愿望
    lightWishOn(id: string, name: string, tel: string, qq: string, wechat: string) {
        //console.log("请求6")

        return GlobalAxios<{
            wish_id: string,
            light_inform?:light_information,
        }>(toConfig({
            url: new URL(BASEURL + '/wishes/light'),
            data: {
                wish_id: id,
                light_inform:{
                    light_name: name,
                    light_tel: tel,
                    light_qq: qq,
                    light_wechat: wechat
                }
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
        return GlobalAxios<IWishObject>(toConfig({ url: url, data: url, method: "get" }));
    },

    //查找点亮人信息
    getLightManInfo(id: string) {
        //console.log("请求8")

        let url = new URL(BASEURL + '/user/info/lightman')
        url.searchParams.append("wish_id", id)
        url.searchParams.append("time", (new Date().getTime()).toString())
        return GlobalAxios<Array<IWishObject>>(toConfig({ url: url, data: url, method: "get" }))
    },

    //获取自己点亮的愿望//后端接口重构Ligth
    getUserWishLight() {
        //console.log("请求9")

        let url = new URL(BASEURL + '/wishes/user/light')// '/wishes/user/light' or '/desires/user/light'
        url.searchParams.append("time", (new Date().getTime()).toString())
        // console.log(toConfig({ url: url, data: url, method: "get" }))
        return GlobalAxios<Array<IWishObject>>(toConfig({ url: url, data: url, method: "get", interf: "Light" }))

    },

    //获取自己投递的愿望//后端接口重构Post
    getUserWishPost() {
        //console.log("请求10")

        let url = new URL(BASEURL + '/wishes/user/post')
        url.searchParams.append("time", (new Date().getTime()).toString())
        return GlobalAxios<Array<IWishObject>>(toConfig({ url: url, data: url, method: "get", interf: "Post" }))
    },

    //根据分类获取愿望
    getWishByCategories(category: string) {
        //console.log("请求11")

        let url = new URL(BASEURL + '/wishes/categories')
        url.searchParams.append("categories", category)
        url.searchParams.append("time", (new Date().getTime()).toString())
        // console.log(toConfig({ url: url, data: url, method: "get" }))
        return GlobalAxios<Array<IWishesObject>>(toConfig({ url: url, data: url, method: "get" }))
    },

    //删除愿望
    deleteWish(wish_id: string) {
        //console.log("请求12")
        let url = new URL(BASEURL + `/wishes?wish_id=${wish_id}`)

        return GlobalAxios(toConfig({url:url, data:url, method:"delete"}))
        // return axios.delete(BASEURL + `/wishes?wish_id=${wish_id}`, axiosProp2)
    },

    //放弃点亮别人的愿望
    giveUpLightWish(wish_id: string, msg?: string) {
        //console.log("请求13")

        return GlobalAxios<{
            wish_id: string,
            message: string
        }>(toConfig({
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

        return GlobalAxios<{
            wish_id: string
        }>(toConfig({
            url: new URL(BASEURL + `/wishes/achieve`),
            data: {
                wish_id: wish_id
            }, method: "post"
        }))
    },

}



export default Service;