import React, {useEffect, useState} from 'react';
import {Card, Skeleton, Typography, Tabs, Icon, Switch, Form, Button, message} from "antd";
import {useStore} from "../../../../store/useStore";
import {Chat} from "../chat/Chat";
import {withRouter} from "react-router";

const {Title} = Typography;
const TabPane = Tabs.TabPane;

const Pupil = ({match, form}: any) => {
    const {id, key = '1'} = match.params;
    const {getFieldDecorator} = form;
    const [state] = useStore();
    const [user, setUser]: any = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);

    // Вывод ученика и его данные
    const fetchPupil = async () => {
        let response = await state.api.user_access.get(`pupil/${id}`);
        setUser(response.data);
        form.setFieldsValue({
            mental_arithmetic: response.data.methods_id.includes(1),
            mnemonics: response.data.methods_id.includes(2),
        });
    };

    useEffect(() => {
        fetchPupil();
    }, []);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        form.validateFieldsAndScroll(async (err: any, values: any) => {
            if (err) return;

            console.log(values);
            setLoadingBtn(true);
            let response = await state.api.user_access.post(`pupil/${id}`, values);

            setLoadingBtn(false);
            if (response.data.status === 'success')
                message.success('Вы успешно изменили данные!');
        });
    };

    const outputUserData = <div>
        <Card className="_card _card-profile">
            <Tabs defaultActiveKey={key}>
                <TabPane tab={<span><Icon type="user"/>Профиль</span>} key="1">
                    <Title level={3}>Ученик: {user.first_name} {user.last_name}</Title>
                    <img src={user.image} alt={user.first_name} width="150px"/>
                    <Form labelCol={{span: 6}} wrapperCol={{span: 14}} onSubmit={handleSubmit}>
                        <Form.Item label="Ментальная арифметика">
                            {getFieldDecorator('mental_arithmetic', {valuePropName: 'checked'})(<Switch/>)}
                        </Form.Item>
                        <Form.Item label="Мнемотехника">
                            {getFieldDecorator('mnemonics', {valuePropName: 'checked'})(<Switch/>)}
                        </Form.Item>
                        <Button type="primary" block htmlType="submit" icon="save"
                                loading={loadingBtn}>Сохранить</Button>
                    </Form>
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

// @ts-ignore
export const PupilForm = Form.create({name: 'editor-pupil'})(withRouter(Pupil));

