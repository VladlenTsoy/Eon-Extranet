import React, {useEffect, useState} from 'react';
import './StudentInNumbers.less';
import {Card, Icon} from "antd";
import {useStore} from "../../../../../../store/useStore";

const StudentInNumbers = () => {
    const [state] = useStore();
    const [data, setData] = useState({all: 0, open: 0, active: 0, new: 0});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const response = await state.api.user_access.get('statistic/student-in-numbers');
            setData(response.data);
            setLoading(false);
        };
        fetch();
    }, [state.api]);

    return <Card className="card-statistic student-in-numbers-block" loading={loading}>
        <div className="card-title">
            <span className="title">Ученики</span>
            <div className="icon">
                <Icon type="user"/>
            </div>
        </div>
        <div className="card-body">
            <div className="list">
                <div className="item">
                    <span className="item-title">Общее кол-во:</span>
                    <span className="all">{data.all}</span>
                </div>
                <div className="item">
                    <span className="item-title">Открытых:</span>
                    <span className="open">{data.open}</span>
                </div>
                <div className="item">
                    <span className="item-title">Активных:</span>
                    <span className="active">{data.active}</span>
                </div>
                <div className="item">
                    <span className="item-title">Новых:</span>
                    <span className="new">{data.new}</span>
                </div>
            </div>
        </div>
    </Card>
};

export default StudentInNumbers;