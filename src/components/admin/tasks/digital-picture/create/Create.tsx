import React, {useEffect, useState} from "react";
import {Form, Input, Button, Row, Col} from "antd";
import {UploadInput} from "../../../layouts/upload/Upload";

export const CreateDigitalPicture = (props: any) => {
    const {getFieldDecorator} = props.form;
    const [loading, setLoading] = useState(false);
    //
    const id = props.match.params.id;

    const selectById = async (id: any) => {
        let response = await props.selectDigitalPicture(id);
        props.form.setFieldsValue({
            number: response.payload.number,
            picture: response.payload.url_picture
        })
    };

    if (id) {
        useEffect(() => {
            selectById(id);
        }, []);
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        props.form.validateFieldsAndScroll(async (err: any, values: any) => {
            if (err) return;

            setLoading(true);
            let response = id ? await props.editDigitalPicture(id, values) : await props.createDigitalPicture(values);

            if (response.payload.status === 'success')
                return props.history.push('/tasks/digital-picture')
        });
    };

    return <Form onSubmit={handleSubmit}>
        <Row type="flex" justify="center">
            <Col span={6}>
                <Form.Item label="Название">
                    {getFieldDecorator('number', {
                        rules: [{required: true, message: 'Введите названия категории!'}],
                    })(
                        <Input style={{width: '100%'}} placeholder="Введите название"/>
                    )}
                </Form.Item>
                <UploadInput form={props.form}/>
                <Button type="primary" block htmlType="submit" icon="save" loading={loading}>Сохранить</Button>
            </Col>
        </Row>
    </Form>;
};
