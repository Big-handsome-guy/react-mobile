import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "./style.scss";
import { EffectCards } from "swiper";
import { bannerGet, BannerType } from "@/api/home";
import { Grid } from "antd-mobile";
import Course from "@/components/course";
import { courseGet } from "@/api/course";
import { CourseType } from "@/types/course";

type Props = {};

export default function Today({}: Props) {
  const [banner, setBanner] = useState<Array<BannerType>>([]);
  const [courseList, setCourseList] = useState<Array<CourseType>>([]);

  useEffect(() => {
    bannerGet().then((res) => {
      setBanner(res.data.results);
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
      <div className="header">Have a NiceDay!</div>
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
        {[1, 2, 3, 4].map((item) => {
          return (
            <Grid.Item>
              <div className="grid_item">正念冥想{item}</div>
            </Grid.Item>
          );
        })}
      </Grid>
      <Course courseList={courseList} />
    </div>
  );
}
