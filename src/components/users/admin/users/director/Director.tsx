import React, {useEffect, useState} from 'react';
import {Card, Skeleton, Typography, Tabs, Icon, Switch, Form, Button, message} from "antd";
import {useStore} from "../../../../../store/useStore";
import {withRouter} from "react-router";

const {Title} = Typography;
const TabPane = Tabs.TabPane;

const Director = ({match, form}: any) => {
    const {id, key = '1'} = match.params;
    const {getFieldDecorator} = form;
    const [state] = useStore();
    const [user, setUser]: any = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);

    // Вывод ученика и его данные
    const fetchDirector = async () => {
        let response = await state.api.user_access.get(`pupil/${id}`);
        setUser(response.data);
        form.setFieldsValue({
            mental_arithmetic: response.data.methods_id.includes(1),
            mnemonics: response.data.methods_id.includes(2),
        });
    };

    useEffect(() => {
        fetchDirector();
    }, []);

    const outputUserData = <div>
        <Card className="_card _card-profile">
            <Tabs defaultActiveKey={key}>
                <TabPane tab={<span><Icon type="user"/>Профиль</span>} key="1">
                    <Title level={3}>Ученик: {user.first_name} {user.last_name}</Title>
                    <img src={user.image} alt={user.first_name} width="150px"/>
                </TabPane>
                <TabPane tab={<span><Icon type="message"/>Чат</span>} key="2">
                </TabPane>
            </Tabs>
        </Card>
    </div>;

    return <div>
        {user ? outputUserData : <Skeleton active/>}
    </div>
};

// @ts-ignore
export const DirectorForm = Form.create({name: 'editor-pupil'})(withRouter(Director));

