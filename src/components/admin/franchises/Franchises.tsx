import React from "react";
import {Link} from "react-router-dom";
import {Button, Card, Icon, Typography, Menu, Dropdown} from "antd";
import {TableComponent} from "../layouts/table/Table";
import defaultImage from '../../../assets/images/default-thumbnail.jpg';

const {Title} = Typography;

const menu = (text: any, record: any) => (<Menu>
    <Menu.Item>
        <Link to={`franchise/${record.id}`}><Icon type="edit"/> Изменить</Link>
    </Menu.Item>
    {/*<Menu.Item>*/}
    {/*    <Link to={`franchise/${record.id}`}><Icon type="more"/> Подробнее</Link>*/}
    {/*</Menu.Item>*/}
</Menu>);

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
        render: (text: any) => <img src={text} onError={(e: any) => e.target.src = defaultImage}
                                    alt="Нет" width="40px"/>
    }, {
        title: 'Директор',
        dataIndex: 'director_id',
        sorter: true,
        render: (text: any, record: any) => record.director || 'Нет'
    }, {
        render: (text: any, record: any) => <Dropdown overlay={menu(text, record)}>
            <Button type="primary" shape="circle" icon="more"/>
        </Dropdown>,
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
