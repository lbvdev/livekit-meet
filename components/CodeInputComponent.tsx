'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  CodeInputContainer, 
  CodeInput, 
  CodeSquares, 
  CodeSquare 
} from './CustomPreJoin.styles';

interface CodeInputComponentProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  autoFocus?: boolean;
}

export function CodeInputComponent({
  value,
  onChange,
  placeholder = "",
  maxLength = 4,
  disabled = false,
  autoFocus = false
}: CodeInputComponentProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, ''); // Только цифры
    if (newValue.length <= maxLength) {
      onChange(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      'Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight'
    ];
    
    if (!allowedKeys.includes(e.key) && !/\d/.test(e.key)) {
      e.preventDefault();
    }
  };

  const squares = Array.from({ length: maxLength }, (_, index) => {
    const isActive = isFocused && index === Math.min(value.length, maxLength - 1);
    const isFilled = index < value.length;
    const digit = value[index] || '';
    
    return (
      <CodeSquare 
        key={index}
        isActive={isActive}
        isFilled={isFilled}
      >
        {digit}
      </CodeSquare>
    );
  });

  return (
    <CodeInputContainer>
      <CodeInput
        ref={inputRef}
        type="text"
        inputMode="numeric"
        pattern="\d*"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        style={{ 
          background: 'transparent', 
          border: 'none',
          color: 'transparent',
          caretColor: 'transparent'
        }}
      />
      <CodeSquares>
        {squares}
      </CodeSquares>
    </CodeInputContainer>
  );
}
