import axiosClient from "./axiosClient";

// const handleAPI = async (
//   //ex- Hàm sử dụng `axiosClient` để thực hiện yêu cầu, truyền vào `url` và một đối tượng cấu hình.
//   //ex- Nếu không có phương thức được chỉ định, nó sẽ mặc định sử dụng 'get'.
//   //ex- Hàm trả về kết quả của yêu cầu API.
//   url: string, //Đường dẫn API mà bạn muốn gọi
//   data?: any, //Dữ liệu sẽ được gửi theo yêu cầu (nếu có)
//   method?: 'post' | 'put' | 'get' | 'delete' //Phương thức HTTP
// ) => {
//   try {
//     const response = await axiosClient(url, {
//       method: method ?? 'get',
//       data,
//     });
//     return response; // Hoặc xử lý dữ liệu theo cách bạn muốn
//   } catch (error) {
//     // Xử lý lỗi ở đây, ví dụ: log lỗi, thông báo cho người dùng
//     console.error('API Error:', error);
//     throw error; // Ném lại lỗi để xử lý bên ngoài
//   }
// };


const handleAPI = async (
  url: string,
  data?: any,
  method?: 'post' | 'put' | 'get' | 'delete'
) => {
  return await axiosClient(url, {
    method: method ?? 'get',
    data,
  });
};

export default handleAPI;

