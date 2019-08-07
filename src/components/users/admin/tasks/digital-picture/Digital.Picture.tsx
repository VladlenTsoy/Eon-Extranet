import React, {useState} from "react";
import {TableComponent} from "../../../../layouts/table/Table";
import {Link} from "react-router-dom";
import {Button, Card, Icon, Modal, Typography} from "antd";
import {useStore} from "../../../../../store/useStore";

const {Title} = Typography;
const confirm = Modal.confirm;

export const DigitalPicture = () => {
    const [state] = useStore();
    const [loader, setLoader] = useState(false);

    const deleteDigitalPicture = async (id: number) => {
        await state.api.user_access.delete(`digital-picture/${id}`);
        setLoader(true);
    };

    const showConfirm = (id: any) =>
        confirm({
            title: 'Вы уверены, что хотите удалить?',
            okType: 'danger',
            onOk: () => deleteDigitalPicture(id),
        });

    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        defaultSortOrder: 'descend',
        sorter: true,
    }, {
        title: 'Цифра',
        dataIndex: 'number',
        sorter: true,
    }, {
        title: 'Картинка',
        dataIndex: 'picture',
        render: (text: any, record: { url_picture: string | undefined; number: string | undefined; }) => <img
            src={record.url_picture} alt={record.number} width="50px"/>,
        sorter: true,
    }, {
        title: <Icon type="bars"/>,
        render: (text: any, record: { id: any; }) => <div>
            <Link to={`/tasks/digital-picture/${record.id}`}>
                <Button type="primary" shape="circle" icon="edit" htmlType="button" style={{marginRight: 5}}/>
            </Link>
            <Button shape="circle" icon="delete" htmlType="button" onClick={() => showConfirm(record.id)}/>
        </div>,
    }];

    return <div>
        <Card className="_card">
            <div className="_card-title">
                <Title level={3} className="title">Цифра-Образ</Title>
                <Link className="link" to="/tasks/digital-picture/create">
                    <Button icon="plus" htmlType="button" type="primary">Создать</Button>
                </Link>
            </div>
            <TableComponent columns={columns} url="digital-picture" loader={loader} setLoader={setLoader}/>
        </Card>
    </div>
};
