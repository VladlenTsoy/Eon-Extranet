import React, {useState} from "react";
import {TableComponent} from "../layouts/table/Table";
import {Link} from "react-router-dom";
import {Button, Card, Badge, Icon, Typography} from "antd";

const {Title} = Typography;

export const Chats = () => {
    const [loader, setLoader] = useState(false);

    const columns = [{
        title: 'ID',
        dataIndex: 'id',
    }, {
        title: 'Пользователь',
        dataIndex: 'user_id',
        render: (text: number, record: any) => `${record.user.first_name} ${record.user.last_name}`
    }, {
        title: 'Последее отправленное',
        dataIndex: 'send_at',
    }, {
        render: (text: any, record: any) => <div>
            <Link to={`/users/user/${record.user.access_id}/${record.user.id}/`}>
                <Button type="primary" shape="circle" icon="more" htmlType="button"/>
            </Link>
        </div>,
    }];

    return <div>
        <Card className="_card">
            <div className="_card-title">
                <Title level={3} className="title">Чаты</Title>
            </div>
            <TableComponent columns={columns} url="chats" loader={loader} setLoader={setLoader}/>
        </Card>
    </div>
};
