"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatLog, setChatLog] = useState([]);
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

  return (
    <ChatContext.Provider value={{ chatLog, setChatLog, startNewChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};