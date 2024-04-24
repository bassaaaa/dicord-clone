import "./Chat.scss";
import ChatHeader from "./ChatHeader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GifIcon from "@mui/icons-material/Gif";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ChatMessage from "./ChatMessage";
import { useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { CollectionReference, DocumentData, DocumentReference, Timestamp, addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

interface Message {
  timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

const Chat = () => {
  const [inputText, setInputText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const channelName = useAppSelector((state) => state.channel.channelName);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const collectionRef: CollectionReference<DocumentData> = collection(db, "channels", String(channelId), "messages");

    const collectionRefOrderBy = query(collectionRef, orderBy("timestamp", "asc"));

    onSnapshot(collectionRefOrderBy, (snapshot) => {
      const results: Message[] = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          timestamp: doc.data().timestamp,
          message: doc.data().message,
          user: doc.data().user,
        });
      });
      setMessages(results);
    });
  }, [channelId]);

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    // channels collectionの中にあるmessages コレクション中にinputTextを追加する
    const collectionRef: CollectionReference<DocumentData> = collection(db, "channels", String(channelId), "messages");

    const docRef: DocumentReference<DocumentData> = await addDoc(collectionRef, {
      message: inputText,
      timestamp: serverTimestamp(),
      user: user,
    });
    setInputText("");
  };

  return (
    <div className="chat">
      {/* chatHeader */}
      <ChatHeader channelName={channelName} />
      {/* chatMessage */}
      <div className="chatMessage">
        {messages.map((message, index) => (
          <ChatMessage key={index} timestamp={message.timestamp} message={message.message} user={message.user} />
        ))}
      </div>
      {/* chatInput */}
      <div className="chatInput">
        <AddCircleOutlineIcon />
        <form>
          <input type="text" placeholder="#Udemyへメッセージを送信" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)} value={inputText} />
          <button type="submit" className="chatInputButton" onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => sendMessage(e)}>
            送信
          </button>
        </form>
        <div className="chatInputIcons">
          <CardGiftcardIcon />
          <GifIcon />
          <EmojiEmotionsIcon />
        </div>
      </div>
    </div>
  );
};

export default Chat;
