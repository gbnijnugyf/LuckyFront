import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { parse } from "url";
import "whatwg-fetch";
import { appendParams2Path } from "./global";

const BASEURL = "http://127.0.0.1:4523/m1/1379753-0-default";

export enum Type {
  null = 0,
  影音,
  游戏,
  美食,
  学习,
  运动,
  交友,
  打卡,
  动漫,
  其他,
}
export enum State {
  初始化 = -1,
  未点亮,
  已点亮,
  已实现,
  已删除,
}
export enum School {
  初始化 = 0,
  武理,
  华师,
}

interface IGlobalResponse<T> {
  data: T;
  msg: string;
  status: number;
}

//对应后端新接口
export interface IUserInfo {
  email: string;
  wechat: string;
  tel: string;
  name: string;
  qq: string;
  school: number;
}
export interface IWishInfo {
  desire_id: string;
  desire: string;
  lighted_at: string;
  created_at: string;
  finished_at: string;
  state: State; //-1未定义、0未点亮、1已点亮、2已实现、3已删除
  type: Type; //0未定义
  light_id: number;
  user_id: number;
}
export interface IWishInfo_withName {
  view_desire: IWishInfo;
  view_user:{
    name:string,
    school:School//0错误or初始化、1武理、2华师
  }
}
export interface IWishDetail {
  view_desire: IWishInfo; //愿望信息
  view_user: IUserInfo; //许愿人信息
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

export const Service = {
  //whut邮箱验证
  whutCheckEmail(email: string) {
    return GlobalAxios<{ emailVV: string }>(
      "post",
      "/whutregister/checkemail",
      {
        data: {
          email: email,
        },
      }
    );
  },
  //whut注册
  whutRegister(email: string, pwd: string) {
    return GlobalAxios<{ state: number }>("post", "/whutregister", {
      data: {
        Email: email,
        password: pwd,
      },
    });
  },
  //whut登录
  whutLogin() {
    return GlobalAxios<string>("post", "/whutlogin", null); //返回status，msg，data（鉴权）
  },
  //（new）获取用户的信息111
  getManInfo(id: string) {
    return GlobalAxios<IUserInfo>(
      "get",
      appendParams2Path("/user/info", { id: id })
    );
  },
  //（new）用户投递愿望111
  postWish(
    name: string,
    qq: string,
    weChat: string,
    tel: string,
    desire: string,
    type: Type,
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
      wechat: wechat
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
    return GlobalAxios<IWishInfo_withName[]>(
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
