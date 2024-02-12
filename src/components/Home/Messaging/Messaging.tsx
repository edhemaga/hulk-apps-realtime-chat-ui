import "./Messaging.css";

import React, { useEffect, useState } from "react";

import io from "socket.io-client";

import { IMessage } from "../../../shared/models/Message/IMessage";
import { IGroupWithUserInfo } from "../../../shared/models/Group/IGroup";

import { ChatInput } from "./Input/ChatInput";
import { Message } from "./Message/Message";

type Props = {
  userId: string;
  data: IGroupWithUserInfo;
};
const socket = io("ws://localhost:3001", {
  transports: ["websocket", "polling"],
  auth: {
    token: localStorage.getItem('access_token'), // Set your actual token here
  },
});

export const Messaging: React.FC<Props> = ({ userId, data }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setMessages(data.group.messages ?? []);
  }, [data.group?.id]);

  useEffect(() => {
    socket.on(`receive_message_group_${data.group.id}`, (data: IMessage) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => {
      setMessages([]);
    };
  }, [data.group.id]);

  if (!data.group) return null;

  const handleSendMessage = async (message: string) => {
    const messageToSend: Partial<IMessage> = {
      content: message,
      senderId: userId,
      groupId: data.group.id,
    };
    socket.emit(`send_message`, messageToSend);
  };

  return (
    <div className="w-full m-12">
      <div className="messages-wrapper">
        {messages.map((message, index) => {
          //Remap ID with Full name of user
          const sender = data.usersInfo.find(arg => arg.id == message.senderId)?.fullname;
          if (message?.content) {
            return (
              <Message
                key={message.id ?? index}
                isSender={message.senderId === userId}
                message={message}
                sender={sender ?? message.id}
              ></Message>
            );
          }
        })}
      </div>
      <div className="">
        <ChatInput onSubmit={handleSendMessage} />
      </div>
    </div>
  );
};
