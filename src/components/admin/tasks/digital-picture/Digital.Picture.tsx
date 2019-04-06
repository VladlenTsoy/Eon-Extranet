import React, {useReducer} from "react";
import {TableComponent} from "../../layouts/table/Table";
import {Link} from "react-router-dom";
import {Button, Icon, Modal} from "antd";

const confirm = Modal.confirm;

function reducer(state, action) {
    switch (action.type) {
        case 'reset':
            return initialState;
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count - 1};
    }
}

const DigitalPicture: React.FC = (props: any) => {
    const [state, dispatch] = useReducer(reducer, {});

    const showConfirm = (id) => {
        confirm({
            title: 'Вы уверены, что хотите удалить?',
            // content: 'Some descriptions',
            okType: 'danger',
            onOk() {
                props.deleteDigitalPicture(id);
            },
        });
    };

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
        render: (text, record) => <img src={record.url_picture} alt={record.number} width="50px"/>,
        sorter: true,
    }, {
        title: <Icon type="bars"/>,
        render: (text, record) => <div>
            <Link to={`/tasks/digital-picture/${record.id}`}>
                <Button type="primary" shape="circle" icon="edit" htmlType="button" style={{marginRight: 5}}/>
            </Link>
            <Button shape="circle" icon="delete" htmlType="button" onClick={() => showConfirm(record.id)}/>
        </div>,
    }];

    return <div>
        <Link to="/tasks/digital-picture/create"><Button htmlType="button" type="primary">Создать</Button></Link>
        <TableComponent columns={columns} apiAccess={props.apiAccess} url="digital-picture"/>
    </div>
};

export default DigitalPicture;
