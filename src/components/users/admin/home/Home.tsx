import React from 'react';
import './Home.less';
import {Card, Col, Row, Icon} from "antd";
import StudentInNumbers from "./blocks/student-in-numbers/StudentInNumbers";

export const Home: React.FC = () => {
    return <Row type="flex" gutter={15}>
        <Col lg={6} md={12}>
            <StudentInNumbers/>
        </Col>
        <Col lg={6} md={12}>
            <Card className="card-statistic card-users">
                <div className="card-title">
                    <span className="title">Центры</span>
                    <span className="icon">
                            <Icon type="bank"/>
                        </span>
                </div>
            </Card>
        </Col>
        <Col lg={6} md={12}>
            <Card className="card-statistic card-users">
                <div className="card-title">
                    <span className="title">Франшизы</span>
                    <span className="icon">
                            <Icon type="read"/>
                        </span>
                </div>
            </Card>
        </Col>
    </Row>
};