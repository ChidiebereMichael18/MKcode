'use client';

import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Play, Plus } from 'lucide-react';

interface TerminalProps {
  isOpen: boolean;
  onToggle: () => void;
  onRunCode: (code: string, language: string) => void;
  onExecuteCommand: (command: string) => void;
  currentFile?: { content: string; language: string };
  customOutput?: string[];
}

interface TerminalTab {
  id: string;
  name: string;
  output: { type: 'command' | 'output' | 'error'; content: string }[];
}

export default function Terminal({ 
  isOpen, 
  onToggle, 
  onRunCode, 
  onExecuteCommand, 
  currentFile, 
  customOutput = [] 
}: TerminalProps) {
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState('1');
  const [tabs, setTabs] = useState<TerminalTab[]>([
    { 
      id: '1', 
      name: 'bash', 
      output: [
        { type: 'output', content: 'MKCode Terminal v2.0 - Type "help" for commands' },
        { type: 'output', content: '' }
      ] 
    }
  ]);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [tabs, activeTab]);

  useEffect(() => {
    if (customOutput.length > 0) {
      const newOutput = customOutput.map(content => ({ type: 'output' as const, content }));
      setTabs(prev => prev.map(tab => 
        tab.id === activeTab 
          ? { ...tab, output: [...tab.output, ...newOutput] }
          : tab
      ));
    }
  }, [customOutput, activeTab]);

  const getActiveTab = () => tabs.find(tab => tab.id === activeTab);

  const executeCommand = (cmd: string) => {
    if (!cmd.trim()) return;

    const activeTabData = getActiveTab();
    if (!activeTabData) return;

    // Add command to output
    setTabs(prev => prev.map(tab => 
      tab.id === activeTab 
        ? { ...tab, output: [...tab.output, { type: 'command', content: `$ ${cmd}` }] }
        : tab
    ));

    // Execute via parent handler
    onExecuteCommand(cmd);
    
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

  const addTerminalTab = () => {
    const newTabId = Date.now().toString();
    const newTab: TerminalTab = {
      id: newTabId,
      name: 'bash',
      output: [
        { type: 'output', content: `Terminal ${newTabId} - MKCode` },
        { type: 'output', content: '' }
      ]
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTab(newTabId);
  };

  const closeTerminalTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length <= 1) return;
    
    setTabs(prev => prev.filter(tab => tab.id !== tabId));
    if (activeTab === tabId) {
      setActiveTab(tabs[0].id);
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  if (!isOpen) {
    return null;
  }

  const activeTabData = getActiveTab();

  return (
    <div className="flex flex-col h-64 bg-black text-green-400 font-mono text-sm border-t border-[#00ff00]">
      {/* Terminal Header with Tabs */}
      <div className="flex items-center justify-between bg-[#151821] border-b border-[#00ff00]">
        <div className="flex flex-1 overflow-x-auto">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`
                flex items-center px-3 py-2 border-r border-[#00ff00] border-opacity-30 cursor-pointer min-w-32 group
                ${activeTab === tab.id 
                  ? 'bg-black text-green-400' 
                  : 'bg-[#151821] text-green-400 hover:bg-[#1a1f2e]'
                }
              `}
              onClick={() => setActiveTab(tab.id)}
            >
              <TerminalIcon size={12} className="mr-2 flex-shrink-0" />
              <span className="flex-1 truncate text-xs font-bold">{tab.name}</span>
              {tabs.length > 1 && (
                <button
                  onClick={(e) => closeTerminalTab(tab.id, e)}
                  className="ml-2 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white rounded p-0.5 transition-all"
                >
                  <X size={10} />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addTerminalTab}
            className="flex items-center px-3 py-2 border-r border-[#00ff00] border-opacity-30 bg-[#151821] hover:bg-[#1a1f2e] text-green-400 transition-colors"
          >
            <Plus size={12} />
          </button>
        </div>
        
        <div className="flex items-center space-x-2 px-3 py-2">
          {currentFile && (
            <button
              onClick={handleRunCode}
              className="flex items-center space-x-1 px-2 py-1 bg-green-500 hover:bg-green-600 text-black rounded text-xs font-bold transition-colors"
            >
              <Play size={10} />
              <span>RUN</span>
            </button>
          )}
          <button 
            onClick={onToggle}
            className="p-1 hover:bg-green-500 hover:text-black rounded transition-colors"
          >
            <X size={12} />
          </button>
        </div>
      </div>
      
      {/* Terminal Output */}
      <div 
        ref={terminalRef}
        className="flex-1 p-2 overflow-auto cursor-text"
        onClick={focusInput}
      >
        {activeTabData?.output.map((line, index) => (
          <div 
            key={index} 
            className={`
              ${line.type === 'command' ? 'text-cyan-400' : ''}
              ${line.type === 'error' ? 'text-red-400' : ''}
              ${line.type === 'output' ? 'text-green-400' : ''}
              text-xs whitespace-pre-wrap font-mono
            `}
          >
            {line.content}
          </div>
        ))}
        {activeTabData?.output.length === 0 && (
          <div className="text-green-400 text-xs">
            Terminal ready. Type commands or click run to execute code.
          </div>
        )}
      </div>
      
      {/* Terminal Input */}
      <div 
        className="flex items-center p-2 border-t border-[#00ff00] border-opacity-30 bg-[#151821]"
        onClick={focusInput}
      >
        <span className="text-green-400 mr-2 font-bold">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-transparent outline-none text-green-400 placeholder-green-400 placeholder-opacity-50 text-xs font-mono"
          placeholder="type command..."
          autoFocus
        />
      </div>
    </div>
  );
}