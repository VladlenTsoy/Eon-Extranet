import './login.less';
import React, {useState} from 'react';
import {Card, Input, Icon, Button, Form, message} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {apiChangeAccessToken} from "../../../store/api/actions";

interface LoginPropTypes {
    form: any,
    sendLoginForm: any,
}

const Login = Form.create<LoginPropTypes>({name: 'login'})(
    ({form, sendLoginForm}: LoginPropTypes) => {
        const [loader, setLoader] = useState(false);
        const {getFieldDecorator} = form;

        // Авторизация
        const handleSubmit = (e: { preventDefault: () => void; }) => {
            e.preventDefault();
            form.validateFields((err: any, values: any) => {
                if (!err) {
                    setLoader(true);
                    try {
                        sendLoginForm(values);
                    } catch (e) {
                        message.error(e.response.data.message);
                        setLoader(false);
                    }
                }
            });
        };

        return <Card className="_card">
            <h2 className="title_auth">Авторизация</h2>
            <Form onSubmit={handleSubmit}>
                {/* Email */}
                <Form.Item>
                    {getFieldDecorator('login', {
                        rules: [
                            {required: true, message: `Пожалуйста, введите логин или почту!`}
                        ],
                    })(
                        <Input placeholder="Введите логин или почту" prefix={<Icon type="user"/>}/>
                    )}
                </Form.Item>

                {/* Password */}
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [
                            {required: true, message: `Пожалуйста, введите пароль!`}
                        ],
                    })(
                        <Input.Password placeholder="Введите пароль" prefix={<Icon type="key"/>}/>
                    )}
                </Form.Item>

                <Button htmlType="submit" loading={loader} type="primary" block>
                    Войти
                </Button>
            </Form>
        </Card>
    }
);


const LoginState: React.FC<any> = ({history}) => {
    const {api} = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const sendLoginForm = async (values: any) => {
        const response = await api.guest.post('/login', values);
        dispatch(apiChangeAccessToken(response.data.data.token));
        history.push('/');
    };

    return <Login sendLoginForm={sendLoginForm}/>
};

export default LoginState;
