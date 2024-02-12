import React from "react";

import { styled } from "@mui/system";

import Paper from "@mui/material/Paper";

import { IMessage } from "../../../../shared/models/Message/IMessage";
import { formatDate } from "../../../../shared/util/helpers/helper";

type ChatMessageProps = {
  message: Partial<IMessage>;
  isSender: boolean;
  sender: string;
};

type ChatMessageContainerProps = {
  isSender: boolean;
};
const ChatMessageContainer = styled(Paper)<ChatMessageContainerProps>(
  ({ theme, isSender }: any) => ({
    padding: theme.spacing(1),
    maxWidth: "450px",
    minWidth: "250px",
    backgroundColor: isSender ? "#2196f3" : "#f5f5f5",
    color: isSender ? "#fff" : "#333",
    borderRadius: "8px",
    margin: "20px 4px auto auto",
  })
);

export const Message: React.FC<ChatMessageProps> = ({ message, isSender, sender }) => {
  return (
    <div className="flex">
      <ChatMessageContainer
        className={isSender ? "to-right" : "to-left"}
        isSender={isSender}
      >
        <div className="text-xs">Sent by: {sender}</div>
        <p>{message.content}</p>
        {message.createdOn ? (
          <div className="text-xs">
            Sent on: {formatDate(new Date(message.createdOn))}
          </div>
        ) : null}
      </ChatMessageContainer>
    </div>
  );
};
