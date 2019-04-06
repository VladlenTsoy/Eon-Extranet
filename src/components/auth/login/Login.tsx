import './login.less';
import React, {Component, useState} from 'react';
import {Link} from 'react-router-dom';
import {Card, Input, Icon, Button, Tooltip, Form} from 'antd';

export const Login: React.FC = (props: any) => {
    const [showPwd, setShowPwd] = useState(false);
    const {getFieldDecorator} = props.form;
    const {loader} = props;

    // // Авторизация
    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (err) return;

            props.authChangeLoader(true);
            props.authWithEmailAndPassword(values);
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
