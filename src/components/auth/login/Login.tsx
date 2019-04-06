import './login.less';
import React, {useState} from 'react';
import {Card, Input, Icon, Button, Tooltip, Form, message} from 'antd';
import {useStore} from "../../../store/useStore";

const Login = ({form, apiChangeAccessToken, fetchCurrentUserData}: any) => {
    const [state] = useStore();
    const [showPwd, setShowPwd] = useState(false);
    const [loader, setLoader] = useState(false);
    const {getFieldDecorator} = form;

    // Авторизация
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoader(true);

        //
        form.validateFields((err: any, values: any) => {
            if (err) return;
            state.api.guest.post('/login/admin', values)
                .then(async (response: any) => {
                    apiChangeAccessToken(response.data.data.token);
                    fetchCurrentUserData();
                })
                .catch((err: any) => {
                    setLoader(false);
                    message.error(err.response.data.message);
                });
        });
    };

    return (
        <Card className="_card">
            <h2 className="title_auth">Авторизация</h2>
            <Form onSubmit={handleSubmit}>

                {/* Email */}
                <Form.Item>
                    {getFieldDecorator('login', {
                        rules: [{
                            required: true, message: `Пожалуйста, введите логин или почту!`
                        }],
                    })(
                        <Input placeholder="Введите логин или почту"
                               prefix={<Icon type="user"/>}/>
                    )}
                </Form.Item>

                {/* Password */}
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: `Пожалуйста, введите пароль!`
                        }],
                    })(
                        <Input placeholder="Введите пароль"
                               type={showPwd ? 'text' : 'password'}
                               suffix={
                                   showPwd ?
                                       <Tooltip placement="topLeft" title="Показать пароль">
                                           <Icon className="password-icon" theme="filled" type="eye"
                                                 onClick={() => setShowPwd(!showPwd)}/>
                                       </Tooltip> :
                                       <Tooltip placement="topLeft" title="Скрыть пароль">
                                           <Icon className="password-icon" theme="filled"
                                                 type="eye-invisible"
                                                 onClick={() => setShowPwd(!showPwd)}/>
                                       </Tooltip>
                               }
                               prefix={<Icon type="key"/>}/>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" loading={loader} type="primary" block>
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export const LoginForm = Form.create({name: 'login'})(Login);
