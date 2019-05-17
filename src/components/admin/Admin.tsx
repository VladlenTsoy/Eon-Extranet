import React, {useState} from 'react';
import './Admin.less';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Layout} from 'antd';
import {Navbar} from './layouts/navbar/Navbar';
import {Sidebar} from './layouts/sidebar/Sidebar';
import {Home} from "./home/Home";
import {Centers} from './centers/Centers';
import {Cities} from './settings/cities/Cities';
import {Disciplines} from './settings/disciplines/Disciplines';
import {Categories} from './settings/categories/Categories';
import {DigitalPicture} from "./tasks/digital-picture/Digital.Picture";
import {EditorDigitalPictureForm} from "./tasks/digital-picture/editor/Editor";
import {Users} from "./users/Users";
import {PupilForm} from "./users/pupil/Pupil";
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
import {EditorCityForm} from "./settings/cities/editor/Editor";
import {EditorCategoryForm} from "./settings/categories/editor/Editor";
import {Franchises} from "./franchises/Franchises";
import {EditorFranchiseForm} from "./franchises/editor/Editor";
import {EditorCenterForm} from "./centers/editor/Editor";
import {Groups} from "./groups/Groups";
import {Prices} from "./settings/prices/Prices";
import {EditorPriceForm} from "./settings/prices/editor/Editor";

const {Content} = Layout;

export const Admin = () => {
    let [stateSidebar, setStateSidebar] = useState(false);
    return <Router>
        <Layout className="layout">
            <Sidebar stateSidebar={stateSidebar} setStateSidebar={setStateSidebar}/>
            <Navbar stateSidebar={stateSidebar} setStateSidebar={setStateSidebar}/>
            <Content className="admin-content">
                <Switch>
                    <Route exact path="/" component={Home}/>
                    // Центры
                    <Route exact path="/centers" component={Centers}/>
                    <Route exact path="/center/create" component={EditorCenterForm}/>
                    <Route exact path="/center/:id" component={EditorCenterForm}/>
                    // Франшизы
                    <Route exact path="/franchises" component={Franchises}/>
                    <Route exact path="/franchise/create" component={EditorFranchiseForm}/>
                    <Route exact path="/franchise/:id/edit" component={EditorFranchiseForm}/>
                    <Route exact path="/franchise/:id/more" component={EditorFranchiseForm}/>
                    // Города
                    <Route exact path="/cities" component={Cities}/>
                    <Route exact path="/city/create" component={EditorCityForm}/>
                    <Route exact path="/city/:id" component={EditorCityForm}/>
                    // Дисциплины
                    <Route exact path="/disciplines" component={Disciplines}/>
                    // Группы
                    <Route exact path="/groups" component={Groups}/>
                    // Пользователи
                    <Route exact path="/users" component={Users}/>
                    <Route exact path="/users/user/0/:id/:key" component={PupilForm}/>
                    <Route exact path="/users/user/1/:id:key?" component={PupilForm}/>
                    <Route exact path="/users/user/2/:id:key" component={PupilForm}/>
                    <Route exact path="/users/user/3/:id:key" component={PupilForm}/>
                    <Route exact path="/users/user/4/:id:key" component={PupilForm}/>
                    // Категории
                    <Route exact path="/categories" component={Categories}/>
                    <Route exact path="/category/create" component={EditorCategoryForm}/>
                    <Route exact path="/category/:id" component={EditorCategoryForm}/>
                    // Заявки на пробный урок
                    <Route exact path="/applications" component={Applications}/>
                    <Route path="/application/create" component={EditorApplicationForm}/>
                    <Route path="/application/:id" component={EditorApplicationForm}/>
                    // Цены
                    <Route exact path="/prices" component={Prices}/>
                    <Route path="/price/create" component={EditorPriceForm}/>
                    <Route path="/price/:id" component={EditorPriceForm}/>
                    // Цифра-Картинка
                    <Route exact path="/tasks/digital-picture" component={DigitalPicture}/>
                    <Route path="/tasks/digital-picture/create" component={EditorDigitalPictureForm}/>
                    <Route path="/tasks/digital-picture/:id" component={EditorDigitalPictureForm}/>
                    // Страны
                    <Route exact path="/tasks/countries" component={Countries}/>
                    <Route path="/tasks/country/create" component={EditorCountryForm}/>
                    <Route path="/tasks/country/:id" component={EditorCountryForm}/>
                    // Персоны
                    <Route exact path="/tasks/personalities" component={Personalities}/>
                    <Route path="/tasks/personality/create" component={EditorPersonalityForm}/>
                    <Route path="/tasks/personality/:id" component={EditorPersonalityForm}/>
                    // Слова
                    <Route exact path="/tasks/words" component={Words}/>
                    <Route path="/tasks/word/create" component={EditorWordForm}/>
                    <Route path="/tasks/word/:id" component={EditorWordForm}/>
                    // Главная система
                    <Route exact path="/tasks/word-numbers" component={WordNumbers}/>
                    <Route path="/tasks/word-number/create" component={EditorWordNumberForm}/>
                    <Route path="/tasks/word-number/:id" component={EditorWordNumberForm}/>
                </Switch>
            </Content>
        </Layout>
    </Router>
};
