import "./itemMsg.scss"

function ItemMsg(props:Message) {
  

  return (
    <>
     <div className="message received">
          <div className="message-content">
            <p>{props.text}</p>
            <span className="timestamp">10:30 AM</span>
          </div>
        </div>
        <div className="message sent">
          <div className="message-content">
            <p>You: Hi! I'm doing well, thanks.</p>
            <span className="timestamp">10:35 AM</span>
          </div>
        </div>
    </>
  )
}

export default ItemMsg;