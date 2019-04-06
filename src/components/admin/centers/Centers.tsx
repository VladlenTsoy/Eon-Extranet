import React from 'react';
import {Button, Icon} from 'antd';
import {Link} from "react-router-dom";
import {TableComponent} from "../layouts/table/Table";

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
    title: 'Лого',
    dataIndex: 'image',
    render: (text: string | undefined, record: { title: string | undefined; }) => text ?
        <img src={text} alt={record.title} width="40px"/> : 'Пусто',
    sorter: true,
}, {
    title: 'Город',
    dataIndex: 'city_id',
    render: (text: any, record: { city: any; }) => record.city,
    sorter: true,
}, {
    title: 'Фрашиза',
    key: 'franchise_id',
    dataIndex: 'franchise_id',
    render: (text: any, record: { franchise: any; }) => record.franchise,
    sorter: true,
}, {
    title: 'Директор',
    dataIndex: 'director_id',
    render: (text: any, record: { director: any; }) => record.director,
    sorter: true,
}, {
    title: 'Создан',
    dataIndex: 'created_at',
    render: (text: any) => `${text || 'Неизвестно'}`,
    sorter: true,
}, {
    title: <Icon type="bars"/>,
    render: (text: any, record: { id: any; }) => <Link to={`centers/center/${record.id}`}>
        <Button type="primary" shape="circle" icon="edit" htmlType="button"/>
    </Link>,
}];

export const Centers = (props: any) => {
    return <div>
        <Link to="centers/create"><Button type="primary" htmlType="button">Создать центр</Button></Link>
        <TableComponent columns={columns} url="centers"/>
    </div>;
};
