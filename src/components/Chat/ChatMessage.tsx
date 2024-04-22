import "./ChatMessage.scss";
import { Avatar } from "@mui/material";

const ChatMessage = () => {
  return (
    <div className="message">
      <Avatar />
      <div className="messageInfo">
        <h4>
          ShinCode
          <span className="messageTimeStamp">2024/04/22</span>
        </h4>
        メッセージ本文
      </div>
    </div>
  );
};

export default ChatMessage;
