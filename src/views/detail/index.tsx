import { NavBar, Toast } from "antd-mobile";
import React, { useEffect, useState } from "react";
import "./index.scss";
import { useNavigate, useParams } from "react-router-dom";
import { courseDetailGet } from "@/api/course";
import { CourseType } from "@/types/course";
import { useUserLogin } from "@/store/user";
import { userCollect, userCollectDel, userCollectGet } from "@/api/user";

type Props = {};

export default function detail({}: Props) {
  const params = useParams();
  //   console.log(params);
  const [detail, setDetail] = useState<CourseType>();
  const [active, setActive] = useState<boolean>(false); //收藏状态
  const { userInfo } = useUserLogin((state) => state);
  const [collectId, setCollectId] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    //获取详情
    courseDetailGet(params.id as string).then((res) => {
      //   console.log(res);
      setDetail(res.data);
    });
    //获取收藏状态
    let courseid = params.id;
    let userid = userInfo?.objectId;
    userCollectGet({ courseid, userid }).then((res) => {
      // console.log(res);
      if (res.data.results.length) {
        setActive(true);
        let { objectId } = res.data.results[0]; //记录收藏id
        setCollectId(objectId);
      }
    });
  }, []);
  const handleBack = () => {
    navigate(-1);
  };
  //收藏
  const handleCollect = () => {
    if (!userInfo) {
      navigate("/login");
    } else {
      let { name, poster, isvip, info, objectId } = detail as CourseType;
      let userid = userInfo.objectId;
      let courseid = objectId;
      userCollect({ name, poster, isvip, info, userid, courseid }).then(
        (res) => {
          // console.log(res);
          setActive(true);
          let { objectId } = res.data; //记录收藏id
          setCollectId(objectId);
        }
      );
    }
    Toast.show({
      icon: "success",
      content: "收藏成功",
    });
  };
  //取消收藏
  const handleRemove = () => {
    userCollectDel(collectId).then((res) => {
      setActive(false);
    });
    Toast.show({
      icon: "success",
      content: "取消成功",
    });
  };

  const right = (
    <>
      {active ? (
        <i className="iconfont icon-shoucang" onClick={handleRemove}></i>
      ) : (
        <i className="iconfont  icon-jushoucang" onClick={handleCollect}></i>
      )}
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
          {userInfo ? (
            <div dangerouslySetInnerHTML={{ __html: detail.desc }}></div>
          ) : (
            <p>{detail?.info}</p>
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
}
