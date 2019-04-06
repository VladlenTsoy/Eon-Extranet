import React, {useState} from 'react';
import './Admin.less';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Layout} from 'antd';
import {Navbar} from './layouts/navbar/Navbar';
import {Sidebar} from './layouts/sidebar/Sidebar';
import {Home} from "./home/Home";
import {Centers} from './centers/Centers';
import {Cities} from './cities/Cities';
import {Disciplines} from './disciplines/Disciplines';
import {Categories} from './categories/Categories';
import {CreateCategory} from "./categories/create/Create";
import {DigitalPicture} from "./tasks/digital-picture/Digital.Picture";
import {CreateDigitalPictureForm} from "./tasks/digital-picture/create/Create";
import {Users} from "./users/Users";
import {Pupil} from "./users/Pupil/Pupil";

const {Content} = Layout;

export const Admin = () => {
    let [stateSidebar, setStateSidebar] = useState(false);
    return <Router>
        <Layout>
            <Sidebar stateSidebar={stateSidebar} setStateSidebar={setStateSidebar}/>
            <Navbar stateSidebar={stateSidebar} setStateSidebar={setStateSidebar}/>
            <Content className="admin-content">
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/centers" component={Centers}/>
                    <Route exact path="/cities" component={Cities}/>
                    <Route exact path="/disciplines" component={Disciplines}/>
                    <Route exact path="/users" component={Users}/>
                    <Route exact path="/users/user/0/:id" component={Pupil}/>
                    <Route exact path="/users/user/1/:id" component={Pupil}/>
                    <Route exact path="/users/user/2/:id" component={Pupil}/>
                    <Route exact path="/users/user/3/:id" component={Pupil}/>
                    <Route exact path="/users/user/4/:id" component={Pupil}/>
                    <Route exact path="/categories" component={Categories}/>
                    <Route path="/categories/create" component={CreateCategory}/>
                    {/*<Route path="/categories/category/:id" component={CreateCategoryContainer}/>*/}
                    <Route exact path="/tasks/digital-picture" component={DigitalPicture}/>
                    <Route path="/tasks/digital-picture/create" component={CreateDigitalPictureForm}/>
                    <Route path="/tasks/digital-picture/:id" component={CreateDigitalPictureForm}/>
                    {/*<Route component={Login}/>*/}
                </Switch>
            </Content>
        </Layout>
    </Router>
};
