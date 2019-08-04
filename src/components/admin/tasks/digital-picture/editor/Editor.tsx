import React, {useEffect, useState} from "react";
import {Form, InputNumber, Button, Skeleton, Row, Col, Card, Typography} from "antd";
import {UploadInput} from "../../../../layouts/upload/Upload";
import {withRouter} from "react-router";
import {useStore} from "../../../../../store/useStore";

interface DigitalPicture {
    data: { number: number, url_picture: string }
}

const {Title} = Typography;

const EditorDigitalPicture = ({form, history, match}: any) => {
    const {getFieldDecorator} = form;
    const [state] = useStore();
    const [loading, setLoading] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const id = match.params.id;

    const selectById = async (id: any) => {
        let response: DigitalPicture = await state.api.user_access.get(`digital-picture/${id}`);
        form.setFieldsValue({
            number: response.data.number,
            picture: response.data.url_picture
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
            let response = id ? await state.api.user_access.post(`digital-picture/${id}`, values) : await state.api.user_access.post(`digital-picture`, values);

            if (response.data.status === 'success')
                return history.push('/tasks/digital-picture')
        });
    };

    return <Form onSubmit={handleSubmit}>
        <Row type="flex" justify="center">
            <Col span={6}>
                <Card className="_card">
                    <Title level={3} className="title">Цифра-Образ</Title>
                    <Skeleton loading={loading} active/>
                    <div className={loading ? 'hideme' : ''}>
                        <Form.Item label="Цифра">
                            {getFieldDecorator('number', {
                                rules: [{required: true, message: 'Введите цифру!'}],
                            })(
                                <InputNumber style={{width: '100%'}} min={0} max={100000}/>
                            )}
                        </Form.Item>
                        <UploadInput form={form} name="picture" label="Картинка"/>
                        <Button type="primary" block htmlType="submit" icon="save"
                                loading={loadingBtn}>Сохранить</Button>
                    </div>
                </Card>
            </Col>
        </Row>
    </Form>;
};


// @ts-ignore
export const EditorDigitalPictureForm = Form.create({name: 'create-category'})(withRouter(EditorDigitalPicture));
