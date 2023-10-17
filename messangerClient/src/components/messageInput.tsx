import "./messageInput.scss";
import clipImg from "../assets/PaperClip_4895.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { sendMsg } from "../features/msgs/msgsSlice";
import { Value } from "sass";
import { selectActiveDialog } from "../features/dialogs/dialogSlice";

function MessageInput() {
  const [textVal, setTextVal] = useState("");
  const actualDialog = useSelector(selectActiveDialog);

  const handleChange = (e: any) => {
    setTextVal(e.target.value);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        clickSendMsg();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  const clickSendMsg = () => {
    if (textVal) {
      dispatch(sendMsg({ peer_id: actualDialog?.peer_id, 
        msg: {text:textVal} as Message }) as any);
      setTextVal("");
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
