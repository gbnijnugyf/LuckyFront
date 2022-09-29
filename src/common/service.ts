import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { parse } from "url";
import "whatwg-fetch";
import {
  appendParams2Path,
  IUserInfo,
  IWishDetail,
  IWishInfo,
  IWishInfoName,
  ResStatus,
  School,
  wishType,
} from "./global";

const BASEURL =
  process.env.REACT_APP_ENV === "production"
    ? //  暂时使用本地 Mock
      "http://127.0.0.1:4523/m1/1379753-0-default"
    : // 云端 Mock
      "https://mock.apifox.cn/m1/1379753-0-default";

interface IGlobalResponse<T> {
  data: T;
  msg: string;
  status: ResStatus;
}

export interface IWishManInformation {
  wishMan_name?: string;
  wishMan_QQ?: string;
  wishMan_Wechat?: string;
  wishMan_Tel?: string;
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

  const parsedURL = parse(url);
  const params = new URLSearchParams(parsedURL.query || "");
  url = parsedURL.pathname || "";
  config.params = params;

  let response;
  if (method === "post") {
    response = await axios[method]<IGlobalResponse<T>>(url, data, config);
  } else {
    params.set("time", new Date().getTime().toString());
    response = await axios[method]<IGlobalResponse<T>>(url, config);
  }

  // TODO: have bug, check later
  if (response.statusText === "OK") {
    return response;
  } else if (response.status === ResStatus.Expires) {
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
interface IRegister {
  email: string;
  secret: string;
  signature: string;
  code: string;
}

export const Service = {
  //whut邮箱验证
  //邮箱发送

  async whutSendEmail(email: string) {
    let res;
    let config: AxiosRequestConfig<any> = {};
    config.baseURL = BASEURL;
    res = await axios["post"]<{signature:string}>(
      "/Auth/EmailVerify",
      email,
      config
    )
    return res;
  },
  async whutRegister(
    email: string,
    secret: string,
    signature: string,
    code: string) {
    let res;
    let config: AxiosRequestConfig<any> = {};
    config.baseURL = BASEURL;
    res = await axios["post"]<{uid:string}>(
      "/Auth/Register",
      {
        Email: email,
        password: secret,
        id: signature,
        code: code
      },
      config
    )
    return res;
  },
  //whut登录
  whutLogin() {
    return GlobalAxios<string>("post", "/whutlogin", null); //返回status，msg，data（鉴权）
  },
  // 获取用户信息，默认获取自身信息
  getManInfo(id: number | string = -1) {
    return GlobalAxios<IUserInfo>(
      "get",
      appendParams2Path("/user/info", { id: id.toString() })
    );
  },
  //（new）用户投递愿望111
  postWish(
    name: string,
    qq: string,
    weChat: string,
    tel: string,
    desire: string,
    type: wishType,
    school: School
  ) {
    return GlobalAxios<string>("post", "/desires/add", {
      view_desire: {
        desire: desire,
        type: type,
        school: school,
      },
      view_user: {
        name: name,
        qq: qq,
        weChat: weChat,
        tel: tel,
      },
    });
  },
  //（new）用户点亮愿望111
  lightWish(
    desire_id: string,
    name: string,
    tel: string,
    qq: string,
    wechat: string
  ) {
    return GlobalAxios<string>("post", "/desires/light", {
      id: desire_id,
      name: name,
      tel: tel,
      qq: qq,
      wechat: wechat,
    });
  },
  //（new）用户实现愿望111
  achieveWish(id: string) {
    return GlobalAxios<string>("post", "/desires/achieve", {
      id: id,
    });
  },
  //（new）用户取消点亮愿望111
  giveUpLightWish(id: string, message: string = "") {
    return GlobalAxios<string>("post", "/desires/giveup", {
      id: id,
      message: message,
    });
  },
  //（new）获取用户点亮的愿望信息111
  getLightedWishInfo() {
    return GlobalAxios<IWishInfo[]>("get", "/desires/user/light");
  },
  //（new）获取用户投递的愿望信息111
  getPostedWishInfo() {
    return GlobalAxios<IWishInfo[]>("get", "/desires/user/post");
  },
  //（new）通过类型获取愿望111
  getWishByCategories(categories: string) {
    return GlobalAxios<IWishInfoName[]>(
      "get",
      appendParams2Path("/desires/categories", { categories })
    );
  },
  //（new）获取愿望具体信息111
  getWishDetail(id: string) {
    return GlobalAxios<IWishDetail>(
      "get",
      appendParams2Path("/desires/details", {
        desire_id: id,
        time: new Date().getTime().toString(),
      })
    );
  },
  //用户删除愿望111
  deleteWish(desire_id: string) {
    return GlobalAxios<string>(
      "delete",
      appendParams2Path("/desires/delete", { desire_id })
    );
  },

  //绑定邮箱(主要用于华师邮箱绑定，后端未给接口)
  bindEmail(email: string) {
    return GlobalAxios<string>("post", "/user/email", {
      data: {
        email: email,
      },
    });
  },
  //ccnu登录(后端未给接口)
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
  //查询邮箱是否绑定111
  checkUserEmail() {
    return GlobalAxios<null>("post", "/user/email/check", null);
  },
};
