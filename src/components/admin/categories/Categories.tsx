import React from "react";
import {Link} from "react-router-dom";
import {Button, Icon} from "antd";
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
    title: 'Центер',
    dataIndex: 'center_id',
    render: (text, record) => <Link to={`/centers/center/${text}`}>{record.center}</Link>,
    sorter: true,
}, {
    title: 'Дисциплина',
    dataIndex: 'discipline_id',
    render: (text, record) => <Link to={`/disciplines/discipline/${text}`}>{record.discipline}</Link>,
    sorter: true,
}, {
    title: <Icon type="bars"/>,
    render: (text, record) => <Link to={`centers/center/${record.id}`}>
        <Button type="primary" shape="circle" icon="edit" htmlType="button"/>
    </Link>,
}];

export const Categories: React.FC = (props: any) => {
    return <div>
        <Link to="/categories/create"><Button type="primary" htmlType="button">Добавить категорию</Button></Link>
        <TableComponent columns={columns} apiAccess={props.apiAccess} url="categories"/>
    </div>;
};
