import React, {useEffect, useRef, useState} from "react";
import {Table, Input, Form} from 'antd';
import {useStore} from "../../../../store/useStore";

export const TableComponent = ({columns, url, loader, setLoader}: any) => {
    const [state] = useStore();
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({pageIndex: 1, pageSize: 10, total: 0,});
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState(0);
    const searchInput = useRef(null);

    const fetch = async (params: { results?: any; page?: any; sortField?: any; sortOrder?: any; search?: any; }) => {
        let response = await state.api.user_access.get(url, {params: params});
        setLoading(false);
        setData(response.data.data);
        setPagination({...pagination, total: response.data.total});
    };

    useEffect(() => {
        fetch({})
    }, []);

    if (loader) {
        fetch({});
        setLoader(false);
    }

    const handleTableChange = (_pagination: { pageIndex?: number; pageSize: any; total?: number; current?: any; }, filters: any, sorter: { field?: any; order?: any; }, data: {}, search?: any) => {
        pagination.pageIndex = _pagination.current;
        //
        setPagination(pagination);
        setLoading(true);

        fetch({
            results: _pagination.pageSize,
            page: _pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            search: search,
            ...filters,
        });
    };

    const searchOnTable = (e: any) => {
        clearTimeout(timer);
        // @ts-ignore
        let search = searchInput.current.state.value;
        setLoading(true);
        // @ts-ignore
        setTimer(setTimeout(() => handleTableChange(pagination, {}, {}, {}, search), 1000));
    };

    return <div>
        <Form.Item>
            <Input placeholder="Поиск" onKeyUp={searchOnTable} ref={searchInput}/>
        </Form.Item>
        <Table
            columns={columns}
            rowKey={(record: any) => record.id}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            // @ts-ignore
            onChange={handleTableChange}
            size="small"
        />
    </div>
};
