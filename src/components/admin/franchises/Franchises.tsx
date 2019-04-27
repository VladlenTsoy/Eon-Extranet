import React from "react";
import {Link} from "react-router-dom";
import {Button, Card, Icon, Typography, Menu, Dropdown} from "antd";
import {TableComponent} from "../layouts/table/Table";
import defaultImage from '../../../assets/images/default-thumbnail.jpg';

const {Title, Text} = Typography;

const menu = (text: any, record: any) => (<Menu>
    <Menu.Item>
        <Link to={`franchise/${record.id}/more`}><Icon type="info-circle"/> Подробнее</Link>
    </Menu.Item>
    <Menu.Item>
        <Link to={`franchise/${record.id}/edit`}><Icon type="edit"/> Изменить</Link>
    </Menu.Item>
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
        render: (text: any) => <img src={text} alt="Нет" width="40px"
                                    onError={(e: any) => e.target.src = defaultImage}/>
    }, {
        title: 'Центров',
        dataIndex: 'number_of_centers',
        render: (centers: any) => <div>
            <Text type="warning">{centers.active}</Text> / <Text type="secondary">{centers.all}</Text>
        </div>,
    }, {
        title: 'Учителей',
        dataIndex: 'number_of_teachers',
        render: (teachers: any) => <div>
            <Text type="warning">{teachers.active}</Text> / <Text type="secondary">{teachers.all}</Text>
        </div>,
    }, {
        title: 'Учеников',
        dataIndex: 'number_of_students',
        render: (students: any) => <div>
            <Text type="warning">{students.active}</Text> / <Text type="secondary">{students.all}</Text>
        </div>,
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
