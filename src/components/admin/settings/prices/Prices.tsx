import React, {useState} from "react";
import {Button, Card, Icon, Modal, Typography} from "antd";
import {TableComponent} from "../../layouts/table/Table";
import {Link} from "react-router-dom";
import {useStore} from "../../../../store/useStore";

const {Title} = Typography;
const confirm = Modal.confirm;

export const Prices = () => {
    const [state] = useStore();
    const [loader, setLoader] = useState(false);

    const deleteCategory = async (id: number) => {
        await state.api.user_access.delete(`price/${id}`);
        setLoader(true);
    };

    const showConfirm = (id: any) =>
        confirm({
            title: 'Вы уверены, что хотите удалить?',
            okType: 'danger',
            onOk: () => deleteCategory(id),
        });

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
        title: 'Ученик',
        dataIndex: 'student',
        sorter: true,
    }, {
        title: 'Учитель',
        dataIndex: 'teacher',
        sorter: true,
    }, {
        title: 'Создан',
        dataIndex: 'created_at',
        sorter: true,
    }, {
        title: <Icon type="bars"/>,
        render: (text: any, record: { id: any; }) => <div>
            <Link to={`price/${record.id}`}>
                <Button type="primary" shape="circle" icon="edit" htmlType="button" style={{marginRight: 5}}/>
            </Link>
            <Button shape="circle" icon="delete" htmlType="button" onClick={() => showConfirm(record.id)}/>
        </div>,
    }];

    return <div>
        <Card className="_card">
            <div className="_card-title">
                <Title level={3} className="title">Цены</Title>
                <Link className="link" to="/price/create">
                    <Button icon="plus" htmlType="button" type="primary">Создать</Button>
                </Link>
            </div>
            <TableComponent columns={columns} url="prices" loader={loader} setLoader={setLoader}/>
        </Card>
    </div>
};
