import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "./style.scss";
import { EffectCards } from "swiper";
import { bannerGet, BannerType } from "@/api/home";
import { Avatar, Grid, SearchBar } from "antd-mobile";
import Course from "@/components/course";
import { courseGet } from "@/api/course";
import { CourseType } from "@/types/course";
import BScroll from "@better-scroll/core";
import MouseWheel from "@better-scroll/mouse-wheel";
import { useUserLogin } from "@/store/user";
import { Link } from "react-router-dom";
BScroll.use(MouseWheel);

type Props = {};
function getImageUrl(index: number) {
  return new URL(`../../assets/icon/ic_today_${index + 1}.png`, import.meta.url)
    .href;
}

export default function Today({}: Props) {
  const [banner, setBanner] = useState<Array<BannerType>>([]);
  const [courseList, setCourseList] = useState<Array<CourseType>>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const gridData = ["专注闹钟", "呼吸训练", "睡眠助手", "解压木鱼"];
  const [opacity, setOpacity] = useState<number>(0);
  const { userInfo } = useUserLogin((state) => state);

  useEffect(() => {
    bannerGet().then((res) => {
      setBanner(res.data.results);
      setTimeout(() => {
        let wrapper = wrapperRef.current as HTMLDivElement;
        let bs = new BScroll(wrapper, {
          probeType: 3, //控制scroll时间的时机
          click: true, //开启点击事件
          mouseWheel: {
            //开启鼠标滚轮
            speed: 20,
            invert: false,
            easeTime: 300,
          },
        });
        bs.on("scroll", (position: any) => {
          // console.log(position.x, position.y);
          let y = Math.abs(position.y);
          if (y < 285) {
            setOpacity(y / 300);
          }
        });
      }, 300);
    });
    loadMore();
  }, []);
  const loadMore = async () => {
    courseGet().then((res) => {
      let { results } = res.data;
      if (results.length) {
        let list = [...courseList, ...results];
        setCourseList(list);
      }
    });
  };
  return (
    <div className="today_box">
      <div className="header" style={{ opacity }}>
        Have a NiceDay!
      </div>
      <div className="wrapper" ref={wrapperRef}>
        <div className="content">
          <div className="user">
            <div>
              <h1>加入NiceDay</h1>
              <Link
                to={"/login"}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <p>
                  {userInfo
                    ? `当前账号:${userInfo.username}`
                    : "注册或登录账号"}
                </p>
              </Link>
            </div>
            <Avatar src="" />
          </div>
          <div className="search_box">
            <SearchBar placeholder="冥想课程、大自然音乐、睡眠助手等" />
          </div>
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            {banner.map((item) => {
              return (
                <SwiperSlide>
                  <img src={item.img} alt="" />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Grid columns={4} gap={8}>
            {gridData.map((item, index) => {
              return (
                <Grid.Item className="grid_item" key={index}>
                  <img src={getImageUrl(index)} alt="" />
                  <h3>{item}</h3>
                </Grid.Item>
              );
            })}
          </Grid>
          <Course courseList={courseList} />
        </div>
      </div>
    </div>
  );
}
