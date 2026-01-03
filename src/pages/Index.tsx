import { useState, useEffect } from 'react';
import { MenuOption } from '@/types/library';
import { useLibrary } from '@/hooks/useLibrary';
import { TerminalHeader } from '@/components/TerminalHeader';
import { MainMenu } from '@/components/MainMenu';
import { BookList } from '@/components/BookList';
import { AddBookForm } from '@/components/AddBookForm';
import { SearchBooks } from '@/components/SearchBooks';
import { RegisterMember } from '@/components/RegisterMember';
import { BorrowBook } from '@/components/BorrowBook';
import { ReturnBook } from '@/components/ReturnBook';
import { LibraryStats } from '@/components/LibraryStats';

const Index = () => {
  const [currentView, setCurrentView] = useState<MenuOption>('menu');
  const { books, members, addBook, searchBooks, registerMember, borrowBook, returnBook, getStats } = useLibrary();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentView === 'menu') {
        const keyMap: Record<string, MenuOption> = {
          '1': 'add-book',
          '2': 'view-books',
          '3': 'search-books',
          '4': 'register-member',
          '5': 'borrow-book',
          '6': 'return-book',
          '7': 'view-stats',
        };
        
        if (keyMap[e.key]) {
          setCurrentView(keyMap[e.key]);
        }
      } else if (e.key === 'Escape') {
        setCurrentView('menu');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentView]);

  const renderContent = () => {
    switch (currentView) {
      case 'add-book':
        return <AddBookForm onSubmit={addBook} onBack={() => setCurrentView('menu')} />;
      case 'view-books':
        return <BookList books={books} title="ALL BOOKS" onBack={() => setCurrentView('menu')} />;
      case 'search-books':
        return <SearchBooks onSearch={searchBooks} onBack={() => setCurrentView('menu')} />;
      case 'register-member':
        return <RegisterMember onSubmit={registerMember} onBack={() => setCurrentView('menu')} />;
      case 'borrow-book':
        return <BorrowBook books={books} members={members} onBorrow={borrowBook} onBack={() => setCurrentView('menu')} />;
      case 'return-book':
        return <ReturnBook books={books} onReturn={returnBook} onBack={() => setCurrentView('menu')} />;
      case 'view-stats':
        return <LibraryStats stats={getStats()} onBack={() => setCurrentView('menu')} />;
      default:
        return <MainMenu onSelect={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-background terminal-container relative">
      {/* CRT overlay effect */}
      <div className="crt-overlay" />
      
      <div className="max-w-4xl mx-auto p-6 md:p-8 relative z-10">
        <TerminalHeader title="LIBRARY MANAGEMENT SYSTEM" />
        
        <div className="terminal-border p-6 bg-card/50">
          {renderContent()}
        </div>
        
        <div className="mt-4 flex justify-between items-center text-xs terminal-dim">
          <span>Press ESC to return to menu</span>
          <span>Data persisted locally</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
