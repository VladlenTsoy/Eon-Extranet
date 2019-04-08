import React, {useState} from "react";
import './Applications.less';
import {TableComponent} from "../layouts/table/Table";
import {Link} from "react-router-dom";
import {Button, Card, Badge, Icon, Typography} from "antd";

const {Title} = Typography;

export const Applications = () => {
    const [loader, setLoader] = useState(false);

    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        defaultSortOrder: 'descend',
        sorter: true,
    }, {
        title: 'Имя',
        dataIndex: 'name',
        sorter: true,
        render: (text: any, record: { client_status: number, call_status: number }) =>
            <span>{record.client_status === 0 || record.client_status === 1 ?
                <Badge status={record.call_status === 0 ? 'warning' : record.call_status === 1 ? 'error' : 'processing'}
                       text={text}/> :
                <Badge status={record.client_status === 2 ? 'success' : 'default'} text={text}/>}</span>,
    }, {
        title: 'Дисциплина',
        dataIndex: 'discipline_id',
        sorter: true,
        render: (text: any, record: any) => record.discipline,
    }, {
        title: 'Категория',
        dataIndex: 'category_id',
        sorter: true,
        render: (text: any, record: any) => record.category,
    }, {
        title: 'Отправка',
        dataIndex: 'created_at',
        sorter: true,
        render: (text: any) => text,
    }, {
        title: 'Статус звонка',
        dataIndex: 'call_status',
        sorter: true,
        filters: [
            {text: <Badge status="warning" text="Ожидание"/>, value: 0},
            {text: <Badge status="error" text="Не отвечает"/>, value: 1},
            {text: <Badge status="processing" text="Дозвонились"/>, value: 2},
        ],
        render: (text: number) => <span>{
            text === 0 ? <Icon type="clock-circle"/> :
                text === 1 ? <Icon type="close"/> :
                    <Icon type="check"/>}</span>,
    }, {
        title: <Icon type="bars"/>,
        render: (text: any, record: { id: any; }) => <div>
            <Link to={`/application/${record.id}`}>
                <Button type="primary" shape="circle" icon="edit" htmlType="button" style={{marginRight: 5}}/>
            </Link>
        </div>,
    }];

    return <div>
        <Card className="_card">
            <div className="_card-title">
                <Title level={3} className="title">Заявки</Title>
                <Link className="link" to="/application/create">
                    <Button icon="plus" htmlType="button" type="primary">Создать</Button>
                </Link>
                <div className="statuses-block">
                    <Badge status="warning" text="Ожидание"/>
                    <Badge status="processing" text="Дозвонились"/>
                    <Badge status="error" text="Не отвечает"/>
                    <Badge status="success" text="Обучаеться"/>
                    <Badge status="default" text="Завершил"/>
                </div>
            </div>
            <TableComponent columns={columns} url="trial-lessons" loader={loader} setLoader={setLoader}/>
        </Card>
    </div>
};
