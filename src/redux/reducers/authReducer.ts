/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { localDataNames } from '../../constants/addInfos';


//định nghĩa kiểu cho trạng thái xác thực, giúp TypeScript hiểu rõ cấu trúc của dữ liệu.
export interface AuthState {
  token: string;
  _id: string;
  name: string;
  rule: number;
}
//Trạng thái ban đầu cho người dùng chưa xác thực.
const initialState = {
  token: '',
  _id: '',
  name: '',
  rule: 0,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: initialState,
  },
  reducers: {
    addAuth: (state, action) => {
      state.data = action.payload;
      // syncLocal(action.payload)
      syncLocal(action.payload);
    }, //Cập nhật trạng thái xác thực với dữ liệu người dùng và đồng bộ hóa với localStorage.
    removeAuth: (state, _action) => {
      state.data = initialState  // Đặt lại dữ liệu xác thực về trạng thái ban đầu
      syncLocal({}) // Đồng bộ hóa với localStorage, xóa thông tin người dùng
    },
    refreshtoken: (state, action) => {
      state.data.token = action.payload;
    },
  },
}); // xử lí vấn đề tải lại trang
//**Xuất reducer và actions**
export const authReducer = authSlice.reducer;
export const { addAuth, removeAuth, refreshtoken } = authSlice.actions;
// Selector này sẽ lấy dữ liệu xác thực từ state Redux. 
// (Lưu ý: `state.authReducer` cần thống nhất với tên reducer được cấu hình trong store).
export const authSeletor = (state: any) => state.authReducer.data;

const syncLocal = (data: any) => {
  localStorage.setItem(localDataNames.authData, JSON.stringify(data));
};