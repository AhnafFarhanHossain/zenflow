"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import { Message, ChildrenProps } from "@/types";

interface ChatContextType {
  chatLog: Message[];
  setChatLog: React.Dispatch<React.SetStateAction<Message[]>>;
  startNewChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: ChildrenProps) => {
  const [chatLog, setChatLog] = useState<Message[]>([]);
  const hasMounted = useRef(false);

  // Load chat log from local storage after mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      hasMounted.current = true;
      const savedChatLog = localStorage.getItem("chatLog");
      if (savedChatLog) {
        setChatLog(JSON.parse(savedChatLog));
      }
    }
  }, []);

  // Save chat log to local storage whenever it changes
  useEffect(() => {
    if (hasMounted.current && typeof window !== "undefined") {
      localStorage.setItem("chatLog", JSON.stringify(chatLog));
    }
  }, [chatLog]);

  // Handle starting a new chat
  const startNewChat = () => {
    setChatLog([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("chatLog");
    }
  };

  const value: ChatContextType = {
    chatLog,
    setChatLog,
    startNewChat,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};