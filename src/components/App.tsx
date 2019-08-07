import React, {useEffect, useState} from 'react';
import './App.less';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Icon} from "antd";
import {Auth} from "./auth/Auth";
import {Admin} from "./users/admin/Admin";
import DirectorFranchise from "./users/director-franchise/DirectorFranchise";
import {useDispatch, useSelector} from "react-redux";
import {apiChangeAccessToken} from "../store/api/actions";
import {fetchCurrentUserData} from "../store/user/actions";

interface AppPropTypes {
    user: any,
    loader: boolean,
}

const App: React.FC<AppPropTypes> = ({user, loader}) => {
    const AccessLayouts = () =>
        user.access === 'admin' ? <Admin/> :
            user.access === 'director-franchise' ?
                <DirectorFranchise/> : <Admin/>;

    return (
        <Router>
            <div className="App">
                {/* Loading */}
                {!loader ||
                <div className="loader">
                    <Icon type="loading" style={{fontSize: 24}} spin/>
                </div>}

                {/* Pages */}
                <Switch>
                    <Route exact path="**" render={() => user.id ?
                        <AccessLayouts/> :
                        <Auth/>}/>
                </Switch>
            </div>
        </Router>
    );
};

const AppState = () => {
    const {user, app, api} = useSelector((state: any) => (state));
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            dispatch(apiChangeAccessToken());

            dispatch(fetchCurrentUserData());
        })();
    }, [api.token]);

    return <App user={user} loader={app.loading}/>
};

export default AppState;
