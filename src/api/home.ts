import request from "../utils/request";

//轮播
export interface BannerType {
  name: string;
  img: string;
  audio: string;
}
export const bannerGet = () => {
  return request.get("/classes/ReactBanner");
};
