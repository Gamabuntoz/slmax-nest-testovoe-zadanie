import { FC } from "react";
import { Box } from "@mui/material";

import { useRoom } from "../../hooks/useRoom";
import AddMessageForm from "../../components/forms/add-message-form";
import MessagesList from "../../components/messages/messages-list";
import RoomHeader from "../../components/rooms/room-header";
import MessageTypingNotification from "../../components/messages/message-typing-notification";

const RoomPage: FC = () => {
  const { room, messages, notifications, pageRef, id, search, setSearch } = useRoom();

  return (
    <Box ref={pageRef}>
      {room && <RoomHeader room={room} />}
      <MessagesList messages={messages || []} />
        <input value={search} onChange={(e)=> setSearch(e.target.value)} placeholder='search'/>
      {/*<MessageTypingNotification notifications={notifications || []} />*/}
      <AddMessageForm roomId={id} />
    </Box>
  );
};

export default RoomPage;
