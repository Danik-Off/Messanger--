import Header from "./components/header";
import Dialogs from "./components/dialogs";
import ChatWindow from "./components/chatWindow";
import "./App.scss";
function App() {


  return (
    <div className="conteiner">
      <Header></Header>
      <div className="content">
        <Dialogs></Dialogs>
        <ChatWindow></ChatWindow>
      </div>
    </div>
  );
}

export default App;
