import React, {useEffect, useState} from 'react';
import './Student.less';
import {useStore} from "../../../../../../store/useStore";
import {Card} from "antd";
import {ChartLine} from "../../../layouts/settings/chart/line/Line";

export const StatisticStudent = () => {
    const [state] = useStore();
    const [selectStudent, setSelectStudent]: any = useState({x: 0, y: 0});
    const [data, setData]: any = useState(null);

    const mouseEnter = (point: any) => {
        const set = {x: point.data.x, y: point.data.y};
        if (set.x !== selectStudent.x)
            setSelectStudent(set);
    };

    // Вывод данных для статистики
    useEffect(() => {
        const fetchData = async () => {
            const response = await state.api.user_access.get('statistic/students');
            setData(response.data);
            setSelectStudent(response.data[0].data[response.data[0].data.length - 1]);
        };
        fetchData();
    }, [state.api]);

    return <div>
        <Card className="card-chart-statistic">
            <div className="chart-title-block">
                <h2>{selectStudent.x}</h2>
                <h2>{selectStudent.y}</h2>
            </div>
            {
                data ?
                    <ChartLine className="chart-line" data={data} mouseEnter={mouseEnter}
                               linesColor={['#FF5370', '#FF5370']}/> :
                    null
            }
        </Card>
    </div>;
};
