'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Code, Lightbulb } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: "👋 Hi! I'm your AI coding assistant. I can help you with:\n• Code explanations\n• Debugging help\n• Code optimization\n• Learning programming concepts\n\nWhat would you like to know?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const askAI = async (question: string) => {
    if (!question.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: question }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const response = generateAIResponse(question);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('python') || lowerQuestion.includes('py')) {
      return `Here's a Python tip:\n\n# ${question}\ndef solution():\n    # Python code example\n    numbers = [1, 2, 3, 4, 5]\n    squared = [x**2 for x in numbers]\n    return squared\n\n# Remember: Python emphasizes readability and simplicity!`;
    
    } else if (lowerQuestion.includes('javascript') || lowerQuestion.includes('js')) {
      return `JavaScript solution:\n\n// ${question}\nfunction handleData() {\n    // Modern JS with arrow functions\n    const data = [1, 2, 3, 4, 5];\n    const doubled = data.map(x => x * 2);\n    return doubled;\n}\n\n// Tip: Use const/let instead of var for better scoping!`;
    
    } else if (lowerQuestion.includes('error') || lowerQuestion.includes('bug')) {
      return `To debug this issue:\n\n1. Check console for error messages\n2. Verify variable types and values\n3. Use console.log() for debugging\n4. Check for syntax errors\n5. Ensure all functions are defined\n\nTry adding: console.log('Debug:', yourVariable)`;
    
    } else if (lowerQuestion.includes('html') || lowerQuestion.includes('css')) {
      return `For HTML/CSS:\n\n<!-- Semantic HTML -->\n<div class="container">\n    <header>\n        <h1>Your Content</h1>\n    </header>\n</div>\n\n/* Modern CSS */\n.container {\n    display: grid;\n    gap: 1rem;\n    padding: 2rem;\n}\n\nRemember: Use semantic HTML and mobile-first CSS!`;
    
    } else {
      return `I can help you with that! Here are some coding tips:\n\n• Write clean, readable code\n• Use meaningful variable names\n• Comment complex logic\n• Test your code frequently\n• Keep functions small and focused\n\nNeed more specific help? Ask me about Python, JavaScript, HTML, CSS, or debugging!`;
    }
  };

  const quickQuestions = [
    "How do I write a function in Python?",
    "What's wrong with my JavaScript code?",
    "Help me debug this error",
    "Show me a CSS grid example"
  ];

  return (
    <>
      {/* Floating AI Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-3 rounded-full shadow-lg font-bold z-50 transition-all hover:scale-110"
        title="AI Assistant"
      >
        <Sparkles size={20} />
      </button>

      {/* AI Assistant Panel */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-[#1a1f2e] border border-purple-500 rounded-lg flex flex-col shadow-2xl z-50">
          {/* Header */}
          <div className="p-3 border-b border-purple-500 bg-[#151821] flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center">
                <Sparkles size={12} className="text-white" />
              </div>
              <h3 className="text-purple-400 font-bold text-sm">AI CODING ASSISTANT</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-3 overflow-auto space-y-3">
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`p-3 rounded-lg max-w-[85%] ${
                  msg.role === 'user' 
                    ? 'bg-green-500 text-black ml-auto' 
                    : 'bg-[#252a38] text-green-400 border border-green-500 border-opacity-30'
                }`}
              >
                <pre className="text-xs whitespace-pre-wrap font-mono">{msg.content}</pre>
              </div>
            ))}
            
            {isTyping && (
              <div className="p-3 rounded-lg bg-[#252a38] text-green-400 border border-green-500 border-opacity-30 max-w-[85%]">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="p-3 border-t border-purple-500 border-opacity-30 bg-[#151821]">
            <div className="flex flex-wrap gap-2 mb-3">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => askAI(q)}
                  className="text-xs bg-[#252a38] text-cyan-400 px-2 py-1 rounded border border-cyan-500 border-opacity-30 hover:bg-cyan-500 hover:text-black transition-colors"
                >
                  {q.split(' ').slice(0, 3).join(' ')}...
                </button>
              ))}
            </div>
          
            {/* Input */}
            <div className="flex space-x-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && askAI(input)}
                placeholder="Ask about code, bugs, or concepts..."
                className="flex-1 bg-[#252a38] text-green-400 px-3 py-2 rounded text-xs border border-green-500 border-opacity-30 focus:border-green-400 outline-none font-mono"
              />
              <button 
                onClick={() => askAI(input)}
                disabled={isTyping}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-3 rounded transition-colors disabled:opacity-50"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}