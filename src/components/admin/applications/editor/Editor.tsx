import React, {useEffect, useState} from "react";
import "./Editor.less";
import {Form, Button, Skeleton, Row, Col, Card, Typography, Input, DatePicker, Radio, Select, InputNumber} from "antd";
import {withRouter} from "react-router";
import {useStore} from "../../../../store/useStore";
import moment from 'moment';

interface Application {
    data: {
        id: number
        discipline_id: number
        discipline: string
        category_id: number
        category: string
        city_id: number
        city: string
        name: string
        email: string | null
        date_of_birth: string | null
        phone: string
        date_trial_lesson: string | null
        find: number | null
        call_status: number
        client_status: number
        created_with: number
        discount: number
        user_id: number | null
        created_at: string
        updated_at: string
    }
}

const {Title} = Typography;
const Option = Select.Option;

const EditorApplication = ({form, history, match}: any) => {
    const {getFieldDecorator} = form;
    const [state] = useStore();
    const [application, setApplication]: any = useState({});
    const [loading, setLoading] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const id = match.params.id;

    const [cities, setCities]: any = useState([]);
    const [disciplines, setDisciplines]: any = useState([]);
    const [categories, setCategories]: any = useState([]);
    const [outCategories, setOutCategories]: any = useState([]);


    const fetchDisciplines = () => state.api.guest('disciplines');
    const fetchCategories = () => state.api.guest('categories');
    const fetchCities = () => state.api.guest('cities');

    const selectById = async (id: any) => {
        let response: Application = await state.api.user_access.get(`trial-lesson/${id}`);
        form.setFieldsValue({
            category_id: response.data.category_id,
            discipline_id: response.data.discipline_id,
            city_id: response.data.city_id,
            name: response.data.name,
            email: response.data.email,
            date_of_birth: response.data.date_of_birth ? moment(response.data.date_of_birth, 'YYYY-MM-DD') : null,
            phone: response.data.phone,
            call_status: response.data.call_status,
            date_trial_lesson: response.data.date_trial_lesson ? moment(response.data.date_trial_lesson, 'YYYY-MM-DD HH:mm') : null,
            client_status: response.data.client_status,
            find: response.data.find,
            created_with: response.data.created_with,
            user_id: response.data.user_id,
            discount: response.data.discount,
        });
        return response;
    };


    const fetchData = async () => {
        setLoading(true);

        let _disciplines = await fetchDisciplines();
        setDisciplines(_disciplines.data);

        let _categories = await fetchCategories();
        setCategories(_categories.data);

        let _cities = await fetchCities();
        setCities(_cities.data.data);

        if (id) {
            let _application = await selectById(id);
            setApplication(_application.data);

            let filter = _categories.data.filter((category: any) => category.discipline_id === _application.data.discipline_id);
            setOutCategories(filter);
        }
        setLoading(false);
    };

    const changeDiscipline = (value: number) => {
        let filter = categories.filter((category: any) => category.discipline_id === value);
        form.resetFields(['category_id']);
        setOutCategories(filter);
    };

    useEffect(() => {
        fetchData()
    }, []);


    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        form.validateFieldsAndScroll(async (err: any, values: any) => {
            if (err) return;

            setLoadingBtn(true);
            let response = id ? await state.api.user_access.post(`trial-lesson/${id}`, values) : await state.api.user_access.post(`trial-lesson`, values);

            if (response.data.status === 'success')
                return history.push('/applications')
        });
    };

    return <Form onSubmit={handleSubmit}>
        <Card className="_card">
            <Title level={3} className="title">Заявка</Title>
            <Skeleton loading={loading} active/>
            <div className={loading ? 'hideme' : ''}>
                <Row type="flex" justify="center" className="application-row">
                    <Col lg={6}>
                        <Form.Item label="Дисциплина">
                            {getFieldDecorator('discipline_id', {
                                rules: [{required: true, message: 'Выберите дисциплину!'}],
                            })(
                                <Select showSearch style={{width: '100%'}} onChange={changeDiscipline}
                                        placeholder="Выберите дисциплину">
                                    {disciplines.map((discipline: { id: string | number | undefined; title: React.ReactNode; }, key: string | number | undefined): any =>
                                        <Option value={discipline.id} key={key}>{discipline.title}</Option>)}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="Категория">
                            {getFieldDecorator('category_id', {
                                rules: [{required: true, message: 'Выберите категорию!'}],
                            })(
                                <Select showSearch style={{width: '100%'}} placeholder="Выберите категорию">
                                    {outCategories.map((category: { id: string | number | undefined; title: React.ReactNode; }, key: string | number | undefined): any =>
                                        <Option value={category.id} key={key}>{category.title}</Option>)}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="Город">
                            {getFieldDecorator('city_id', {
                                rules: [{required: true, message: 'Выберите город!'}],
                            })(
                                <Select showSearch style={{width: '100%'}} placeholder="Выберите город">
                                    {cities.map((city: { id: string | number | undefined; title: React.ReactNode; }, key: string | number | undefined): any =>
                                        <Option value={city.id} key={key}>{city.title}</Option>)}
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col lg={6}>
                        <Form.Item label="Имя">
                            {getFieldDecorator('name', {
                                rules: [{required: true, message: 'Введите имя!'}],
                            })(
                                <Input style={{width: '100%'}} placeholder="Введите имя"/>
                            )}
                        </Form.Item>
                        <Form.Item label="E-mail">
                            {getFieldDecorator('email')(
                                <Input style={{width: '100%'}} placeholder="Введите почту"/>
                            )}
                        </Form.Item>
                        <Form.Item label="Телефон">
                            {getFieldDecorator('phone', {
                                rules: [{required: true, message: 'Введите телефон!'}],
                            })(
                                <Input style={{width: '100%'}} placeholder="Введите телефон"/>
                            )}
                        </Form.Item>
                        <Form.Item label="Дата рождения">
                            {getFieldDecorator('date_of_birth')(
                                <DatePicker style={{width: '100%'}}/>
                            )}
                        </Form.Item>
                    </Col>
                    <Col lg={6}>
                        <Form.Item label="Статус звонка">
                            {getFieldDecorator('call_status', {
                                rules: [{required: true, message: 'Выберите статус звонка!'}],
                            })(
                                <Radio.Group>
                                    <Radio.Button value={0}>В ожидании</Radio.Button>
                                    <Radio.Button value={1}>Не отв.</Radio.Button>
                                    <Radio.Button value={2}>Дозвон.</Radio.Button>
                                </Radio.Group>
                            )}
                        </Form.Item>
                        <Form.Item label="Дата и время первого урока">
                            {getFieldDecorator('date_trial_lesson')(
                                <DatePicker style={{width: '100%'}} showTime format="YYYY-MM-DD HH:mm"/>
                            )}
                        </Form.Item>
                        <Form.Item label="Статус клиента">
                            {getFieldDecorator('client_status', {
                                rules: [{required: true, message: 'Выберите статус клиента!'}],
                            })(
                                <Radio.Group>
                                    <Radio.Button value={0}>1-ый урок</Radio.Button>
                                    <Radio.Button value={1}>Записался</Radio.Button>
                                    <Radio.Button value={2}>Закончил</Radio.Button>
                                </Radio.Group>
                            )}
                        </Form.Item>
                    </Col>
                    <Col lg={6}>
                        <Form.Item label="Как нашли нас">
                            {getFieldDecorator('find', {
                                rules: [{required: true, message: 'Выберите один из вариантов!'}],
                            })(
                                <Select showSearch style={{width: '100%'}} placeholder="Выберите один из вариантов">
                                    <Option value={0}>Поиск</Option>
                                    <Option value={1}>Facebook</Option>
                                    <Option value={2}>Instagram</Option>
                                    <Option value={3}>Рассказали</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="Создан с">
                            {getFieldDecorator('created_with', {
                                rules: [{required: true, message: 'Выберите один из вариантов!'}],
                            })(
                                <Select showSearch style={{width: '100%'}} placeholder="Выберите место создания">
                                    <Option value={0}>Основной</Option>
                                    <Option value={1}>Админ</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="ID в кабинете (cabinet.eon.uz)">
                            {getFieldDecorator('user_id')(
                                <InputNumber style={{width: '100%'}}/>
                            )}
                        </Form.Item>
                        <Form.Item label="Скидка">
                            {getFieldDecorator('discount')(
                                <Radio.Group>
                                    <Radio.Button value={0}>Нет</Radio.Button>
                                    <Radio.Button value={1}>Студент</Radio.Button>
                                    <Radio.Button value={2}>Семья</Radio.Button>
                                </Radio.Group>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Button type="primary" block htmlType="submit" icon="save"
                                loading={loadingBtn}>Сохранить</Button>
                    </Col>
                </Row>
            </div>
        </Card>
    </Form>;
};


// @ts-ignore
export const EditorApplicationForm = Form.create({name: 'create-category'})(withRouter(EditorApplication));
