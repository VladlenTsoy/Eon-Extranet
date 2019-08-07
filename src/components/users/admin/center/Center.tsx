import React, {useEffect, useState} from 'react';
import './Center.less';
import {Typography, Card, PageHeader, Tag, Tabs, Button, Statistic, Row, Col, Icon} from "antd";
import {useStore} from "../../../../store/useStore";
import defaultImage from "../../../../assets/images/default-thumbnail.jpg";
import {Link} from "react-router-dom";
import PaymentHistoryBlock from "./tabs/PaymentHistory/PaymentHistory";
import TeachersBlock from "./tabs/Teachers/Teachers";

const {Text} = Typography;

const {TabPane} = Tabs;


const Description = ({term, children, span = 12}: any) => (
    <Col span={span}>
        <div className="description">
            <Text type="secondary" className="term">{term}</Text>
            <div className="detail">{children || 'Пусто'}</div>
        </div>
    </Col>
);

const Center = ({match}: any) => {
    const [state] = useStore();
    const [center, setCenter] = useState();
    const {id} = match.params;

    useEffect(() => {
        (async () => {
            const response = await state.api.user_access.get(`center/${id}`);
            setCenter(response.data);
        })();
    }, []);

    return <Card className="_card" loading={!center}>
        {!!center ?
            <PageHeader
                className="header-center"
                title={`Центр: ${center.title}`}
                subTitle={`${center.franchise}`}
                tags={<Tag color="red">Скрыт</Tag>}
                extra={[
                    <Link to={`/franchises/1/centers/${center.id}`} key="1">
                        <Button icon="edit">
                            Редактировать
                        </Button>
                    </Link>,
                    center.day_block ?
                        <Button key="2" icon="unlock">Разблокировать</Button> :
                        <Button key="2" icon="lock">Заблокировать</Button>,
                    center.hide ?
                        <Button key="3" icon="eye">Показать</Button> :
                        <Button key="3" icon="eye-invisible">Скрыть</Button>,
                    <Button key="4" type="danger" icon="delete">
                        Удалить
                    </Button>,
                ]}
            >
                <div className="info-center">
                    <div className="info-center-logo">
                        <img src={center.url_image} alt={center.title}
                             onError={(e: any) => e.target.src = defaultImage}/>
                    </div>
                    <div className="info-center-content">
                        <Row>
                            <Description term="Адрес">{center.address}</Description>
                            <Description term="Телефон">{center.phone}</Description>
                            <Description term="Дата создания">{center.create_at}</Description>
                            <Description term="Последние действия">{center.updated_at}</Description>
                            <Description term="Город">{center.city}</Description>
                            <Description term="Прайс">{center.price.title}</Description>
                            <Description term="Директор">
                                {center.director_id ?
                                    <Link to={`/${center.director_id}`}>{center.director}</Link> :
                                    center.director}
                            </Description>
                            <Description term="Описание" span={24}>
                                {center.description}
                            </Description>
                        </Row>
                    </div>
                    <div className="info-center-extra">
                        <Row gutter={10}>
                            <Col span={24} className="mb">
                                <Statistic title="Статус" value="Ожидание"/>
                            </Col>
                            <Col span={12}>
                                <Statistic title="Учителей"
                                           prefix={<Icon className="success" type="arrow-up"/>}
                                           value={center.number_of_teachers.open}
                                           suffix={`/ ${center.number_of_teachers.all}`}
                                />
                                <p className="cost">{center.number_of_teachers.cost} сум</p>
                                <p className="active">Активны: <span className="primary">{center.number_of_teachers.active}</span></p>
                            </Col>
                            <Col span={12}>
                                <Statistic title="Учеников"
                                           prefix={<Icon className="danger" type="arrow-up"/>}
                                           value={center.number_of_students.open}
                                           suffix={`/ ${center.number_of_students.all}`}
                                />
                                <p className="cost">{center.number_of_students.cost} сум</p>
                                <p className="active">Активны: <span className="primary">{center.number_of_teachers.active}</span></p>
                            </Col>
                        </Row>
                    </div>
                </div>
            </PageHeader>
            : null}
        <Tabs defaultActiveKey="1" className="info-center-tabs">
            <TabPane tab="История платежей" key="1">
                <PaymentHistoryBlock id={id}/>
            </TabPane>
            <TabPane tab="Учителя" key="2">
                <TeachersBlock id={id}/>
            </TabPane>
        </Tabs>
    </Card>;
};

export default Center;
