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
    title: <Icon type="bars"/>,
    render: (text, record) => <Link to={`centers/center/${record.id}`}>
        <Button type="primary" shape="circle" icon="edit" htmlType="button"/>
    </Link>,
}];

export const Cities: React.FC = (props: any) => {
    return <div>
        <Link to="сities/create"><Button type="primary" htmlType="button">Добавить город</Button></Link>
        <TableComponent columns={columns} apiAccess={props.apiAccess} url="cities"/>
    </div>;
};
