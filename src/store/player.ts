import { BannerType } from "@/api/home";
import create from "zustand";
import { persist } from "zustand/middleware";

interface PlayerState {
  popShow: boolean;
  popData: BannerType | null;
  isPlay: boolean;
  bubbleShow: boolean;
  updatePopShow: (bool: boolean) => void;
  changePopData: (data: BannerType) => void;
  changePlay: (bool: boolean) => void;
  changeBubbleShow: (bool: boolean) => void;
}
export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      popShow: false, //播放弹窗显示控制
      popData: null, //音频数据包
      isPlay: false, //音频播放状态
      bubbleShow: false, //胶囊组件显示控制
      updatePopShow(bool) {
        set({ popShow: bool });
      },
      changePopData(popData) {
        set({ popData });
      },
      changePlay(isPlay) {
        set({ isPlay });
      },
      changeBubbleShow(bubbleShow) {
        set({ bubbleShow });
      },
    }),
    {
      name: "music-player-store",
    }
  )
);
