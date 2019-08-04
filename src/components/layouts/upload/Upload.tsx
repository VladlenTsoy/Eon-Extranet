import React, {useState} from "react";
import './Upload.less';
import {Icon, Input, Form} from "antd";

function getBase64(img: Blob, callback: { (imageUrl: any): void; (arg0: string | ArrayBuffer | null): void; }) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

export const UploadInput = ({form, name, label}: any) => {
    const [imageUrl, setImageUrl] = useState();
    const {getFieldDecorator} = form;

    const handleChange = (e: { target: { files: Blob[]; }; }) => {
        // Get this url from response in real world.
        return getBase64(e.target.files[0], (imageUrl: any) => {
            setImageUrl(imageUrl);
            form.setFieldsValue({[name]: imageUrl})
        });
    };

    return <Form.Item label={label}>
        <div className="uploadBlock">
            <label>
                {imageUrl || form.getFieldValue(name) ?
                    <img src={imageUrl || form.getFieldValue(name)} alt="image"/> :
                    <Icon type="plus" className="add-icon"/>}
                <input type="file"
                    // @ts-ignore
                       onChange={handleChange} hidden/>
                {getFieldDecorator(name, {
                    rules: [{required: true, message: 'Выберите картинку!'}],
                })(
                    <Input/>
                )}
            </label>
        </div>
    </Form.Item>
};
