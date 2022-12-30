import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import { Tag, Popup } from "antd-mobile";
import { DownOutline } from "antd-mobile-icons";
import { usePlayerStore } from "@/store/player";
type Props = {};

let duration = 0; //音频总时长
let barWidth = 0; //进度条可以走到的最远距离

export default function AudioPlay({}: Props) {
  const { popShow, updatePopShow, popData, isPlay, changePlay } =
    usePlayerStore((state) => state);
  const audioRef = useRef<HTMLAudioElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [move, setMove] = useState<number>(0); //进度条实时移动距离

  useEffect(() => {
    let audio = audioRef.current as HTMLAudioElement;
    let bar = barRef.current as HTMLDivElement;
    barWidth = bar.offsetWidth; //获取进度条容器宽度
    console.log("进度条容器宽度", barWidth);

    //等待音频资源准备好之后再提取时长
    audio.oncanplay = () => {
      duration = audio.duration;
      console.log("音频总时长", duration);
    };
    audio.ontimeupdate = () => {
      console.log("音乐播放中", audio.currentTime);
      let w = (audio.currentTime / duration) * barWidth;
      setMove(w);
    };
  }, []);

  const handlePlay = (bool: boolean) => {
    let audio = audioRef.current as HTMLAudioElement;
    changePlay(bool); //修改音频按钮的播放状态
    if (bool) {
      audio.play(); //播放音频
    } else {
      audio.pause(); //暂停音频
    }
  };

  return (
    <Popup
      visible={popShow}
      onMaskClick={() => {
        updatePopShow(false);
      }}
      bodyStyle={{ height: "100vh" }}
    >
      {popData ? (
        <div className="audio-play">
          <div className="drop-cont">
            <DownOutline
              fontSize={20}
              onClick={() => {
                updatePopShow(false);
              }}
            />
            <Tag color="default" className="tag">
              耀眼的播放器
            </Tag>
            <span></span>
          </div>
          {/* 播放暂停按钮 */}
          <div className={`play-btn ${isPlay ? "" : "stop"} `}>
            <i
              className="iconfont icon-bofang"
              onClick={() => {
                handlePlay(true);
              }}
            ></i>
            <i
              className="iconfont icon-zanting1"
              onClick={() => {
                handlePlay(false);
              }}
            ></i>
            <i className="iconfont icon-zanting"></i>
          </div>
          <div className="audio-control">
            <audio
              controls
              ref={audioRef}
              src={popData.audio}
              className="audio_box"
            ></audio>
            <div className="icon-cont">
              <i className="iconfont icon-jushoucang"></i>
              <i className="iconfont icon-fenxiang"></i>
            </div>
            {/* 进度条 */}
            <div className="bar" ref={barRef}>
              <div className="inner" style={{ width: `${move}px` }}>
                <div className="dot"></div>
              </div>
            </div>
          </div>
          <div className="circle circle1"></div>
          <div className="circle circle2"></div>
          <div className="circle circle3"></div>
        </div>
      ) : (
        ""
      )}
    </Popup>
  );
}
