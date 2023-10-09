import ChatWindow from "../components/chatWindow";
import Dialogs from "../components/dialogs";

function ChatPage() {
  return (
    <div className="content">
      <Dialogs></Dialogs>
      <ChatWindow></ChatWindow>
    </div>
  );
}

export default ChatPage;
