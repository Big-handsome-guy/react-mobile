import { NavBar } from "antd-mobile";
import React, { useEffect, useState } from "react";
import "./index.scss";
import { useParams } from "react-router-dom";
import { courseDetailGet } from "@/api/course";
import { CourseType } from "@/types/course";

type Props = {};

export default function detail({}: Props) {
  const params = useParams();
  //   console.log(params);
  const [detail, setDetail] = useState<CourseType>();
  const [active, setActive] = useState<boolean>(true);

  useEffect(() => {
    courseDetailGet(params.id as string).then((res) => {
      //   console.log(res);
      setDetail(res.data);
    });
  }, []);
  const handleBack = () => {};
  const right = (
    <>
      <i
        className={`iconfont ${active ? "icon-shoucang" : "icon-jushoucang"}`}
      ></i>
    </>
  );
  return (
    <div className="detail_box">
      <NavBar onBack={handleBack} right={right}>
        课程详情
      </NavBar>
      {detail ? (
        <>
          <img src={detail?.poster} alt="" />
          <h2>{detail?.name}</h2>
          <p>{detail?.info}</p>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
