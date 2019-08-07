import React, {useEffect, useState} from 'react';
import './App.less';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useStore} from "../store/useStore";
import {Icon} from "antd";
import {Auth} from "./auth/Auth";
import {Admin} from "./users/admin/Admin";
import {FETCH_CURRENT_USER_DATA} from "../store/user/_reducer";
import DirectorFranchise from "./users/director-franchise/DirectorFranchise";
import {DOMAIN_API} from "../store/api/_reducer";

const App = () => {
    let [loader, setLoader] = useState(true);
    let [state, dispatch] = useStore();

    // Изменения или Создание Api Токена
    let apiChangeAccessToken = (token?: string): any => {
        if (token)
            localStorage.setItem('EON_API_TOKEN_ACCESS', token);
        if (localStorage.getItem('EON_API_TOKEN_ACCESS') !== null)
            state.api.guest.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('EON_API_TOKEN_ACCESS');
    };

    // Вывод данных текущего прользователя
    let fetchCurrentUserData = async () => {
        try {
            let response = await state.api.user_general.get('');
            if (response.data.access === 'student' || response.data.access === 'teacher')
                alert(1);
            else {
                dispatch({type: FETCH_CURRENT_USER_DATA, payload: response.data});
                state.api.user_access.defaults.baseURL = DOMAIN_API + '/user/' + response.data.access;
            }
        } catch (e) {
            console.log(e);
        }
        setLoader(false);
    };

    useEffect(() => {
        (async () => {
            apiChangeAccessToken();
            await fetchCurrentUserData();
        })();
    }, []);

    const AccessLayouts = () =>
        state.user.access === 'admin' ? <Admin/> :
            state.user.access === 'director-franchise' ?
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
                    <Route exact path="**" render={() => state.user.id ?
                        <AccessLayouts/> :
                        <Auth apiChangeAccessToken={apiChangeAccessToken}
                              fetchCurrentUserData={fetchCurrentUserData}/>}/>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
