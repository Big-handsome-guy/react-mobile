import { CapsuleTabs, InfiniteScroll, Tabs } from "antd-mobile";
import React, { useEffect, useState } from "react";
import { courseGet, classifyGet, CourseConditionType } from "../../api/course";
import Course from "../../components/course";
import { ClassifyType, CourseType } from "../../types/course";
import "./index.scss";

type Props = {};
let obj: CourseConditionType = {
  //列表查询数据包
  classv1: `6399e3fe60195e6845db0560`,
};
let page = 2; //默认页码

export default function Explore({}: Props) {
  const [courseList, setCourseList] = useState<Array<CourseType>>([]);
  const [classifyList, setClassifyList] = useState<Array<ClassifyType>>([]);
  const [activeLv1, setActiveLv1] = useState<string>("0");
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    //课程分类
    classifyGet().then((res) => {
      let { results } = res.data;
      let arrLv1 = results.filter((item: ClassifyType) => item.dadId === "0-0");
      arrLv1.forEach((lv1: ClassifyType) => {
        lv1.children = results.filter(
          (child: ClassifyType) => child.dadId === lv1.objectId
        );
      });
      // console.log(arrLv1);
      setClassifyList(arrLv1);
    });
    //课程列表
    courseGet(obj).then((res) => {
      setCourseList(res.data.results);
      setHasMore(true);
    });
  }, []);

  //主菜单
  const handleCapsuleTab = (key: string) => {
    setActiveLv1(key);
    let { objectId } = classifyList[parseInt(key)];
    obj.classv1 = objectId;
    page = 2;
    document.documentElement.scrollTop = 0;
    courseGet({ classv1: objectId }).then((res) => {
      let { results } = res.data;
      setCourseList(results);
      if (results.length >= 8) {
        setHasMore(true);
      }
    });
  };

  //子菜单
  const handleTabs = (key: string) => {
    let lv1 = classifyList[parseInt(activeLv1)]; //主分类ID
    if (key != "0") {
      obj.classv2 = lv1.children[parseInt(key) - 1].objectId;
    }
    page = 2;
    document.documentElement.scrollTop = 0;
    courseGet(obj).then((res) => {
      let { results } = res.data;
      setCourseList(results);
      if (results.length >= 8) {
        setHasMore(true);
      }
    });
  };

  const loadMore = async () => {
    console.log("触底了");
    courseGet(obj, page).then((res) => {
      let { results } = res.data;
      if (results.length) {
        let list = [...courseList, ...results];
        setCourseList(list);
        page++;
      }
      if (results.length < 8) {
        setHasMore(false);
      }
    });
  };

  return (
    <div className="foot_padding">
      <h1 className="title">探索</h1>
      <div className="my_stick">
        <CapsuleTabs activeKey={activeLv1} onChange={handleCapsuleTab}>
          {classifyList.map((item, index) => {
            return <CapsuleTabs.Tab title={item.cateName} key={index} />;
          })}
        </CapsuleTabs>
        <Tabs
          defaultActiveKey="0"
          stretch={false}
          activeLineMode="fixed"
          onChange={handleTabs}
        >
          <Tabs.Tab title="全部" key={0} />
          {classifyList.length
            ? classifyList[parseInt(activeLv1)].children.map((item, index) => {
                return <Tabs.Tab title={item.cateName} key={index + 1} />;
              })
            : ""}
        </Tabs>
      </div>
      <Course courseList={courseList} />
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={0} />
    </div>
  );
}
