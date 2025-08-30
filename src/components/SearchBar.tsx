import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Mic, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search poems by title, author, or theme...",
  className 
}) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        onSearch(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }
  };

  return (
    <div className={cn("relative max-w-2xl mx-auto", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div className={cn(
          "relative flex items-center bg-white/90 backdrop-blur-sm rounded-full border transition-all duration-300",
          isFocused 
            ? "border-primary shadow-poetry ring-4 ring-primary/10" 
            : "border-poetry-lavender shadow-card hover:shadow-poetry"
        )}>
          {/* Search Icon */}
          <div className="pl-4 pr-2">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>

          {/* Input */}
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 font-serif placeholder:font-serif placeholder:italic text-base"
          />

          {/* Voice Search Button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleVoiceSearch}
            disabled={isListening}
            className={cn(
              "mr-2 h-8 w-8 p-0 rounded-full hover:bg-primary/10",
              isListening && "bg-primary/20 text-primary animate-pulse"
            )}
          >
            <Mic className="h-4 w-4" />
          </Button>

          {/* Search Button */}
          <Button
            type="submit"
            size="sm"
            className="mr-2 rounded-full px-4 font-serif"
          >
            <Sparkles className="h-4 w-4 mr-1" />
            Search
          </Button>
        </div>

        {/* AI Suggestions (Placeholder for future AI integration) */}
        {isFocused && query.length > 2 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-lg border border-poetry-lavender shadow-poetry z-50 p-4">
            <div className="text-sm text-muted-foreground font-serif mb-2">
              <Sparkles className="h-4 w-4 inline mr-1" />
              AI Suggestions
            </div>
            <div className="space-y-1">
              <button className="block w-full text-left px-3 py-2 text-sm hover:bg-poetry-lavender rounded font-serif">
                Poems about "{query}"
              </button>
              <button className="block w-full text-left px-3 py-2 text-sm hover:bg-poetry-lavender rounded font-serif">
                Authors similar to "{query}"
              </button>
              <button className="block w-full text-left px-3 py-2 text-sm hover:bg-poetry-lavender rounded font-serif">
                Themes related to "{query}"
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Voice Search Indicator */}
      {isListening && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-serif animate-pulse">
          🎤 Listening...
        </div>
      )}
    </div>
  );
};

export default SearchBar;