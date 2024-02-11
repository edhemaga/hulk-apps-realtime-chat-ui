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
    <form onSubmit={handleSubmit}>
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
            style={{ padding: "15px 48px" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Send
          </Button>
        </div>
      </Box>
    </form>
  );
};
