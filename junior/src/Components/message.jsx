import "../css/comp/message.css";
function Message(message) {
  return (
    <div className={message.type == 1 ? "message" : "message message-me"}>
      <div className="message-div">
        <div className="message-header">
          
          <p className="message-time">15:25</p>
        </div>
        <p className="message-content">{message.content}</p>
      </div>
    </div>
  );
}
export default Message;
