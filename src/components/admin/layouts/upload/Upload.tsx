import React, {useState} from "react";
import './Upload.less';
import {Col, Icon, Input, Form} from "antd";

function getBase64(img: Blob, callback: { (imageUrl: any): void; (arg0: string | ArrayBuffer | null): void; }) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

export const UploadInput = (props: any) => {
    const [imageUrl, setImageUrl] = useState();
    const {getFieldDecorator} = props.form;

    const handleChange = (e: { target: { files: Blob[]; }; }) => {
        // Get this url from response in real world.
        return getBase64(e.target.files[0], (imageUrl: any) => {
            setImageUrl(imageUrl);
            props.form.setFieldsValue({picture: imageUrl})
        });
    };

    return <Form.Item label="Картинка">
        <div className="uploadBlock">
            <label htmlFor="input-file">
                {imageUrl || props.form.getFieldValue('picture') ? <img src={imageUrl || props.form.getFieldValue('picture')} alt="image"/> : <Icon type="plus" className="add-icon"/>}
                // @ts-ignore
                <input type="file" onChange={handleChange} id="input-file" hidden/>
                {getFieldDecorator('picture', {
                    rules: [{required: true, message: 'Выберите картинку!'}],
                })(
                    <Input/>
                )}
            </label>
        </div>
    </Form.Item>
};
