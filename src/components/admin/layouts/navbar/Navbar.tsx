import React from 'react';
import './Navbar.less';
import {Menu, Icon, Modal} from "antd";
import {useStore} from "../../../../store/useStore";
import {DELETE_CURRENT_USER_DATA} from "../../../../store/user/reducer";
import {Link} from "react-router-dom";

const Item = Menu.Item;
const confirm = Modal.confirm;

export const Navbar = ({stateSidebar, setStateSidebar}: any) => {
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
            <Item>
                <Link to="/applications">
                    <Icon type="notification"/> Заявки
                </Link>
            </Item>
            <Item onClick={logout}>
                <Icon type="poweroff"/> Выход
            </Item>
        </Menu>
    );
};
