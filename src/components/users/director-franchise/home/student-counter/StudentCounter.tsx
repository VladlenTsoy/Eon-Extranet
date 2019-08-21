import React, {useEffect, useState} from "react";
import {Card, Icon} from "antd";
import {useSelector} from "react-redux";

const StudentCounter: React.FC<any> = () => {
    const {api} = useSelector((state: any) => (state));
    const [count, setCount]: any = useState(null);

    useEffect(() => {
        (async () => {
            const response = await api.user_access.get('/student-counter');
            setCount(response.data);
        })();
    }, []);

    return <Card className="card-student-counter card-counter-block" loading={!count}>
        <span className="title">
            <Icon type="team"/>
            Ученики
        </span>
        <div className="content">
            <div className="all">
                <span className="title">Всего</span>
                <span className="count">{count ? count.all : 0}</span>
            </div>
            <div className="open">
                <span className="title">Открытых</span>
                <span className="count">{count ? count.open : 0}</span>
            </div>
            <div className="active">
                <span className="title">Активных</span>
                <span className="count">{count ? count.active : 0}</span>
            </div>
        </div>
    </Card>
};

export default StudentCounter;