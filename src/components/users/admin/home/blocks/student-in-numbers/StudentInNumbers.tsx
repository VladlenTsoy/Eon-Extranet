import React, {useEffect, useState} from 'react';
import './StudentInNumbers.less';
import {Card, Icon} from "antd";
import {useStore} from "../../../../../../store/useStore";
import {useDispatch, useSelector} from "react-redux";

interface StudentInNumbersPropType {
    fetchData: any,
}

const StudentInNumbers: React.FC<StudentInNumbersPropType> = ({fetchData}) => {
    const [data, setData] = useState({all: 0, open: 0, active: 0, new: 0});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const response = await fetchData();
            setData(response.data);
            setLoading(false);
        })();
    }, []);

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

const StudentInNumbersState: React.FC = () => {
    const {api} = useSelector((state: any) => (state));

    const fetchDataStudentInNumbers = async () =>
        await api.user_access.get('statistic/student-in-numbers');

    return <StudentInNumbers fetchData={fetchDataStudentInNumbers}/>
};

export default StudentInNumbersState;