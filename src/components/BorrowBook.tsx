import { useState } from 'react';
import { Book, Member } from '@/types/library';

interface BorrowBookProps {
  books: Book[];
  members: Member[];
  onBorrow: (isbn: string, memberId: string) => { success: boolean; message: string };
  onBack: () => void;
}

export function BorrowBook({ books, members, onBorrow, onBack }: BorrowBookProps) {
  const [isbn, setIsbn] = useState('');
  const [memberId, setMemberId] = useState('');
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);

  const availableBooks = books.filter(b => !b.borrowedBy);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isbn || !memberId) {
      setMessage({ text: 'ERROR: Both ISBN and Member ID are required!', success: false });
      return;
    }
    
    const result = onBorrow(isbn, memberId);
    setMessage({ text: result.message, success: result.success });
    
    if (result.success) {
      setIsbn('');
      setMemberId('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="terminal-amber font-bold">
        ═══ BORROW BOOK ═══
      </div>
      
      <div className="grid grid-cols-2 gap-8">
        <div>
          <div className="terminal-cyan text-sm mb-2">Available Books:</div>
          <div className="space-y-1 text-xs max-h-40 overflow-y-auto">
            {availableBooks.length === 0 ? (
              <div className="terminal-dim">No books available</div>
            ) : (
              availableBooks.map(book => (
                <div key={book.isbn} className="terminal-dim hover:terminal-text cursor-pointer"
                     onClick={() => setIsbn(book.isbn)}>
                  {book.isbn} - {book.title}
                </div>
              ))
            )}
          </div>
        </div>
        
        <div>
          <div className="terminal-cyan text-sm mb-2">Registered Members:</div>
          <div className="space-y-1 text-xs max-h-40 overflow-y-auto">
            {members.map(member => (
              <div key={member.id} className="terminal-dim hover:terminal-text cursor-pointer"
                   onClick={() => setMemberId(member.id)}>
                {member.id} - {member.name} ({member.borrowedBooks.length}/3)
              </div>
            ))}
          </div>
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
            placeholder="Enter book ISBN..."
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="terminal-dim w-24">Member ID:</span>
          <input
            type="text"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            className="terminal-input flex-1 px-2 py-1 terminal-text"
            placeholder="Enter member ID..."
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
            [Borrow]
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
