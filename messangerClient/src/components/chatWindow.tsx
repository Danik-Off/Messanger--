import "./chatWindow.scss";
import ItemMsg from "./itemMsg";
import MessageInput from "./messageInput";

function ChatWindow() {
  const msgs: Message[] = [
    { id: 0, text: "Hello", from: 0, attachments: [] },
    { id: 0, text: "World", from: 0, attachments: [] },
    { id: 0, text: "!", from: 0, attachments: [] },
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
