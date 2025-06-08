"use client";

import { useState, useEffect, useRef } from "react";
import { BotIcon, Loader2, User } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useChat } from "@/contexts/ChatContext";
import { ActionButton } from "./dashboard/ActionButtons";
import { Plus } from "lucide-react";

// Move renderers outside component to avoid recreation
const renderers = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={atomDark}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code {...props}>{children}</code>
    );
  },
};

export default function ChatBot() {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const { user } = useUser();

  // Get chat context
  const { chatLog, setChatLog, startNewChat } = useChat();

  // Component to render user avatar or fallback icon
  const UserAvatar = ({ className = "h-5 w-5" }) => {
    if (user?.imageUrl) {
      return (
        <img
          src={user.imageUrl}
          alt={user.firstName || user.username || "User"}
          className={`${className} rounded-full object-cover border border-gray-200 dark:border-gray-600`}
        />
      );
    }
    return <User className={className} />;
  };

  // Auto-scroll to bottom when new messages arrive or when streaming updates
  useEffect(() => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      const isNearBottom =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 100;

      // Auto-scroll if user is near the bottom or if there's a streaming message
      const hasStreamingMessage = chatLog.some((msg) => msg.isStreaming);
      if (isNearBottom || hasStreamingMessage) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [chatLog]);

  async function handleSend() {
    if (!question.trim() || isLoading) return;

    const userMessage = { sender: user?.firstName || "You", text: question };
    setChatLog((prev) => [...prev, userMessage]);
    setQuestion("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      // Handle streaming response
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                accumulatedText += parsed.content;
                setChatLog((prev) => {
                  const newChatLog = [...prev];
                  newChatLog[newChatLog.length - 1] = {
                    sender: "AI",
                    text: accumulatedText,
                    isStreaming: true,
                  };
                  return newChatLog;
                });
              }
            } catch (e) {
              // Skip malformed JSON
            }
          }
        }
      }

      // Mark streaming as complete
      setChatLog((prev) => {
        const newChatLog = [...prev];
        newChatLog[newChatLog.length - 1] = {
          sender: "AI",
          text: accumulatedText,
          isStreaming: false,
        };
        return newChatLog;
      });
    } catch (error) {
      setChatLog((prev) => {
        const newChatLog = [...prev];
        newChatLog[newChatLog.length - 1] = {
          sender: "AI",
          text: "Network error. Please try again later.",
          isStreaming: false,
        };
        return newChatLog;
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Handle Enter key press (with Shift for new line)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Chat Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <BotIcon className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Task Assistant
          </h2>
          <div className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
            AI
          </div>
        </div>
        <ActionButton
          onClick={startNewChat}
          variant="primary"
          icon={<Plus className="w-5 h-5"/>}
        >
          New Chat
        </ActionButton>
      </div>
      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto overflow-x-hidden p-4 space-y-4"
      >
        {chatLog.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
            <BotIcon className="h-8 w-8 mb-2 text-gray-300 dark:text-gray-600" />
            <p>Ask me anything about tasks, schedules, or productivity</p>
          </div>
        ) : (
          <div className="space-y-4">
            {chatLog.map((msg, i) => (
              <div
                key={i}
                className={`mb-4 flex ${
                  msg.sender === "AI" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`w-full max-w-none px-4 py-3 rounded-lg break-words ${
                    msg.sender === "AI"
                      ? "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200"
                      : "bg-blue-600 text-white max-w-[85%]"
                  }`}
                >
                  {" "}
                  <div className="flex items-center mb-2">
                    {msg.sender === "AI" ? (
                      <BotIcon className="h-5 w-5 mr-2 text-blue-600" />
                    ) : (
                      <UserAvatar className="h-5 w-5 mr-2" />
                    )}
                    <span className="font-medium text-xs">{msg.sender}</span>{" "}
                  </div>{" "}
                  {msg.sender === "AI" ? (
                    <div className="prose prose-gray dark:prose-invert prose-sm max-w-none overflow-hidden [&_pre]:overflow-x-auto [&_pre]:max-w-full [&_code]:break-all [&_code]:overflow-wrap-break-word [&_table]:overflow-x-auto [&_table]:block [&_table]:whitespace-nowrap">
                      {msg.isStreaming ? (
                        // Show streaming text immediately with cursor
                        <div className="flex items-end">
                          <div className="flex-1 overflow-hidden">
                            <ReactMarkdown
                              components={{
                                ...renderers,
                                // Override code component for better responsive handling
                                code({
                                  node,
                                  inline,
                                  className,
                                  children,
                                  ...props
                                }) {
                                  const match = /language-(\w+)/.exec(
                                    className || ""
                                  );
                                  return !inline && match ? (
                                    <div className="overflow-x-auto">
                                      <SyntaxHighlighter
                                        style={atomDark}
                                        language={match[1]}
                                        PreTag="div"
                                        wrapLongLines={true}
                                        customStyle={{
                                          margin: 0,
                                          borderRadius: "0.375rem",
                                          fontSize: "0.875rem",
                                        }}
                                        {...props}
                                      >
                                        {String(children).replace(/\n$/, "")}
                                      </SyntaxHighlighter>
                                    </div>
                                  ) : (
                                    <code
                                      className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm break-all"
                                      {...props}
                                    >
                                      {children}
                                    </code>
                                  );
                                },
                                // Ensure tables are responsive
                                table({ children, ...props }) {
                                  return (
                                    <div className="overflow-x-auto">
                                      <table className="min-w-full" {...props}>
                                        {children}
                                      </table>
                                    </div>
                                  );
                                },
                              }}
                            >
                              {msg.text}
                            </ReactMarkdown>
                          </div>
                          <div className="ml-1 w-2 h-4 bg-blue-600 animate-pulse rounded flex-shrink-0"></div>
                        </div>
                      ) : (
                        // Show completed text immediately without animation
                        <div className="overflow-hidden">
                          <ReactMarkdown
                            components={{
                              ...renderers,
                              // Override code component for better responsive handling
                              code({
                                node,
                                inline,
                                className,
                                children,
                                ...props
                              }) {
                                const match = /language-(\w+)/.exec(
                                  className || ""
                                );
                                return !inline && match ? (
                                  <div className="overflow-x-auto">
                                    <SyntaxHighlighter
                                      style={atomDark}
                                      language={match[1]}
                                      PreTag="div"
                                      wrapLongLines={true}
                                      customStyle={{
                                        margin: 0,
                                        borderRadius: "0.375rem",
                                        fontSize: "0.875rem",
                                      }}
                                      {...props}
                                    >
                                      {String(children).replace(/\n$/, "")}
                                    </SyntaxHighlighter>
                                  </div>
                                ) : (
                                  <code
                                    className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm break-all"
                                    {...props}
                                  >
                                    {children}
                                  </code>
                                );
                              },
                              // Ensure tables are responsive
                              table({ children, ...props }) {
                                return (
                                  <div className="overflow-x-auto">
                                    <table className="min-w-full" {...props}>
                                      {children}
                                    </table>
                                  </div>
                                );
                              },
                            }}
                          >
                            {msg.text}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap break-words overflow-wrap-anywhere">
                      {msg.text}
                    </div>
                  )}
                </div>{" "}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
        <div className="flex">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            rows={2}
            disabled={isLoading}
            className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-70"
          />
          <button
            onClick={handleSend}
            disabled={!question.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
