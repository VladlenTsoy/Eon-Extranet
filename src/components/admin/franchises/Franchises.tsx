import React from "react";
import {Link} from "react-router-dom";
import {Button, Card, Icon, Typography} from "antd";
import {TableComponent} from "../layouts/table/Table";

const {Title} = Typography;

export const Franchises = () => {
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
        dataIndex: 'url_image',
        render: (text: any) => <img src={text} alt="Нет" width="40px"/>
    }, {
        title: 'Директор',
        dataIndex: 'director_id',
        sorter: true,
        render: (text: any, record: any) => record.director || 'Нет'
    }, {
        title: <Icon type="bars"/>,
        render: (text: any, record: { id: any; }) => <div>
            <Link to={`franchise/${record.id}`}>
                <Button type="primary" shape="circle" icon="edit" htmlType="button"/>
            </Link>
        </div>,
    }];

    return <div>
        <Card className="_card">
            <div className="_card-title">
                <Title level={3} className="title">Франшизы</Title>
                <Link className="link" to="/franchise/create">
                    <Button icon="plus" htmlType="button" type="primary">Создать</Button>
                </Link>
            </div>
            <TableComponent columns={columns} url="franchises"/>
        </Card>
    </div>;
};
