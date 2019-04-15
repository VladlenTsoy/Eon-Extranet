import React, {useEffect, useState} from 'react';
import './Chat.less';
import {Card, Skeleton, Typography, Tabs, Comment, Empty, Spin, Form, Avatar, Input} from "antd";
import {useStore} from "../../../../store/useStore";

const Search = Input.Search;

export const Chat = ({id}: any) => {
    const [state] = useStore();
    const [loader, setLoader] = useState(true);
    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState('');
    const [scrollChat, setScrollChat] = useState();

    const fetchMessages = async () => {
        let messages = await state.api.user_access.get(`chat/${id}`);
        setLoader(false);
        setChat(messages.data);
    };

    useEffect(() => {
        fetchMessages();
        let interval = setInterval(() => fetchMessages(), 5000);

        return () => clearInterval(interval);
    }, []);

    const sendMessage = async (value: string) => {
        setMessage('');
        let response = await state.api.user_access.post(`chat/${id}`, {send_id: id, message: value});
        // @ts-ignore
        setChat([...chat, response.data]);
    };

    if (scrollChat)
        scrollChat.scrollTop = scrollChat.scrollHeight;

    return <Spin spinning={loader}>
        <div className="chat-block">
            <div className="chat-messages-block" ref={(el: any) => setScrollChat(el)}>
                {chat.length ? chat.map((message: any, key: number) => (<div key={key}>
                    {message.user ? <div className="message-block">
                        <figure className="avatar"><img src={message.user.image}/></figure>
                        {message.message}
                        <div className="timestamp">{message.send_at}</div>
                    </div> : <div className="message-block message-personal">
                        {message.message}
                        <div className="timestamp">{message.send_at}</div>
                    </div>}
                </div>)) : <Empty/>}
            </div>
        </div>
        <Form.Item>
            <Search
                placeholder="Написать сообщение..."
                onSearch={sendMessage}
                value={message}
                onChange={(e: any) => setMessage(e.target.value)}
                enterButton={<span>Отправить</span>}
            />
        </Form.Item>
    </Spin>;
};
