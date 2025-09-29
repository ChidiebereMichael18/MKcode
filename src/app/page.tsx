'use client';

import Link from 'next/link';
import { Code, Terminal, Zap, Github, Star, Users, BookOpen, Play, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Navigation */}
      <nav className="border-b border-gray-800 sticky top-0 bg-black z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-cyan-400 rounded flex items-center justify-center">
                <span className="text-black font-bold text-sm">MK</span>
              </div>
              <span className="text-xl font-bold font-mono">MKCode</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="hover:text-gray-300 transition-colors text-sm lg:text-base">Home</Link>
              <Link href="#features" className="hover:text-gray-300 transition-colors text-sm lg:text-base">Features</Link>
              <Link href="#docs" className="hover:text-gray-300 transition-colors text-sm lg:text-base">Docs</Link>
              <Link 
                href="/ide" 
                className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors font-bold text-sm lg:text-base"
              >
                Launch IDE
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-400 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden pt-4 pb-2 border-t border-gray-800">
              <div className="flex flex-col space-y-4">
                <Link 
                  href="/" 
                  className="hover:text-gray-300 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="#features" 
                  className="hover:text-gray-300 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link 
                  href="#docs" 
                  className="hover:text-gray-300 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Docs
                </Link>
                <Link 
                  href="/ide" 
                  className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors font-bold text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Launch IDE
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8">
            <Code size={28} className="text-black sm:w-8 sm:h-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 font-mono">
            MK<span className="text-gray-400">Code</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto px-4">
            A modern, browser-based IDE with terminal-style aesthetics. 
            <br className="hidden sm:block" />
            Code, preview, and execute — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8 sm:mb-12">
            <Link 
              href="/ide" 
              className="bg-white text-black px-6 py-3 sm:px-8 sm:py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto"
            >
              <Play size={20} />
              <span>Launch IDE</span>
            </Link>
            <a 
              href="#docs" 
              className="border border-gray-600 text-white px-6 py-3 sm:px-8 sm:py-3 rounded-lg font-bold hover:bg-gray-900 transition-colors flex items-center justify-center w-full sm:w-auto"
            >
              Read Docs
            </a>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold">10+</div>
              <div className="text-gray-400 text-sm sm:text-base">Languages</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold">100%</div>
              <div className="text-gray-400 text-sm sm:text-base">Browser-based</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold">OSS</div>
              <div className="text-gray-400 text-sm sm:text-base">Open Source</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-y border-gray-800 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16 font-mono">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <div className="text-center p-4 sm:p-6 border border-gray-800 rounded-lg hover:border-gray-600 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Code size={20} className="text-black sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Smart Editor</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                Monaco Editor with autocomplete, syntax highlighting, and intelligent code suggestions.
              </p>
            </div>

            <div className="text-center p-4 sm:p-6 border border-gray-800 rounded-lg hover:border-gray-600 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Terminal size={20} className="text-black sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Integrated Terminal</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                Multi-tab terminal with Python execution, Git commands, and shell emulation.
              </p>
            </div>

            <div className="text-center p-4 sm:p-6 border border-gray-800 rounded-lg hover:border-gray-600 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Zap size={20} className="text-black sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Live Preview</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                Real-time HTML/CSS/JS preview with instant updates as you code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section id="docs" className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16 font-mono">Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="border border-gray-800 rounded-lg p-4 sm:p-6">
              <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                <BookOpen size={18} className="sm:w-5 sm:h-5" />
                <h3 className="text-lg sm:text-xl font-bold">Getting Started</h3>
              </div>
              <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  Open files from the explorer sidebar
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  Use Ctrl+Space for autocomplete
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  Click RUN to execute code
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  Toggle terminal with the terminal button
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  Switch between code and preview views
                </li>
              </ul>
            </div>

            <div className="border border-gray-800 rounded-lg p-4 sm:p-6">
              <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                <Terminal size={18} className="sm:w-5 sm:h-5" />
                <h3 className="text-lg sm:text-xl font-bold">Terminal Commands</h3>
              </div>
              <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
                <li className="flex items-center">
                  <code className="bg-gray-900 px-2 py-1 rounded text-xs sm:text-sm font-mono mr-2">git status</code>
                  <span>Check git status</span>
                </li>
                <li className="flex items-center">
                  <code className="bg-gray-900 px-2 py-1 rounded text-xs sm:text-sm font-mono mr-2">python code.py</code>
                  <span>Run Python</span>
                </li>
                <li className="flex items-center">
                  <code className="bg-gray-900 px-2 py-1 rounded text-xs sm:text-sm font-mono mr-2">export</code>
                  <span>Download project</span>
                </li>
                <li className="flex items-center">
                  <code className="bg-gray-900 px-2 py-1 rounded text-xs sm:text-sm font-mono mr-2">clear</code>
                  <span>Clear terminal</span>
                </li>
                <li className="flex items-center">
                  <code className="bg-gray-900 px-2 py-1 rounded text-xs sm:text-sm font-mono mr-2">help</code>
                  <span>Show all commands</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contribute Section */}
      <section className="border-y border-gray-800 py-12 sm:py-16 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Github size={24} className="text-black sm:w-8 sm:h-8" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 font-mono">Open Source</h2>
            <p className="text-lg sm:text-xl text-gray-400 mb-6 sm:mb-8 px-4">
              MKCode is open source and welcomes contributions from developers worldwide. 
              Help us build the future of browser-based coding.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="flex items-center justify-center space-x-2 text-sm sm:text-base">
                <Users size={16} className="sm:w-5 sm:h-5" />
                <span>Community Driven</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm sm:text-base">
                <Star size={16} className="sm:w-5 sm:h-5" />
                <span>MIT Licensed</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm sm:text-base">
                <Code size={16} className="sm:w-5 sm:h-5" />
                <span>TypeScript</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a 
                href="https://github.com/ChidiebereMichael18/MKcode.git" 
                className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto text-sm sm:text-base"
              >
                <Github size={18} className="sm:w-5 sm:h-5" />
                <span>Star on GitHub</span>
              </a>
              <a 
                href="https://github.com/ChidiebereMichael18/MKcode.git/fork" 
                className="border border-gray-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors flex items-center justify-center w-full sm:w-auto text-sm sm:text-base"
              >
                Fork & Contribute
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 font-mono">Ready to Code?</h2>
          <p className="text-lg sm:text-xl text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            No installation required. Start coding immediately in your browser with our full-featured IDE.
          </p>
          <Link 
            href="/ide" 
            className="bg-white text-black px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold hover:bg-gray-200 transition-colors text-base sm:text-lg inline-flex items-center justify-center space-x-2 mx-auto"
          >
            <Play size={20} className="sm:w-6 sm:h-6" />
            <span>Launch MKCode IDE</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-400 to-cyan-400 rounded flex items-center justify-center">
                <span className="text-black font-bold text-xs sm:text-sm">MK</span>
              </div>
              <span className="font-bold text-sm sm:text-base font-mono">MKCode</span>
            </div>
            <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              Built with ❤️ for the coding community
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://github.com/ChidiebereMichael18/MKcode" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">GitHub</a>
              <a href="#docs" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">Docs</a>
              <a href="https://github.com/ChidiebereMichael18/MKcode" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">Contribute</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}