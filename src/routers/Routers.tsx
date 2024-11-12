import AuthRouter from "./AuthRouter";
import MainRouter from "./MainRouter";
import { addAuth, authSeletor, AuthState } from "../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { localDataNames } from "../constants/addInfos";
import { Spin } from "antd";

const Routers = () => {
  //check login
  const [isLoading, setIsLoading] = useState(false);
  const auth: AuthState = useSelector(authSeletor);
  const dispatch = useDispatch();
  // vấn đề reload trang
  // lấy dữ liệu xác thực từ localStorage và lưu trữ nó trong Redux store khi component được mount
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = localStorage.getItem(localDataNames.authData);
    res && dispatch(addAuth(JSON.parse(res)));
  };
  return isLoading ? <Spin /> : !auth.token ? <AuthRouter /> : <MainRouter />;
};

export default Routers;
