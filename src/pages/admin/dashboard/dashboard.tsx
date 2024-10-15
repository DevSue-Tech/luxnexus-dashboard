import React, { useContext, useState } from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartFilled,
  ProductOutlined,
  TableOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, MenuProps, theme } from "antd";
import { AdminDashboardProps } from "../../../utils/context/admin-state-context/types/AdminTypes";
import { AdminDashboardContext } from "../../../utils/context/admin-state-context/AdminContext";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const AdminDashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedKey, setSelectedKey] = useState("1");
  const { user } = useContext(AdminDashboardContext) as AdminDashboardProps;

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setSelectedKey(e.key);
  };

  const navigate = useNavigate();

  return (
    <Layout className=" w-screen h-screen font-main">
      <Sider
        style={{ background: "#434343", color: "#F8B466" }}
        className=" py-10"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical" />

        <Menu
          className="hover:text-main font-bold"
          style={{ background: "none", color: "#fff" }}
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          items={[
            {
              key: "1",
              icon: <PieChartFilled />,
              label: "Dashboard",
              style: {
                fontSize: "15px",
                color: selectedKey === "1" ? "#434343" : "#fff",
              },
              onClick: () => navigate("/admin-dashboard"),
            },
            {
              key: "2",
              icon: <ProductOutlined />,
              label: "Products",
              style: {
                fontSize: "15px",
                color: selectedKey === "2" ? "#434343" : "#fff",
              },
              onClick: () => navigate("/admin-dashboard/product"),
            },
            {
              key: "3",
              icon: <UserOutlined />,
              label: "Users",
              style: {
                fontSize: "15px",
                color: selectedKey === "3" ? "#434343" : "#fff",
              },
            },
            {
              key: "4",
              icon: <TableOutlined />,
              label: "Inventory",
              style: {
                fontSize: "15px",
                color: selectedKey === "4" ? "#434343" : "#fff",
              },
            },
            {
              key: "5",
              icon: <LogoutOutlined />,
              label: "Logout",
              style: {
                fontSize: "15px",
                color: selectedKey === "4" ? "blue" : "#fff",
                position: "absolute",
                bottom: "15px",
              },
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className=" flex pl-0" style={{ background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <h1 className=" font-bold font-main text-main">
            LuxNexus Admin Control
          </h1>

          <h5 className=" ml-auto text-main font-bold">
            Welcome{" "}
            {user && typeof user.displayName === "string"
              ? user.displayName
              : "Guest"}
          </h5>
        </Header>
        <Content
          className=" overflow-scroll"
          style={{
            fontSize: "20px",
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
