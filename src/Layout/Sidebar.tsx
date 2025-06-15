// src/components/Sidebar.tsx
import React from 'react';
import { Layout, Menu } from 'antd';
import {
  SettingOutlined,
  HomeFilled,
  PlusOutlined,
  BarsOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Logo = styled.div`
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 5px;
`

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    
    <Layout >
      <Logo>Task Manager</Logo>
      <Menu
      theme="light"
      style={{minHeight: "120vh"}}
      mode="inline"
      onClick={({ key }) => navigate(key)}
      items={[
        {
          label: 'Dashboard',
          key: '/',
          icon: <HomeFilled />,
        },
        {
          label: 'Tasks',
          key: '/tasks',
          icon: <BarsOutlined />,
        },
        {
          label: 'Create Task',
          key: '/blog',
          icon: <PlusOutlined/>,
        },
         {
          label: 'Settings',
          key: '/blog',
          icon: <SettingOutlined />,
        },
      ]}
    />
    </Layout>
  );
};

export default Sidebar;
