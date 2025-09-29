'use client';

import Editor from '@monaco-editor/react';
import { useRef, useEffect } from 'react';

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
  theme?: string;
}

// Custom autocomplete suggestions
const getLanguageSuggestions = (language: string) => {
  const commonSuggestions = [
    { label: 'console.log', kind: 'function', insertText: 'console.log($1)' },
    { label: 'function', kind: 'keyword', insertText: 'function ${1:name}($2) {\n\t$0\n}' },
    { label: 'if', kind: 'keyword', insertText: 'if ($1) {\n\t$0\n}' },
    { label: 'for', kind: 'keyword', insertText: 'for (let ${1:i} = 0; $1 < ${2:length}; $1++) {\n\t$0\n}' },
    { label: 'while', kind: 'keyword', insertText: 'while ($1) {\n\t$0\n}' },
  ];

  const pythonSuggestions = [
    { label: 'print', kind: 'function', insertText: 'print($1)' },
    { label: 'def', kind: 'keyword', insertText: 'def ${1:function_name}($2):\n\t$0' },
    { label: 'if', kind: 'keyword', insertText: 'if $1:\n\t$0' },
    { label: 'for', kind: 'keyword', insertText: 'for ${1:item} in ${2:iterable}:\n\t$0' },
    { label: 'import', kind: 'keyword', insertText: 'import $1' },
    { label: 'from', kind: 'keyword', insertText: 'from $1 import $2' },
  ];

  const htmlSuggestions = [
    { label: 'div', kind: 'html', insertText: '<div>$1</div>' },
    { label: 'span', kind: 'html', insertText: '<span>$1</span>' },
    { label: 'button', kind: 'html', insertText: '<button>$1</button>' },
    { label: 'input', kind: 'html', insertText: '<input type="$1" placeholder="$2">' },
    { label: 'img', kind: 'html', insertText: '<img src="$1" alt="$2">' },
  ];

  const cssSuggestions = [
    { label: 'color', kind: 'css', insertText: 'color: $1;' },
    { label: 'background', kind: 'css', insertText: 'background: $1;' },
    { label: 'font-size', kind: 'css', insertText: 'font-size: $1;' },
    { label: 'margin', kind: 'css', insertText: 'margin: $1;' },
    { label: 'padding', kind: 'css', insertText: 'padding: $1;' },
  ];

  const languageMap: { [key: string]: any[] } = {
    javascript: [...commonSuggestions],
    typescript: [...commonSuggestions],
    python: [...pythonSuggestions],
    html: [...htmlSuggestions],
    css: [...cssSuggestions],
  };

  return languageMap[language] || commonSuggestions;
};

export default function CodeEditor({ language, value, onChange, theme = "vs-dark" }: CodeEditorProps) {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;

    // Configure autocomplete
    monaco.languages.registerCompletionItemProvider(language, {
      provideCompletionItems: (model: any, position: any) => {
        const suggestions = getLanguageSuggestions(language).map(suggestion => ({
          label: suggestion.label,
          kind: monaco.languages.CompletionItemKind[suggestion.kind] || monaco.languages.CompletionItemKind.Text,
          insertText: suggestion.insertText,
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: position.column,
            endColumn: position.column
          }
        }));

        return { suggestions };
      },
      triggerCharacters: ['.', '<', ' ', '"', "'", '=']
    });

    // Add custom keybindings for autocomplete
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Space, () => {
      editor.trigger('', 'editor.action.triggerSuggest', {});
    });

    // Enable word-based suggestions
    editor.updateOptions({
      quickSuggestions: true,
      suggestOnTriggerCharacters: true,
      acceptSuggestionOnEnter: 'on',
      tabCompletion: 'on',
      wordBasedSuggestions: true,
      snippets: {
        prefix: ['snippet', 'snippets'],
        body: [
          '// Code snippet: $1',
          'console.log("Hello, World!");',
          '$0'
        ]
      }
    });
  };

  // Add common programming snippets
  const addCustomSnippets = (monaco: any) => {
    // JavaScript/TypeScript snippets
    monaco.languages.registerCompletionItemProvider('javascript', {
      provideCompletionItems: () => ({
        suggestions: [
          {
            label: 'clg',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: 'Console log',
            insertText: 'console.log($1);',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: 'fn',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: 'Arrow function',
            insertText: 'const ${1:functionName} = (${2:params}) => {\n\t$0\n};',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: 'afn',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: 'Async function',
            insertText: 'const ${1:functionName} = async (${2:params}) => {\n\t$0\n};',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          }
        ]
      })
    });

    // Python snippets
    monaco.languages.registerCompletionItemProvider('python', {
      provideCompletionItems: () => ({
        suggestions: [
          {
            label: 'main',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: 'Python main function',
            insertText: 'if __name__ == "__main__":\n\t${1:main()}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: 'def',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: 'Function definition',
            insertText: 'def ${1:function_name}(${2:params}):\n\t"""${3:docstring}"""\n\t${0}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: 'class',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: 'Class definition',
            insertText: 'class ${1:ClassName}:\n\tdef __init__(self, ${2:params}):\n\t\t${0}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          }
        ]
      })
    });

    // HTML snippets
    monaco.languages.registerCompletionItemProvider('html'), {
      provideCompletionItems: () => ({
        suggestions: [
          {
            label: 'html5',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: 'HTML5 boilerplate',
            insertText: '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>${1:Document}</title>\n</head>\n<body>\n\t${0}\n</body>\n</html>',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: 'div',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: 'Div with class',
            insertText: '<div class="${1:className}">\n\t${0}\n</div>',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          }
        ]
      })
    };

    // CSS snippets
    monaco.languages.registerCompletionItemProvider('css', {
      provideCompletionItems: () => ({
        suggestions: [
          {
            label: 'flex-center',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: 'Flexbox centering',
            insertText: 'display: flex;\njustify-content: center;\nalign-items: center;',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: 'grid-layout',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: 'CSS Grid layout',
            insertText: 'display: grid;\ngrid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\ngap: 1rem;',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          }
        ]
      })
    });
  };

  const handleEditorWillMount = (monaco: any) => {
    addCustomSnippets(monaco);

    // Configure editor defaults
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: 'React',
      allowJs: true,
      typeRoots: ['node_modules/@types']
    });

    // Enable more aggressive autocomplete
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false
    });
  };

  return (
    <Editor
      height="100%"
      language={language}
      value={value}
      onChange={(newValue) => onChange(newValue || '')}
      theme={theme}
      onMount={handleEditorDidMount}
      beforeMount={handleEditorWillMount}
      options={{
        minimap: { enabled: true },
        fontSize: 14,
        wordWrap: 'on',
        automaticLayout: true,
        scrollBeyondLastLine: false,
        // Autocomplete options
        quickSuggestions: {
          other: true,
          comments: false,
          strings: true
        },
        suggestOnTriggerCharacters: true,
        acceptSuggestionOnEnter: 'on',
        tabCompletion: 'on',
        wordBasedSuggestions: 'allDocuments',
        parameterHints: {
          enabled: true
        },
        // Enhanced editing experience
        cursorBlinking: 'blink',
        cursorSmoothCaretAnimation: 'on',
        smoothScrolling: true,
        mouseWheelZoom: true,
        // Intellisense
        suggest: {
          showMethods: true,
          showFunctions: true,
          showConstructors: true,
          showFields: true,
          showVariables: true,
          showClasses: true,
          showStructs: true,
          showInterfaces: true,
          showModules: true,
          showProperties: true,
          showEvents: true,
          showOperators: true,
          showUnits: true,
          showValues: true,
          showConstants: true,
          showEnums: true,
          showEnumMembers: true,
          showKeywords: true,
          showWords: true,
          showColors: true,
          showFiles: true,
          showReferences: true,
          showFolders: true,
          showTypeParameters: true,
          showSnippets: true
        }
      }}
    />
  );
}