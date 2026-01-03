import { useState } from 'react';
import { Book } from '@/types/library';

interface ReturnBookProps {
  books: Book[];
  onReturn: (isbn: string) => { success: boolean; message: string };
  onBack: () => void;
}

export function ReturnBook({ books, onReturn, onBack }: ReturnBookProps) {
  const [isbn, setIsbn] = useState('');
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);

  const borrowedBooks = books.filter(b => b.borrowedBy);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isbn) {
      setMessage({ text: 'ERROR: ISBN is required!', success: false });
      return;
    }
    
    const result = onReturn(isbn);
    setMessage({ text: result.message, success: result.success });
    
    if (result.success) {
      setIsbn('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="terminal-amber font-bold">
        ═══ RETURN BOOK ═══
      </div>
      
      <div className="mb-4">
        <div className="terminal-cyan text-sm mb-2">Currently Borrowed Books:</div>
        <div className="space-y-1 text-xs">
          {borrowedBooks.length === 0 ? (
            <div className="terminal-dim">No books currently borrowed</div>
          ) : (
            borrowedBooks.map(book => (
              <div key={book.isbn} className="terminal-dim hover:terminal-text cursor-pointer"
                   onClick={() => setIsbn(book.isbn)}>
                {book.isbn} - {book.title} (Borrowed by: {book.borrowedBy})
              </div>
            ))
          )}
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <span className="terminal-dim w-24">ISBN:</span>
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            className="terminal-input flex-1 px-2 py-1 terminal-text"
            placeholder="Enter book ISBN to return..."
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
            [Return]
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
