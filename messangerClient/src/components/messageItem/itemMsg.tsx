import { Attachment } from '../../interfaces/attachment';
import { Message } from '../../interfaces/msg';
import './itemMsg.scss';

function MessageBubble({ text }: { text: string }) {
    return <div className="message-bubble">{text}</div>;
}

function MessageStatus({ isRead }: { isRead: boolean }) {
    return (
        <div className="message-status">
            {isRead ? <span className="read-icon">✓</span> : <span className="unread-icon">✓</span>}
        </div>
    );
}

function MessageAttachments({ attachments }: { attachments: Attachment[] | string }) {
    console.log('a', attachments);

    // name
    // :
    // "Logo.png"
    // path
    // :
    // "/uploads/attachments/1719392395_Logo.png"
    // type
    // :
    // "photo"
    const file_host: string = 'http://new.lspu-lipetsk.ru/';
    if(typeof(attachments)==="string"){
        return<div></div>
    }
    const att = attachments.map((attachment, index) => {
        switch (attachment.type) {
            case 'photo':
                return (
                    <img
                        key={index}
                        alt={attachment.name}
                        src={`${file_host}${attachment.path}`}
                        style={{ maxWidth: '100%', maxHeight: '100px', margin: '5px' }}
                    />
                );
            default:
                return (
                    <div key={index} style={{ margin: '5px' }}>
                        <a href={`${file_host}${attachment.path}`} target="_blank" rel="noopener noreferrer">
                            {attachment.name}
                        </a>
                    </div>
                );
        }
    });
    return <div className="attachemnts">{att}</div>;
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

function ItemMsg(msg: Message) {
    console.log(msg);
    return (
        <div className={`message ${msg.from === 0 ? '' : 'received'}`}>
            <div className="container">
                <div className="contMsg">
                    <div>
                        <MessageAttachments attachments={msg.attachments }></MessageAttachments>
                    </div>
                    <MessageBubble text={msg.text} />
                </div>
                <div className="footerMsg">
                    <MessageTimestamp dateTime={msg.dateTime} />
                    <MessageStatus isRead={msg.isRead} />
                </div>
            </div>
        </div>
    );
}

export default ItemMsg;
