'use client';

import { Folder, File, ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileItem[];
  content: string;
  language: string;
}

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
    <title>My App</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="app">
        <h1>Hello World!</h1>
        <p>Welcome to your IDE</p>
        <button onclick="handleClick()">Click me!</button>
        <div style="margin: 20px;">
            <p>Count: <span id="count">0</span></p>
            <button onclick="increment()">Increment</button>
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
        content: `body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
}

h1 {
    color: #ffeb3b;
    margin-bottom: 20px;
}

button {
    background: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin: 5px;
}

button:hover {
    background: #45a049;
    transform: scale(1.05);
}`,
        language: 'css' 
      },
      { 
        id: '4', 
        name: 'script.js', 
        type: 'file', 
        content: `let count = 0;

function handleClick() {
    alert('Button clicked!');
    document.body.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)';
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
        content: `# Python example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Print first 10 Fibonacci numbers
for i in range(10):
    print(f"Fibonacci({i}) = {fibonacci(i)}")`,
        language: 'python' 
      },
    ],
    content: '',
    language: ''
  },
];

interface FileExplorerProps {
  onFileSelect: (file: FileItem) => void;
}

export default function FileExplorer({ onFileSelect }: FileExplorerProps) {
  return (
    <div className="w-64 bg-gray-900 text-white h-full overflow-auto">
      <div className="p-4 font-semibold border-b border-gray-700">
        EXPLORER
      </div>
      <FileTree items={sampleFiles} onFileSelect={onFileSelect} />
    </div>
  );
}

function FileTree({ items, onFileSelect }: { items: FileItem[], onFileSelect: (file: FileItem) => void }) {
  return (
    <div className="py-2">
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
        className="flex items-center px-4 py-1 hover:bg-gray-800 cursor-pointer"
        onClick={() => onFileSelect(item)}
      >
        <File size={16} className="mr-2 text-blue-400" />
        <span className="text-sm">{item.name}</span>
      </div>
    );
  }

  return (
    <div>
      <div
        className="flex items-center px-4 py-1 hover:bg-gray-800 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        <Folder size={16} className="mr-2 text-yellow-400" />
        <span className="text-sm">{item.name}</span>
      </div>
      {isOpen && item.children && (
        <div className="ml-4">
          <FileTree items={item.children} onFileSelect={onFileSelect} />
        </div>
      )}
    </div>
  );
}