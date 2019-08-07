import React, {useEffect, useState} from 'react';
import {Button, Icon, Table, Typography} from "antd";
import {useStore} from "../../../../../../store/useStore";
import defaultImage from "../../../../../../assets/images/default-thumbnail.jpg";
import {Link} from "react-router-dom";

const {Text} = Typography;

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        sorter: true,
        render: (text: any, record: any) => <div>
            {text}
            {record.delete_id ? <Text type="danger"><Icon type="eye-invisible"/></Text> : null}
            {record.day_block ? <Text type="danger"><Icon type="lock"/></Text> : null}
        </div>
    }, {
        title: 'Фото',
        dataIndex: 'image',
        render: (text: any, record: any) =>
            <img src={text} onError={(e: any) => e.target.src = defaultImage}
                 alt={record.first_name} width="30px"/>,
    }, {
        title: 'Фамилия',
        dataIndex: 'last_name',
        sorter: true,
    }, {
        title: 'Имя',
        dataIndex: 'first_name',
        sorter: true,
    }, {
        title: 'Логин',
        dataIndex: 'login',
        sorter: true,
    }, {
        title: 'Создание',
        dataIndex: 'created_at',
        render: (text: any) => text || 'Неизвестно',
        sorter: true,
    }, {
        title: 'Вход',
        dataIndex: 'entrance_at',
        render: (text: any) => text || 'Пусто',
        sorter: true,
    }, {
        title: 'Студентов',
        dataIndex: 'students',
        sorter: true,
    }, {
        title: 'Активность',
        dataIndex: 'last_activity',
        render: (text: any) => text || 'Пусто',
        sorter: true,
    }, {
        title: <Icon type="menu"/>,
        render: (text: any, record: any) => <Link to={`${record.center_id}/users/${record.id}`}>
            <Button type="primary" shape="circle" icon="more" htmlType="button"/>
        </Link>
    }
];

const TeachersBlock = ({id}: any) => {
    const [state] = useStore();
    const [teachers, setTeachers] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const response = await state.api.user_access.get(`/teachers/center/${id}`);
            setTeachers(response.data);
            setLoading(false);
        })()
    }, [id]);

    return <Table columns={columns} dataSource={teachers} loading={loading} rowKey="id" size="small"/>;
};

export default TeachersBlock;

