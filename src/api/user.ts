import request from "../utils/request";

export interface UserParams {
  username: string;
  password: string;
  avatar?: string;
}
//登录
export const userLogin = (params: UserParams) => {
  return request.post("/login", params);
};

export interface CollectParams {
  userid: string;
  courseid: string;
  name: string;
  poster: string;
  isvip: boolean;
  info: string;
}
//收藏
export const userCollect = (params: CollectParams) => {
  return request.post("/classes/ReactCollect", params);
};

export interface CollectSearchParams {
  userid: string | undefined;
  courseid?: string;
}
//查询收藏
export const userCollectGet = (params: CollectSearchParams) => {
  let search = JSON.stringify(params);
  return request.get(`/classes/ReactCollect?where=${search}`);
};

//取消收藏
export const userCollectDel = (collectid: string) => {
  return request.delete(`/classes/ReactCollect/${collectid}`);
};
