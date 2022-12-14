import { CapsuleTabs, Tabs } from "antd-mobile";
import React, { useEffect, useState } from "react";
import { courseGet, classifyGet } from "../../api/course";
import Course from "../../components/course";
import { ClassifyType, CourseType } from "../../types/course";
import "./index.scss";

type Props = {};

export default function Explore({}: Props) {
  const [courseList, setCourseList] = useState<Array<CourseType>>([]);
  const [classifyList, setClassifyList] = useState<Array<ClassifyType>>([]);
  const [activeLv1, setActiveLv1] = useState<string>("0");
  useEffect(() => {
    //课程分类
    classifyGet().then((res) => {
      let { results } = res.data;
      let arrLv1 = results.filter((item: ClassifyType) => item.dadId === "0-0");
      arrLv1.forEach((lv1: ClassifyType) => {
        lv1.children = results.filter(
          (child: ClassifyType) => child.dadId === lv1.objectID
        );
      });
      console.log(arrLv1);
      setClassifyList(arrLv1);
    });
    //课程列表
    courseGet().then((res) => {
      setCourseList(res.data.results);
    });
  }, []);

  const handleCapsuleTab = (key: string) => {
    setActiveLv1(key);
  };

  return (
    <div>
      <h1 className="title">探索</h1>
      <CapsuleTabs activeKey={activeLv1} onChange={handleCapsuleTab}>
        {classifyList.map((item, index) => {
          return <CapsuleTabs.Tab title={item.cateName} key={index} />;
        })}
      </CapsuleTabs>
      <Tabs defaultActiveKey="0" stretch={false}>
        {classifyList.length
          ? classifyList[parseInt(activeLv1)].children.map((item, index) => {
              return <Tabs.Tab title={item.cateName} key={index} />;
            })
          : ""}
      </Tabs>
      <Course courseList={courseList} />
    </div>
  );
}
