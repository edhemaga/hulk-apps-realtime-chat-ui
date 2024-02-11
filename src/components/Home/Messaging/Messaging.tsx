import React, { useState } from "react";
import { ChatInput } from "./Input/ChatInput";

interface Message {
  text: string;
  sender: string;
}

export const Messaging: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = (message: string) => {
    setMessages([...messages, { text: message, sender: "user" }]);
    // Add logic for sending the message to the server or processing it as needed
  };

  return (
    <div className="w-full m-12">
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.text}</div>
        ))}
      </div>
      <div className="">
        <ChatInput onSubmit={handleSendMessage} />
      </div>
    </div>
  );
};
