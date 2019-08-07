import React from "react";
import {Link} from "react-router-dom";
import {Button, Card, Icon, Typography} from "antd";
import {TableComponent} from "../../../../layouts/table/Table";

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
    title: 'Язык',
    dataIndex: 'lang_id',
    render: (text: string, record: any) => record.lang,
    sorter: true,
}, {
    title: <Icon type="bars"/>,
    render: (text: string, record: { id: any; }) => <Link to={`city/${record.id}`}>
        <Button type="primary" shape="circle" icon="edit" htmlType="button"/>
    </Link>,
}];

export const Cities = () => {
    return <div>
        <Card className="_card">
            <div className="_card-title">
                <Title level={3} className="title">Города</Title>
                <Link className="link" to="/city/create">
                    <Button icon="plus" htmlType="button" type="primary">Создать</Button>
                </Link>
            </div>
            <TableComponent columns={columns} access={'guest'} url="cities"/>
        </Card>
    </div>;
};
