import React, { useRef, useEffect } from 'react';

interface TerminalInputProps {
  input: string;
  setInput: (input: string) => void;
  handleCommand: (command: string) => void;
  isDark: boolean;
}

const TerminalInput: React.FC<TerminalInputProps> = ({
  input,
  setInput,
  handleCommand,
  isDark
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      
      const minHeight = 24;
      const maxHeight = 96;
      const scrollHeight = textareaRef.current.scrollHeight;
      
      const newHeight = Math.max(minHeight, Math.min(scrollHeight, maxHeight));
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      autoResizeTextarea();
    }
  }, []);

  useEffect(() => {
    autoResizeTextarea();
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
      
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = '24px';
          textareaRef.current.focus();
        }
      }, 0);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="terminal-prompt">
      <span className="terminal-prompt-symbol">$</span>
      <form onSubmit={handleSubmit} className="terminal-input-container mobile-terminal-fix">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className={`terminal-input ${isDark ? 'text-white' : 'text-gray-800'}`}
          placeholder="Type a command..."
          rows={1}
          style={{ minHeight: '24px', maxHeight: '96px' }}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />
        <button 
          type="submit" 
          className="terminal-input-button md:hidden"
          aria-label="Submit command"
        >
          ↵
        </button>
      </form>
    </div>
  );
};

export default TerminalInput; 