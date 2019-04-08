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
import {EditorDigitalPictureForm} from "./tasks/digital-picture/editor/Editor";
import {Users} from "./users/Users";
import {Pupil} from "./users/Pupil/Pupil";
import {Countries} from "./tasks/countires/Countries";
import {EditorCountryForm} from "./tasks/countires/editor/Editor";
import {Personalities} from "./tasks/personalities/Personalities";
import {EditorPersonalityForm} from "./tasks/personalities/editor/Editor";
import {Words} from "./tasks/words/Words";
import {EditorWordForm} from "./tasks/words/editor/Editor";
import {WordNumbers} from "./tasks/word-numbers/WordNumbers";
import {EditorWordNumberForm} from "./tasks/word-numbers/editor/Editor";
import {Applications} from "./applications/Applications";
import {EditorApplicationForm} from "./applications/editor/Editor";

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
                    <Route exact path="/applications" component={Applications}/>
                    <Route path="/application/create" component={EditorApplicationForm}/>
                    <Route path="/application/:id" component={EditorApplicationForm}/>
                    //
                    <Route exact path="/tasks/digital-picture" component={DigitalPicture}/>
                    <Route path="/tasks/digital-picture/create" component={EditorDigitalPictureForm}/>
                    <Route path="/tasks/digital-picture/:id" component={EditorDigitalPictureForm}/>
                    //
                    <Route exact path="/tasks/countries" component={Countries}/>
                    <Route path="/tasks/country/create" component={EditorCountryForm}/>
                    <Route path="/tasks/country/:id" component={EditorCountryForm}/>
                    //
                    <Route exact path="/tasks/personalities" component={Personalities}/>
                    <Route path="/tasks/personality/create" component={EditorPersonalityForm}/>
                    <Route path="/tasks/personality/:id" component={EditorPersonalityForm}/>
                    //
                    <Route exact path="/tasks/words" component={Words}/>
                    <Route path="/tasks/word/create" component={EditorWordForm}/>
                    <Route path="/tasks/word/:id" component={EditorWordForm}/>
                    //
                    <Route exact path="/tasks/word-numbers" component={WordNumbers}/>
                    <Route path="/tasks/word-number/create" component={EditorWordNumberForm}/>
                    <Route path="/tasks/word-number/:id" component={EditorWordNumberForm}/>
                    {/*<Route component={Login}/>*/}
                </Switch>
            </Content>
        </Layout>
    </Router>
};
