import React, {useEffect, useState} from 'react';
import './Home.less';
import {Card, Col, Row, Icon, Skeleton} from "antd";
import {useStore} from "../../../store/useStore";

export const Home = () => {
    let [state] = useStore();
    let [statistic, setStatistic]: any = useState(false);

    // Вывод данных для статистики
    let fetchStatistic = () => {
        state.api.user_access.get('statistic')
            .then((response: any) => setStatistic(response.data))
    };

    useEffect(() => fetchStatistic(), []);

    return <div>
        <Row type="flex" justify="center">
            {/* Ученики */}
            <Col lg={4} md={6}>
                <Card className="card-statistic card-users">
                    <Skeleton loading={!statistic} active>
                        {!statistic.users ||
                        <div>
                            <div className="card-title">
                                <span className="title">Ученики</span>
                                <span className="icon">
                                <Icon type="user"/>
                            </span>
                            </div>
                            <div className="card-body">
                                <div className="count-statistic">
                                    <div className="count">{statistic.users.all}</div>
                                    <div className="count slash">/</div>
                                    <div className="count active">{statistic.users.active}</div>
                                </div>
                            </div>
                        </div>}
                    </Skeleton>
                </Card>
            </Col>

            {/* Учителя */}
            <Col lg={4} md={6}>
                <Card className="card-statistic card-users">
                    <Skeleton loading={!statistic} active>
                        {!statistic.teachers ||
                        <div>
                            <div className="card-title">
                                <span className="title">Учителя</span>
                                <span className="icon">
                                <Icon type="user"/>
                            </span>
                            </div>
                            <div className="card-body">
                                <div className="count-statistic">
                                    <div className="count">{statistic.teachers.all}</div>
                                    <div className="count slash">/</div>
                                    <div className="count active">{statistic.teachers.active}</div>
                                </div>
                            </div>
                        </div>}
                    </Skeleton>
                </Card>
            </Col>

            {/* Группы */}
            <Col lg={4} md={6}>
                <Card className="card-statistic card-users">
                    <Skeleton loading={!statistic} active>
                        {!statistic.groups ||
                        <div>
                            <div className="card-title">
                                <span className="title">Группы</span>
                                <span className="icon">
                                <Icon type="team"/>
                            </span>
                            </div>
                            <div className="card-body">
                                <div className="count-statistic">
                                    <div className="count">{statistic.groups.all}</div>
                                    <div className="count slash">/</div>
                                    <div className="count active">{statistic.groups.active}</div>
                                </div>
                            </div>
                        </div>}
                    </Skeleton>
                </Card>
            </Col>

            {/* Центры */}
            <Col lg={4} md={6}>
                <Card className="card-statistic card-users">
                    <Skeleton loading={!statistic} active>
                        {!statistic.centers ||
                        <div>
                            <div className="card-title">
                                <span className="title">Центры</span>
                                <span className="icon">
                                <Icon type="bank"/>
                            </span>
                            </div>
                            <div className="card-body">
                                <div className="count-statistic">
                                    <div className="count">{statistic.centers.all}</div>
                                    <div className="count slash">/</div>
                                    <div className="count active">{statistic.centers.active}</div>
                                </div>
                            </div>
                        </div>}
                    </Skeleton>
                </Card>
            </Col>

            {/* Франшизы */}
            <Col lg={4} md={6}>
                <Card className="card-statistic card-users">
                    <Skeleton loading={!statistic} active>
                        {!statistic.franchises ||
                        <div>
                            <div className="card-title">
                                <span className="title">Франшизы</span>
                                <span className="icon">
                                <Icon type="read"/>
                            </span>
                            </div>
                            <div className="card-body">
                                <div className="count-statistic">
                                    <div className="count">{statistic.franchises.all}</div>
                                    <div className="count slash">/</div>
                                    <div className="count active">{statistic.franchises.active}</div>
                                </div>
                            </div>
                        </div>}
                    </Skeleton>
                </Card>
            </Col>

            {/* Директоры центров */}
            <Col lg={4} md={6}>
                <Card className="card-statistic card-users">
                    <Skeleton loading={!statistic} active>
                        {!statistic.d_centers ||
                        <div>
                            <div className="card-title">
                                <span className="title">Директоры центров</span>
                                <span className="icon">
                                <Icon type="user"/>
                            </span>
                            </div>
                            <div className="card-body">
                                <div className="count-statistic">
                                    <div className="count">{statistic.d_centers.all}</div>
                                    <div className="count slash">/</div>
                                    <div className="count active">{statistic.d_centers.active}</div>
                                </div>
                            </div>
                        </div>}
                    </Skeleton>
                </Card>
            </Col>

            {/* Директоры франшиз */}
            <Col lg={4} md={6}>
                <Card className="card-statistic card-users">
                    <Skeleton loading={!statistic} active>
                        {!statistic.d_franchises ||
                        <div>
                            <div className="card-title">
                                <span className="title">Директоры франшиз</span>
                                <span className="icon">
                                <Icon type="user"/>
                            </span>
                            </div>
                            <div className="card-body">
                                <div className="count-statistic">
                                    <div className="count">{statistic.d_franchises.all}</div>
                                    <div className="count slash">/</div>
                                    <div className="count active">{statistic.d_franchises.active}</div>
                                </div>
                            </div>
                        </div>}
                    </Skeleton>
                </Card>
            </Col>
        </Row>
    </div>
};
