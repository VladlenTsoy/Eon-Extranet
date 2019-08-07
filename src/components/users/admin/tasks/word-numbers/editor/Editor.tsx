import React, {useEffect, useState} from "react";
import {Form, Input, Button, Skeleton, Row, Col, Card, Typography, InputNumber} from "antd";
import {withRouter} from "react-router";
import {useStore} from "../../../../../../store/useStore";

interface WordNumber {
    data: {
        number: number,
        word: string,
    }
}

const {Title} = Typography;

const EditorWordNumber = ({form, history, match}: any) => {
    const {getFieldDecorator} = form;
    const [state] = useStore();
    const [loading, setLoading] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const id = match.params.id;

    const selectById = async (id: any) => {
        let response: WordNumber = await state.api.user_access.get(`word-number/${id}`);
        form.setFieldsValue({
            number: response.data.number,
            word: response.data.word
        });
        setLoading(false);
    };

    if (id) {
        useEffect(() => {
            setLoading(true);
            selectById(id);
        }, []);
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        form.validateFieldsAndScroll(async (err: any, values: any) => {
            if (err) return;

            setLoadingBtn(true);
            let response = id ? await state.api.user_access.post(`word-number/${id}`, values) : await state.api.user_access.post(`word-number`, values);

            if (response.data.status === 'success')
                return history.push('/tasks/word-numbers')
        });
    };

    return <Form onSubmit={handleSubmit}>
        <Row type="flex" justify="center">
            <Col span={6}>
                <Card className="_card">
                    <Title level={3} className="title">Главная система</Title>
                    <Skeleton loading={loading} active/>
                    <div className={loading ? 'hideme' : ''}>
                        <Form.Item label="Цифра">
                            {getFieldDecorator('number', {
                                rules: [{required: true, message: 'Введите цифру!'}],
                            })(
                                <InputNumber style={{width: '100%'}} min={0} max={100000}/>
                            )}
                        </Form.Item>
                        <Form.Item label="Слова">
                            {getFieldDecorator('word', {
                                rules: [{required: true, message: 'Введите слово!'}],
                            })(
                                <Input style={{width: '100%'}}/>
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
export const EditorWordNumberForm = Form.create({name: 'create-word'})(withRouter(EditorWordNumber));
