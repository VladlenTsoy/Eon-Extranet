import React from 'react';
import {Button, Card, Icon, Typography} from 'antd';
import {Link} from "react-router-dom";
import {TableComponent} from "../../../layouts/table/Table";

const {Title} = Typography;

const columns = [{
    title: 'ID',
    dataIndex: 'id',
    defaultSortOrder: 'descend',
    sorter: true,
}, {
    title: 'Название',
    dataIndex: 'title',
    sorter: true,
}, {
    title: 'Категория',
    dataIndex: 'category_id',
    sorter: true,
    render: (text: any, record: any) => `${record.category || 'Неизвестно'}`,
},{
    title: 'Дисциплина',
    dataIndex: 'method_id',
    sorter: true,
    render: (text: any, record: any) => `${record.method || 'Неизвестно'}`,
},{
    title: 'Учитель',
    dataIndex: 'teacher_id',
    sorter: true,
    render: (text: any, record: any) => `${record.teacher || 'Неизвестно'}`,
}, {
    title: 'Создан',
    dataIndex: 'created_at',
    render: (text: any) => `${text || 'Неизвестно'}`,
    sorter: true,
}, {
    title: <Icon type="bars"/>,
    render: (text: any, record: any) => <Link to={`/group/${record.id}`}>
        <Button type="primary" shape="circle" icon="edit" htmlType="button"/>
    </Link>,
}];

export const Groups = () => {
    return <Card className="_card">
        <div className="_card-title">
            <Title level={3} className="title">Группы</Title>
            <Link className="link" to="/group/create">
                <Button icon="plus" htmlType="button" type="primary">Создать</Button>
            </Link>
        </div>
        <TableComponent columns={columns} url="groups"/>
    </Card>;
};
