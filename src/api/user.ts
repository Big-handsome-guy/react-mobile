import request from "../utils/request";

export interface UserParams {
  username: string;
  password: string;
  avatar?: string;
}
export const userLogin = (params: UserParams) => {
  return request.post("/login", params);
};
