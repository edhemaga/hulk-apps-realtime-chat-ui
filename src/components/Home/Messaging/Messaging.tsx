import "./Messaging.css";

import React, { useEffect, useState } from "react";

import io from "socket.io-client";

import { IMessage } from "../../../shared/models/Message/IMessage";
import { IGroup } from "../../../shared/models/Group/IGroup";

import { ChatInput } from "./Input/ChatInput";
import { Message } from "./Message/Message";

type Props = {
  userId: string;
  group: IGroup | undefined;
};
const socket = io("ws://localhost:3001", {
  transports: ["websocket", "polling"],
  auth: {
    token: localStorage.getItem('access_token'), // Set your actual token here
  },
});

export const Messaging: React.FC<Props> = ({ userId, group }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setMessages(group?.messages ?? []);
  }, [group?.id]);

  useEffect(() => {
    socket.on(`receive_message_group_${group?.id}`, (data: IMessage) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => {
      setMessages([]);
    };
  }, [userId, group?.id]);

  if (!group) return null;

  const handleSendMessage = async (message: string) => {
    const messageToSend: Partial<IMessage> = {
      content: message,
      senderId: userId,
      groupId: group.id,
    };
    socket.emit(`send_message`, messageToSend);
  };

  return (
    <div className="w-full m-12">
      <div className="messages-wrapper">
        {messages.map((message, index) => {
          if (message?.content) {
            return (
              <Message
                key={message.id ?? index}
                isSender={message.senderId === userId}
                message={message}
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
