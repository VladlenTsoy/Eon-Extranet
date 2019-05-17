import React, {useEffect, useState} from "react";
import {Form, Button, Skeleton, Row, Col, Card, Typography, InputNumber, Input} from "antd";
import {withRouter} from "react-router";
import {useStore} from "../../../../../store/useStore";

interface Price {
    data: {
        id: number
        title: string
        student: number
        teacher: number
        created_at: object
        updated_at: object
    }
}

const {Title} = Typography;

const EditorPrice = ({form, history, match}: any) => {
    const {getFieldDecorator} = form;
    const [state] = useStore();
    const [loading, setLoading] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const id = match.params.id;

    const selectById = async (id: any) => {
        let response: Price = await state.api.user_access.get(`price/${id}`);
        form.setFieldsValue({
            title: response.data.title,
            student: response.data.student,
            teacher: response.data.teacher
        });
    };

    const fetchData = async () => {
        if (id)
            await selectById(id);
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        form.validateFieldsAndScroll(async (err: any, values: any) => {
            if (err) return;

            setLoadingBtn(true);
            let response = id ? await state.api.user_access.post(`price/${id}`, values) : await state.api.user_access.post(`price`, values);

            if (response.data.status === 'success')
                return history.push('/prices')
        });
    };

    return <Form onSubmit={handleSubmit}>
        <Row type="flex" justify="center">
            <Col span={6}>
                <Card className="_card">
                    <Title level={3} className="title">Стоимость</Title>
                    <Skeleton loading={loading} active/>
                    <div className={loading ? 'hideme' : ''}>
                        <Form.Item label="Название">
                            {getFieldDecorator('title', {
                                rules: [{required: true, message: 'Введите название!'}],
                            })(
                                <Input style={{width: '100%'}} placeholder="Введите название"/>
                            )}
                        </Form.Item>
                        <Form.Item label="Ученик">
                            {getFieldDecorator('student', {
                                rules: [{required: true, message: 'Введите стоимость ученика!'}],
                            })(
                                <InputNumber style={{width: '100%'}} placeholder="Введите стоимость ученика"/>
                            )}
                        </Form.Item>
                        <Form.Item label="Учитель">
                            {getFieldDecorator('teacher', {
                                rules: [{required: true, message: 'Введите стоимость учителя!'}],
                            })(
                                <InputNumber style={{width: '100%'}} placeholder="Введите стоимость учителя"/>
                            )}
                        </Form.Item>
                        <Button type="primary" block htmlType="submit" icon="save"
                                loading={loadingBtn}>Сохранить</Button>
                    </div>
                </Card>
            </Col>
        </Row>
    </Form>;
};


// @ts-ignore
export const EditorPriceForm = Form.create({name: 'create-price'})(withRouter(EditorPrice));
