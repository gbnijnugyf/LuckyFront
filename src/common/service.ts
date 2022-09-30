import axios, { AxiosRequestConfig } from "axios";
import "whatwg-fetch";
import {
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

const globalAxios = axios.create({
  baseURL: BASEURL,
  headers: {
    token: localStorage.getItem("token") || "",
  },
});

globalAxios.interceptors.request.use((req) => {
  // avoid cache
  if (req.method !== "POST") {
    req.params.time = new Date().getTime().toString();
  }
  return req;
});
globalAxios.interceptors.response.use((res) => {
  console.log(res);
  // TODO: have bug, check later
  //   if (response.statusText === "OK") {
  //     return response;
  //   } else if (response.status === ResStatus.Expires) {
  //     alert(response.data.msg);
  //     localStorage.removeItem("token");

  //     // 重定向到根目录，重新登录
  //     let redirectpos = window.location.href;
  //     redirectpos = redirectpos.slice(0, redirectpos.indexOf("/", 10) + 1);
  //     // window.location.href(redirectpos)
  //     window.location.href = redirectpos;
  //   } else if (response.data.status !== 0) {
  //     alert(response.data.msg);
  //     return response;
  //   }

  //   return response;
  // }
  return res;
});
const globalRequest = {
  post: function <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any> | undefined
  ) {
    return globalAxios.post<IGlobalResponse<T>>(url, data, config);
  },
  get: function <T>(url: string, config?: AxiosRequestConfig<any> | undefined) {
    return globalAxios.get<IGlobalResponse<T>>(url, config);
  },
  delete: function <T>(
    url: string,
    config?: AxiosRequestConfig<any> | undefined
  ) {
    return globalAxios.delete<IGlobalResponse<T>>(url, config);
  },
};

export const Service = {
  //whut发送验证码
  async whutSendEmail(email: string) {
    let res;
    let config: AxiosRequestConfig<any> = {};
    config.baseURL = "https://dev-auth.itoken.team";
    let form = new FormData();
    form.append("email", email);
    res = await axios["post"]<{ signature: string }>(
      "/Auth/EmailVerify",
      form,
      config
    );
    return res;
  },
  async whutRegister(
    email: string,
    secret: string,
    signature: string,
    code: string
  ) {
    let form = new FormData();
    form.append("email", email);
    form.append("secret", secret);
    form.append("signature", signature);
    form.append("code", code);
    let res;
    let config: AxiosRequestConfig<any> = {};
    config.baseURL = "https://dev-auth.itoken.team";
    res = await axios["post"]<{ uid: string }>("/Auth/Register", form, config);
    return res;
  },
  //whut登录
  whutLogin() {
    return globalRequest.post<string>("/whutlogin", null); //返回status，msg，data（鉴权）
  },
  // 获取用户信息，默认获取自身信息
  getManInfo(id: number | string = -1) {
    return globalRequest.get<IUserInfo>("/user/info", {
      params: new URLSearchParams({ id: id.toString() }),
    });
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
    return globalRequest.post<string>("/desires/add", {
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
    return globalRequest.post<string>("/desires/light", {
      id: desire_id,
      name: name,
      tel: tel,
      qq: qq,
      wechat: wechat,
    });
  },
  //（new）用户实现愿望111
  achieveWish(id: string) {
    return globalRequest.post<string>("/desires/achieve", {
      id: id,
    });
  },
  //（new）用户取消点亮愿望111
  giveUpLightWish(id: string, message: string = "") {
    return globalRequest.post<string>("/desires/giveup", {
      id: id,
      message: message,
    });
  },
  //（new）获取用户点亮的愿望信息111
  getLightedWishInfo() {
    return globalRequest.get<IWishInfo[]>("/desires/user/light");
  },
  //（new）获取用户投递的愿望信息111
  getPostedWishInfo() {
    return globalRequest.get<IWishInfo[]>("desires/user/post");
  },
  //（new）通过类型获取愿望111
  getWishByCategories(categories: string) {
    return globalRequest.get<IWishInfoName[]>("/desires/categories", {
      params: new URLSearchParams({ categories }),
    });
  },
  //（new）获取愿望具体信息111
  getWishDetail(id: string) {
    return globalRequest.get<IWishDetail>("/desires/details", {
      params: { desire_id: id },
    });
  },
  //用户删除愿望111
  deleteWish(desire_id: string) {
    return globalRequest.delete<string>("/desires/delete", {
      params: { desire_id },
    });
  },

  //绑定邮箱(主要用于华师邮箱绑定，后端未给接口)
  bindEmail(email: string) {
    return globalRequest.post<string>("/user/email", {
      data: {
        email: email,
      },
    });
  },
  //ccnu登录(后端未给接口)
  ccnuLogin(idcard_number: string, password: string) {
    return globalRequest.post<{
      idcard_number: string;
      password: string;
      token?: string;
    }>("/ccnulogin", {
      idcard_number: idcard_number,
      password: password,
    });
  },
  //查询邮箱是否绑定111
  checkUserEmail() {
    return globalRequest.post<null>("/user/email/check", null);
  },
};
