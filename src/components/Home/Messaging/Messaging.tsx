import React, { useEffect, useLayoutEffect, useState } from "react";

import io from "socket.io-client";

import { IMessage } from "../../../shared/models/Message/IMessage";

import { ChatInput } from "./Input/ChatInput";
import axios from "axios";
import axiosInstance from "../../../shared/network/axios";
import { Message } from "./Message/Message";

type Props = {
  userId: string;
  groupId: string;
};
const socket = io("ws://localhost:3001", {
  transports: ["websocket", "polling"],
});

export const Messaging: React.FC<Props> = ({ userId, groupId }) => {
  const [messages, setMessages] = useState<Partial<IMessage>[]>([]);

  useLayoutEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(`/message/group/${groupId}`);
      const remappedResponse = response.data.map((arg: any[]) => { return arg[0] });
      setMessages(remappedResponse ?? []);
    };

    fetchData();
  }, []);

  useEffect(() => {
    socket.on(`receive_message_group_${groupId}`, (data: Partial<IMessage>) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  const handleSendMessage = async (message: string) => {
    const messageToSend: Partial<IMessage> = {
      content: message,
      senderId: userId,
      groupId: groupId,
    };
    socket.emit(`send_message`, messageToSend);
  };

  return (
    <div className="w-full m-12">
      <div style={{ height: '70vh', overflow: 'scroll' }}>
        {
          messages.map((message, index) => {
            if (message.content) {
              const isSender = message.senderId === userId;
              return <Message key={message.id ?? index} isSender={isSender} message={message}></Message>
            }
          })
        }
      </div>
      <div className="">
        <ChatInput onSubmit={handleSendMessage} />
      </div>
    </div>
  );
};
