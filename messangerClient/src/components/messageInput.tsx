import "./messageInput.scss";
import clipImg from "../assets/PaperClip_4895.png";
import { useDispatch, useSelector } from "react-redux";
import { sendMsg } from "../features/msgs/msgsSlice";
import { selectActiveDialog } from "../features/dialogs/dialogSlice";
import { useState } from "react";


function MessageInput() {
  const [textVal, setTextVal] = useState("");
  const actualDialog = useSelector(selectActiveDialog);

  const handleChange = (event: any) => {
    setTextVal(event.target.value);
  };

  const dispatch = useDispatch();

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
  const clickEnter = (e: any): any => {
    if (e.key == "Enter") {
      clickSendMsg();
    }
  };
  return (
    <div className="message-input">
      <label htmlFor="file-input" id="file-label">
        <img src={clipImg}></img>
      </label>
      <input
        id="message-text"
        value={textVal}
        onKeyDown={clickEnter}
        onChange={handleChange}
        placeholder="Введите сообщение..."
      ></input>
      <input type="file" id="file-input" accept="image/*, application/pdf" />

      <button id="send-button" onClick={clickSendMsg}>
        Send
      </button>
    </div>
  );
}

export default MessageInput;
