import React, {useState} from 'react';
import './TestAccountTable.less';
import {Button, Card, Dropdown, Icon, Menu, message, Typography} from "antd";
import defaultImage from "../../../../../assets/images/default-thumbnail.jpg";
import {TableComponent} from "../../../../layouts/table/Table";
import {Link} from "react-router-dom";
import moment from "moment";
import {useSelector} from "react-redux";

const {Text} = Typography;

const TestAccountTable: React.FC = () => {
    const {api} = useSelector((state: any) => (state));
    const [loader, setLoader] = useState(false);

    const blockAccount = async (id: string) => {
        try {
            const response = await api.user_access.post(`teacher/${id}/block`);
            if (response.data.status === 'success')
                message.info(`Вы успешно заблокировали аккаунт ID: ${id}.`);
        } catch (e) {
            message.error(`Произошла неизвестная ошибка!`);
        }
        setLoader(true);
    };


    const activationAccount = async (id: string) => {
        try {
            const response = await api.user_access.post(`teacher/${id}/activation`);
            if (response.data.status === 'success')
                message.info(`Вы успешно активировали аккаунт ID: ${id}.`);
        } catch (e) {
            message.error(`Произошла неизвестная ошибка!`);
        }
        setLoader(true);
    };


    const deleteAccount = async (id: string) => {
        try {
            const response = await api.user_access.delete(`teacher/${id}`);
            if (response.data.status === 'success')
                message.info(`Вы успешно удалили аккаунт ID: ${id}.`);
        } catch (e) {
            message.error(`Произошла неизвестная ошибка!`);
        }
        setLoader(true);
    };

    const menu = (text: any, record: any) => <Menu>
        <Menu.Item>
            <Icon type="info-circle"/>
            <Link className="link-text" to={`${record.id}`}>Подробнее</Link>
        </Menu.Item>
        {record.left_test_days > 0 ?
            <Menu.Item onClick={() => blockAccount(record.id)}>
                <Icon type="lock"/>
                <span className="link-text">Заблокировать</span>
            </Menu.Item> :
            <Menu.Item onClick={() => activationAccount(record.id)}>
                <Icon type="thunderbolt"/>
                <span className="link-text">Активировать</span>
            </Menu.Item>
        }
        <Menu.Item onClick={() => deleteAccount(record.id)}>
            <Icon type="delete"/>
            <span className="link-text">Удалить</span>
        </Menu.Item>
    </Menu>;

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Фото',
            dataIndex: 'image',
            render: (text: any, record: any) =>
                <img src={text}
                     onError={(e: any) => e.target.src = defaultImage}
                     alt={record.first_name}
                     width="30px"/>,
        },
        {
            title: 'Фамилия',
            dataIndex: 'last_name',
            sorter: true,
        },
        {
            title: 'Имя',
            dataIndex: 'first_name',
            sorter: true,
        },
        {
            title: 'Телефон',
            dataIndex: 'phone',
        },
        {
            title: 'Логин',
            dataIndex: 'login',
            sorter: true,
        },
        {
            title: 'Осталось',
            dataIndex: 'left_test_days',
            render: (text: any) => text > 0 ? `${text} д.` : <Text type="danger">Заблокированный</Text>,
        },
        {
            title: 'Создание',
            dataIndex: 'created_at',
            render: (text: any) => text ? moment(text).format('DD/MM/YYYY') : 'Неизвестно',
            sorter: true,
        },
        {
            title: 'Активность',
            dataIndex: 'entrance_at',
            render: (text: any) => text ? moment(text).format('DD/MM/YYYY hh:mm ') : 'Пусто',
            sorter: true,
        },
        {
            render: (text: any, record: any) => <Dropdown overlay={menu(text, record)}>
                <Button type="primary" shape="circle" icon="more"/>
            </Dropdown>,
        }
    ];

    return <Card>
        <TableComponent columns={columns} url="/ending-test-teachers" loader={loader} setLoader={setLoader}/>
    </Card>
};

export default TestAccountTable;