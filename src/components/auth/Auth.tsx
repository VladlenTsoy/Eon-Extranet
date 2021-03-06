import './Auth.less';
import React from "react";
import {Col, Layout, Row} from "antd";
import LogoEon from "../../assets/images/logo.svg";
import LogoLimitless from "../../assets/images/limitless.svg";
// @ts-ignore
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import LoginForm from './login/Login';

const {Footer, Content} = Layout;

export const Auth = () => {
    return (
        <Layout className="layout-auth">
            <Content className="content-auth">
                <Row className="_row" type="flex" align="middle" justify="center">
                    <Col lg={8} md={18} xs={24}>
                        <Router>
                            <Switch>
                                <Route exact path="/" component={LoginForm}/>
                                <Route component={LoginForm}/>
                            </Switch>
                        </Router>
                    </Col>
                </Row>
            </Content>
            <Footer className="footer">
                    <span className="footer-text">2018 © Eon. All rights reserved. Design and development by
                        <a href="https://vladlen.uz" target="_blank"> Vladlen</a>.
                    </span>
                <div className="footer-wrap-icon">
                    <a href="https://eon.uz" target="_blank">
                        <img className="footer-icon" src={LogoEon} alt="Eon"/>
                    </a>
                    <a href="https://limitless.uz" target="_blank">
                        <img className="footer-icon" src={LogoLimitless} alt="Limitless"/>
                    </a>
                </div>
            </Footer>
        </Layout>
    );
};
