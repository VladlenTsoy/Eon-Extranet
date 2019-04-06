import React, {useEffect, useState} from 'react';
import {Card, Skeleton, Typography} from "antd";
import {useStore} from "../../../../store/useStore";

const {Title} = Typography;

export const Pupil = ({match}: any) => {
    let id = match.params.id;
    let [state] = useStore();
    let [user, setUser]: any = useState(false);

    // Вывод ученика и его данные
    let fetchPupil = () => {
        state.api.user_access.get(`pupil/${id}`)
            .then((response: any) => setUser(response.data));
    };

    useEffect(() => {
        fetchPupil();
    }, []);


    console.log(user);

    const outputUserData = <div>
        <Card className="_card">
            <Title level={3}>Ученик: {user.first_name} {user.last_name}</Title>
            <img src={user.image} alt={user.first_name} width="150px"/>
        </Card>
    </div>;


    return <div>
        {user ? outputUserData : <Skeleton active/>}
    </div>
};
