'use client';

import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Play } from 'lucide-react';

interface TerminalProps {
  isOpen: boolean;
  onToggle: () => void;
  onRunCode: (code: string, language: string) => void;
  currentFile?: { content: string; language: string };
}

export default function Terminal({ isOpen, onToggle, onRunCode, currentFile }: TerminalProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<{ type: 'command' | 'output' | 'error'; content: string }[]>([
    { type: 'output', content: 'MKCode Terminal v1.0 - Type "help" for commands' },
    { type: 'output', content: '' }
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const executeCommand = (cmd: string) => {
    setOutput(prev => [...prev, { type: 'command', content: `$ ${cmd}` }]);
    
    const command = cmd.trim().toLowerCase();
    
    if (command === 'clear' || command === 'cls') {
      setOutput([]);
    } else if (command === 'help') {
      setOutput(prev => [...prev, 
        { type: 'output', content: 'Available commands:' },
        { type: 'output', content: '  help     - Show this help' },
        { type: 'output', content: '  clear    - Clear terminal' },
        { type: 'output', content: '  ls       - List files' },
        { type: 'output', content: '  pwd      - Show current dir' },
        { type: 'output', content: '  run      - Run current file' },
        { type: 'output', content: '  mkcode   - About MKCode' }
      ]);
    } else if (command === 'ls') {
      setOutput(prev => [...prev, 
        { type: 'output', content: '📁 src/' },
        { type: 'output', content: '📁 examples/' },
        { type: 'output', content: '📄 package.json' },
        { type: 'output', content: '📄 README.md' }
      ]);
    } else if (command === 'pwd') {
      setOutput(prev => [...prev, { type: 'output', content: '/home/user/mkcode' }]);
    } else if (command === 'run' && currentFile) {
      onRunCode(currentFile.content, currentFile.language);
    } else if (command === 'mkcode') {
      setOutput(prev => [...prev, 
        { type: 'output', content: '🚀 MKCode - Termux-style Web IDE' },
        { type: 'output', content: '📝 Edit code in real-time' },
        { type: 'output', content: '🌐 Live preview' },
        { type: 'output', content: '💻 Built for developers' }
      ]);
    } else if (command === '') {
      // Do nothing for empty command
    } else {
      setOutput(prev => [...prev, { type: 'error', content: `command not found: ${cmd}` }]);
    }
    
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    }
  };

  const handleRunCode = () => {
    if (currentFile) {
      onRunCode(currentFile.content, currentFile.language);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex flex-col h-64 bg-black text-green-400 font-mono text-sm border-t border-[#00ff00]">
      {/* Terminal Header */}
      <div className="flex items-center justify-between p-2 bg-[#151821] border-b border-[#00ff00]">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <TerminalIcon size={12} className="text-green-400" />
            <span className="text-green-400 font-bold text-xs">TERMINAL</span>
          </div>
          {currentFile && (
            <button
              onClick={handleRunCode}
              className="flex items-center space-x-1 px-2 py-0.5 bg-green-500 hover:bg-green-600 text-black rounded text-xs font-bold transition-colors"
            >
              <Play size={10} />
              <span>RUN</span>
            </button>
          )}
        </div>
        <button 
          onClick={onToggle}
          className="p-0.5 hover:bg-green-500 hover:text-black rounded transition-colors"
        >
          <X size={12} />
        </button>
      </div>
      
      {/* Terminal Output */}
      <div 
        ref={terminalRef}
        className="flex-1 p-2 overflow-auto"
      >
        {output.map((line, index) => (
          <div 
            key={index} 
            className={`
              ${line.type === 'command' ? 'text-cyan-400' : ''}
              ${line.type === 'error' ? 'text-red-400' : ''}
              ${line.type === 'output' ? 'text-green-400' : ''}
              text-xs
            `}
          >
            {line.content}
          </div>
        ))}
      </div>
      
      {/* Terminal Input */}
      <div className="flex items-center p-2 border-t border-[#00ff00] border-opacity-30 bg-[#151821]">
        <span className="text-green-400 mr-1 font-bold">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-transparent outline-none text-green-400 placeholder-green-400 placeholder-opacity-50 text-xs"
          placeholder="type command..."
          autoFocus
        />
      </div>
    </div>
  );
}