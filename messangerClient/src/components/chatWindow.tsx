import { useDispatch, useSelector } from "react-redux";
import { selectActiveDialog, selectDialogsState, setActiveDialogPeer } from "../features/dialogs/dialogSlice";
import "./chatWindow.scss";
import ItemMsg from "./itemMsg";
import MessageInput from "./messageInput";
import { useEffect } from "react";
import { fetchMsgs, selectMsgs } from "../features/msgs/msgsSlice";


function ChatWindow() {
  
  const dispatch =  useDispatch();
  const dialogSelected = useSelector(selectDialogsState) ;
  const actualDialog =  useSelector(selectActiveDialog);

  const msgs = useSelector(selectMsgs) as Message[];

  console.log(msgs)
  const peer_id = actualDialog?.peer_id??0;

  useEffect(()=>{
    dispatch(fetchMsgs(peer_id) as any);
  },[actualDialog])


 
  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>{actualDialog?.title}</h2>
      </div>
      <div className="chat-messages">
        {[...msgs].map((msg, i) => (
          <ItemMsg
            id={msg.id}
            text={msg.text}
            from={msg.from}
            dateTime={msg.dateTime}
            attachments={msg.attachments}
            key={i}
          />
        ))}
      </div>
      <MessageInput></MessageInput>
    </div>
  );
}

export default ChatWindow;
