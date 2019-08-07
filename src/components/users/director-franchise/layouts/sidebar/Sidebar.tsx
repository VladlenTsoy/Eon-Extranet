import React from 'react';
import './Sidebar.less';
import {Icon, Menu} from "antd";
import LogoEon from "../../../../../assets/images/logo.svg";
import {Link} from "react-router-dom";

const Item = Menu.Item;

export const Sidebar = () => {
    return [
        <div className="wrapper-logo" key="logo">
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
        <Item key="profile">
            <Link to="/profile">
                <Icon type="user"/>
                <span>Мой профиль</span>
            </Link>
        </Item>,
        <Item key="franchise">
            <Link to="/franchise">
                <Icon type="book"/>
                <span>Франшиза</span>
            </Link>
        </Item>,
        <Item key="centers">
            <Link to="/centers">
                <Icon type="bank"/>
                <span>Учебные центры</span>
            </Link>
        </Item>,
        <Item key="setting">
            <Link to="/setting">
                <Icon type="setting"/>
                <span>Настройки</span>
            </Link>
        </Item>
    ]
};