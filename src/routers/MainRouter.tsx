import { Affix, Button, Layout } from "antd";
import React from "react";
import HomeScrenns from "../screens/HomeScrenns";
import SiderComponent from "../components/SiderComponent";
import HeaderComponent from "../components/HeaderComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ManageStore,
  Orders,
  ReportScreen,
  Suppliers,
  Inventories,
} from "../screens";

const { Content, Footer, Header, Sider } = Layout;
const MainRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <SiderComponent />
        <Layout>
          <HeaderComponent />
          <Content className="pt-3 container-fluid">
            <Routes>
              <Route path="/" element={<HomeScrenns />} />
              <Route path="/inventory" element={<Inventories />} />
              <Route path="/report" element={<ReportScreen />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/manage-store" element={<ManageStore />} />
            </Routes>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default MainRouter;
