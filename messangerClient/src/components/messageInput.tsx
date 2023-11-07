import React, { useState } from "react";
import "./messageInput.scss";
import clipImg from "../assets/PaperClip_4895.png";
import { useDispatch, useSelector } from "react-redux";
import { sendMsg } from "../features/msgs/msgsSlice";
import { selectActiveDialog } from "../features/dialogs/dialogSlice";
import AttachmentItem from "./attachmentItem";

function MessageInput() {
  const [textVal, setTextVal] = useState("");
  const actualDialog = useSelector(selectActiveDialog);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextVal(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedFiles([...selectedFiles, ...filesArray]);
      event.target.value = ""; // Reset the file input field to allow selecting the same files again
    }
  };

  const removeAttachment = (fileToRemove: File) => {
    const updatedFiles = selectedFiles.filter((file) => file !== fileToRemove);
    setSelectedFiles(updatedFiles);
  };

  const clickSendMsg = () => {
    if (textVal) {
      dispatch(
        sendMsg({
          peer_id: actualDialog?.peer_id,
          msg: { text: textVal } as Message,
        }) as any
      );
      setTextVal("");
    }
  };

  const clickEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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
        <input
          type="file"
          id="file-input"
          onChange={handleFileChange}
          accept="image/*, application/pdf"
        />
        <button id="send-button" onClick={clickSendMsg}>
          Send
        </button>
      </div>
    </>
  );
}

export default MessageInput;
