import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Button, Card, Icon, Typography, Menu, Dropdown, Modal} from "antd";
import {TableComponent} from "../../../layouts/table/Table";
import defaultImage from '../../../../assets/images/default-thumbnail.jpg';
import {useSelector} from "react-redux";
import Expanded from "./blocks/expanded/Expanded";

interface FranchisesPropTypes {
    block: any;
    unblock: any;
}

const {Title, Text} = Typography;
const {confirm} = Modal;

const Franchises: React.FC<FranchisesPropTypes> = ({block, unblock}) => {
    const [loader, setLoader] = useState(false);

    const blockFranchise = (franchise: any) => {
        confirm({
            title: 'Вы действительно хотите заблокировать франшизу?',
            async onOk() {
                await block(franchise);
                setLoader(true);
            },
        })
    };

    const unblockFranchise = (franchise: any) => {
        confirm({
            title: 'Вы действительно хотите разблокировать франшизу?',
            async onOk() {
                await unblock(franchise);
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
        </Menu.Item> : <Menu.Item onClick={() => unblockFranchise(record)}>
            <Icon type="unlock"/>
            <span className="link-text">Разблокировать</span>
        </Menu.Item>}
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
        render: (text: any, record: any) => <Dropdown overlay={menu(text, record)}>
            <Button type="primary" shape="circle" icon="more"/>
        </Dropdown>,
    }];

    const checkClassRow = (record: any) =>
        record.status ? '' : 'row-hide';

    const expandedRender = (record: any) => {
        console.log(record);
        return <Expanded record={record}/>;
    };

    return <div>
        <Card className="_card">
            <div className="_card-title">
                <Title level={3} className="title">Франшизы</Title>
                <Link className="link" to="/franchises/create">
                    <Button icon="plus" htmlType="button" type="primary">Создать</Button>
                </Link>
            </div>
            <TableComponent columns={columns} url="franchises" loader={loader} setLoader={setLoader}
                            expandedRender={expandedRender} checkClass={checkClassRow}/>
        </Card>
    </div>;
};

const FranchisesState: React.FC = () => {
    const {api} = useSelector((state: any) => (state));

    const block = async (franchise: any) => {
        return await api.user_access.post(`franchise/${franchise.id}/block`);
    };

    const unblock = async (franchise: any) => {
        return await api.user_access.post(`franchise/${franchise.id}/unblock`);
    };

    return <Franchises block={block} unblock={unblock}/>
};

export default FranchisesState;