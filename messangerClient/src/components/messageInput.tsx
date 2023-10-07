import "./messageInput.scss"
function MessageInput() {
  return (
    <div className="message-input">
      <textarea id="message-text" placeholder="Type your message..."></textarea>
      <input type="file" id="file-input" accept="image/*, application/pdf" />
      <label htmlFor="file-input" id="file-label">
        <span className="file-icon">📎</span> Attach File
      </label>
      <button id="send-button">Send</button>
    </div>
  );
}

export default MessageInput;
