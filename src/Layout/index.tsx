import { Layout, Button, Space, Avatar, Badge } from "antd";
import { Route, Routes } from "react-router-dom";
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  BellOutlined,
  SearchOutlined,
  UserOutlined
} from "@ant-design/icons";
import { useState } from "react";
import Sidebar from "./Sidebar";
import DashBoard from "../components/DashBoard";
import ThemeMood from "../components/ThemeMood";
import Tasks from "../components/Task";
import styled from "styled-components";
import TaskView from "../components/atmos/TaskView";
import Calander from "../components/Calendar";

const { Header, Sider, Content } = Layout;

const StyledHeader = styled(Header)`
  background: #fff;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  height: 64px;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 24px;
  padding: 6px 16px;
  margin-right: 16px;
  width: 240px;
  
  .anticon {
    color: #8c8c8c;
    margin-right: 8px;
  }
  
  input {
    background: transparent;
    border: none;
    outline: none;
    color: #333;
    width: 100%;
    
    &::placeholder {
      color: #999;
    }
  }
`;

const IconButton = styled(Button)`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .anticon {
    font-size: 16px;
  }
`;

const PageTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  margin-left: 16px;
`;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider collapsed={collapsed} width={250}>
        <Sidebar />
      </Sider>

      {/* Header + Main Content */}
      <Layout>
        <StyledHeader>
          <HeaderLeft>
            <Button
              type="text"
              onClick={toggleSidebar}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
            <PageTitle>My Dashboard</PageTitle>
          </HeaderLeft>
          
          <HeaderRight>
            <SearchBox>
              <SearchOutlined />
              <input placeholder="Search..." />
            </SearchBox>
            
            <Space size={16}>
              <Badge count={4} size="small">
                <IconButton type="text" icon={<BellOutlined />} />
              </Badge>
              
              <ThemeMood />
              
              <Avatar icon={<UserOutlined />} />
            </Space>
          </HeaderRight>
        </StyledHeader>

        {/* Content */}
        <Content >
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/calander" element={<Calander/>}/>
            <Route path='/tasks/view/:id' element={<TaskView/>}/>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;