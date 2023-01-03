import React, {
  TouchEventHandler,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import "./index.scss";
import { Tag, Popup } from "antd-mobile";
import { DownOutline } from "antd-mobile-icons";
import { usePlayerStore } from "@/store/player";
type Props = {};

let duration = 0; //音频总时长
let barWidth = 0; //进度条可以走到的最远距离
let beginW = 0; //按下dot时当前inner的宽度
let beginX = 0; //按下dot时，手指离左侧屏幕的距离
const timeHandler = (s: number) => {
  let minute = Math.floor(s / 60); //从秒数中提取分钟
  let second = Math.round(s % 60);
  let minuteStr = "";
  let secondStr = "";
  if (minute < 10) {
    minuteStr = "0";
  }
  if (second < 10) {
    secondStr = "0";
  }
  return `${minuteStr}${minute}:${secondStr}${second}`;
};

export default function AudioPlay({}: Props) {
  const {
    popShow,
    updatePopShow,
    popData,
    isPlay,
    changePlay,
    changeBubbleShow,
  } = usePlayerStore((state) => state);
  const audioRef = useRef<HTMLAudioElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [move, setMove] = useState<number>(0); //进度条实时移动距离
  const [nowTime, setNowTime] = useState<string>("00:00");
  const [maxTime, setMaxTime] = useState<string>("00:00");

  const handleCanPlay = () => {
    let ele = audioRef.current as HTMLAudioElement;
    let bar = barRef.current as HTMLDivElement;
    barWidth = bar.offsetWidth; //获取进度条容器宽度
    // console.log("进度条容器宽度", barWidth);
    duration = ele.duration;
    // console.log("音频总时长", duration);
    setMaxTime(timeHandler(duration));
  };
  const handleTimeUpdate = () => {
    let ele = audioRef.current as HTMLAudioElement;
    // console.log("音乐播放中", ele.currentTime);
    let w = (ele.currentTime / duration) * barWidth;
    setMove(w);
    setNowTime(timeHandler(ele.currentTime));
  };
  useEffect(() => {
    //监测isplay的变化同步修改bubble播放状态
    let audio = audioRef.current as HTMLAudioElement;
    if (!audio) return;
    if (isPlay) {
      audio.play(); //播放音频
    } else {
      audio.pause(); //暂停音频
    }
  }, [isPlay]);

  const handlePlay = (bool: boolean) => {
    changePlay(bool); //修改音频按钮的播放状态
  };

  const handleStart: TouchEventHandler<HTMLDivElement> = (event) => {
    // console.log("手指按下", event);
    beginW = move;
    beginX = event.changedTouches[0].clientX;
  };

  const handleMove: TouchEventHandler<HTMLDivElement> = (event) => {
    // console.log("手指移动", event);
    let ele = audioRef.current as HTMLAudioElement;
    let moveX = event.changedTouches[0].clientX;
    let w = beginW + (moveX - beginX); //获取到的进度条应该改变的新距离
    if (w <= barWidth) {
      setMove(w); //控制进度条
      //控制音频
      let current = (w / barWidth) * duration;
      ele.currentTime = current;
    }
  };

  const handleEnd: TouchEventHandler<HTMLDivElement> = (event) => {
    // console.log("手指抬起", event);
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
                changeBubbleShow(true);
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
              className="iconfont icon-icon-bofang"
              onClick={() => {
                handlePlay(true);
              }}
            ></i>
            <i
              className="iconfont icon-zanting2"
              onClick={() => {
                handlePlay(false);
              }}
            ></i>
            <i className="iconfont icon-ico_zanting_xuanzhong"></i>
          </div>
          <div className="audio-control">
            <audio
              onCanPlay={handleCanPlay}
              onTimeUpdate={handleTimeUpdate}
              ref={audioRef}
              src={popData.audio}
            ></audio>
            <div className="icon-cont">
              <i className="iconfont icon-jushoucang"></i>
              <i className="iconfont icon-fenxiang"></i>
            </div>
            {/* 进度条 */}
            <div className="bar" ref={barRef}>
              <div className="inner" style={{ width: `${move}px` }}>
                <div
                  className="dot"
                  onTouchStart={handleStart}
                  onTouchMove={handleMove}
                  onTouchEnd={handleEnd}
                ></div>
              </div>
            </div>
            <div className="time_box">
              <span>{nowTime}</span>
              <span>{maxTime}</span>
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
