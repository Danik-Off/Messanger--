import "./itemMsg.scss"

function ItemMsg() {
  

  return (
    <>
     <div className="message received">
          <div className="message-content">
            <p>Contact 1: Hello! How are you doing?</p>
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