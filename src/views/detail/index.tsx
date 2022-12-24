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

  useEffect(() => {
    courseDetailGet(params.id as string).then((res) => {
      //   console.log(res);
      setDetail(res.data);
    });
  }, []);
  const handleBack = () => {};
  return (
    <div className="detail_box">
      <NavBar onBack={handleBack}></NavBar>
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
