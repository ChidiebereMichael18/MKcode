'use client';

import Link from 'next/link';
import { Code, Terminal, Zap, Github, Star, Users, BookOpen, Play } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Navigation */}
      <nav className="border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-cyan-400 rounded flex items-center justify-center">
                <span className="text-black font-bold text-sm">MK</span>
              </div>
              <span className="text-xl font-bold">MKCode</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
              <Link href="#features" className="hover:text-gray-300 transition-colors">Features</Link>
              <Link href="#docs" className="hover:text-gray-300 transition-colors">Docs</Link>
              <Link href="/ide" className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors font-bold">
                Launch IDE
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Code size={32} className="text-black" />
          </div>
          <h1 className="text-6xl font-bold mb-6">
            MK<span className="text-gray-400">Code</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            A modern, browser-based IDE with terminal-style aesthetics. 
            <br />
            Code, preview, and execute — all in one place.
          </p>
          <div className="flex items-center justify-center space-x-4 mb-12">
            <Link 
              href="/ide" 
              className="bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors flex items-center space-x-2"
            >
              <Play size={20} />
              <span>Launch IDE</span>
            </Link>
            <a 
              href="#docs" 
              className="border border-gray-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-900 transition-colors"
            >
              Read Docs
            </a>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
            <div>
              <div className="text-3xl font-bold">10+</div>
              <div className="text-gray-400">Languages</div>
            </div>
            <div>
              <div className="text-3xl font-bold">100%</div>
              <div className="text-gray-400">Browser-based</div>
            </div>
            <div>
              <div className="text-3xl font-bold">OSS</div>
              <div className="text-gray-400">Open Source</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-y border-gray-800 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Features</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6 border border-gray-800 rounded-lg hover:border-gray-600 transition-colors">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code size={24} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Editor</h3>
              <p className="text-gray-400">
                Monaco Editor with autocomplete, syntax highlighting, and intelligent code suggestions.
              </p>
            </div>

            <div className="text-center p-6 border border-gray-800 rounded-lg hover:border-gray-600 transition-colors">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
                <Terminal size={24} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3">Integrated Terminal</h3>
              <p className="text-gray-400">
                Multi-tab terminal with Python execution, Git commands, and shell emulation.
              </p>
            </div>

            <div className="text-center p-6 border border-gray-800 rounded-lg hover:border-gray-600 transition-colors">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap size={24} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3">Live Preview</h3>
              <p className="text-gray-400">
                Real-time HTML/CSS/JS preview with instant updates as you code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section id="docs" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Documentation</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="border border-gray-800 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <BookOpen size={20} />
                <h3 className="text-xl font-bold">Getting Started</h3>
              </div>
              <ul className="space-y-3 text-gray-400">
                <li>• Open files from the explorer sidebar</li>
                <li>• Use Ctrl+Space for autocomplete</li>
                <li>• Click RUN to execute code</li>
                <li>• Toggle terminal with the terminal button</li>
                <li>• Switch between code and preview views</li>
              </ul>
            </div>

            <div className="border border-gray-800 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Terminal size={20} />
                <h3 className="text-xl font-bold">Terminal Commands</h3>
              </div>
              <ul className="space-y-3 text-gray-400">
                <li><code>git status</code> - Check git status</li>
                <li><code>python code.py</code> - Run Python</li>
                <li><code>export</code> - Download project</li>
                <li><code>clear</code> - Clear terminal</li>
                <li><code>help</code> - Show all commands</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contribute Section */}
      <section className="border-y border-gray-800 py-20 bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-6">
              <Github size={32} className="text-black" />
            </div>
            <h2 className="text-4xl font-bold mb-6">Open Source</h2>
            <p className="text-xl text-gray-400 mb-8">
              MKCode is open source and welcomes contributions from developers worldwide. 
              Help us build the future of browser-based coding.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center space-x-2">
                <Users size={20} />
                <span>Community Driven</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Star size={20} />
                <span>MIT Licensed</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Code size={20} />
                <span>TypeScript</span>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <a 
                href="https://github.com/ChidiebereMichael18/MKcode.git" 
                className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors flex items-center space-x-2"
              >
                <Github size={20} />
                <span>Star on GitHub</span>
              </a>
              <a 
                href="https://github.com/ChidiebereMichael18/MKcode.git/fork" 
                className="border border-gray-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
              >
                Fork & Contribute
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Code?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            No installation required. Start coding immediately in your browser with our full-featured IDE.
          </p>
          <Link 
            href="/ide" 
            className="bg-white text-black px-8 py-4 rounded-lg font-bold hover:bg-gray-200 transition-colors text-lg inline-flex items-center space-x-2"
          >
            <Play size={24} />
            <span>Launch MKCode IDE</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
           <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-cyan-400 rounded flex items-center justify-center">
                <span className="text-black font-bold text-sm">MK</span>
              </div>
              <span className="font-bold">MKCode</span>
            </div>
            <div className="text-gray-400 text-sm">
              Built with ❤️ for the coding community
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://github.com/ChidiebereMichael18/MKcode" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Docs</a>
              <a href="https://github.com/ChidiebereMichael18/MKcode" className="text-gray-400 hover:text-white transition-colors">Contribute</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}