import React, {useState} from "react";
import {useStore} from "../../../../store/useStore";
import {Button, Card, Col, Form, Row, Skeleton, Typography} from "antd";
import {withRouter} from "react-router";

const {Title} = Typography;

export const Editor = withRouter(({form, history, title, linkToSave, reference, loading, id, children}: any) => {
    const [state] = useStore();
    const [loadingBtn, setLoadingBtn] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        form.validateFieldsAndScroll(async (err: any, values: any) => {
            if (err) return;

            setLoadingBtn(true);
            let response = id ? await state.api.user_access.post(`${linkToSave}/${id}`, values) : await state.api.user_access.post(`${linkToSave}`, values);

            if (response.data.status === 'success')
                return history.push(`/${reference}`)
        });
    };

    return <Form onSubmit={handleSubmit}>
        <Row type="flex" justify="center">
            <Col span={12}>
                <Card className="_card">
                    <Title level={3} className="title">{title}</Title>
                    <Skeleton loading={loading} active/>
                    <div className={loading ? 'hideme' : ''}>
                        {children}
                        <Button type="primary" block htmlType="submit" icon="save"
                                loading={loadingBtn}>Сохранить</Button>
                    </div>
                </Card>
            </Col>
        </Row>
    </Form>
});

