import React, {useEffect, useState} from 'react';
import './Home.less';
import {Card, Col, Row, Icon} from "antd";
import {useStore} from "../../../../store/useStore";
import {StatisticStudent} from "./blocks/students/Students";
import StudentInNumbers from "./blocks/student-in-numbers/StudentInNumbers";

export const Home = () => {
    const [state] = useStore();
    const [statistic, setStatistic]: any = useState(false);

    useEffect(() => {
        const fetchStatistic = async () => {
            const response = await state.api.user_access.get('statistic');
            setStatistic(response.data)
        };

        fetchStatistic()
    }, [state.api]);

    return <div>
        <Row type="flex" gutter={15}>
            {/* Ученики */}
            <Col lg={12}>
                <StatisticStudent/>
            </Col>
            {/* Учителя */}
            <Col lg={12}>
                <StatisticStudent/>
            </Col>
            <Col lg={6} md={12}>
                <Card className="card-statistic" loading={!statistic}>
                    <div className="card-title">
                        <span className="title">Ученики</span>
                        <span className="icon">
                            <Icon type="user"/>
                        </span>
                    </div>
                    <div className="card-body">
                        <div className="count-statistic">
                            <div className="count">{statistic ? statistic.users.all : 0}</div>
                            <div className="count open">{statistic ? statistic.users.open : 0}</div>
                            <div className="count active">{statistic ? statistic.users.active : 0}</div>
                        </div>
                    </div>
                </Card>
            </Col>
            <Col lg={6} md={12}>
                <StudentInNumbers/>
            </Col>
            <Col lg={6} md={12}>
                <Card className="card-statistic" loading={!statistic}>
                    <div className="card-title">
                        <span className="title">Учителя</span>
                        <span className="icon">
                                <Icon type="user"/>
                        </span>
                    </div>
                    <div className="card-body">
                        <div className="count-statistic">
                            <div className="count">{statistic ? statistic.teachers.all : 0}</div>
                            <div className="count open">{statistic ? statistic.teachers.open : 0}</div>
                            <div className="count active">{statistic ? statistic.teachers.active : 0}</div>
                        </div>
                    </div>
                </Card>
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
    </div>
};


//
// <Col lg={4} md={6}>
//     <Card className="card-statistic card-users">
//         <Skeleton loading={!statistic} active>
//             {!statistic.users ||
//             <div>
//                 <div className="card-title">
//                     <span className="title">Ученики</span>
//                     <span className="icon">
//                                 <Icon type="user"/>
//                             </span>
//                 </div>
//                 <div className="card-body">
//                     <div className="count-statistic">
//                         <div className="count">{statistic.users.all}</div>
//                         <div className="count slash">/</div>
//                         <div className="count active">{statistic.users.active}</div>
//                     </div>
//                 </div>
//             </div>}
//         </Skeleton>
//     </Card>
// </Col>
//
// {/* Учителя */}
// <Col lg={4} md={6}>
//     <Card className="card-statistic card-users">
//         <Skeleton loading={!statistic} active>
//             {!statistic.teachers ||
//             <div>
//                 <div className="card-title">
//                     <span className="title">Учителя</span>
//                     <span className="icon">
//                                 <Icon type="user"/>
//                             </span>
//                 </div>
//                 <div className="card-body">
//                     <div className="count-statistic">
//                         <div className="count">{statistic.teachers.all}</div>
//                         <div className="count slash">/</div>
//                         <div className="count active">{statistic.teachers.active}</div>
//                     </div>
//                 </div>
//             </div>}
//         </Skeleton>
//     </Card>
// </Col>
//
// {/* Группы */}
// <Col lg={4} md={6}>
//     <Card className="card-statistic card-users">
//         <Skeleton loading={!statistic} active>
//             {!statistic.groups ||
//             <div>
//                 <div className="card-title">
//                     <span className="title">Группы</span>
//                     <span className="icon">
//                                 <Icon type="team"/>
//                             </span>
//                 </div>
//                 <div className="card-body">
//                     <div className="count-statistic">
//                         <div className="count">{statistic.groups.all}</div>
//                         <div className="count slash">/</div>
//                         <div className="count active">{statistic.groups.active}</div>
//                     </div>
//                 </div>
//             </div>}
//         </Skeleton>
//     </Card>
// </Col>
//
// {/* Центры */}
// <Col lg={4} md={6}>
//     <Card className="card-statistic card-users">
//         <Skeleton loading={!statistic} active>
//             {!statistic.centers ||
//             <div>
//                 <div className="card-title">
//                     <span className="title">Центры</span>
//                     <span className="icon">
//                                 <Icon type="bank"/>
//                             </span>
//                 </div>
//                 <div className="card-body">
//                     <div className="count-statistic">
//                         <div className="count">{statistic.centers.all}</div>
//                         <div className="count slash">/</div>
//                         <div className="count active">{statistic.centers.active}</div>
//                     </div>
//                 </div>
//             </div>}
//         </Skeleton>
//     </Card>
// </Col>
//
// {/* Франшизы */}
// <Col lg={4} md={6}>
//     <Card className="card-statistic card-users">
//         <Skeleton loading={!statistic} active>
//             {!statistic.franchises ||
//             <div>
//                 <div className="card-title">
//                     <span className="title">Франшизы</span>
//                     <span className="icon">
//                                 <Icon type="read"/>
//                             </span>
//                 </div>
//                 <div className="card-body">
//                     <div className="count-statistic">
//                         <div className="count">{statistic.franchises.all}</div>
//                         <div className="count slash">/</div>
//                         <div className="count active">{statistic.franchises.active}</div>
//                     </div>
//                 </div>
//             </div>}
//         </Skeleton>
//     </Card>
// </Col>
//
// {/* Директоры центров */}
// <Col lg={4} md={6}>
//     <Card className="card-statistic card-users">
//         <Skeleton loading={!statistic} active>
//             {!statistic.d_centers ||
//             <div>
//                 <div className="card-title">
//                     <span className="title">Директоры центров</span>
//                     <span className="icon">
//                                 <Icon type="user"/>
//                             </span>
//                 </div>
//                 <div className="card-body">
//                     <div className="count-statistic">
//                         <div className="count">{statistic.d_centers.all}</div>
//                         <div className="count slash">/</div>
//                         <div className="count active">{statistic.d_centers.active}</div>
//                     </div>
//                 </div>
//             </div>}
//         </Skeleton>
//     </Card>
// </Col>
//
// {/* Директоры франшиз */}
// <Col lg={4} md={6}>
//     <Card className="card-statistic card-users">
//         <Skeleton loading={!statistic} active>
//             {!statistic.d_franchises ||
//             <div>
//                 <div className="card-title">
//                     <span className="title">Директоры франшиз</span>
//                     <span className="icon">
//                                 <Icon type="user"/>
//                             </span>
//                 </div>
//                 <div className="card-body">
//                     <div className="count-statistic">
//                         <div className="count">{statistic.d_franchises.all}</div>
//                         <div className="count slash">/</div>
//                         <div className="count active">{statistic.d_franchises.active}</div>
//                     </div>
//                 </div>
//             </div>}
//         </Skeleton>
//     </Card>
// </Col>
