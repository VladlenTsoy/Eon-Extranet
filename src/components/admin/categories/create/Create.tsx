import React, {useEffect, useState} from "react";
import {Form, Input, Button, Icon, Row, Col, Select} from "antd";

export const CreateCategory = (props: any) => {
    const {getFieldDecorator} = props.form;
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        props.fetchCenters({});
        props.fetchDisciplines({})
    }, []);

    const centersOptions = props.centers.data
        .map(c => <Select.Option value={c.id} key={c.id}>{c.title}</Select.Option>);
    const disciplinesOptions = props.disciplines.data
        .map(d => <Select.Option value={d.id} key={d.id}>{d.title}</Select.Option>);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFieldsAndScroll(async (err, values) => {
            if (err) return;

            setLoading(true);
            let response = await props.createCategory(values);

            console.log(response.payload.status === 'success');
            if (response.payload.status === 'success')
                return props.history.push('/categories')
        });
    };

    return <Form onSubmit={handleSubmit}>
        <Row>
            <Col span={12}>
                <Form.Item label="Название">
                    {getFieldDecorator('title', {
                        rules: [{required: true, message: 'Введите названия категории!'}],
                    })(
                        <Input style={{width: '100%'}} placeholder="Введите название"/>
                    )}
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item label="Дисциплина">
                    {getFieldDecorator('discipline_id', {
                        rules: [{required: true, message: 'Выберите дисциплину!'}],
                    })(
                        <Select placeholder="Выберите дисциплину" loading={!props.disciplines.data.length}>
                            {disciplinesOptions}
                        </Select>
                    )}
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item label="Центре">
                    {getFieldDecorator('center_id', {
                        rules: [{required: true, message: 'Выберите центер!'}],
                    })(
                        <Select showSearch placeholder="Выберите центр" loading={!props.centers.data.length}>
                            {centersOptions}
                        </Select>
                    )}
                </Form.Item>
            </Col>
            <Col span={24}>
                <Button type="primary" block htmlType="submit" icon="save" loading={loading}>Сохранить</Button>
            </Col>
        </Row>
    </Form>;
};
