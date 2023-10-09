import ChatWindow from "../components/chatWindow";
import Dialogs from "../components/dialogs";

function SettingsPage() {
  return (
    <div className="content">
      <Dialogs></Dialogs>
      <ChatWindow></ChatWindow>
    </div>
  );
}

export default SettingsPage;
