import React, {useEffect, useState} from "react";
import {Form, Input, Button, Skeleton, Row, Col, Card, Typography} from "antd";
import {withRouter} from "react-router";
import {useStore} from "../../../../../store/useStore";

interface Word {
    data: {
        word: string,
        description: string,
    }
}

const {Title} = Typography;
const {TextArea} = Input;


const EditorWord = ({form, history, match}: any) => {
    const {getFieldDecorator} = form;
    const [state] = useStore();
    const [loading, setLoading] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const id = match.params.id;

    const selectById = async (id: any) => {
        let response: Word = await state.api.user_access.get(`word/${id}`);
        form.setFieldsValue({
            word: response.data.word,
            description: response.data.description
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
            let response = id ? await state.api.user_access.post(`word/${id}`, values) : await state.api.user_access.post(`word`, values);

            if (response.data.status === 'success')
                return history.push('/tasks/words')
        });
    };

    return <Form onSubmit={handleSubmit}>
        <Row type="flex" justify="center">
            <Col span={6}>
                <Card className="_card">
                    <Title level={3} className="title">Слова</Title>
                    <Skeleton loading={loading} active/>
                    <div className={loading ? 'hideme' : ''}>
                        <Form.Item label="Слова">
                            {getFieldDecorator('word', {
                                rules: [{required: true, message: 'Введите слово!'}],
                            })(
                                <Input style={{width: '100%'}}/>
                            )}
                        </Form.Item>
                        <Form.Item label="Описание">
                            {getFieldDecorator('description', {
                                rules: [{required: true, message: 'Введите описание!'}],
                            })(
                                <TextArea style={{width: '100%'}} placeholder="Введите описание" rows={6}/>
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
export const EditorWordForm = Form.create({name: 'create-word'})(withRouter(EditorWord));
