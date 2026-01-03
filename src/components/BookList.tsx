import { Book } from '@/types/library';

interface BookListProps {
  books: Book[];
  title: string;
  onBack: () => void;
}

export function BookList({ books, title, onBack }: BookListProps) {
  return (
    <div className="space-y-4">
      <div className="terminal-amber font-bold">
        ═══ {title} ═══
      </div>
      
      <div className="terminal-text mb-2">
        Total books: {books.length}
      </div>
      
      <div className="terminal-dim">
        {'─'.repeat(80)}
      </div>
      
      {books.length === 0 ? (
        <div className="terminal-dim py-4">
          No books found.
        </div>
      ) : (
        <div className="space-y-2">
          {books.map((book, index) => (
            <div key={book.isbn} className="terminal-text text-sm">
              <span className="terminal-dim">{index + 1}.</span>{' '}
              <span className="terminal-cyan">ISBN: {book.isbn}</span>{' | '}
              <span className="terminal-glow">Title: {book.title}</span>{' | '}
              <span>Author: {book.author}</span>{' | '}
              <span className="terminal-dim">Year: {book.year}</span>{' | '}
              {book.borrowedBy ? (
                <span className="terminal-amber">Borrowed by: {book.borrowedBy}</span>
              ) : (
                <span className="text-green-400">Available</span>
              )}
            </div>
          ))}
        </div>
      )}
      
      <div className="terminal-dim mt-4">
        {'─'.repeat(80)}
      </div>
      
      <button
        onClick={onBack}
        className="mt-4 terminal-text hover:terminal-glow transition-all px-4 py-2 border border-border hover:border-foreground"
      >
        ← Back to Main Menu
      </button>
    </div>
  );
}
