import React, {useEffect, useState} from "react";
import {Form, Button, Skeleton, Row, Col, Card, Typography, Select, Input} from "antd";
import {withRouter} from "react-router";
import {useStore} from "../../../../../store/useStore";

interface Category {
    data: {
        id: number
        title: string
        center_id: number
        discipline_id: number
    }
}

const {Title} = Typography;
const Option = Select.Option;

const EditorCategory = ({form, history, match}: any) => {
    const {getFieldDecorator} = form;
    const [state] = useStore();
    const [loading, setLoading] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const id = match.params.id;

    const [disciplines, setDisciplines] = useState([]);
    const [centers, setCenters] = useState([]);

    const selectById = async (id: any) => {
        let response: Category = await state.api.user_access.get(`category/${id}`);
        form.setFieldsValue({
            title: response.data.title,
            center_id: response.data.center_id,
            discipline_id: response.data.discipline_id
        });
    };

    const fetchDisciplines = () => state.api.guest('disciplines');
    const fetchCenters = () => state.api.user_access('centers');

    const fetchData = async () => {
        let _disciplines = await fetchDisciplines();
        setDisciplines(_disciplines.data);

        let _centers = await fetchCenters();
        setCenters(_centers.data.data);

        if (id)
            await selectById(id);
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);

    const filterOption = (input: string, option: any) => {
        let child: string = option.props.children + '';
        return child.toLowerCase().includes(input.toLowerCase())
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        form.validateFieldsAndScroll(async (err: any, values: any) => {
            if (err) return;

            setLoadingBtn(true);
            let response = id ? await state.api.user_access.post(`category/${id}`, values) : await state.api.user_access.post(`category`, values);

            if (response.data.status === 'success')
                return history.push('/categories')
        });
    };

    return <Form onSubmit={handleSubmit}>
        <Row type="flex" justify="center">
            <Col span={6}>
                <Card className="_card">
                    <Title level={3} className="title">Категория</Title>
                    <Skeleton loading={loading} active/>
                    <div className={loading ? 'hideme' : ''}>
                        <Form.Item label="Центр">
                            {getFieldDecorator('center_id', {
                                rules: [{required: true, message: 'Выберите центр!'}],
                            })(
                                <Select showSearch style={{width: '100%'}} placeholder="Выберите центр"
                                        filterOption={filterOption}>
                                    {centers.map((center: any, key: string | number | undefined): any =>
                                        <Option value={center.id} key={key}>{center.title}</Option>)}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="Дисциплина">
                            {getFieldDecorator('discipline_id', {
                                rules: [{required: true, message: 'Выберите дисциплину!'}],
                            })(
                                <Select showSearch style={{width: '100%'}} placeholder="Выберите дисциплину"
                                        filterOption={filterOption}>
                                    {disciplines.map((discipline: any, key: string | number | undefined): any =>
                                        <Option value={discipline.id} key={key}>{discipline.title}</Option>)}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="Название">
                            {getFieldDecorator('title', {
                                rules: [{required: true, message: 'Введите название!'}],
                            })(
                                <Input style={{width: '100%'}} placeholder="Введите название"/>
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
export const EditorCategoryForm = Form.create({name: 'create-category'})(withRouter(EditorCategory));
