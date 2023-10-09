import "./messageInput.scss"
import clipImg from "../assets/PaperClip_4895.png"

function MessageInput() {
  return (
    <div className="message-input">
      <label htmlFor="file-input" id="file-label">
        <img src={clipImg}></img>
      </label>
      <input id="message-text" placeholder="Введите сообщение..."></input>
      <input type="file" id="file-input" accept="image/*, application/pdf" />
      
      <button id="send-button">Send</button>
    </div>
  );
}

export default MessageInput;
