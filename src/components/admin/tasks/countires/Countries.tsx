import React, {useState} from "react";
import {TableComponent} from "../../layouts/table/Table";
import {Link} from "react-router-dom";
import {Button, Card, Icon, Modal, Typography} from "antd";
import {useStore} from "../../../../store/useStore";

const {Title} = Typography;
const confirm = Modal.confirm;

export const Countries = () => {
    const [state] = useStore();
    const [loader, setLoader] = useState(false);

    const deleteCountry = async (id: number) => {
        await state.api.user_access.delete(`country/${id}`);
        setLoader(true);
    };

    const showConfirm = (id: any) =>
        confirm({
            title: 'Вы уверены, что хотите удалить?',
            okType: 'danger',
            onOk: () => deleteCountry(id),
        });

    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        defaultSortOrder: 'descend',
        sorter: true,
    }, {
        title: 'Страна',
        dataIndex: 'country',
        sorter: true,
    }, {
        title: 'Столица',
        dataIndex: 'capital',
        sorter: true,
    }, {
        title: <Icon type="bars"/>,
        render: (text: any, record: { id: any; }) => <div>
            <Link to={`/tasks/country/${record.id}`}>
                <Button type="primary" shape="circle" icon="edit" htmlType="button" style={{marginRight: 5}}/>
            </Link>
            <Button shape="circle" icon="delete" htmlType="button" onClick={() => showConfirm(record.id)}/>
        </div>,
    }];

    return <div>
        <Card className="_card">
            <div className="_card-title">
                <Title level={3} className="title">Страны</Title>
                <Link className="link" to="/tasks/country/create">
                    <Button icon="plus" htmlType="button" type="primary">Создать</Button>
                </Link>
            </div>
            <TableComponent columns={columns} url="countries" loader={loader} setLoader={setLoader}/>
        </Card>
    </div>
};
