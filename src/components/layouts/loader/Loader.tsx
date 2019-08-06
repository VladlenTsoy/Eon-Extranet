import React from 'react';
import './Loader.less';
import {Icon, Spin} from 'antd';

const LoaderBlock = () => {
    return <div className="loading-block">
        <div className="loading">
            <Spin indicator={<Icon type="loading"/>}/>
            <p>Загрузка...</p>
        </div>
    </div>;
};

export default LoaderBlock;
