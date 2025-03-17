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

  // Auto-resize textarea based on content with improved height management
  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      // Reset height to get the correct scrollHeight
      textareaRef.current.style.height = 'auto';
      
      // Set a minimum height and limit maximum height
      const minHeight = 24; // Minimum height in pixels
      const maxHeight = 96; // Maximum height in pixels
      const scrollHeight = textareaRef.current.scrollHeight;
      
      // Apply the appropriate height
      const newHeight = Math.max(minHeight, Math.min(scrollHeight, maxHeight));
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  // Focus textarea on mount and set initial height
  useEffect(() => {
    if (textareaRef.current) {
      // textareaRef.current.focus();
      autoResizeTextarea();
    }
  }, []);

  // Auto-resize when input changes
  useEffect(() => {
    autoResizeTextarea();
  }, [input]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
      
      // Reset height after submission
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = '24px';
          textareaRef.current.focus();
        }
      }, 0);
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  // Handle key press events
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