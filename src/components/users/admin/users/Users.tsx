import React from 'react';
import {Button, Card, Icon} from "antd";
import {TableComponent} from "../../../layouts/table/Table";
import {Link} from "react-router-dom";
import defaultImage from "../../../../assets/images/default-thumbnail.jpg";

const columns = [{
    title: 'ID',
    dataIndex: 'id',
    defaultSortOrder: 'descend',
    sorter: true,
}, {
    title: 'Фото',
    dataIndex: 'image',
    render: (text: any, record: any) => <img src={text} onError={(e: any) => e.target.src = defaultImage} alt={record.first_name} width="30px"/>,
}, {
    title: 'Фамилия',
    dataIndex: 'last_name',
    sorter: true,
}, {
    title: 'Имя',
    dataIndex: 'first_name',
    sorter: true,
}, {
    title: 'Email',
    dataIndex: 'email',
    sorter: true,
}, {
    title: 'Логин',
    dataIndex: 'login',
    sorter: true,
}, {
    title: 'Доступ',
    dataIndex: 'access_id',
    render: (text: number | null) => text === 1 ? 'Ученик' : text === 2 ? 'Учитель' : text === 3 ? 'Директор' : text === 4 ? 'Админ' : 'Неизвестно',
    sorter: true,
    filters: [
        {text: 'Ученик', value: 1},
        {text: 'Учитель', value: 2},
        {text: 'Директор', value: 3},
        {text: 'Админ', value: 4},
        {text: 'Неизвестно', value: 0}
    ],
}, {
    title: 'Создание',
    dataIndex: 'created_at',
    render: (text: any) => text || 'Неизвестно',
    sorter: true,
}, {
    title: 'Вход',
    dataIndex: 'entrance_at',
    render: (text: any) => text || 'Пусто',
    sorter: true,
},{
    title: 'Активность',
    dataIndex: 'last_activity',
    render: (text: any) => text || 'Пусто',
    sorter: true,
}, {
    title: <Icon type="bars"/>,
    render: (text: any, record: any) => <Link to={`users/user/${record.access_id}/${record.id}`}>
        <Button type="primary" shape="circle" icon="more" htmlType="button"/>
    </Link>,
}];

export const Users = () => {
    return <div>
        <Card className="_card">
            <TableComponent columns={columns} url="users"/>
        </Card>
    </div>
};
