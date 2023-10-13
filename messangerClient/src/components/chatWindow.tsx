import { useDispatch, useSelector } from "react-redux";
import { selectDialogsState, setActiveDialogPeer } from "../features/dialogs/dialogSlice";
import "./chatWindow.scss";
import ItemMsg from "./itemMsg";
import MessageInput from "./messageInput";


function ChatWindow() {
  const dispatch =  useDispatch();
  const dialogSelected = useSelector(selectDialogsState) ;
  console.log(dialogSelected);


  const msgs: Message[] = [
    { id: 0, text: "Hello", from: 0, attachments: [],dateTime:"10:30 9 октября 2023" },
    { id: 0, text: "Hello", from: 40, attachments: [],dateTime:"10:40 9 октября 2023" },
    { id: 0, text: "Hello", from: 0, attachments: [],dateTime:"10:46 9 октября 2023" },
    { id: 0, text: "Hello", from: 40, attachments: [],dateTime:"10:49 9 октября 2023" },

  ];

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>Chat with Contact 1</h2>
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
