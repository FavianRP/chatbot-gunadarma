import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Trash2, Volume2, Download } from 'lucide-react';

const ChatbotGunadarma = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Halo! Saya adalah Chatbot Universitas Gunadarma. Silakan tanyakan apa saja tentang UG, seperti pendaftaran, biaya kuliah, fasilitas, dan lainnya. 😊',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulasi API call ke backend Python
  const sendMessageToAPI = async (userMessage) => {
    try {
      // GANTI URL ini dengan endpoint backend Python Anda
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return {
        answer: data.answer,
        score: data.score,
        matchedQuestion: data.matched_question
      };
    } catch (error) {
      console.error('Error calling API:', error);
      // Fallback jika API tidak tersedia
      return {
        answer: 'Maaf, terjadi kesalahan koneksi ke server. Silakan coba lagi nanti.',
        score: 0,
        matchedQuestion: null
      };
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    
    // Add user message
    const newUserMessage = {
      type: 'user',
      text: userMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate typing delay
    setTimeout(async () => {
      // Call API
      const response = await sendMessageToAPI(userMessage);
      
      // Add bot response
      const botMessage = {
        type: 'bot',
        text: response.answer,
        score: response.score,
        matchedQuestion: response.matchedQuestion,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        type: 'bot',
        text: 'Chat telah dibersihkan. Silakan mulai percakapan baru! 😊',
        timestamp: new Date()
      }
    ]);
  };

  const exportChat = () => {
    const chatText = messages.map(msg => {
      const time = msg.timestamp.toLocaleTimeString('id-ID');
      const sender = msg.type === 'user' ? 'Anda' : 'Bot';
      return `[${time}] ${sender}: ${msg.text}`;
    }).join('\n\n');

    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-gunadarma-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  // Quick questions
  const quickQuestions = [
    "Bagaimana cara mendaftar?",
    "Berapa biaya kuliah?",
    "Cara mengisi KRS?",
    "Lokasi kampus ada dimana?",
    "Siapa rektor Gunadarma?"
  ];

  const handleQuickQuestion = (question) => {
    setInput(question);
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                <Bot className="w-10 h-10 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Chatbot Gunadarma</h1>
                <p className="text-purple-100 text-sm">Asisten Virtual Universitas Gunadarma</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportChat}
                className="p-2 hover:bg-purple-700 rounded-lg transition-colors"
                title="Export Chat"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={clearChat}
                className="p-2 hover:bg-purple-700 rounded-lg transition-colors"
                title="Clear Chat"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="bg-purple-50 px-6 py-3 border-b border-purple-100">
          <p className="text-xs text-gray-600 mb-2 font-medium">Pertanyaan Cepat:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickQuestion(q)}
                className="px-3 py-1 bg-white text-purple-600 text-sm rounded-full hover:bg-purple-600 hover:text-white transition-colors shadow-sm border border-purple-200"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'bot' && (
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              )}
              
              <div className={`max-w-[70%] ${message.type === 'user' ? 'order-1' : ''}`}>
                <div
                  className={`p-4 rounded-2xl shadow-md ${
                    message.type === 'user'
                      ? 'bg-purple-600 text-white rounded-tr-none'
                      : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                  
                  {message.score !== undefined && message.score > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                      <span>Confidence: {(message.score * 100).toFixed(0)}%</span>
                      <button
                        onClick={() => speakText(message.text)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        title="Baca dengan suara"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                
                <p className="text-xs text-gray-500 mt-1 px-2">
                  {message.timestamp.toLocaleTimeString('id-ID', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>

              {message.type === 'user' && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center flex-shrink-0 shadow-md">
                  <User className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center shadow-md">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-md border border-gray-200">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ketik pertanyaan Anda di sini..."
                className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 resize-none shadow-sm"
                rows="1"
                style={{ minHeight: '50px', maxHeight: '120px' }}
                disabled={isLoading}
              />
              <div className="absolute right-3 bottom-3 text-xs text-gray-400">
                {input.length}/500
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-purple-600 text-white p-4 rounded-xl hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-md flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Tekan Enter untuk mengirim • Shift+Enter untuk baris baru
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotGunadarma;