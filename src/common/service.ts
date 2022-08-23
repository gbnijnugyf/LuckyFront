import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import "whatwg-fetch";
import { IWishObject } from "../pages/MyWish";
import { IWishesObject } from "../pages/Wishes";

// const BASEURL = window.location.href.slice(0, window.location.href.indexOf('/', 10)) + "/api"

// function GlobalAxios(url, data = {}, method = String) {

// const BASEURL = window.location.href.slice(0, window.location.href.indexOf('/', 10)) + "/api" //部署环境用
const BASEURL = "http://127.0.0.1:4523/m1/1379753-0-default";

interface IGlobalResponse<T> {
  data: T;
  msg: string;
  status: number;
}
async function GlobalAxios<T = any, D = any>(
  method: "post",
  url: string,
  data: D
): Promise<AxiosResponse<IGlobalResponse<T>, any>>;
async function GlobalAxios<T = any>(
  method: "get" | "delete",
  url: string
): Promise<AxiosResponse<IGlobalResponse<T>, any>>;
async function GlobalAxios<T = any, D = any>(
  method: "get" | "post" | "delete",
  url: string,
  data?: D
): Promise<AxiosResponse<IGlobalResponse<T>, any>> {
  let config: AxiosRequestConfig<D> = {};
  config.baseURL = BASEURL;
  config.headers = { token: localStorage.getItem("token") || "" };
  let response;
  if (method === "post") {
    response = await axios[method]<IGlobalResponse<T>>(url, data, config);
  } else {
    response = await axios[method]<IGlobalResponse<T>>(url, config);
  }

  // TODO: have bug, check later
  if (response.statusText === "OK") {
    return response;
  } else if (response.status === -2) {
    alert(response.data.msg);
    localStorage.removeItem("token");

    // 重定向到根目录，重新登录
    let redirectpos = window.location.href;
    redirectpos = redirectpos.slice(0, redirectpos.indexOf("/", 10) + 1);
    // window.location.href(redirectpos)
    window.location.href = redirectpos;
  } else if (response.data.status !== 0) {
    alert(response.data.msg);
    return response;
  }

  return response;
}

interface ILightInformation {
  light_name?: string;
  light_tel?: string;
  light_qq?: string;
  light_wechat?: string;
}
export interface IWishManInformation {
  wishMan_name?: string;
  wishMan_QQ?: string;
  wishMan_Wechat?: string;
  wishMan_Tel?: string;
}

export const Service = {
  //绑定邮箱

  bindEmail(email: string) {
    return GlobalAxios<IGlobalResponse<string>>("post", "/user/email", {
      data: {
        email: email,
      },
    });
  },

  //whut登录
  whutLogin() {
    return GlobalAxios<null>("post", "/whutlogin", null);
  },

  //ccnu登录
  ccnuLogin(idcard_number: string, password: string) {
    return GlobalAxios<{
      idcard_number: string;
      password: string;
      token?: string;
    }>("post", "/ccnulogin", {
      idcard_number: idcard_number,
      password: password,
    });
  },

  //查询邮箱是否绑定
  checkUserEmail() {
    return GlobalAxios<null>("post", "/user/email/check", null);
  },

  //发出自己的愿望
  postWish(
    name: string,
    QQ: string,
    weChat: string,
    tel: string,
    wish: string,
    type: string
  ) {
    return GlobalAxios<{
      wishMan_inform: IWishManInformation;
      wish: string;
      type: string;
    }>("post", "/wished/add", {
      wishMan_inform: {
        wishMan_name: name,
        wishMan_QQ: QQ,
        wishMan_Wechat: weChat,
        wishMan_Tel: tel,
      },
    });
  },

  //点亮别人的愿望
  lightWishOn(
    id: string,
    name: string,
    tel: string,
    qq: string,
    wechat: string
  ) {
    return GlobalAxios<{
      wish_id: string;
      light_inform?: ILightInformation;
    }>("post", "/wishes/light", {
      wish_id: id,
      light_inform: {
        light_name: name,
        light_tel: tel,
        light_qq: qq,
        light_wechat: wechat,
      },
    });
  },

  //查看愿望详情
  getWishDetail(id: string) {
    let url = new URL("/wishes/details");
    url.searchParams.append("wish_id", id);
    url.searchParams.append("time", new Date().getTime().toString());
    return GlobalAxios<IWishObject>("get", url.toString());
  },

  //查找点亮人信息
  getLightManInfo(id: string) {
    let url = new URL("/user/info/lightman");
    url.searchParams.append("wish_id", id);
    url.searchParams.append("time", new Date().getTime().toString());
    return GlobalAxios<IWishObject[]>("get", url.toString());
  },

  //获取自己点亮的愿望//后端接口重构Ligth
  getUserWishLight() {
    let url = new URL("/wishes/user/light"); // '/wishes/user/light' or '/desires/user/light'
    url.searchParams.append("time", new Date().getTime().toString());
    return GlobalAxios<IWishObject[]>("get", url.toString());
  },

  //获取自己投递的愿望//后端接口重构Post
  getUserWishPost() {
    let url = new URL("/wishes/user/post");
    url.searchParams.append("time", new Date().getTime().toString());
    return GlobalAxios<IWishObject[]>("get", url.toString());
  },

  //根据分类获取愿望
  getWishByCategories(category: string) {
    let url = new URL("/wishes/categories");
    url.searchParams.append("categories", category);
    url.searchParams.append("time", new Date().getTime().toString());
    // console.log(toConfig({ url: url, data: url, method: "get" }))
    return GlobalAxios<IWishesObject[]>("get", url.toString());
  },

  //删除愿望
  deleteWish(wish_id: string) {
    let url = new URL(`/wishes?wish_id=${wish_id}`);
    return GlobalAxios("delete", url.toString());
  },

  //放弃点亮别人的愿望
  giveUpLightWish(wish_id: string, msg?: string) {
    return GlobalAxios<{
      wish_id: string;
      message: string;
    }>("post", "/wishes/giveup", {
      wish_id: wish_id,
      message: msg,
    });
  },

  //实现别人的愿望
  achieveWish(wish_id: string) {
    return GlobalAxios<{
      wish_id: string;
    }>("post", "/wishes/achieve", {
      wish_id: wish_id,
    });
  },
};
