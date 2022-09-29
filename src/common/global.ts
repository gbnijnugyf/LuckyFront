export enum wishType {
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
export enum WishState {
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
export enum ResStatus {
  Expires = -2,
  Error = -1,
  Suceess = 0,
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
  state: WishState; //-1未定义、0未点亮、1已点亮、2已实现、3已删除
  type: wishType; //0未定义
  light_id: number;
  user_id: number;
}

export interface IWishInfoName {
  view_desire: IWishInfo;
  view_user: {
    name: string;
    school: School; //0错误or初始化、1武理、2华师
  };
}
export interface IWishDetail {
  view_desire: IWishInfo; //愿望信息
  view_user: IUserInfo; //许愿人信息
}

export function formatTime(time: string) {
  if (!time) return "";
  time = time.slice(0, 10) + " " + time.slice(11, 16);
  return time;
}

/**
 *
 * @param path like `/path/to/location`
 * @param paramsRaw your Params
 * @returns like `/path/to/location?a=1&b=2`
 */
export function appendParams2Path(
  path: string,
  paramsRaw: string | URLSearchParams | string[][] | Record<string, string>
) {
  const params = new URLSearchParams(paramsRaw);
  return `${path}?${params.toString()}`;
}
