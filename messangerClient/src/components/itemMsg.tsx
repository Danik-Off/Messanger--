import "./itemMsg.scss";

function ItemMsg(props: Message) {
  return (
    <>
      <div className={"message " +( (props.from != 0) ? "received" : "sent")}>
        <div className="message-content">
          <p>{props.text}</p>
          <span className="timestamp">{props.dateTime}</span>
        </div>
      </div>
    </>
  );
}

export default ItemMsg;
