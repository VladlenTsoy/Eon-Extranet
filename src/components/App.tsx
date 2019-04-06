import React, {useEffect, useState} from 'react';
import './App.less';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useStore} from "../store/useStore";
import {Icon} from "antd";
import {Auth} from "./auth/Auth";
import {Admin} from "./admin/Admin";
import {FETCH_CURRENT_USER_DATA} from "../store/user/reducer";

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
    let fetchCurrentUserData = () => {
        state.api.user_general.get('')
            .then((response: any) => dispatch({type: FETCH_CURRENT_USER_DATA, payload: response.data}))
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
                    <Route exact path="**" render={() => state.user.id ? <Admin/> :
                        <Auth apiChangeAccessToken={apiChangeAccessToken}
                              fetchCurrentUserData={fetchCurrentUserData}/>}/>
                </Switch>
            </div>
        </Router>
    );
};

export default App;