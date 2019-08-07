import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Button, Card, Icon, Typography, Menu, Dropdown, Tooltip, Modal} from "antd";
import {TableComponent} from "../../../layouts/table/Table";
import defaultImage from '../../../../assets/images/default-thumbnail.jpg';
import {useStore} from "../../../../store/useStore";

const {Title, Text} = Typography;
const {confirm} = Modal;

export const Franchises = () => {
    const [state] = useStore();
    const [loader, setLoader] = useState(false);

    const blockFranchise = (franchise: any) => {
        confirm({
            title: 'Вы действительно хотите заблокировать франшизу?',
            async onOk() {
                await state.api.user_access.post(`franchise/${franchise.id}/block`);
                setLoader(true);
            },
        })
    };

    const unblockFranchise = (franchise: any) => {
        confirm({
            title: 'Вы действительно хотите разблокировать франшизу?',
            async onOk() {
                await state.api.user_access.post(`franchise/${franchise.id}/unblock`);
                setLoader(true);
            },
        })
    };

    const menu = (text: any, record: any) => (<Menu>
        <Menu.Item>
            <Icon type="info-circle"/>
            <Link className="link-text" to={`franchises/${record.id}/centers`}>Подробнее</Link>
        </Menu.Item>
        {record.status ? <Menu.Item onClick={() => blockFranchise(record)}>
            <Icon type="lock"/>
            <span className="link-text">Заблокировать</span>
        </Menu.Item>: <Menu.Item onClick={() => unblockFranchise(record)}>
            <Icon type="unlock"/>
            <span className="link-text">Разблокировать</span>
        </Menu.Item>}
        {/*<Menu.Item>*/}
        {/*    <Link to={`franchise/${record.id}/more`}><Icon type="info-circle"/> Подробнее</Link>*/}
        {/*</Menu.Item>*/}
        <Menu.Item>
            <Icon type="edit"/>
            <Link className="link-text" to={`franchises/${record.id}/edit`}> Изменить</Link>
        </Menu.Item>
    </Menu>);

    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        defaultSortOrder: 'descend',
        render: (text: any, record: any) => record.status ? text :
            <Text type="danger">{text} <Icon type="lock"/></Text>,
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
        render: (text: any, record: any) => record.director ?
            <Link to={`users/user/3/${record.director_id}`}>{record.director}</Link> :
            <Text type="secondary">Нет</Text>
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
                <Link className="link" to="/franchises/create">
                    <Button icon="plus" htmlType="button" type="primary">Создать</Button>
                </Link>
            </div>
            <TableComponent columns={columns} url="franchises" loader={loader} setLoader={setLoader}/>
        </Card>
    </div>;
};
