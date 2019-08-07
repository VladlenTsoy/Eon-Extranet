import React from 'react';
import './Navbar.less';
import {Link} from "react-router-dom";
import {Icon, Menu} from "antd";

const Item = Menu.Item;

export const Navbar = () => {
    return [
        <Item key="applications">
            <Link to="/applications">
                <Icon type="notification"/> Заявки
            </Link>
        </Item>
    ];
};