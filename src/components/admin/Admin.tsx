import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Layout} from 'antd';
import {Navbar} from './layouts/navbar/Navbar';
import {Sidebar} from './layouts/sidebar/Sidebar';
import {Centers} from './centers/Centers';
import {Cities} from  './cities/Cities';
import {Disciplines} from  './disciplines/Disciplines';
import {Categories} from  './categories/Categories';
import {CreateCategory} from "./categories/create/Create";
import DigitalPicture from "./tasks/digital-picture/Digital.Picture";
import {CreateDigitalPicture} from "./tasks/digital-picture/create/Create";

const {Content} = Layout;

export const Admin = () => {
    let [stateSidebar, setStateSidebar] = useState(false);
    return <Router>
        <Layout>
            <Sidebar stateSidebar={stateSidebar} setStateSidebar={setStateSidebar}/>
            <Navbar stateSidebar={stateSidebar} setStateSidebar={setStateSidebar}/>
            <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,}}>
                <Switch>
                    <Route exact path="/centers" component={Centers}/>
                    <Route exact path="/cities" component={Cities}/>
                    <Route exact path="/disciplines" component={Disciplines}/>
                    <Route exact path="/categories" component={Categories}/>
                    <Route path="/categories/create" component={CreateCategory}/>
                    {/*<Route path="/categories/category/:id" component={CreateCategoryContainer}/>*/}
                    <Route exact path="/tasks/digital-picture" component={DigitalPicture}/>
                    <Route path="/tasks/digital-picture/create" component={CreateDigitalPicture}/>
                    {/*<Route path="/tasks/digital-picture/:id" component={CreateDigitalPictureContainer}/>*/}
                    {/*<Route component={Login}/>*/}
                </Switch>
            </Content>
        </Layout>
    </Router>
};
