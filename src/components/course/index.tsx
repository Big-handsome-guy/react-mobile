import React from "react";
import { Ellipsis, Tag } from "antd-mobile";
import "./index.scss";
import { CourseType } from "../../types/course";
import { Link } from "react-router-dom";

type Props = {
  courseList: Array<CourseType>;
};

export default function ({ courseList }: Props) {
  return (
    <div>
      <div className="course_list">
        {courseList.map((item) => {
          return (
            <div className="course" key={item.objectId}>
              <div className="poster">
                <img src={item.poster} alt="" />
                <Tag className="tag" color="rgba(0,0,0,0.4)">
                  {item.isvip ? "VIP独享课程" : "免费"}
                </Tag>
              </div>
              <Link
                to={`/detail/${item.objectId}`}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <h3>
                  <Ellipsis direction="end" content={item.name} />
                </h3>
                <p>
                  <Ellipsis direction="end" rows={2} content={item.info} />
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
