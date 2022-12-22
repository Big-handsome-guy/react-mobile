//课程
export interface CourseType {
  objectId: string;
  name: string;
  info: string;
  poster: string;
  isvip: boolean;
  desc: string;
  classv1: string;
  classv2: string;
}

//分类
export interface ClassifyType {
  objectId: string;
  cateName: string;
  dadId: string;
  state: boolean;
  children: Array<ClassifyType>;
}
