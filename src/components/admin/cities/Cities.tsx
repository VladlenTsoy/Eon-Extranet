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
    render: (text: string, record: { id: any; }) => <Link to={`centers/center/${record.id}`}>
        <Button type="primary" shape="circle" icon="edit" htmlType="button"/>
    </Link>,
}];

export const Cities = () => {
    return <div>
        <Link to="сities/create"><Button type="primary" htmlType="button">Добавить город</Button></Link>
        <TableComponent columns={columns} url="cities"/>
    </div>;
};
