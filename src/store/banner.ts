import { bannerGet, BannerType } from "@/api/home";
import create from "zustand";
import { persist } from "zustand/middleware";

interface BannerState {
  banner: Array<BannerType>;
  fetchBanner: () => void;
  addBanner: (obj: BannerType) => void;
}
//添加在持久化存储能力前
// export const useBanner = create<BannerState>((set, get) => ({
//   banner: [],
//   fetchBanner: async () => {
//     //带有异步请求的方法
//     let res = await bannerGet();
//     return set({ banner: res.data.results });
//   },
//   addBanner: (obj) => {
//     let arr = get().banner;
//     arr.push(obj);
//     return set({
//       banner: arr,
//     });
//   },
// }));

//添加在持久化存储能力后
export const useBanner = create<BannerState>()(
  persist(
    (set, get) => ({
      banner: [],
      fetchBanner: async () => {
        //带有异步请求的方法
        let res = await bannerGet();
        return set({ banner: res.data.results });
      },
      addBanner: (obj) => {
        let arr = get().banner;
        arr.push(obj);
        return set({
          banner: arr,
        });
      },
    }),
    {
      name: "banner-list",
      getStorage: () => sessionStorage, //指定存储位置，默认存储localStorage
    }
  )
);
