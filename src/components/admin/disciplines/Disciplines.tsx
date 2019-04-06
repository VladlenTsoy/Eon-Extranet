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
    render: (text: any, record: { id: any; }) => <Link to={`centers/center/${record.id}`}>
        <Button type="primary" shape="circle" icon="edit" htmlType="button"/>
    </Link>,
}];

export const Disciplines = () => {
    return <div>
        <Link to="disciplines/create"><Button type="primary" htmlType="button">Добавить дисциплину</Button></Link>
        <TableComponent columns={columns} url="disciplines"/>
    </div>;
};
