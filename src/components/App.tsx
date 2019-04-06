import React, {useEffect, useReducer, useState} from 'react';
import './App.less';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Icon} from "antd";
import {Auth} from "./components/auth/Auth";
import {FETCH_CURRENT_USER_DATA, userReducer, defaultUserState} from "./store/user/reducer";
import {reducerApi, defaultApiState} from "./store/api/reducer";
import {Admin} from "./components/admin/Admin";

const App = () => {
    let [user, userDispatch] = useReducer(userReducer, defaultUserState);
    // @ts-ignore
    let [api] = useReducer(reducerApi, defaultApiState);
    let [loader, setLoader] = useState(true);

    // Изменения или Создание Api Токена
    let apiChangeAccessToken = (token?: string): any => {
        if (token)
            localStorage.setItem('EON_API_TOKEN_ACCESS', token);
        if (localStorage.getItem('EON_API_TOKEN_ACCESS') !== null)
            api.guest.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('EON_API_TOKEN_ACCESS');
    };

    // Вывод данных текущего прользователя
    let fetchCurrentUserData = () => {
        api.user_general.get('')
            .then((response: any) => userDispatch({type: FETCH_CURRENT_USER_DATA, payload: response.data}))
            .catch((error: any) => error)
            .finally(() => setLoader(false));
    };

    useEffect(() => {
        apiChangeAccessToken();
        fetchCurrentUserData();
    }, []);

    return (
        <Router>
            <div className="default-theme-eon">
                {!loader ||
                <div className="loader">
                    <Icon type="loading" style={{fontSize: 24}} spin/>
                </div>}
                <Switch>
                    <Route exact path="**" render={() => user.id ? <Admin/> :
                        <Auth apiChangeAccessToken={apiChangeAccessToken}
                              fetchCurrentUserData={fetchCurrentUserData}/>}/>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
