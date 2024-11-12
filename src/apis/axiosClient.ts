/* eslint-disable @typescript-eslint/no-unused-expressions */
import axios from "axios";

import queryString from "query-string";
import { localDataNames } from "../constants/addInfos";

const baseURL = `http://192.188.102.65:3001`
const baseURLProduction = `https://server-kanban.onrender.com`;
const getAssetToken = () => {
  const res = localStorage.getItem(localDataNames.authData);

  if (res) {
    const auth = JSON.parse(res);
    return auth && auth.token ? auth.token : '';
  } else {
    return '';
  }
};
const axiosClient = axios.create({
  baseURL,
  paramsSerializer: (params) => queryString.stringify(params)
})
//Thiết lập một interceptor cho Axios để thêm một số tiêu đề (headers) vào tất cả các yêu cầu.
axiosClient.interceptors.request.use(async (config: any) => {
  const accesstoken = getAssetToken();

  // Thêm tiêu đề vào config
  config.headers = {
    // Thay thế bằng token thực tế
    Authorization: accesstoken ? `Bearer ${accesstoken}` : '',
    Accept: 'application/json',
    ...config.headers,
  }
  // Nếu bạn cần thay đổi data trước khi gửi, bạn có thể làm như sau
  return { ...config, data: config.data ?? null };  // Đảm bảo trả về config
});
// cung cấp là một interceptor cho phản hồi (response) trong Axios
// Interceptor cho Phản Hồi
axiosClient.interceptors.response.use(
  //(res)Hàm này được gọi khi phản hồi từ server thành công. 
  (res) => {
    // Trả về dữ liệu nếu thành công
    if (res.data && res.status >= 200 && res.status < 300) {
      return res.data;
    } else {
      // Từ chối Promise nếu không thành công
      return Promise.reject(res.data);
    }
  },
  //(error) Hàm này được gọi khi có lỗi xảy ra. 
  (error) => {
    // Lấy phản hồi từ lỗi
    const { response } = error;
    // Từ chối Promise với dữ liệu lỗi
    return Promise.reject(response.data);
  }
);

export default axiosClient