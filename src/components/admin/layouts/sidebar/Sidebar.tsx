import React from "react";
import './Sidebar.less';
import LogoEon from "../../../../assets/images/logo.svg";
import {Link} from "react-router-dom";
import {Menu, Icon, Layout} from 'antd';

const {Sider} = Layout;

const Item = Menu.Item;
const SubMenu = Menu.SubMenu;

export const Sidebar = ({stateSidebar, setStateSidebar}: any) => {
    return <Sider
        theme="light"
        className="sidebar"
        onCollapse={() => setStateSidebar(!stateSidebar)}
        collapsed={stateSidebar}>
        <Menu mode="inline">
            <div className="wrapper-logo">
                <div className="logo">
                    <img src={LogoEon} className="top-logo" alt="Eon"/>
                </div>
            </div>
            <Item>
                <Link to="/">
                    <Icon type="home"/>
                    <span>Главная</span>
                </Link>
            </Item>
            <Item>
                <Link to="/franchises">
                    <Icon type="book"/>
                    <span>Франшизы</span>
                </Link>
            </Item>
            <Item>
                <Link to="/centers">
                    <Icon type="bank"/>
                    <span>Центры</span>
                </Link>
            </Item>
            <Item>
                <Link to="/groups">
                    <Icon type="team"/>
                    <span>Группы</span>
                </Link>
            </Item>
            <Item>
                <Link to="/users">
                    <Icon type="user"/>
                    <span>Пользователи</span>
                </Link>
            </Item>
            <Item>
                <Link to="/applications">
                    <Icon type="notification"/>
                    <span>Пробный урок</span>
                </Link>
            </Item>
            <Item disabled>
                <Link to="/applications">
                    <Icon type="shop"/>
                    <span>Магазин</span>
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
                    <Link to="/prices">
                        <Icon type="credit-card"/>
                        <span>Цены</span>
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
        </Menu>
    </Sider>
};
