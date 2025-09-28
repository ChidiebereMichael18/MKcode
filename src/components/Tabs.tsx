'use client';

import { X, Terminal } from 'lucide-react';

interface FileTab {
  id: string;
  name: string;
  language: string;
  content: string;
}

interface TabsProps {
  tabs: FileTab[];
  activeTab: string;
  onTabSelect: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  onTerminalToggle: () => void;
  isTerminalOpen: boolean;
}

export default function Tabs({ tabs, activeTab, onTabSelect, onTabClose, onTerminalToggle, isTerminalOpen }: TabsProps) {
  const getFileIcon = (language: string) => {
    const icons: { [key: string]: string } = {
      html: '🌐',
      css: '🎨',
      javascript: '📜',
      typescript: '📘',
      python: '🐍',
      default: '📝'
    };
    return icons[language] || icons.default;
  };

  return (
    <div className="flex bg-[#151821] border-b border-[#00ff00] overflow-x-auto font-mono">
      <div className="flex flex-1">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`
              flex items-center px-3 py-2 border-r border-[#00ff00] border-opacity-30 cursor-pointer min-w-40 group
              ${activeTab === tab.id 
                ? 'bg-[#00ff00] text-black' 
                : 'bg-[#151821] text-green-400 hover:bg-[#00ff00] hover:text-black'
              }
            `}
            onClick={() => onTabSelect(tab.id)}
          >
            <span className="mr-2 text-xs">{getFileIcon(tab.language)}</span>
            <span className="flex-1 truncate text-xs font-bold">{tab.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tab.id);
              }}
              className="ml-2 opacity-0 group-hover:opacity-100 hover:bg-black hover:bg-opacity-20 rounded p-0.5 transition-all"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
      
      {/* Terminal Toggle Button */}
      <button
        onClick={onTerminalToggle}
        className={`flex items-center px-3 border-l border-[#00ff00] border-opacity-30 transition-colors font-mono text-xs font-bold ${
          isTerminalOpen 
            ? 'bg-[#00ff00] text-black' 
            : 'bg-[#151821] text-green-400 hover:bg-[#00ff00] hover:text-black'
        }`}
      >
        <Terminal size={12} className="mr-2" />
        <span>TERMINAL</span>
      </button>
    </div>
  );
}