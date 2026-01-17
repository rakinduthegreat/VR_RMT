
import React, { useState, useEffect, useRef } from 'react';

interface AutocompleteProps {
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (val: string) => void;
  icon?: string;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ label, value, placeholder, options, onChange, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filtered, setFiltered] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
    updateSuggestions(val);
  };

  const updateSuggestions = (val: string) => {
    if (val.trim().length >= 0) {
      const matches = options.filter(opt => 
        opt.toLowerCase().includes(val.toLowerCase())
      ).sort((a, b) => {
        // Boost items that start with the input
        const aStarts = a.toLowerCase().startsWith(val.toLowerCase());
        const bStarts = b.toLowerCase().startsWith(val.toLowerCase());
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return a.localeCompare(b);
      });
      setFiltered(matches.slice(0, 15)); // Limit to top 15 matches for clean UI
      setIsOpen(true);
      setActiveIndex(-1);
    } else {
      setFiltered([]);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < filtered.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < filtered.length) {
        selectOption(filtered[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const selectOption = (opt: string) => {
    onChange(opt);
    setIsOpen(false);
    setActiveIndex(-1);
  };

  return (
    <div className="relative mb-4 w-full" ref={containerRef}>
      <label className="block text-xs font-bold text-sliBlue mb-1.5 uppercase tracking-widest">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-sliBlue/40 group-focus-within:text-sliBlue transition-colors">
          <i className={`fas ${icon || 'fa-search'} text-sm`}></i>
        </div>
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => updateSuggestions(value)}
          className="block w-full pl-11 pr-4 py-3.5 border-2 border-gray-100 rounded-2xl leading-5 bg-white placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-sliBlue/5 focus:border-sliBlue transition-all text-sm font-medium"
          placeholder={placeholder}
          autoComplete="off"
        />
        {value && (
          <button 
            onClick={() => { onChange(''); setIsOpen(false); }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-300 hover:text-sliBlue"
          >
            <i className="fas fa-times-circle"></i>
          </button>
        )}
      </div>
      
      {isOpen && filtered.length > 0 && (
        <ul className="absolute z-50 mt-2 w-full bg-white shadow-2xl max-h-72 rounded-2xl py-2 text-sm overflow-auto border border-sliBlue/5 focus:outline-none animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter border-b border-gray-50 mb-1">
            Suggestions
          </div>
          {filtered.map((opt, i) => (
            <li
              key={i}
              className={`cursor-pointer select-none relative py-3 px-4 flex items-center gap-3 transition-colors ${
                i === activeIndex ? 'bg-sliBlue text-white' : 'text-gray-700 hover:bg-sliGray'
              }`}
              onClick={() => selectOption(opt)}
            >
              <i className={`fas ${i === activeIndex ? 'fa-chevron-right text-[10px]' : 'fa-car text-gray-300'}`}></i>
              <span className="block truncate font-semibold">{opt}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
