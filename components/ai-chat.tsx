"use client"

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from "framer-motion";
import { Send, Bot } from "lucide-react";
import Image from "next/image";

const API_URL = "https://ntyx.onrender.com/";

export default function AiChat() {
  const [messages, setMessages] = useState<Array<{
    sender: string;
    text: string;
    isUser: boolean;
    isError?: boolean;
  }>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevMessagesLengthRef = useRef(0);

  useEffect(() => {
    // Only scroll if messages length has changed (not on initial render)
    if (messages.length > prevMessagesLengthRef.current) {
      scrollToBottom();
    }
    prevMessagesLengthRef.current = messages.length;
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "You", text: input, isUser: true };
    setMessages([...messages, userMessage]);
    setIsLoading(true);
    setInput("");

    try {
      const response = await axios.post(`${API_URL}/chat`, {
        message: input+"\n\n"+"Answer the above query as if you were Kush Kansal&apos;s AI twin. You are a chat assistant to answer questions on Kush behalf. Kush is a Computer Science student at JIIT. He&apos;s passionate about technology, problem-solving, and continuous learning. His email is kushkansal0@gmail.com and his GitHub is github.com/kshknsl. Do not answer in more than 30 words. Ask user to go through the site to get contact or Kush specific details as they have already been provided on the site. ",
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const botMessage = { 
        sender: "Ai Twin", 
        text: response.data.response, 
        isUser: false 
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [...prev, { 
        sender: "AI Twin", 
        text: "Error fetching response. Please try again later.", 
        isUser: false,
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <motion.div 
      className="flex flex-col h-[450px] rounded-2xl bg-white/80 dark:bg-black backdrop-blur-lg border border-gray-200 dark:border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-primary p-3 shadow-md flex items-center gap-2">
        <Bot className="w-5 h-5 text-white" />
        <h2 className="text-lg font-bold text-white">My AI Twin</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-[#0F0F10]">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p className="text-center text-sm">Chat with Kush&apos;s AI twin!</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.isUser 
                    ? 'bg-[#3b82f6] dark:bg-[#60a5fa] text-white rounded-tr-none shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]' 
                    : msg.isError 
                      ? 'bg-red-500 text-white rounded-tl-none shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]' 
                      : 'bg-gray-200 dark:bg-[#0F0F10] text-gray-900 dark:text-white rounded-tl-none shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]'
                }`}
              >
                <div className="font-bold text-sm mb-1">{msg.sender}</div>
                {msg.isUser ? (
                  <div className="text-sm">{msg.text}</div>
                ) : (
                  <div className="prose dark:prose-invert max-w-none prose-sm">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: (props) => <p className="mb-2 text-sm" {...props} />,
                        h1: (props) => <h1 className="text-lg font-bold my-2" {...props} />,
                        h2: (props) => <h2 className="text-base font-bold my-2" {...props} />,
                        h3: (props) => <h3 className="text-sm font-bold my-1" {...props} />,
                        ul: (props) => <ul className="list-disc pl-5 my-2 text-sm" {...props} />,
                        ol: (props) => <ol className="list-decimal pl-5 my-2 text-sm" {...props} />,
                        li: (props) => <li className="my-1 text-sm" {...props} />,
                        a: (props) => <a className="text-blue-400 hover:underline text-sm" target="_blank" rel="noopener noreferrer" {...props} />,
                        code: (props) => {
                          const { inline, ...rest } = props as { inline?: boolean };
                          return inline 
                            ? <code className="bg-gray-300 dark:bg-[#0A0A0A] px-1 rounded text-xs" {...rest} />
                            : <pre className="bg-gray-300 dark:bg-[#0A0A0A] p-2 rounded overflow-x-auto my-2 text-xs"><code {...rest} /></pre>;
                        },
                        blockquote: (props) => <blockquote className="border-l-4 border-gray-500 pl-4 italic my-2 text-sm" {...props} />,
                        img: (props) => <Image
                          src={props.src || "/path/to/your/image.png"}
                          alt={props.alt || "AI Assistant"}
                          width={40}
                          height={40}
                          className="max-w-full h-auto my-2 rounded-full"
                        />
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 dark:bg-[#0F0F10] text-gray-900 dark:text-white rounded-lg p-3 rounded-tl-none max-w-[80%] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
              <div className="font-bold text-sm mb-1">AI Twin</div>
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-end space-x-2">
          <textarea
            className="flex-1 bg-gray-50/50 dark:bg-[#0F0F10] text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-[#3b82f6]/50 dark:focus:ring-[#60a5fa]/50 focus:border-[#3b82f6] dark:focus:border-[#60a5fa] transition-all duration-200 resize-none text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            style={{ minHeight: '2.5rem', maxHeight: '6rem' }}
          />
          <motion.button 
            className="p-2 flex items-center justify-center bg-gradient-primary text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 border border-[#ec3750]/20 dark:border-[#ff4d6a]/20"
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <Send className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
} 