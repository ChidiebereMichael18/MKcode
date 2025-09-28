'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, Eye, Maximize2, Minimize2 } from 'lucide-react';

interface LivePreviewProps {
  html: string;
  css: string;
  js: string;
}

export default function LivePreview({ html, css, js }: LivePreviewProps) {
  const [srcDoc, setSrcDoc] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const combinedCode = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `;
    setSrcDoc(combinedCode);
  }, [html, css, js]);

  const refreshPreview = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 300);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`flex flex-col h-full bg-black border-l border-[#00ff00] ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      <div className="flex items-center justify-between p-2 border-b border-[#00ff00] bg-[#151821]">
        <div className="flex items-center space-x-2">
          <Eye size={14} className="text-green-400" />
          <h3 className="font-bold text-green-400 text-sm font-mono">PREVIEW</h3>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={refreshPreview}
            className="flex items-center space-x-1 px-2 py-1 text-xs bg-green-500 hover:bg-green-600 text-black rounded font-bold transition-colors"
          >
            <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
            <span>RELOAD</span>
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-1 text-green-400 hover:bg-green-500 hover:text-black rounded transition-colors"
          >
            {isFullscreen ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
          </button>
        </div>
      </div>
      
      <div className="flex-1 bg-white">
        <iframe
          key={isRefreshing ? Date.now() : srcDoc}
          srcDoc={srcDoc}
          title="preview"
          sandbox="allow-scripts allow-same-origin"
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
}