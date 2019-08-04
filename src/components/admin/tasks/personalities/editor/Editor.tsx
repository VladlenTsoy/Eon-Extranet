import React, {useEffect, useState} from "react";
import {Form, Input, Button, Skeleton, Row, Col, Card, Typography, DatePicker} from "antd";
import {UploadInput} from "../../../../layouts/upload/Upload";
import {withRouter} from "react-router";
import {useStore} from "../../../../../store/useStore";
import moment from 'moment';

interface Personality {
    data: {
        full_name: string,
        description: string,
        photo: string,
        url_photo: string,
        born: string,
        die: string,
    }
}

const {TextArea} = Input;
const {Title} = Typography;

const EditorPersonality = ({form, history, match}: any) => {
    const {getFieldDecorator} = form;
    const [state] = useStore();
    const [loading, setLoading] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const id = match.params.id;

    const selectById = async (id: any) => {
        let response: Personality = await state.api.user_access.get(`personality/${id}`);
        form.setFieldsValue({
            full_name: response.data.full_name,
            description: response.data.description,
            photo: response.data.url_photo,
            born: moment(response.data.born, 'YYYY-MM-DD'),
            die: response.data.die ? moment(response.data.die, 'YYYY-MM-DD') : ''
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
            let response = id ? await state.api.user_access.post(`personality/${id}`, values) : await state.api.user_access.post(`personality`, values);

            if (response.data.status === 'success')
                return history.push('/tasks/personalities')
        });
    };

    return <Form onSubmit={handleSubmit}>
        <Row type="flex" justify="center">
            <Col span={6}>
                <Card className="_card">
                    <Title level={3} className="title">Личность</Title>
                    <Skeleton loading={loading} active/>
                    <div className={loading ? 'hideme' : ''}>
                        <Form.Item label="Имя">
                            {getFieldDecorator('full_name', {
                                rules: [{required: true, message: 'Введите имя!'}],
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
                        <Form.Item label="Дата рождения">
                            {getFieldDecorator('born', {
                                rules: [{required: true, message: 'Введите дату рождения!'}]
                            })(<DatePicker style={{width: '100%'}}/>)}
                        </Form.Item>
                        <Form.Item label="Дата">
                            {getFieldDecorator('die')(<DatePicker style={{width: '100%'}}/>)}
                        </Form.Item>
                        <UploadInput form={form} name="photo" label="Фото"/>
                        <Button type="primary" block htmlType="submit" icon="save"
                                loading={loadingBtn}>Сохранить</Button>
                    </div>
                </Card>
            </Col>
        </Row>
    </Form>;
};


// @ts-ignore
export const EditorPersonalityForm = Form.create({name: 'create-personality'})(withRouter(EditorPersonality));
