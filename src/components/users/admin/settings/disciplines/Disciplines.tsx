import React from "react";
import {Card, Typography} from "antd";
import {TableComponent} from "../../../../layouts/table/Table";

const {Title} = Typography;

const columns = [{
    title: 'ID',
    dataIndex: 'id',
    defaultSortOrder: 'descend',
    sorter: true,
}, {
    title: 'Название',
    dataIndex: 'title',
    sorter: true,
}];

export const Disciplines = () => {
    return <div>
        <Card className="_card">
            <div className="_card-title">
                <Title level={3} className="title">Дисциплины</Title>
            </div>
            <TableComponent columns={columns} url="disciplines"/>
        </Card>
    </div>
};
