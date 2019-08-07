import React from "react";
import './Sidebar.less';
import LogoEon from "../../../../../assets/images/logo.svg";
import {Link} from "react-router-dom";
import {Menu, Icon} from 'antd';


const Item = Menu.Item;
const SubMenu = Menu.SubMenu;

export const Sidebar = () => {
    return [
        <div className="wrapper-logo">
            <div className="logo">
                <img src={LogoEon} className="top-logo" alt="Eon"/>
            </div>
        </div>,
        <Item key="home">
            <Link to="/">
                <Icon type="home"/>
                <span>Главная</span>
            </Link>
        </Item>,
        <Item key="franchises">
            <Link to="/franchises">
                <Icon type="book"/>
                <span>Франшизы</span>
            </Link>
        </Item>,
        <Item key="users">
            <Link to="/users">
                <Icon type="user"/>
                <span>Пользователи</span>
            </Link>
        </Item>,
        <Item key="applications">
            <Link to="/applications">
                <Icon type="notification"/>
                <span>Пробный урок</span>
            </Link>
        </Item>,
        <Item disabled>
            <Link to="/applications">
                <Icon type="shop"/>
                <span>Магазин</span>
            </Link>
        </Item>,
        <SubMenu title={<span><Icon type="setting"/><span>Настройки</span></span>}>
            <Item key="cities">
                <Link to="/cities">
                    <Icon type="pushpin"/>
                    <span>Города</span>
                </Link>
            </Item>
            <Item key="prices">
                <Link to="/prices">
                    <Icon type="credit-card"/>
                    <span>Цены</span>
                </Link>
            </Item>
            <Item key="disciplines">
                <Link to="/disciplines">
                    <Icon type="database"/>
                    <span>Дисциплины</span>
                </Link>
            </Item>
            <Item key="categories">
                <Link to="/categories">
                    <Icon type="database"/>
                    <span>Категории</span>
                </Link>
            </Item>
        </SubMenu>,
        <SubMenu title={<span><Icon type="robot"/><span>Упражнения</span></span>}>
            <Item>
                <Link to="/tasks/digital-picture">
                    <Icon type="database"/>
                    <span>Цифра-Картинка</span>
                </Link>
            </Item>
            <Item>
                <Link to="/tasks/countries">
                    <Icon type="database"/>
                    <span>Страны</span>
                </Link>
            </Item>
            <Item>
                <Link to="/tasks/personalities">
                    <Icon type="database"/>
                    <span>Личности</span>
                </Link>
            </Item>
            <Item>
                <Link to="/tasks/words">
                    <Icon type="database"/>
                    <span>Слова</span>
                </Link>
            </Item>
            <Item>
                <Link to="/tasks/word-numbers">
                    <Icon type="database"/>
                    <span>Главная система</span>
                </Link>
            </Item>
        </SubMenu>
    ]
};
