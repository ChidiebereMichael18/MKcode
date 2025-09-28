'use client';

import { useState } from 'react';
import { PanelLeft, Plus, Folder, File, ChevronRight, ChevronDown, X } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileItem[];
  content: string;
  language: string;
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onFileSelect: (file: FileItem) => void;
  onCreateFile: () => void;
}

export default function Sidebar({ isOpen, onToggle, onFileSelect, onCreateFile }: SidebarProps) {
  const sampleFiles: FileItem[] = [
    {
      id: '1',
      name: 'src',
      type: 'folder',
      children: [
        { 
          id: '2', 
          name: 'index.html', 
          type: 'file', 
          content: `<!DOCTYPE html>
<html>
<head>
    <title>MKCode App</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="app">
        <h1>Welcome to MKCode</h1>
        <p>Edit code and see live preview!</p>
        <button onclick="handleClick()">Click me</button>
        <div class="counter">
            <p>Count: <span id="count">0</span></p>
            <button onclick="increment()">+1</button>
            <button onclick="reset()">Reset</button>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>`, 
          language: 'html' 
        },
        { 
          id: '3', 
          name: 'style.css', 
          type: 'file', 
          content: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Courier New', monospace;
    background: #0c0e14;
    color: #00ff00;
    min-height: 100vh;
    padding: 2rem;
}

#app {
    max-width: 600px;
    margin: 0 auto;
    background: #151821;
    padding: 2rem;
    border: 1px solid #00ff00;
    border-radius: 0;
    text-align: center;
}

h1 {
    color: #00ff00;
    margin-bottom: 1rem;
    font-weight: bold;
}

p {
    color: #00ffff;
    margin-bottom: 1.5rem;
}

button {
    background: #00ff00;
    color: #000;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0;
    cursor: pointer;
    font-family: 'Courier New', monospace;
    font-weight: bold;
    margin: 0.25rem;
    transition: all 0.2s ease;
}

button:hover {
    background: #00cc00;
    transform: translateY(-1px);
}

.counter {
    margin-top: 2rem;
    padding: 1.5rem;
    background: #1a1d29;
    border: 1px solid #00ffff;
}`,
          language: 'css' 
        },
        { 
          id: '4', 
          name: 'script.js', 
          type: 'file', 
          content: `let count = 0;

function handleClick() {
    alert('Hello from MKCode!');
    document.body.style.background = '#1a1d29';
}

function increment() {
    count++;
    document.getElementById('count').textContent = count;
}

function reset() {
    count = 0;
    document.getElementById('count').textContent = count;
}`,
          language: 'javascript' 
        },
      ],
      content: '',
      language: ''
    },
    {
      id: '5',
      name: 'examples',
      type: 'folder',
      children: [
        { 
          id: '6', 
          name: 'example.py', 
          type: 'file', 
          content: `# Python example in MKCode
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

def main():
    print("Fibonacci Sequence:")
    for i in range(10):
        result = fibonacci(i)
        print(f"Fibonacci({i}) = {result}")

if __name__ == "__main__":
    main()`,
          language: 'python' 
        },
      ],
      content: '',
      language: ''
    },
  ];

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed top-3 left-3 z-50 bg-green-500 hover:bg-green-600 text-black p-2 rounded border border-green-400 transition-all font-bold"
      >
        <PanelLeft size={16} />
      </button>
    );
  }

  return (
    <div className="w-64 bg-[#151821] border-r border-[#00ff00] h-full flex flex-col">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-3 border-b border-[#00ff00] bg-[#0c0e14]">
        <div className="flex items-center space-x-2">
          <h2 className="font-bold text-green-400 text-sm">EXPLORER</h2>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={onCreateFile}
            className="p-1 hover:bg-green-500 hover:text-black rounded transition-colors text-green-400"
            title="New File"
          >
            <Plus size={14} />
          </button>
          <button
            onClick={onToggle}
            className="p-1 hover:bg-green-500 hover:text-black rounded transition-colors text-green-400"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-auto py-2">
        <FileTree items={sampleFiles} onFileSelect={onFileSelect} />
      </div>
    </div>
  );
}

function FileTree({ items, onFileSelect }: { items: FileItem[], onFileSelect: (file: FileItem) => void }) {
  return (
    <div>
      {items.map((item) => (
        <TreeNode key={item.id} item={item} onFileSelect={onFileSelect} />
      ))}
    </div>
  );
}

function TreeNode({ item, onFileSelect }: { item: FileItem, onFileSelect: (file: FileItem) => void }) {
  const [isOpen, setIsOpen] = useState(true);

  if (item.type === 'file') {
    return (
      <div
        className="flex items-center px-3 py-1 hover:bg-[#00ff00] hover:text-black cursor-pointer group transition-colors font-mono"
        onClick={() => onFileSelect(item)}
      >
        <File size={12} className="mr-2 text-cyan-400 group-hover:text-black flex-shrink-0" />
        <span className="text-xs text-green-400 group-hover:text-black truncate">{item.name}</span>
      </div>
    );
  }

  return (
    <div>
      <div
        className="flex items-center px-3 py-1 hover:bg-[#00ff00] hover:text-black cursor-pointer group transition-colors font-mono"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        <Folder size={12} className="mr-2 text-yellow-400 group-hover:text-black flex-shrink-0" />
        <span className="text-xs text-cyan-400 group-hover:text-black font-bold">{item.name}</span>
      </div>
      {isOpen && item.children && (
        <div className="ml-4 border-l border-[#00ff00] border-opacity-30">
          <FileTree items={item.children} onFileSelect={onFileSelect} />
        </div>
      )}
    </div>
  );
}