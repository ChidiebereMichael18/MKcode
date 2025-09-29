'use client';
import { useState, useEffect } from 'react';

export default function PythonRunner() {
  const [pyodide, setPyodide] = useState<any>(null);
  const [output, setOutput] = useState<string[]>([]);

  useEffect(() => {
    loadPyodide();
  }, []);

  const loadPyodide = async () => {
    // @ts-ignore
    const pyodide = await loadPyodide();
    setPyodide(pyodide);
    setOutput(prev => [...prev, '🐍 Python runtime loaded']);
  };

  const runPython = async (code: string) => {
    if (!pyodide) return;
    
    try {
      setOutput(prev => [...prev, `$ python ${code.split('\n')[0]}...`]);
      const result = await pyodide.runPythonAsync(code);
      setOutput(prev => [...prev, `>>> ${result}`]);
    } catch (error: any) {
      setOutput(prev => [...prev, `Error: ${error.message}`]);
    }
  };

  return { runPython, output, setOutput };
}