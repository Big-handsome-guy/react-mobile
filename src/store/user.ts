import { userLogin, UserParams } from "@/api/user";
import { NavigateFunction } from "react-router-dom";
import create from "zustand";
import { persist } from "zustand/middleware";

//登录成功后下发的数据格式
interface UserInfoType {
  objectId: string;
  sessionToken: string;
  shortId: string;
  username: string;
  avatar: string;
}

interface UserState {
  userInfo: UserInfoType | null;
  isloading: boolean;
  loginFetch: (params: UserParams, navigate: NavigateFunction) => void;
  logOutFetch: () => void;
  userUpdateFetch: (info: UserInfoType) => void;
}
export const useUserLogin = create<UserState>()(
  persist(
    (set) => ({
      userInfo: null,
      isloading: false,
      loginFetch: async (params, navigate) => {
        //登录
        set({ isloading: true });
        let res = await userLogin(params);
        console.log(res);
        setTimeout(() => {
          set({ isloading: false, userInfo: res.data });
          navigate(-1);
        }, 1000);
      },
      logOutFetch() {
        //退出登录
        set({ userInfo: null });
        useUserLogin.persist.clearStorage();
      },
      //更新用户信息
      userUpdateFetch(info) {
        set({ userInfo: info });
      },
    }),
    {
      name: "react-mobile-user-info",
    }
  )
);
