import React, {useEffect, useState} from 'react';
import './Student.less';
import {useStore} from "../../../../../store/useStore";
import {Card} from "antd";
import {ChartLine} from "../../../layouts/settings/chart/line/Line";

export const StatisticStudent = () => {
    let [state] = useStore();
    let [selectStudent, setSelectStudent]: any = useState({x: 0, y: 0});
    let [data, setData]: any = useState(null);

    let mouseEnter = (point: any) => {
        let set = {x: point.data.x, y: point.data.y};
        if (set.x !== selectStudent.x)
            setSelectStudent(set);
    };

    // Вывод данных для статистики
    let fetchData = () => {
        state.api.user_access.get('statistic/students')
            .then((response: any) => {
                setData(response.data);
                setSelectStudent(response.data[0].data[response.data[0].data.length-1]);
            });
    };

    useEffect(() => fetchData(), []);

    return <div>
        <Card className="card-chart-statistic">
            <div className="chart-title-block">
                <h2>{selectStudent.x}</h2>
                <h2>{selectStudent.y}</h2>
            </div>
            {
                data ?
                    <ChartLine className="chart-line" data={data} mouseEnter={mouseEnter}/> :
                    <div/>
            }
        </Card>
    </div>;
};
