import React, {useEffect, useState} from "react";
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"
import {Form, Input, Button, Skeleton, Row, Col, Card, Typography, Select} from "antd";
import {withRouter} from "react-router";
import {useStore} from "../../../../../../store/useStore";


const Map = withScriptjs(withGoogleMap((props: any) =>
    <GoogleMap
        defaultZoom={8}
        options={{
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false
        }}
        onClick={props.clickMap}
        defaultCenter={{lat: 41.29242, lng: 69.27517}}
        center={props.mapPosition}
    >
        {props.isMarkerShown && <Marker position={props.position}/>}
    </GoogleMap>
));

interface City {
    data: {
        title: string,
        position: {
            lat: number,
            lng: number,
        },
        lang_id: number,
    }
}

const {Title} = Typography;
const {Option} = Select;

const EditorCity = ({form, history, match}: any) => {
    const {getFieldDecorator} = form;
    const [state] = useStore();
    const [loading, setLoading] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const id = match.params.id;

    //
    const [position, setPosition]: any = useState(false);
    const [mapPosition, setMapPosition]: any = useState({lat: 41.29242, lng: 69.27517});

    const selectById = async (id: any) => {
        let response: City = await state.api.user_access.get(`city/${id}`);
        form.setFieldsValue({
            title: response.data.title,
            position: response.data.position,
            lang_id: response.data.lang_id,
        });
        setMapPosition(response.data.position);
        setPosition(response.data.position);
        setLoading(false);
    };

    if (id) {
        useEffect(() => {
            setLoading(true);
            selectById(id);
        }, []);
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        form.validateFieldsAndScroll(async (err: any, values: any) => {
            if (err) return;

            setLoadingBtn(true);
            let response = id ? await state.api.user_access.post(`city/${id}`, values) : await state.api.user_access.post(`city`, values);

            if (response.data.status === 'success')
                return history.push('/cities')
        });
    };

    function clickMap(e: any) {
        setPosition({lat: e.latLng.lat(), lng: e.latLng.lng()});
        form.setFieldsValue({position: {lat: e.latLng.lat(), lng: e.latLng.lng()}})
    }

    return <Form onSubmit={handleSubmit}>
        <Row type="flex" justify="center">
            <Col span={12}>
                <Card className="_card">
                    <Title level={3} className="title">Город</Title>
                    <Skeleton loading={loading} active/>
                    <div className={loading ? 'hideme' : ''}>
                        <Form.Item label="Название">
                            {getFieldDecorator('title', {
                                rules: [{required: true, message: 'Введите название!'}],
                            })(
                                <Input style={{width: '100%'}} placeholder="Введите название"/>
                            )}
                        </Form.Item>
                        <Form.Item label="Местоположение">
                            {getFieldDecorator('position', {
                                rules: [{required: true, message: 'Выберите метку на карте!'}],
                            })(
                                <Map
                                    isMarkerShown={position}
                                    position={position}
                                    mapPosition={mapPosition}
                                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBSNRntfWg3WQpwR8JWs_36lIXUFbIKpcI"
                                    loadingElement={<div style={{height: `100%`}}/>}
                                    containerElement={<div style={{height: `400px`}}/>}
                                    clickMap={clickMap}
                                    mapElement={<div style={{height: `100%`}}/>}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="Язык">
                            {getFieldDecorator('lang_id', {
                                rules: [{required: true, message: 'Выберите язык!'}],
                            })(
                                <Select showSearch style={{width: '100%'}} placeholder="Выберите язык">
                                    {state.languages.map((language: any) =>
                                        <Option value={language.id} key={language.id}>{language.title}</Option>)}
                                </Select>
                            )}
                        </Form.Item>
                        <Button type="primary" block htmlType="submit" icon="save"
                                loading={loadingBtn}>Сохранить</Button>
                    </div>
                </Card>
            </Col>
        </Row>
    </Form>;
};


// @ts-ignore
export const EditorCityForm = Form.create({name: 'create-category'})(withRouter(EditorCity));
