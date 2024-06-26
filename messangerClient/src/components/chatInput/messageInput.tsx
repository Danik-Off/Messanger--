import React, { useState } from 'react';
import './messageInput.scss';
import clipImg from '../../assets/icons8-файл-100.png';
import sendImg from '../../assets/icons8-отправить-100.png';

import { useDispatch, useSelector } from 'react-redux';
import { messageAdded, sendMsg } from '../../features/msgs/msgsSlice';
import { selectActiveDialog } from '../../features/dialogs/dialogSlice';
import AttachmentItem from '../attachmentItem';
import { Message } from '../../interfaces/msg';

function MessageInput() {
    const [textVal, setTextVal] = useState('');
    const actualDialog = useSelector(selectActiveDialog);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const dispatch = useDispatch();
    const [loadedFiles, setLoadedFiles] = useState<any>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextVal(event.target.value);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setSelectedFiles([...selectedFiles, ...filesArray]);
            event.target.value = '';
        }
    };

    const removeAttachment = (fileToRemove: File) => {
        const updatedFiles = selectedFiles.filter((file) => file !== fileToRemove);
        setLoadedFiles(loadedFiles.filter((file: any) => file.name !== fileToRemove.name));
        setSelectedFiles(updatedFiles);
    };

    const clickSendMsg = () => {
        if ((textVal && selectedFiles.length == loadedFiles.length) || loadedFiles) {
            dispatch(
                sendMsg({
                    peer_id: actualDialog?.peer_id,
                    msg: { text: textVal, attachments: loadedFiles } as Message,
                }) as any
            );

            dispatch(
                messageAdded({
                    msg: { text: textVal, attachments: loadedFiles, dateTime: Date.now().toString() } as Message,
                })
            );
            setTextVal('');
            setSelectedFiles([]);
        }
    };

    const clickEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            clickSendMsg();
        }
    };

    return (
        <>
            <div className="attachments">
                {selectedFiles.map((file, index) => (
                    <AttachmentItem
                        key={index}
                        selectedFile={file}
                        onRemoveAttachment={() => removeAttachment(file)}
                        onLoad={(file) => {
                            setLoadedFiles([...loadedFiles, file]);
                        }}
                    />
                ))}
            </div>
            <div className="message-input">
                <label htmlFor="file-input" id="file-label">
                    <img src={clipImg} alt="Attachment" />
                </label>
                <input
                    id="message-text"
                    value={textVal}
                    onKeyDown={clickEnter}
                    onChange={handleChange}
                    placeholder="Введите сообщение..."
                />
                <input type="file" id="file-input" onChange={handleFileChange} accept="image/*, application/pdf" />
                <button id="send-button" onClick={clickSendMsg}>
                    <img src={sendImg}></img>
                </button>
            </div>
        </>
    );
}

export default MessageInput;
