import React from "react";
import {Link} from "react-router-dom";
import {Button, Card, Icon, Typography, Menu, Dropdown, Tooltip} from "antd";
import {TableComponent} from "../layouts/table/Table";
import defaultImage from '../../../assets/images/default-thumbnail.jpg';

const {Title, Text} = Typography;

const menu = (text: any, record: any) => (<Menu>
    <Menu.Item>
        <Link to={`franchise/${record.id}/centers`}><Icon type="info-circle"/> Подробнее</Link>
    </Menu.Item>
    {/*<Menu.Item>*/}
    {/*    <Link to={`franchise/${record.id}/more`}><Icon type="info-circle"/> Подробнее</Link>*/}
    {/*</Menu.Item>*/}
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
        title: 'Директор',
        dataIndex: 'director_id',
        render: (text: any, record: any) => <Link to={`users/user/3/${record.director_id}`}>{record.director}</Link>|| <Text type="secondary">Нет</Text>
    }, {
        title: 'Прайс',
        dataIndex: 'price',
        render: (text: any, record: any) => record.price ? record.price.title : <Text type="secondary">Нет</Text>
    }, {
        title: 'Центров',
        dataIndex: 'number_of_centers',
        render: (centers: any) => <div>
            <Tooltip title="Активные"><span className="table-count-out open">{centers.active}</span></Tooltip>
            <Tooltip title="Всего"><span className="table-count-out">{centers.all}</span></Tooltip>
        </div>,
    }, {
        title: 'Учителей',
        dataIndex: 'number_of_teachers',
        render: (teachers: any) => <div>
            <Tooltip title="Были активны в течении месяца"><span
                className="table-count-out active">{teachers.active}</span></Tooltip>
            <Tooltip title="Открытые"><span className="table-count-out open">{teachers.open}</span></Tooltip>
            <Tooltip title="Всего"><span className="table-count-out">{teachers.all}</span></Tooltip>
        </div>,
    }, {
        title: 'Сум',
        dataIndex: 'number_of_teachers.cost',
    }, {
        title: 'Учеников',
        dataIndex: 'number_of_students',
        render: (students: any) => <div>
            <Tooltip title="Были активны в течении месяца"><span
                className="table-count-out active">{students.active}</span></Tooltip>
            <Tooltip title="Открытые"><span className="table-count-out open">{students.open}</span></Tooltip>
            <Tooltip title="Всего"><span className="table-count-out">{students.all}</span></Tooltip>
        </div>,
    }, {
        title: 'Сум',
        dataIndex: 'number_of_students.cost',
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
