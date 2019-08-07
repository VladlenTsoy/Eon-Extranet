import React from 'react';
import './Admin.less';
import {Route} from "react-router-dom";
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
import {Prices} from "./settings/prices/Prices";
import {EditorPriceForm} from "./settings/prices/editor/Editor";
import {DirectorForm} from "./users/director/Director";
import Center from "./center/Center";
import Teacher from "./teacher/Teacher";
import LayoutMainView from "../../layouts/Layout";
import {Sidebar} from "./layouts/sidebar/Sidebar";
import {Navbar} from "./layouts/navbar/Navbar";


export const Admin:React.FC = () => {
    return <LayoutMainView sidebar={Sidebar()} navbar={Navbar()}>
        <Route exact path="/" component={Home}/>
        // Франшизы
        <Route exact path="/franchises" component={Franchises}/>
        <Route exact path="/franchises/create" component={EditorFranchiseForm}/>
        <Route exact path="/franchises/:id/edit" component={EditorFranchiseForm}/>
        <Route exact path="/franchises/:id/more" component={EditorFranchiseForm}/>
        // Центры
        <Route exact path="/franchises/:franchiseId/centers" component={Centers}/>
        <Route exact path="/franchises/:franchiseId/centers/create" component={EditorCenterForm}/>
        <Route exact path="/franchises/:franchiseId/centers/:id" component={EditorCenterForm}/>
        // Центр
        <Route exact path="/franchises/:franchiseId/center/:id" component={Center}/>
        //
        <Route exact path="/franchises/:franchiseId/center/:centerId/users/:id" component={Teacher}/>
        // Города
        <Route exact path="/cities" component={Cities}/>
        <Route exact path="/city/create" component={EditorCityForm}/>
        <Route exact path="/city/:id" component={EditorCityForm}/>
        // Дисциплины
        <Route exact path="/disciplines" component={Disciplines}/>
        // Пользователи
        <Route exact path="/users" component={Users}/>
        <Route exact path="/users/user/0/:id/:key" component={PupilForm}/>
        <Route exact path="/users/user/1/:id:key?" component={PupilForm}/>
        <Route exact path="/users/user/2/:id:key" component={PupilForm}/>
        <Route exact path="/users/user/3/:id:key" component={DirectorForm}/>
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
    </LayoutMainView>
};
