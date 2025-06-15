import { Layout, Button } from "antd";
import { Route, Routes } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Blog from "../components/Blog";
import DashBoard from "../components/DashBoard";
import ThemeMood from "../components/ThemeMood";
import Tasks from "../components/Task";

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider collapsed={collapsed}>
        <Sidebar />
      </Sider>

      {/* Header + Main Content */}
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          <Button
            type="text"
            onClick={toggleSidebar}
            style={{ fontSize: "18px" }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <div style={{ fontWeight: 600 }}>My Dashboard</div>
          <div><ThemeMood/></div>
        </Header>

        {/* Content */}
        <Content style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
