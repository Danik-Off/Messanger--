import { useDispatch, useSelector } from 'react-redux';
import { selectActiveDialog } from '../../features/dialogs/dialogSlice';
import './chatPage.scss';

import { useEffect, useRef, useState } from 'react';
import { fetchMsgs, selectMsgs } from '../../features/msgs/msgsSlice';

import logo from '../../assets/logo.png';

import LeftNavigation from '../../components/leftMenu';
import ItemMsg from '../../components/messageItem/itemMsg';
import MessageInput from '../../components/chatInput/messageInput';

function MainPageRender() {
    const dispatch = useDispatch();
    const actualDialog = useSelector(selectActiveDialog);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const msgs = useSelector(selectMsgs) as Message[];

    let VLB = false;
    if (window.innerWidth >= 600) {
        VLB = true;
    }
    const [visibleLeftMenu, setVisibleLeftMenu] = useState(VLB);

    const peer_id = actualDialog?.peer_id ?? 0;

    useEffect(() => {
        dispatch(fetchMsgs(peer_id) as any);
        scrollToBottom();
    }, [msgs.length, actualDialog]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const shoOrHide = () => {
        setVisibleLeftMenu(!visibleLeftMenu);
    };

    return (
        <div className="chat-page">
            <div className="left-menu" style={{ display: visibleLeftMenu ? 'flex' : 'none' }}>
                <div className="back" onClick={shoOrHide}></div>
                <LeftNavigation onClickClose={shoOrHide}></LeftNavigation>
            </div>

            <div className="chat-window">
                <div className="chat-header">
                    <button onClick={shoOrHide}>☰</button>
                    <h2>{actualDialog?.title}</h2>
                    <a className="logo" href="https://lspu-lipetsk.ru/">
                        <img src={logo}></img>
                    </a>
                </div>
                <div className="chat-messages">
                    {msgs.map((msg, i) => (
                        <ItemMsg
                            id={msg.id}
                            text={msg.text}
                            from={msg.from}
                            dateTime={msg.dateTime}
                            isRead={msg.isRead}
                            attachments={msg.attachments}
                            key={i}
                        />
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <MessageInput></MessageInput>
            </div>
        </div>
    );
}

export default MainPageRender;
