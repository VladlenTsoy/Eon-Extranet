import React, {useState} from 'react';
import './Layout.less';
import {Layout} from "antd";
import {SidebarLayout} from "./sidebar/Sidebar";
import {BrowserRouter as Router, Switch} from "react-router-dom";
import NavbarLayout from "./navbar/Navbar";
// import {BreadcrumbBlock} from "./breadcrumb/Breadcrumb";

const {Content} = Layout;

const LayoutMainView = ({children, sidebar, navbar}: any) => {
    let [stateSidebar, setStateSidebar] = useState(true);

    return <Router>
        <Layout className="layout">
            <SidebarLayout stateSidebar={stateSidebar} setStateSidebar={setStateSidebar}>
                {sidebar}
            </SidebarLayout>
            <Content>
                <NavbarLayout stateSidebar={stateSidebar} setStateSidebar={setStateSidebar}>
                    {navbar}
                </NavbarLayout>
                <div className="admin-content">
                    {/*<BreadcrumbBlock/>*/}
                    <Switch>
                        {children}
                    </Switch>
                </div>
            </Content>
        </Layout>
    </Router>
};

export default LayoutMainView;