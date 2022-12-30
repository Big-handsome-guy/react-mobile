import { BannerType } from "@/api/home";
import create from "zustand";
import { persist } from "zustand/middleware";

interface PlayerState {
  popShow: boolean;
  popData: BannerType | null;
  isPlay: boolean;
  updatePopShow: (bool: boolean) => void;
  changePopData: (data: BannerType) => void;
  changePlay: (bool: boolean) => void;
}
export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      popShow: false,
      popData: null, //音频数据包
      isPlay: false, //音频播放状态
      updatePopShow(bool) {
        set({ popShow: bool });
      },
      changePopData(popData) {
        set({ popData });
      },
      changePlay(isPlay) {
        set({ isPlay });
      },
    }),
    {
      name: "music-player-store",
    }
  )
);
