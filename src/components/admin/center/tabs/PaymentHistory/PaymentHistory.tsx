import React from 'react';
import {Icon, Table} from "antd";

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: 'Месяц',
    },
    {
        title: 'Учителя',
    },
    {
        title: 'Ученики',
    },
    {
        title: <Icon type="menu"/>,
    }
];

const PaymentHistoryBlock = ({}: any) => {
    return <Table columns={columns} size="small"/>;
};

export default PaymentHistoryBlock;