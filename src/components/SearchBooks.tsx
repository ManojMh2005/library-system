import { useState } from 'react';
import { Book } from '@/types/library';
import { BookList } from './BookList';

interface SearchBooksProps {
  onSearch: (query: string) => Book[];
  onBack: () => void;
}

export function SearchBooks({ onSearch, onBack }: SearchBooksProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[] | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setResults(onSearch(query));
    }
  };

  if (results !== null) {
    return (
      <BookList 
        books={results} 
        title={`SEARCH RESULTS FOR "${query.toUpperCase()}"`}
        onBack={() => setResults(null)}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="terminal-amber font-bold">
        ═══ SEARCH BOOKS ═══
      </div>
      
      <div className="terminal-dim text-sm mb-4">
        Search by title, author, or ISBN
      </div>
      
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="terminal-text">{'>'}</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="terminal-input flex-1 px-2 py-1 terminal-text"
            placeholder="Enter search query..."
            autoFocus
          />
        </div>
        
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="terminal-text hover:terminal-glow transition-all px-4 py-2 border border-foreground hover:bg-secondary"
          >
            [Search]
          </button>
          <button
            type="button"
            onClick={onBack}
            className="terminal-dim hover:terminal-text transition-all px-4 py-2 border border-border hover:border-foreground"
          >
            [Back]
          </button>
        </div>
      </form>
    </div>
  );
}
