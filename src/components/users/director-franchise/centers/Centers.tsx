import React, {useEffect, useState} from 'react';
import './Centers.less';
import {Button, Card, Col, Row, Typography, Icon} from "antd";
import {useStore} from "../../../../store/useStore";
import {Link} from "react-router-dom";
import LoaderBlock from "../../../layouts/loader/Loader";

const {Title, Text} = Typography;

const Centers = () => {
    const [state] = useStore();
    const [centers, setCenters] = useState();

    useEffect(() => {
        (async () => {
            const response = await state.api.user_access.get('/centers');
            setCenters(response.data);
            console.error(response);
        })();
    }, []);

    return <Row type="flex" gutter={15}>
        {centers ? centers.map((center: any) =>
            <Col xxl={6} xl={6} key={center.id}>
                <Card className="_card card-center">
                    <div className="head">
                        <Text type="secondary">Центр</Text>
                        <div className="head-actions">
                            <Icon type="edit"/>
                            <Icon type="delete"/>
                        </div>
                    </div>
                    <div className="logo">
                        <img src={center.url_image} alt={center.title}/>
                    </div>
                    <Title level={3}>{center.title}</Title>
                    <div className="content">
                        <p><Text type="secondary">Учителей:</Text> 18</p>
                    </div>

                    <Link to={`centers/${center.id}`}>
                        <Button type="primary" block>Подробнее</Button>
                    </Link>
                </Card>
            </Col>
        ) : <LoaderBlock/>}
    </Row>
};

export default Centers;