import React, { useState } from 'react';
import { Send, X, Bot, Sparkles } from 'lucide-react';

const AISidebar = ({ isOpen, setIsOpen }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi Michael! I can help you with your GMAD benefits. What would you like to know?' }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm checking the group policy documents in S3... It looks like your TECH_ASSOC plan covers dental at 80%."
      }]);
    }, 1000);
  };

  return (
      <>
        {isOpen && <div className="ai-overlay" onClick={() => setIsOpen(false)} />}

        <div className={`ai-sidebar-panel ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

          <div className="ai-header">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <span className="font-semibold">GMAD AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)}><X className="h-5 w-5" /></button>
          </div>

          {/* Chat Area */}
          <div className="flex flex-col h-[calc(100%-120px)] overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`chat-bubble-base ${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}>
                    {msg.content}
                  </div>
                </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="ai-input-container">
            <div className="relative">
              <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about your policy..."
                  className="ai-input-field"
              />
              <button onClick={handleSend} className="absolute right-2 top-1.5 p-1 text-blue-600 hover:text-blue-800">
                <Send className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-gray-400">
              <Sparkles className="h-3 w-3" />
              Powered by AWS Bedrock
            </div>
          </div>
        </div>
      </>
  );
};

export default AISidebar;