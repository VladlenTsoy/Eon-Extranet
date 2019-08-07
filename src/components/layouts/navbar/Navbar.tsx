import React from 'react';
import './Navbar.less';
import {Icon, Menu, Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {apiDeleteAccessToken} from "../../../store/api/actions";
import {deleteCurrentUserData} from "../../../store/user/actions";

const Item = Menu.Item;
const confirm = Modal.confirm;

const NavbarLayout = ({children, user, logout, toggleSidebar}: any) => {
    // Выход
    const logoutItem = () => {
        confirm({
            title: 'Вы действительно хотите выйти?',
            onOk: logout,
        });
    };

    return (
        <Menu mode="horizontal" className="navbar">
            <Item className="button-menu" onClick={toggleSidebar}>
                <Icon type="bars"/>
            </Item>
            <Item className="mr-auto">
                {user.last_name} {user.first_name}
            </Item>
            {children}
            <Item onClick={logoutItem}>
                <Icon type="poweroff"/> Выход
            </Item>
        </Menu>
    );
};

const NavbarLayoutState: React.FC<any> = ({children, stateSidebar, setStateSidebar}) => {
    const {user, api} = useSelector((state: any) => (state));
    const dispatch = useDispatch();

    const toggleSidebar = () =>
        setStateSidebar(!stateSidebar);

    const logout = async () => {
        await api.user_general.delete('/logout');
        dispatch(apiDeleteAccessToken());
        dispatch(deleteCurrentUserData());
    };

    return <NavbarLayout logout={logout} user={user} toggleSidebar={toggleSidebar}>{children}</NavbarLayout>;
};

export default NavbarLayoutState;