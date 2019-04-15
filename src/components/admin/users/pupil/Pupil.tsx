import React, {useEffect, useState} from 'react';
import {Card, Skeleton, Typography, Tabs, Icon} from "antd";
import {useStore} from "../../../../store/useStore";
import {Chat} from "../chat/Chat";

const {Title} = Typography;
const TabPane = Tabs.TabPane;

export const Pupil = ({match}: any) => {
    const id = match.params.id;
    const [state] = useStore();
    const [user, setUser]: any = useState(false);

    // Вывод ученика и его данные
    const fetchPupil = () => {
        state.api.user_access.get(`pupil/${id}`)
            .then((response: any) => setUser(response.data));
    };

    useEffect(() => {
        fetchPupil();
    }, []);

    const outputUserData = <div>
        <Card className="_card _card-profile">
            <Tabs defaultActiveKey="2">
                <TabPane tab={<span><Icon type="user"/>Профиль</span>} key="1">
                    <Title level={3}>Ученик: {user.first_name} {user.last_name}</Title>
                    <img src={user.image} alt={user.first_name} width="150px"/>
                </TabPane>
                <TabPane tab={<span><Icon type="message"/>Чат</span>} key="2">
                    <Chat id={id}/>
                </TabPane>
            </Tabs>
        </Card>
    </div>;


    return <div>
        {user ? outputUserData : <Skeleton active/>}
    </div>
};
