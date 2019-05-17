import React, {useEffect, useState} from "react";
import {Editor} from '../../layouts/editor/Editor';
import {useStore} from "../../../../store/useStore";
import {Col, Form, Input, Select, Row} from "antd";
import {UploadInput} from "../../layouts/upload/Upload";
import {Map} from "../../layouts/settings/map/Map";

const {TextArea} = Input;
const Option = Select.Option;

const EditorCenter = ({match, form}: any) => {
    const [state] = useStore();
    const {getFieldDecorator} = form;
    const [cities, setCities] = useState([]);
    const [franchises, setFranchises] = useState([]);
    const [prices, setPrices] = useState([]);
    const [position, setPosition]: any = useState(false);
    const [mapPosition, setMapPosition]: any = useState({lat: 41.29242, lng: 69.27517});
    const [loading, setLoading] = useState(true);
    const id = match.params.id;

    const clickMap = (e: any) => {
        setPosition({lat: e.latLng.lat(), lng: e.latLng.lng()});
        form.setFieldsValue({position: {lat: e.latLng.lat(), lng: e.latLng.lng()}})
    };

    const fetchData = async () => {
        let cities = await state.api.guest.get('cities');
        let franchises = await state.api.user_access.get('franchises');
        let prices = await state.api.user_access.get('prices');

        setCities(cities.data.data);
        setFranchises(franchises.data.data);
        setPrices(prices.data.data);

        if (id) {
            let response = await state.api.user_access.get(`center/${id}`);
            form.setFieldsValue({
                title: response.data.title,
                description: response.data.description,
                image: response.data.url_image,
                city_id: response.data.city_id,
                franchise_id: response.data.franchise_id,
                position: response.data.position,
            });
            setPosition(response.data.position);
            setMapPosition(response.data.position);
        }
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        fetchData()
    }, []);

    return <Editor title="Центр" linkToSave={'center'} reference={'centers'} loading={loading} id={id} form={form} span={24}>
        <Row type="flex" justify="center" className="form-row">
            <Col span={8}>
                <Form.Item label="Название">
                    {getFieldDecorator('title', {
                        rules: [{required: true, message: 'Введите название!'}],
                    })(
                        <Input style={{width: '100%'}} placeholder="Введите название"/>
                    )}
                </Form.Item>
                <Form.Item label="Описание">
                    {getFieldDecorator('description', {
                        rules: [{required: true, message: 'Введите описание!'}],
                    })(
                        <TextArea style={{width: '100%'}} placeholder="Введите описание" rows={6}/>
                    )}
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label="Город">
                    {getFieldDecorator('city_id', {
                        rules: [{required: true, message: 'Выберите город!'}],
                    })(
                        <Select showSearch style={{width: '100%'}} placeholder="Выберите город">
                            {cities.map((option: any, key: any): any =>
                                <Option value={option.id} key={key}>{option.title}</Option>)}
                        </Select>
                    )}
                </Form.Item>
                <UploadInput form={form} name="image" label="Лого"/>
            </Col>
            <Col span={8}>
                <Form.Item label="Франшизы">
                    {getFieldDecorator('franchise_id', {
                        rules: [{required: true, message: 'Выберите франшизу!'}],
                    })(
                        <Select showSearch style={{width: '100%'}} placeholder="Выберите франшизу">
                            {franchises.map((option: any, key: any): any =>
                                <Option value={option.id} key={key}>{option.title}</Option>)}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="Прайс">
                    {getFieldDecorator('price_id', {
                        rules: [{required: true, message: 'Выберите прайс!'}],
                    })(
                        <Select showSearch style={{width: '100%'}} placeholder="Выберите прайс">
                            {prices.map((option: any, key: any): any =>
                                <Option value={option.id} key={key}>{option.title}</Option>)}
                        </Select>
                    )}
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item label="Местоположение">
                    {getFieldDecorator('position', {
                        // rules: [{required: true, message: 'Введите местоположение'}],
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
            </Col>
        </Row>
    </Editor>;
};

export const EditorCenterForm = Form.create()(EditorCenter);
