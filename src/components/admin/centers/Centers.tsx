import React, {useState} from 'react';
import {Button, Tooltip, Card, Icon, Typography, Modal, Dropdown, Menu} from 'antd';
import {Link} from "react-router-dom";
import {TableComponent} from "../layouts/table/Table";
import defaultImage from "../../../assets/images/default-thumbnail.jpg";
import {useStore} from "../../../store/useStore";

const {Title, Text} = Typography;
const {confirm} = Modal;

export const Centers = ({match}: any) => {
    const [state] = useStore();
    const [loader, setLoader] = useState(false);

    const blockCenter = (center: any) => {
        confirm({
            title: 'Вы действительно хотите заблокировать центр?',
            async onOk() {
                await state.api.user_access.post(`center/${center.id}/block`);
                setLoader(true);
            },
        })
    };

    const unblockCenter = (center: any) => {
        confirm({
            title: 'Вы действительно хотите разблокировать центр?',
            async onOk() {
                await state.api.user_access.post(`center/${center.id}/unblock`);
                setLoader(true);
            },
        })
    };

    const menu = (text: any, record: any) => (<Menu>
        <Menu.Item>
            <Icon type="info-circle"/>
            <Link className="link-text" to={`center/${record.id}`}>Подробнее</Link>
        </Menu.Item>
        {record.status ? <Menu.Item onClick={() => blockCenter(record)}>
            <Icon type="lock"/>
            <span className="link-text">Заблокировать</span>
        </Menu.Item> : <Menu.Item onClick={() => unblockCenter(record)}>
            <Icon type="unlock"/>
            <span className="link-text">Разблокировать</span>
        </Menu.Item>}
        <Menu.Item>
            <Icon type="edit"/>
            <Link className="link-text" to={`center/${record.id}`}> Изменить</Link>
        </Menu.Item>
    </Menu>);

    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        defaultSortOrder: 'descend',
        sorter: true,
        render: (id: number, record: any) => <div>
            {!record.status || record.hide ?
                <Text type="danger">
                    {id}&nbsp;
                    {record.hide ? <Icon type="eye-invisible"/> : null}
                    {!record.status ? <Icon type="lock"/> : null}
                </Text> : id
            }
        </div>
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
        title: 'Прайс',
        dataIndex: 'price',
        render: (text: any, record: any) => record.price ? record.price.title : <Text type="secondary">Нет</Text>
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
        title: 'Создан',
        dataIndex: 'created_at',
        render: (text: any) => `${text || 'Неизвестно'}`,
        sorter: true,
    }, {
        title: <Icon type="bars"/>,
        render: (text: any, record: any) => <Dropdown overlay={menu(text, record)}>
            <Button type="primary" shape="circle" icon="more"/>
        </Dropdown>,
    }];

    const id = match.params.franchiseId;
    return <Card className="_card">
        <div className="_card-title">
            <Title level={3} className="title">Центры</Title>
            <Link className="link" to={`/franchise/${id}/center/create`}>
                <Button icon="plus" htmlType="button" type="primary">Создать</Button>
            </Link>
        </div>
        <TableComponent columns={columns} url={id ? `centers/franchise/${id}` : `centers`} loader={loader}
                        setLoader={setLoader}/>
    </Card>;
};
