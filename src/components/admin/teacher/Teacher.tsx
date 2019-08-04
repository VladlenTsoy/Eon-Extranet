import React, {useEffect, useState} from 'react';
import {Button, Card, PageHeader, Tag} from "antd";
import {useStore} from "../../../store/useStore";
import {Link} from "react-router-dom";

const Teacher = ({match}: any) => {
    const {franchiseId, centerId, id} = match.params;
    const [state] = useStore();
    const [teacher, setTeacher] = useState();

    useEffect(() => {
        (async () => {
            const response = await state.api.user_access.get(`/teacher/${id}`);
            setTeacher(response.data);
        })();
    }, []);

    return <Card className="_card" loading={!teacher}>
        {!!teacher ?
            <PageHeader
                className="header-center"
                title={`${teacher.first_name} ${teacher.last_name}`}
                tags={[
                    <Tag color="red" key="hide">Скрыт</Tag>,
                    <Tag color="red" key="lock">Заблокирован</Tag>,
                ]}
                extra={[
                    <Link to={`/franchises/${franchiseId}/centers/${centerId}/users/${id}`} key="1">
                        <Button icon="edit">
                            Редактировать
                        </Button>
                    </Link>,
                    match.day_block ?
                        <Button key="2" icon="unlock">Разблокировать</Button> :
                        <Button key="2" icon="lock">Заблокировать</Button>,
                    match.hide ?
                        <Button key="3" icon="eye">Показать</Button> :
                        <Button key="3" icon="eye-invisible">Скрыть</Button>,
                    <Button key="4" type="danger" icon="delete">
                        Удалить
                    </Button>,
                ]}
            >

            </PageHeader>
            : null}
    </Card>;
};

export default Teacher;