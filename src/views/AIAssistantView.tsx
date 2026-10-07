import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ChatMessage } from '../types';
import {
  Bot,
  Send,
  User,
  Sparkles,
  ShieldAlert,
  Compass,
  Landmark,
  UtensilsCrossed,
  Info,
} from 'lucide-react';

const SUGGESTED_PROMPTS = [
  'What are the rulings for shortening (Qasr) and combining prayers?',
  'What should I pack for my first Umrah?',
  'Recommend top Halal dining spots in Istanbul.',
  'How do I perform wudu and pray on an airplane?',
  'What are the historic mosques to visit in Sultanahmet?',
];

export const AIAssistantView: React.FC = () => {
  const { currentLocation, userName } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      role: 'assistant',
      text: `Assalamu Alaikum wa Rahmatullahi wa Barakatuh, ${userName}!

I am **Musafir AI**, your intelligent Muslim travel companion. I can assist you with:
- Finding mosques, prayer facilities, and wudu spots
- Authentic travel Duas and traveller Salah rulings (Qasr & Jama')
- Verified Halal dining recommendations in ${currentLocation.city}
- Packing advice for Hajj, Umrah, or international travel

How may I assist your blessed journey today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      disclaimer: 'AI-generated information may require verification from qualified Islamic scholars.',
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (messageText?: string) => {
    const query = messageText || input;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query.trim(),
          history: messages.slice(-6).map((m) => ({ role: m.role, text: m.text })),
          userLocation: `${currentLocation.city}, ${currentLocation.country}`,
        }),
      });

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        text: data.text || 'I could not generate an answer at this moment.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        disclaimer: data.disclaimer || 'AI-generated guidance may require verification from qualified Islamic scholars.',
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Error fetching chat response:', err);
      const fallbackMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        text: 'Assalamu Alaikum! For traveller prayers, 4-rak\'ah prayers are shortened to 2 rak\'ahs (Qasr) when traveling past 48 miles (~80km). Fajr and Maghrib are not shortened. Consult a qualified Islamic scholar for personal circumstances.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        disclaimer: 'AI-generated information may require verification from qualified Islamic scholars.',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-8.5rem)] pb-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0F5C4D] to-[#083C34] flex items-center justify-center text-white shadow-md shadow-[#0F5C4D]/25">
            <Bot className="w-5 h-5 text-[#C9A45C]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-gray-900 dark:text-gray-100">
                Musafir AI Assistant
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C9A45C]/15 text-[#C9A45C] border border-[#C9A45C]/30">
                GEMINI 3.8 FLASH
              </span>
            </div>
            <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
              Knowledgeable companion for faith & exploration in {currentLocation.city}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isUser
                    ? 'bg-[#0F5C4D] text-white'
                    : 'bg-[#F7F5EF] dark:bg-[#071310] border border-[#0F5C4D]/20 text-[#0F5C4D] dark:text-[#C9A45C]'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] rounded-3xl p-4.5 space-y-2 text-xs sm:text-sm leading-relaxed shadow-sm ${
                  isUser
                    ? 'bg-[#0F5C4D] text-white rounded-tr-none'
                    : 'bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap font-normal">{msg.text}</div>

                <div
                  className={`text-[10px] pt-1 flex items-center justify-between border-t ${
                    isUser
                      ? 'border-white/15 text-white/70'
                      : 'border-gray-100 dark:border-gray-800 text-[#6B756F] dark:text-[#9AA9A2]'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {msg.disclaimer && !isUser && (
                    <span className="italic ml-2 hidden sm:inline">{msg.disclaimer}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#F7F5EF] dark:bg-[#071310] border border-[#0F5C4D]/20 text-[#0F5C4D] flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="rounded-2xl p-4 bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 text-xs text-[#6B756F] dark:text-[#9AA9A2] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C9A45C] animate-spin" />
              <span>Musafir AI is reviewing Islamic travel references...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Query Chips */}
      {messages.length <= 3 && (
        <div className="pb-3 overflow-x-auto flex items-center gap-1.5 scrollbar-none shrink-0">
          {SUGGESTED_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1.5 rounded-full bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 hover:border-[#0F5C4D] text-[11px] font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap shadow-sm hover:bg-gray-50 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-2 rounded-2xl bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/20 dark:border-[#C9A45C]/30 shadow-lg flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Musafir AI anything about travel, prayer rules, halal dining, or Umrah..."
          className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none"
        />

        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-2.5 rounded-xl bg-[#0F5C4D] hover:bg-[#083C34] text-white disabled:opacity-40 transition-all shadow-md shadow-[#0F5C4D]/25"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
