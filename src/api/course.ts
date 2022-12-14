import request from "../utils/request";

//课程列表
export const courseGet = () => {
  return request.get("/classes/ReactArticle");
};

//课程分类
export const classifyGet = () => {
  return request.get("/classes/ReactClassify");
};
