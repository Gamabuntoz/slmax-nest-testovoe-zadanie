import { FC } from "react";
import { Avatar, Box, Card, Stack, Typography } from "@mui/material";

import { IMessage } from "../../../models/message";

import classes from "./MessageItem.module.scss";

interface MessageItemProps {
  message: IMessage;
}

const MessageItem: FC<MessageItemProps> = ({ message }) => {
  return (
    <Box>
      <Stack direction="row" alignItems="center">
        <Avatar alt={message.owner?.name} src={message.owner?.avatarUrl} />
        <Typography>{message.userName}</Typography>
      </Stack>
      <Card classes={{ root: classes.message }}>
        <Typography variant="body1">{message.content}</Typography>
          {message.file && <a href={message.file} download target='_blank' rel="noreferrer" >file</a>}
      </Card>
    </Box>
  );
};

export default MessageItem;
