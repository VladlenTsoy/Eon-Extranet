import React from 'react';
import {Menu, Icon, Modal} from "antd";
import {useStore} from "../../../../store/useStore";
import {DELETE_CURRENT_USER_DATA} from "../../../../store/user/reducer";

const Item = Menu.Item;
const confirm = Modal.confirm;

export const Navbar = ({stateSidebar, setStateSidebar}: any) => {
    // @ts-ignore
    const {state, dispatch} = useStore();

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
            <Item className="button-menu" onClick={() => setStateSidebar(true)}>
                <Icon type="bars"/>
            </Item>
            <Item className="" onClick={logout}>
                <Icon type="poweroff"/> Выход
            </Item>
        </Menu>
    );
};