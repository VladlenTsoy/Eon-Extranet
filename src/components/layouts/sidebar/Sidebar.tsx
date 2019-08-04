import React from "react";
import './Sidebar.less';
import {Layout, Menu} from 'antd';

const {Sider} = Layout;

export const SidebarLayout = ({stateSidebar, setStateSidebar, children}: any) => {
    return <Sider
        theme="light"
        className="sidebar"
        onCollapse={() => setStateSidebar(!stateSidebar)}
        collapsed={stateSidebar}>
        <Menu mode="inline"
              defaultSelectedKeys={['home']}>
            {children}
        </Menu>
    </Sider>
};
