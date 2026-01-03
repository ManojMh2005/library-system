export interface Book {
  isbn: string;
  title: string;
  author: string;
  year: number;
  borrowedBy: string | null;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  borrowedBooks: string[];
}

export interface LibraryStats {
  totalBooks: number;
  availableBooks: number;
  borrowedBooks: number;
  totalMembers: number;
  activeMembers: number;
}

export type MenuOption = 
  | 'menu'
  | 'add-book'
  | 'view-books'
  | 'search-books'
  | 'register-member'
  | 'borrow-book'
  | 'return-book'
  | 'view-stats';
