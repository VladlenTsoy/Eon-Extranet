import React, {useEffect, useState} from "react";
import {Form, Input, Button, Skeleton, Row, Col, Card, Typography} from "antd";
import {UploadInput} from "../../../../layouts/upload/Upload";
import {withRouter} from "react-router";
import {useStore} from "../../../../../store/useStore";

interface Country {
    data: {
        capital: string,
        country: string,
        description: string,
        url_flag: string,
        url_emblem: string,
    }
}

const {TextArea} = Input;
const {Title} = Typography;

const EditorCountry = ({form, history, match}: any) => {
    const {getFieldDecorator} = form;
    const [state] = useStore();
    const [loading, setLoading] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const id = match.params.id;

    const selectById = async (id: any) => {
        let response: Country = await state.api.user_access.get(`country/${id}`);
        form.setFieldsValue({
            capital: response.data.capital,
            country: response.data.country,
            description: response.data.description,
            flag: response.data.url_flag,
            emblem: response.data.url_emblem,
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
            let response = id ? await state.api.user_access.post(`country/${id}`, values) : await state.api.user_access.post(`country`, values);

            if (response.data.status === 'success')
                return history.push('/tasks/countries')
        });
    };

    return <Form onSubmit={handleSubmit}>
        <Row type="flex" justify="center">
            <Col span={12}>
                <Card className="_card">
                    <Title level={3} className="title">Страна</Title>
                    <Skeleton loading={loading} active/>
                    <div className={loading ? 'hideme' : ''}>
                        <Row>
                            <Col span={12} style={{paddingRight: '0.5rem'}}>
                                <Form.Item label="Страна">
                                    {getFieldDecorator('country', {
                                        rules: [{required: true, message: 'Введите страну!'}],
                                    })(
                                        <Input style={{width: '100%'}} placeholder="Введите страну"/>
                                    )}
                                </Form.Item>
                                <Form.Item label="Столица">
                                    {getFieldDecorator('capital', {
                                        rules: [{required: true, message: 'Введите столицу!'}],
                                    })(
                                        <Input style={{width: '100%'}} placeholder="Введите столицу"/>
                                    )}
                                </Form.Item>
                                <UploadInput form={form} name="flag" label="Флаг"/>
                            </Col>
                            <Col span={12} style={{paddingLeft: '0.5rem'}}>
                                <Form.Item label="Описание">
                                    {getFieldDecorator('description', {
                                        rules: [{required: true, message: 'Введите описание!'}],
                                    })(
                                        <TextArea style={{width: '100%'}} placeholder="Введите описание" rows={6}/>
                                    )}
                                </Form.Item>
                                <UploadInput form={form} name="emblem" label="Герб"/>
                            </Col>
                        </Row>
                        <Button type="primary" block htmlType="submit" icon="save"
                                loading={loadingBtn}>Сохранить</Button>
                    </div>
                </Card>
            </Col>
        </Row>
    </Form>;
};


// @ts-ignore
export const EditorCountryForm = Form.create({name: 'create-category'})(withRouter(EditorCountry));
