import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Button, Card, Icon, Modal, Typography} from "antd";
import {TableComponent} from "../../layouts/table/Table";
import {useStore} from "../../../../store/useStore";

const {Title} = Typography;
const confirm = Modal.confirm;

export const Categories = () => {
    const [state] = useStore();
    const [loader, setLoader] = useState(false);

    const deleteCategory = async (id: number) => {
        await state.api.user_access.delete(`category/${id}`);
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
        title: 'Центр',
        dataIndex: 'center_id',
        sorter: true,
        render: (text: any, record: { center: React.ReactNode; }) =>
            <Link to={`/centers/center/${text}`}>{record.center}</Link>,
    }, {
        title: 'Дисциплина',
        dataIndex: 'discipline_id',
        sorter: true,
        render: (text: any, record: { discipline: React.ReactNode; }) =>
            <Link to={`/disciplines/discipline/${text}`}>{record.discipline}</Link>,
    }, {
        title: <Icon type="bars"/>,
        render: (text: any, record: { id: any; }) => <div>
            <Link to={`category/${record.id}`}>
                <Button type="primary" shape="circle" icon="edit" htmlType="button" style={{marginRight: 5}}/>
            </Link>
            <Button shape="circle" icon="delete" htmlType="button" onClick={() => showConfirm(record.id)}/>
        </div>,
    }];

    return <div>
        <Card className="_card">
            <div className="_card-title">
                <Title level={3} className="title">Категории</Title>
                <Link className="link" to="/category/create">
                    <Button icon="plus" htmlType="button" type="primary">Создать</Button>
                </Link>
            </div>
            <TableComponent columns={columns} url="categories" loader={loader} setLoader={setLoader}/>
        </Card>
    </div>;
};
