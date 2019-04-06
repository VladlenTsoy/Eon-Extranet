import React from "react";
import './Sidebar.less';
import LogoEon from "../../../../assets/images/logo.svg";
import {Link} from "react-router-dom";
import {Menu, Icon, Drawer} from 'antd';

const Item = Menu.Item;
const SubMenu = Menu.SubMenu;

export const Sidebar = ({stateSidebar, setStateSidebar}: any) => {
    return <Drawer
        className="sidebar"
        title={<img src={LogoEon} className="top-logo" alt="Eon"/>}
        placement="left"
        onClose={() => setStateSidebar(false)}
        visible={stateSidebar}>
        <Menu theme="light" mode="inline">
            <Item>
                <Link to="/">
                    <Icon type="home"/>
                    <span>Главная</span>
                </Link>
            </Item>
            <Item>
                <Link to="/centers">
                    <Icon type="bank"/>
                    <span>Центры</span>
                </Link>
            </Item>
            <Item>
                <Link to="/users">
                    <Icon type="team"/>
                    <span>Пользователи</span>
                </Link>
            </Item>
            <SubMenu title={<span><Icon type="setting"/><span>Настройки</span></span>}>
                <Item>
                    <Link to="/cities">
                        <Icon type="pushpin"/>
                        <span>Города</span>
                    </Link>
                </Item>
                <Item>
                    <Link to="/disciplines">
                        <Icon type="database"/>
                        <span>Дисциплины</span>
                    </Link>
                </Item>
                <Item>
                    <Link to="/categories">
                        <Icon type="database"/>
                        <span>Категории</span>
                    </Link>
                </Item>
            </SubMenu>

            <SubMenu title={<span><Icon type="robot"/><span>Упражнения</span></span>}>
                <Item>
                    <Link to="/tasks/digital-picture">
                        <Icon type="database" />
                        <span>Цифра-Картинка</span>
                    </Link>
                </Item>
            </SubMenu>
        </Menu>
    </Drawer>
};
