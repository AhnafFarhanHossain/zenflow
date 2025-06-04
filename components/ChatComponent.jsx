"use client";

import { useState, useEffect, useRef } from "react";
import { BotIcon, Loader2, User } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import ReactMarkdown from "react-markdown";
import { PulseLoader } from "react-spinners";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Typewriter component for animated text
const TypewriterText = ({ text, maxDuration = 3500 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const startTimeRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Calculate dynamic speed based on text length to complete within maxDuration
  const speed = Math.max(10, Math.min(50, maxDuration / text.length));

  useEffect(() => {
    if (currentIndex < text.length) {
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now();
      }

      const animate = () => {
        const elapsed = Date.now() - startTimeRef.current;
        const expectedIndex = Math.floor(elapsed / speed);

        if (expectedIndex > currentIndex && currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          setCurrentIndex((prev) => prev + 1);
        }

        if (currentIndex < text.length - 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      };

      const timeoutId = setTimeout(() => {
        animationFrameRef.current = requestAnimationFrame(animate);
      }, speed);

      return () => {
        clearTimeout(timeoutId);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [currentIndex, text, speed]);

  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
    startTimeRef.current = null;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, [text]);

  return <ReactMarkdown components={renderers}>{displayedText}</ReactMarkdown>;
};

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
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const { user } = useUser();
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

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatLog]);

  async function handleSend() {
    if (!question.trim() || isLoading) return;

    setChatLog((prev) => [
      ...prev,
      { sender: user?.firstName || "You", text: question },
    ]);
    setQuestion("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();

      if (!res.ok) {
        setChatLog((prev) => [
          ...prev,
          { sender: "AI", text: data.error || "Something went wrong." },
        ]);
      } else {
        setChatLog((prev) => [...prev, { sender: "AI", text: data.answer }]);
      }
    } catch {
      setChatLog((prev) => [
        ...prev,
        { sender: "AI", text: "Network error. Please try again later." },
      ]);
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
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center">
        <BotIcon className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Task Assistant
        </h2>
        <div className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
          AI
        </div>
      </div>

      {/* Chat Messages */}
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4">
        {chatLog.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
            <BotIcon className="h-8 w-8 mb-2 text-gray-300 dark:text-gray-600" />
            <p>Ask me anything about tasks, schedules, or productivity</p>
          </div>
        ) : (
          <>
            {" "}
            {chatLog.map((msg, i) => (
              <div
                key={i}
                className={`mb-4 flex ${
                  msg.sender === "AI" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-xs md:max-w-[900px] px-4 py-2 rounded-lg ${
                    msg.sender === "AI"
                      ? "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {" "}
                  <div className="flex items-center mb-2">
                    {msg.sender === "AI" ? (
                      <BotIcon className="h-5 w-5 mr-2 text-blue-600" />
                    ) : (
                      <UserAvatar className="h-5 w-5 mr-2" />
                    )}
                    <span className="font-medium text-xs">{msg.sender}</span>
                  </div>{" "}
                  {msg.sender === "AI" ? (
                    <div className="markdown-body prose dark:prose-invert prose-sm max-w-none leading-7">
                      <TypewriterText text={msg.text} />
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                  )}
                </div>
              </div>
            ))}{" "}
            {isLoading && (
              <div className="mb-4 flex justify-start">
                <div className="max-w-xs md:max-w-md px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-1">
                    <BotIcon className="h-5 w-5 mr-2 text-blue-600" />
                    <span className="font-medium text-xs">AI</span>
                  </div>
                  <PulseLoader size={8} color="#3B82F6" />
                </div>
              </div>
            )}
          </>
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
