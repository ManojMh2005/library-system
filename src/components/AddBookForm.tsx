import { useState } from 'react';

interface AddBookFormProps {
  onSubmit: (book: { isbn: string; title: string; author: string; year: number }) => { success: boolean; message: string };
  onBack: () => void;
}

export function AddBookForm({ onSubmit, onBack }: AddBookFormProps) {
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isbn || !title || !author || !year) {
      setMessage({ text: 'ERROR: All fields are required!', success: false });
      return;
    }
    
    const result = onSubmit({ isbn, title, author, year: parseInt(year) });
    setMessage({ text: result.message, success: result.success });
    
    if (result.success) {
      setIsbn('');
      setTitle('');
      setAuthor('');
      setYear('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="terminal-amber font-bold">
        ═══ ADD NEW BOOK ═══
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="terminal-dim w-24">ISBN:</span>
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            className="terminal-input flex-1 px-2 py-1 terminal-text"
            placeholder="Enter ISBN..."
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="terminal-dim w-24">Title:</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="terminal-input flex-1 px-2 py-1 terminal-text"
            placeholder="Enter book title..."
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="terminal-dim w-24">Author:</span>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="terminal-input flex-1 px-2 py-1 terminal-text"
            placeholder="Enter author name..."
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="terminal-dim w-24">Year:</span>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="terminal-input flex-1 px-2 py-1 terminal-text"
            placeholder="Enter publication year..."
            min="1000"
            max="2099"
          />
        </div>
        
        {message && (
          <div className={`py-2 ${message.success ? 'text-green-400' : 'text-red-400'}`}>
            {message.text}
          </div>
        )}
        
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="terminal-text hover:terminal-glow transition-all px-4 py-2 border border-foreground hover:bg-secondary"
          >
            [Submit]
          </button>
          <button
            type="button"
            onClick={onBack}
            className="terminal-dim hover:terminal-text transition-all px-4 py-2 border border-border hover:border-foreground"
          >
            [Cancel]
          </button>
        </div>
      </form>
    </div>
  );
}
