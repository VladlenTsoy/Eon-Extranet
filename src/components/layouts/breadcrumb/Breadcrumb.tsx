import React from 'react';
import './Breadcrumb.less';
import {Icon, Breadcrumb} from "antd";
import {Link, withRouter} from 'react-router-dom';
import {useStore} from "../../../store/useStore";

const breadcrumbNameMap: any = {
    '/franchises': 'Франшизы',
    '/franchises/create': 'Создать франшизу',
    '/franchises/10': 'Eon',
    '/franchises/10/centers': 'Центры',
};

export const BreadcrumbBlock = withRouter((props: any) => {
    const {location} = props;
    const pathSnippets = location.pathname.split('/').filter((i: any) => i);
    const extraBreadcrumbItems = pathSnippets.map((_: any, index: number) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        if (index + 1 === pathSnippets.length)
            return <Breadcrumb.Item key={url}>{breadcrumbNameMap[url]}</Breadcrumb.Item>;

        return <Breadcrumb.Item key={url}>
            <Link to={url}>{breadcrumbNameMap[url]}</Link>
        </Breadcrumb.Item>;
    });
    const breadcrumbItems = [
        <Breadcrumb.Item key="home">
            <Link to="/">Главная</Link>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);

    return <div className="breadcrumb-block">
                        <span className="main-icon">
                            <Icon type="home"/>
                        </span>
        <div className="info-block">
            <Breadcrumb className="breadcrumb">{breadcrumbItems}</Breadcrumb>
        </div>
    </div>;
});