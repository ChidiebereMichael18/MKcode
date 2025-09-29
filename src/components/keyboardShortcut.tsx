'use client';

import { useState } from 'react';
import { Keyboard, X } from 'lucide-react';

export default function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { keys: ['Ctrl', 'Space'], description: 'Trigger autocomplete' },
    { keys: ['Ctrl', 'S'], description: 'Save file' },
    { keys: ['Ctrl', '/'], description: 'Toggle comment' },
    { keys: ['Ctrl', 'F'], description: 'Find' },
    { keys: ['Ctrl', 'H'], description: 'Replace' },
    { keys: ['F11'], description: 'Toggle fullscreen' },
    { keys: ['Ctrl', '`'], description: 'Toggle terminal' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 bg-yellow-500 hover:bg-yellow-600 text-black p-3 rounded-full shadow-lg font-bold z-40 transition-all hover:scale-110"
        title="Keyboard Shortcuts"
      >
        <Keyboard size={20} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-[#1a1f2e] border border-yellow-500 rounded-lg w-96 max-h-96 overflow-auto">
            <div className="p-4 border-b border-yellow-500 bg-[#151821] flex justify-between items-center">
              <h3 className="text-yellow-400 font-bold text-lg">Keyboard Shortcuts</h3>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 space-y-3">
              {shortcuts.map((shortcut, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-green-400 text-sm">{shortcut.description}</span>
                  <div className="flex space-x-1">
                    {shortcut.keys.map((key, keyIndex) => (
                      <span key={keyIndex} className="bg-[#252a38] text-yellow-400 px-2 py-1 rounded text-xs border border-yellow-500 border-opacity-30">
                        {key}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-yellow-500 border-opacity-30 bg-[#151821]">
              <p className="text-cyan-400 text-xs text-center">
                Pro tip: Use Ctrl+Space for intelligent code completion!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}