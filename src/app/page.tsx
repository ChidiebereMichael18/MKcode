'use client';

import { useState } from 'react';
import CodeEditor from '@/components/CodeEditor';
import Terminal from '@/components/Terminal';
import Tabs from '@/components/Tabs';
import LivePreview from '@/components/LivePreview';
import { Split, Code, Monitor,Play } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

type ViewMode = 'editor' | 'preview' | 'split';

interface FileTab {
  id: string;
  name: string;
  language: string;
  content: string;
}

export default function Home() {
  const [tabs, setTabs] = useState<FileTab[]>([]);
  const [activeTab, setActiveTab] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);

  const getCurrentFileContent = (fileId: string) => {
    const tab = tabs.find(tab => tab.id === fileId);
    return tab?.content || '';
  };

  const updateFileContent = (fileId: string, content: string) => {
    setTabs(prev => prev.map(tab => 
      tab.id === fileId ? { ...tab, content } : tab
    ));
  };

  const handleFileSelect = (file: any) => {
    if (file.type === 'file') {
      const existingTab = tabs.find(tab => tab.id === file.id);
      if (!existingTab) {
        const newTab: FileTab = {
          id: file.id,
          name: file.name,
          language: file.language,
          content: file.content
        };
        setTabs(prev => [...prev, newTab]);
      }
      setActiveTab(file.id);
    }
  };

  const handleTabClose = (tabId: string) => {
    setTabs(prev => {
      const newTabs = prev.filter(tab => tab.id !== tabId);
      if (activeTab === tabId && newTabs.length > 0) {
        setActiveTab(newTabs[newTabs.length - 1].id);
      } else if (newTabs.length === 0) {
        setActiveTab('');
      }
      return newTabs;
    });
  };

  const handleCreateFile = () => {
    const newFileId = `new-${Date.now()}`;
    const newTab: FileTab = {
      id: newFileId,
      name: 'new-file.js',
      language: 'javascript',
      content: '// New file created in MKCode\nconsole.log("Hello MKCode!");'
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTab(newFileId);
  };

  const handleRunCode = (code: string, language: string) => {
    console.log(`Running ${language} code:`, code);
    alert(`Running ${language} code... Check browser console for output.`);
  };

  const htmlFile = tabs.find(tab => tab.name.endsWith('.html'))?.content || '';
  const cssFile = tabs.find(tab => tab.name.endsWith('.css'))?.content || '';
  const jsFile = tabs.find(tab => tab.name.endsWith('.js'))?.content || '';
  const activeFile = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="h-screen flex flex-col bg-[#0c0e14] text-green-400 font-mono">
      {/* Header */}
      <header className="bg-[#151821] border-b border-[#1f2430] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-cyan-400 rounded flex items-center justify-center">
                <span className="text-black font-bold text-sm">MK</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-green-400">MKCode</h1>
                <p className="text-xs text-cyan-400">web ide</p>
              </div>
            </div>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            {activeFile && (
              <button
                onClick={() => handleRunCode(activeFile.content, activeFile.language)}
                className="flex items-center space-x-2 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-black rounded text-sm transition-colors font-bold"
              >
                <Play size={14} />
                <span>RUN</span>
              </button>
            )}
            
            <div className="flex bg-[#1f2430] rounded p-1 border border-[#2a3040]">
              <button
                onClick={() => setViewMode('editor')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded text-xs transition-colors ${
                  viewMode === 'editor' ? 'bg-green-500 text-black' : 'text-cyan-400 hover:text-green-400'
                }`}
              >
                <Code size={14} />
                <span>CODE</span>
              </button>
              <button
                onClick={() => setViewMode('split')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded text-xs transition-colors ${
                  viewMode === 'split' ? 'bg-green-500 text-black' : 'text-cyan-400 hover:text-green-400'
                }`}
              >
                <Split size={14} />
                <span>SPLIT</span>
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded text-xs transition-colors ${
                  viewMode === 'preview' ? 'bg-green-500 text-black' : 'text-cyan-400 hover:text-green-400'
                }`}
              >
                <Monitor size={14} />
                <span>PREVIEW</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          onFileSelect={handleFileSelect}
          onCreateFile={handleCreateFile}
        />
        
        {/* Editor/Preview Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Tabs */}
          {tabs.length > 0 && (
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onTabSelect={setActiveTab}
              onTabClose={handleTabClose}
              onTerminalToggle={() => setIsTerminalOpen(!isTerminalOpen)}
              isTerminalOpen={isTerminalOpen}
            />
          )}
          
          {/* Editor and Preview */}
          <div className="flex-1 flex">
            {/* Code Editor */}
            {(viewMode === 'editor' || viewMode === 'split') && (
              <div className={viewMode === 'split' ? 'flex-1' : 'flex-1'}>
                {activeFile ? (
                  <CodeEditor
                    language={activeFile.language}
                    value={activeFile.content}
                    onChange={(content) => updateFileContent(activeFile.id, content)}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-cyan-400">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-[#1f2430] rounded flex items-center justify-center mx-auto mb-3 border border-cyan-400/20">
                        <Code size={20} className="text-cyan-400" />
                      </div>
                      <p className="text-sm font-medium">no file open</p>
                      <p className="text-xs text-green-400 mt-1">select file from explorer</p>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Live Preview */}
            {(viewMode === 'preview' || viewMode === 'split') && (
              <div className={viewMode === 'split' ? 'flex-1' : 'flex-1'}>
                <LivePreview html={htmlFile} css={cssFile} js={jsFile} />
              </div>
            )}
          </div>

          {/* Terminal */}
          <Terminal 
            isOpen={isTerminalOpen}
            onToggle={() => setIsTerminalOpen(!isTerminalOpen)}
            onRunCode={handleRunCode}
            currentFile={activeFile}
          />
        </div>
      </div>
    </div>
  );
}