import React, {useEffect, useState} from "react";
import {Form, Input, Button, Skeleton, Row, Col, Card, Typography, Select} from "antd";
import {UploadInput} from "../../layouts/upload/Upload";
import {withRouter} from "react-router";
import {useStore} from "../../../../store/useStore";

interface Franchise {
    data: {
        title: string,
        description: string,
        image: string,
        url_image: string,
        director_id: number,
    }
}

const {TextArea} = Input;
const Option = Select.Option;
const {Title} = Typography;

const EditorFranchise = ({form, history, match}: any) => {
    const {getFieldDecorator} = form;
    const [state] = useStore();
    const [loading, setLoading] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const id = match.params.id;

    const [directors, setDirectors]: any = useState([]);

    const selectById = async (id: any) => {
        let response: Franchise = await state.api.user_access.get(`franchise/${id}`);
        form.setFieldsValue({
            title: response.data.title,
            description: response.data.description,
            image: response.data.url_image,
            director_id: response.data.director_id,
        });
    };

    const fetchDirectors = () => state.api.user_access('directors');

    const fetchData = async () => {
        let response: any = await fetchDirectors();
        setDirectors(response.data);
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
            let response = id ? await state.api.user_access.post(`franchise/${id}`, values) : await state.api.user_access.post(`franchise`, values);

            if (response.data.status === 'success')
                return history.push('/franchises')
        });
    };

    return <Form onSubmit={handleSubmit}>
        <Row type="flex" justify="center">
            <Col span={12}>
                <Card className="_card">
                    <Title level={3} className="title">Франшиза</Title>
                    <Skeleton loading={loading} active/>
                    <div className={loading ? 'hideme' : ''}>
                        <Row>
                            <Col span={12} style={{paddingRight: '0.5rem'}}>
                                <Form.Item label="Название">
                                    {getFieldDecorator('title', {
                                        rules: [{required: true, message: 'Введите название!'}],
                                    })(
                                        <Input style={{width: '100%'}} placeholder="Введите название"/>
                                    )}
                                </Form.Item>
                                <Form.Item label="Описание">
                                    {getFieldDecorator('description', {
                                        rules: [{required: true, message: 'Введите описание!'}],
                                    })(
                                        <TextArea style={{width: '100%'}} placeholder="Введите описание" rows={6}/>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12} style={{paddingLeft: '0.5rem'}}>
                                <Form.Item label="Директор">
                                    {getFieldDecorator('director_id')(
                                        <Select showSearch style={{width: '100%'}} placeholder="Выберите директора">
                                            {directors.map((director: any, key: string | number | undefined): any =>
                                                <Option value={director.id}
                                                        key={key}>{director.first_name} {director.last_name}</Option>)}
                                        </Select>
                                    )}
                                </Form.Item>
                                <UploadInput form={form} name="image" label="Лого"/>
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
export const EditorFranchiseForm = Form.create({name: 'create-category'})(withRouter(EditorFranchise));