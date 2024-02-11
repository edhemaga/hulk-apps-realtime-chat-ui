import React, { useEffect, useState } from "react";

import io from "socket.io-client";

import { IMessage } from "../../../shared/models/Message/IMessage";

import { ChatInput } from "./Input/ChatInput";

type Props = {
  userId: string;
  groupId: string;
}

export const Messaging: React.FC<Props> = ({ userId, groupId }) => {
  const [messages, setMessages] = useState<Partial<IMessage>[]>([]);


  const socket = io("http://localhost:3001", {
    transports: ["websocket", "polling"]
  });

  socket.connect();
  socket.on(`receive_message`, (data: any) => {
    console.log(data);
    setMessages(prev => [...prev, data.data])
  })

  const handleSendMessage = async (message: string) => {

    const messageToSend: Partial<IMessage> = {
      content: message,
      senderId: userId,
      groupId: groupId
    };
    socket.emit(`send_message`, messageToSend);

  };


  return (
    <div className="w-full m-12">
      <div>
        {messages.map((message, index) => (
          <div key={message?.id}>{message?.content}</div>
        ))}
      </div>
      <div className="">
        <ChatInput onSubmit={handleSendMessage} />
      </div>
    </div>
  );
};
