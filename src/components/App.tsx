import React, {useEffect, useState} from 'react';
import './App.less';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useStore} from "../store/useStore";
import {Icon} from "antd";
import {Auth} from "./auth/Auth";
import {Admin} from "./admin/Admin";
import {FETCH_CURRENT_USER_DATA} from "../store/user/reducer";
import {FETCH_LANGUAGES} from "../store/language/reducer";

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
            console.log(response.data);
            if (response.data.access === 'student' || response.data.access === 'teacher')
                alert(1);
            else
                dispatch({type: FETCH_CURRENT_USER_DATA, payload: response.data})
        } catch (e) {
            console.log(e);
        }
        setLoader(false);
    };

    const fetchLanguages = async () => {
        let response = await state.api.guest('languages');
        dispatch({type: FETCH_LANGUAGES, payload: response.data.data});
    };

    let dataFetch = async () => {
        apiChangeAccessToken();
        await fetchLanguages();
        await fetchCurrentUserData();
    };

    useEffect(() => {
        dataFetch();
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
