import React from 'react';
import {Button, Tooltip, Card, Icon, Typography} from 'antd';
import {Link} from "react-router-dom";
import {TableComponent} from "../layouts/table/Table";
import defaultImage from "../../../assets/images/default-thumbnail.jpg";

const {Title, Text} = Typography;

const columns = [{
    title: 'ID',
    dataIndex: 'id',
    defaultSortOrder: 'descend',
    sorter: true,
    render: (id: number, record: any) => record.hide === null ? id :
        <Text type="danger">{id} <Icon type="eye-invisible"/></Text>
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
    title: 'Город',
    dataIndex: 'city_id',
    render: (text: any, record: any) => record.city,
    sorter: true,
}, {
    title: 'Фрашиза',
    key: 'franchise_id',
    dataIndex: 'franchise_id',
    render: (text: any, record: any) => record.franchise,
    sorter: true,
}, {
    title: 'Директор',
    dataIndex: 'director_id',
    render: (text: any, record: any) => record.director,
    sorter: true,
}, {
    title: 'Учителей',
    dataIndex: 'number_of_teachers',
    render: (teachers: any) => <div>
        <Tooltip title="Были активны в течении месяца"><span className="table-count-out active">{teachers.active}</span></Tooltip>
        <Tooltip title="Открытые"><span className="table-count-out open">{teachers.open}</span></Tooltip>
        <Tooltip title="Всего"><span className="table-count-out">{teachers.all}</span></Tooltip>
    </div>,
}, {
    title: 'Учеников',
    dataIndex: 'number_of_students',
    render: (students: any) => <div>
        <Tooltip title="Были активны в течении месяца"><span className="table-count-out active">{students.active}</span></Tooltip>
        <Tooltip title="Открытые"><span className="table-count-out open">{students.open}</span></Tooltip>
        <Tooltip title="Всего"><span className="table-count-out">{students.all}</span></Tooltip>
        </div>,
}, {
    title: 'Прайс',
    dataIndex: 'price_id',
    render: (text: any, record: any) => `${record.price || 'Нет'}`,
    sorter: true,
}, {
    title: 'Создан',
    dataIndex: 'created_at',
    render: (text: any) => `${text || 'Неизвестно'}`,
    sorter: true,
}, {
    title: <Icon type="bars"/>,
    render: (text: any, record: any) => <Link to={`/center/${record.id}`}>
        <Button type="primary" shape="circle" icon="edit" htmlType="button"/>
    </Link>,
}];

export const Centers = () => {
    return <Card className="_card">
        <div className="_card-title">
            <Title level={3} className="title">Центры</Title>
            <Link className="link" to="/center/create">
                <Button icon="plus" htmlType="button" type="primary">Создать</Button>
            </Link>
        </div>
        <TableComponent columns={columns} url="centers"/>
    </Card>;
};
