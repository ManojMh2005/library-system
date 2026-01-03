import { useState, useEffect, useCallback } from 'react';
import { Book, Member, LibraryStats } from '@/types/library';

const BOOKS_KEY = 'library_books';
const MEMBERS_KEY = 'library_members';

const initialBooks: Book[] = [
  { isbn: '9780134685991', title: 'Effective Java', author: 'Joshua Bloch', year: 2018, borrowedBy: null },
  { isbn: '9781617294945', title: 'Spring in Action', author: 'Craig Walls', year: 2020, borrowedBy: 'MEM001' },
  { isbn: '9781492052205', title: 'Fluent Python', author: 'Luciano Ramalho', year: 2021, borrowedBy: null },
];

const initialMembers: Member[] = [
  { id: 'MEM001', name: 'John Doe', email: 'john@example.com', joinDate: '2024-01-15', borrowedBooks: ['9781617294945'] },
];

export function useLibrary() {
  const [books, setBooks] = useState<Book[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const storedBooks = localStorage.getItem(BOOKS_KEY);
    const storedMembers = localStorage.getItem(MEMBERS_KEY);
    
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    } else {
      setBooks(initialBooks);
      localStorage.setItem(BOOKS_KEY, JSON.stringify(initialBooks));
    }
    
    if (storedMembers) {
      setMembers(JSON.parse(storedMembers));
    } else {
      setMembers(initialMembers);
      localStorage.setItem(MEMBERS_KEY, JSON.stringify(initialMembers));
    }
  }, []);

  const saveBooks = useCallback((newBooks: Book[]) => {
    setBooks(newBooks);
    localStorage.setItem(BOOKS_KEY, JSON.stringify(newBooks));
  }, []);

  const saveMembers = useCallback((newMembers: Member[]) => {
    setMembers(newMembers);
    localStorage.setItem(MEMBERS_KEY, JSON.stringify(newMembers));
  }, []);

  const addBook = useCallback((book: Omit<Book, 'borrowedBy'>) => {
    const exists = books.find(b => b.isbn === book.isbn);
    if (exists) {
      return { success: false, message: 'Book with this ISBN already exists!' };
    }
    const newBook: Book = { ...book, borrowedBy: null };
    saveBooks([...books, newBook]);
    return { success: true, message: 'Book added successfully!' };
  }, [books, saveBooks]);

  const searchBooks = useCallback((query: string) => {
    const q = query.toLowerCase();
    return books.filter(book => 
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.isbn.includes(q)
    );
  }, [books]);

  const registerMember = useCallback((name: string, email: string) => {
    const exists = members.find(m => m.email === email);
    if (exists) {
      return { success: false, message: 'Member with this email already exists!' };
    }
    const id = `MEM${String(members.length + 1).padStart(3, '0')}`;
    const newMember: Member = {
      id,
      name,
      email,
      joinDate: new Date().toISOString().split('T')[0],
      borrowedBooks: []
    };
    saveMembers([...members, newMember]);
    return { success: true, message: `Member registered successfully! ID: ${id}` };
  }, [members, saveMembers]);

  const borrowBook = useCallback((isbn: string, memberId: string) => {
    const book = books.find(b => b.isbn === isbn);
    const member = members.find(m => m.id === memberId);
    
    if (!book) return { success: false, message: 'Book not found!' };
    if (!member) return { success: false, message: 'Member not found!' };
    if (book.borrowedBy) return { success: false, message: 'Book is already borrowed!' };
    if (member.borrowedBooks.length >= 3) {
      return { success: false, message: 'Member has reached maximum borrow limit (3 books)!' };
    }

    const updatedBooks = books.map(b => 
      b.isbn === isbn ? { ...b, borrowedBy: memberId } : b
    );
    const updatedMembers = members.map(m =>
      m.id === memberId ? { ...m, borrowedBooks: [...m.borrowedBooks, isbn] } : m
    );
    
    saveBooks(updatedBooks);
    saveMembers(updatedMembers);
    return { success: true, message: `Book "${book.title}" borrowed by ${member.name}` };
  }, [books, members, saveBooks, saveMembers]);

  const returnBook = useCallback((isbn: string) => {
    const book = books.find(b => b.isbn === isbn);
    if (!book) return { success: false, message: 'Book not found!' };
    if (!book.borrowedBy) return { success: false, message: 'Book is not currently borrowed!' };

    const memberId = book.borrowedBy;
    const updatedBooks = books.map(b =>
      b.isbn === isbn ? { ...b, borrowedBy: null } : b
    );
    const updatedMembers = members.map(m =>
      m.id === memberId ? { ...m, borrowedBooks: m.borrowedBooks.filter(b => b !== isbn) } : m
    );

    saveBooks(updatedBooks);
    saveMembers(updatedMembers);
    return { success: true, message: `Book "${book.title}" returned successfully!` };
  }, [books, members, saveBooks, saveMembers]);

  const getStats = useCallback((): LibraryStats => {
    const availableBooks = books.filter(b => !b.borrowedBy).length;
    const activeMembers = members.filter(m => m.borrowedBooks.length > 0).length;
    
    return {
      totalBooks: books.length,
      availableBooks,
      borrowedBooks: books.length - availableBooks,
      totalMembers: members.length,
      activeMembers
    };
  }, [books, members]);

  return {
    books,
    members,
    addBook,
    searchBooks,
    registerMember,
    borrowBook,
    returnBook,
    getStats
  };
}
