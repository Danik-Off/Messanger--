import "./itemMsg.scss";

function MessageBubble({ text }: { text: string }) {
  return <div className="message-bubble">{text}</div>;
}

function MessageStatus({ isRead }: { isRead: boolean }) {
  return (
    <div className="message-status">
      {isRead ? (
        <span className="read-icon">✓</span>
      ) : (
        <span className="unread-icon">✓</span>
      )}
    </div>
  );
}

function MessageTimestamp({ dateTime }: { dateTime: string }) {
  const dT = new Date(dateTime);
  const hours = dT.getHours();
  const minutes = dT.getMinutes();
  
  // Format hours and minutes as two digits with leading zeros
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  
  return (
    <div className="message-timestamp">
      {formattedHours}:{formattedMinutes}
    </div>
  );
}

function ItemMsg({ id, from, text, dateTime, isRead }: Message) {
  return (
    <div className={`message ${from === 0 ? "" : "received"}`}>
    <div className="container" >
      <div className="contMsg">
      <MessageBubble text={text} />
      </div>
      <div className="footerMsg">
        <MessageTimestamp dateTime={dateTime} />
        <MessageStatus isRead={isRead} />
      </div>
    </div>
    </div>
  );
}

export default ItemMsg;
