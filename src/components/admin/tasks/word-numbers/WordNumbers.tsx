import React, {useState} from "react";
import {TableComponent} from "../../layouts/table/Table";
import {Link} from "react-router-dom";
import {Button, Card, Icon, Modal, Typography} from "antd";
import {useStore} from "../../../../store/useStore";

const {Title} = Typography;
const confirm = Modal.confirm;

export const WordNumbers = () => {
    const [state] = useStore();
    const [loader, setLoader] = useState(false);

    const deleteWordNumber = async (id: number) => {
        await state.api.user_access.delete(`word-number/${id}`);
        setLoader(true);
    };

    const showConfirm = (id: any) =>
        confirm({
            title: 'Вы уверены, что хотите удалить?',
            okType: 'danger',
            onOk: () => deleteWordNumber(id),
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
    },{
        title: 'Слова',
        dataIndex: 'word',
        sorter: true,
    }, {
        title: <Icon type="bars"/>,
        render: (text: any, record: { id: any; }) => <div>
            <Link to={`/tasks/word-number/${record.id}`}>
                <Button type="primary" shape="circle" icon="edit" htmlType="button" style={{marginRight: 5}}/>
            </Link>
            <Button shape="circle" icon="delete" htmlType="button" onClick={() => showConfirm(record.id)}/>
        </div>,
    }];

    return <div>
        <Card className="_card">
            <div className="_card-title">
                <Title level={3} className="title">Главная система</Title>
                <Link className="link" to="/tasks/word-number/create">
                    <Button icon="plus" htmlType="button" type="primary">Создать</Button>
                </Link>
            </div>
            <TableComponent columns={columns} url="word-numbers" loader={loader} setLoader={setLoader}/>
        </Card>
    </div>
};
