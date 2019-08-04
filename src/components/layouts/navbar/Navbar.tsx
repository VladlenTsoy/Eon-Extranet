import React from 'react';
import './Navbar.less';
import {useStore} from "../../../store/useStore";
import {DELETE_CURRENT_USER_DATA} from "../../../store/user/reducer";
import {Icon, Menu, Modal} from "antd";

const Item = Menu.Item;
const confirm = Modal.confirm;

export const NavbarLayout = ({children, stateSidebar, setStateSidebar}: any) => {
    const [state, dispatch] = useStore();
    const {user} = state;

    // Выход
    const logout = () => {
        confirm({
            title: 'Вы действительно хотите выйти?',
            // okText: 'Да',
            onOk: () => state.api.user_general.delete('/logout')
                .then(async () => {
                    dispatch({type: DELETE_CURRENT_USER_DATA, payload: {id: null}})
                }),
        });
    };

    return (
        <Menu mode="horizontal" className="navbar">
            <Item className="button-menu" onClick={() => setStateSidebar(!stateSidebar)}>
                <Icon type="bars"/>
            </Item>
            <Item className="mr-auto">
                {user.last_name} {user.first_name}
            </Item>
            {children}
            <Item onClick={logout}>
                <Icon type="poweroff"/> Выход
            </Item>
        </Menu>
    );
};