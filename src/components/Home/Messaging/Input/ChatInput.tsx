import "./ChatInput.css";

import { FC, useState, ChangeEvent, FormEvent } from "react";

import { Box, Button, TextField } from "@mui/material";

interface ChatInputProps {
  onSubmit: (message: string) => void;
}

export const ChatInput: FC<ChatInputProps> = ({ onSubmit }) => {
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() !== "") {
      onSubmit(message);
      setMessage("");
    }
  };

  return (
    <form className="mt-12" onSubmit={handleSubmit}>
      <Box display="flex" alignItems="center">
        <div className="chat-input">
          <TextField
            type="text"
            label="Type your message..."
            value={message}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="chat-button">
          <Button
            className="send-button"
            type="submit"
            variant="contained"
          >
            Send
          </Button>
        </div>
      </Box>
    </form>
  );
};
