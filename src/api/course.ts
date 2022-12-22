import request from "../utils/request";

//课程列表
export interface CourseConditionType {
  classv1: string; //主类别
  classv2?: string; //子类别
}
export const courseGet = (
  condition: CourseConditionType = { classv1: "6399e3fe60195e6845db0560" },
  page: number = 1
) => {
  // console.log(condition);
  let search = JSON.stringify(condition);
  let skip = (page - 1) * 8;
  return request.get(
    `/classes/ReactArticle?where=${search}&limit=8&skip=${skip}`
  );
};

//课程分类

export const classifyGet = () => {
  return request.get("/classes/ReactClassify");
};
