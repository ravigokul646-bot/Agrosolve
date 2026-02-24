import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, Bot, User, Loader2, RefreshCw } from 'lucide-react';
import { Message, getAgriculturalAdvice } from '../services/gemini';
import { ImageUploader } from './ImageUploader';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'motion/react';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "Hello! I'm AgroSolve AI. How can I help you with your farm or garden today? You can ask me about crop management, pest control, or upload a photo of a plant for diagnosis."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      text: input,
      image: selectedImage || undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    const currentImage = selectedImage;
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const response = await getAgriculturalAdvice(input, currentImage || undefined);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "I'm sorry, I encountered an error. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-4xl mx-auto w-full bg-white rounded-3xl shadow-xl shadow-olive-200/50 border border-olive-100 overflow-hidden">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-olive-200">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-4 max-w-[85%]",
                message.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
                message.role === 'user' ? "bg-olive-600 text-white" : "bg-olive-100 text-olive-700"
              )}>
                {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              
              <div className={cn(
                "flex flex-col gap-2",
                message.role === 'user' ? "items-end" : "items-start"
              )}>
                {message.image && (
                  <div className="rounded-2xl overflow-hidden border border-olive-200 max-w-sm">
                    <img src={message.image} alt="Uploaded crop" className="w-full h-auto" />
                  </div>
                )}
                <div className={cn(
                  "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                  message.role === 'user' 
                    ? "bg-olive-600 text-white rounded-tr-none" 
                    : "bg-olive-50 text-olive-900 rounded-tl-none border border-olive-100"
                )}>
                  <div className="markdown-body">
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-4 mr-auto max-w-[85%]"
          >
            <div className="w-8 h-8 rounded-full bg-olive-100 text-olive-700 flex items-center justify-center shrink-0">
              <Loader2 size={16} className="animate-spin" />
            </div>
            <div className="bg-olive-50 px-4 py-3 rounded-2xl rounded-tl-none border border-olive-100">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-olive-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 bg-olive-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 bg-olive-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-top border-olive-100 bg-olive-50/50">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1 bg-white rounded-2xl border border-olive-200 shadow-sm overflow-hidden focus-within:border-olive-400 focus-within:ring-1 focus-within:ring-olive-400 transition-all">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about your crops, pests, or soil..."
                className="w-full p-4 bg-transparent border-none focus:ring-0 text-sm resize-none min-h-[56px] max-h-32"
                rows={1}
              />
              <div className="px-4 py-2 border-t border-olive-50 flex items-center justify-between bg-white">
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setMessages([{
                        role: 'model',
                        text: "Hello! I'm AgroSolve AI. How can I help you with your farm or garden today?"
                      }]);
                      setSelectedImage(null);
                    }}
                    className="text-olive-400 hover:text-olive-600 p-1.5 rounded-lg hover:bg-olive-50 transition-colors"
                    title="Clear chat"
                  >
                    <RefreshCw size={18} className={cn(isLoading && "animate-spin")} />
                  </button>
                </div>
                <button
                  onClick={handleSend}
                  disabled={isLoading || (!input.trim() && !selectedImage)}
                  className={cn(
                    "p-2 rounded-xl transition-all",
                    isLoading || (!input.trim() && !selectedImage)
                      ? "bg-olive-200 text-olive-400 cursor-not-allowed"
                      : "bg-olive-700 text-white hover:bg-olive-800 shadow-md shadow-olive-700/20"
                  )}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
            <div className="w-32 hidden sm:block">
              <ImageUploader onImageSelect={setSelectedImage} selectedImage={selectedImage} />
            </div>
          </div>
          <div className="sm:hidden">
            <ImageUploader onImageSelect={setSelectedImage} selectedImage={selectedImage} />
          </div>
        </div>
      </div>
    </div>
  );
};
