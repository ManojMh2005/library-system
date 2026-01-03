import { MenuOption } from '@/types/library';

interface MainMenuProps {
  onSelect: (option: MenuOption) => void;
}

const menuItems: { key: MenuOption; label: string; description: string }[] = [
  { key: 'add-book', label: '1. Add New Book', description: 'Register a new book to the library' },
  { key: 'view-books', label: '2. View All Books', description: 'Display complete book inventory' },
  { key: 'search-books', label: '3. Search Books', description: 'Find books by title, author, or ISBN' },
  { key: 'register-member', label: '4. Register Member', description: 'Add a new library member' },
  { key: 'borrow-book', label: '5. Borrow Book', description: 'Check out a book to a member' },
  { key: 'return-book', label: '6. Return Book', description: 'Return a borrowed book' },
  { key: 'view-stats', label: '7. View Library Statistics', description: 'Display library analytics' },
];

export function MainMenu({ onSelect }: MainMenuProps) {
  return (
    <div className="space-y-2">
      <div className="terminal-amber font-bold mb-4">
        ═══ MAIN MENU ═══
      </div>
      
      <div className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onSelect(item.key)}
            className="w-full text-left px-4 py-2 terminal-text hover:bg-secondary/50 
                       transition-all duration-150 group flex justify-between items-center"
          >
            <span className="terminal-glow">{item.label}</span>
            <span className="terminal-dim text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              {item.description}
            </span>
          </button>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <div className="terminal-dim text-sm">
          Enter option number or click to select...
        </div>
      </div>
    </div>
  );
}
