import React from 'react';
import CenterCounter from "./center-counter/CenterCounter";
import {Col, Row} from "antd";
import TeacherCounter from "./teacher-counter/TeacherCounter";
import StudentCounter from "./student-counter/StudentCounter";
import TestAccountTable from "./test-account-table/TestAccountTable";

const Home = () => {
    return <Row type="flex" justify="center" gutter={15}>
        <Col lg={4}>
            <CenterCounter/>
        </Col>
        <Col lg={6}>
            <StudentCounter/>
        </Col>
        <Col lg={8}>
            <TeacherCounter/>
        </Col>

        <Col span={24}>
            <TestAccountTable/>
        </Col>
    </Row>
};

export default Home;