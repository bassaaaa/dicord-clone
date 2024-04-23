import { DocumentData } from "firebase/firestore";
import "./SidebarChannel.scss";

type Props = {
  id: string;
  channel: DocumentData;
};

const SidebarChannel = (props: Props) => {
  return (
    <div className="sidebarChannel">
      <h4>
        <span className="sidebarChannelHash">#</span>
        {props.channel.channel.channelName}
      </h4>
    </div>
  );
};

export default SidebarChannel;
