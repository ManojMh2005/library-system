import { LibraryStats as Stats } from '@/types/library';

interface LibraryStatsProps {
  stats: Stats;
  onBack: () => void;
}

export function LibraryStats({ stats, onBack }: LibraryStatsProps) {
  const availabilityRate = stats.totalBooks > 0 
    ? Math.round((stats.availableBooks / stats.totalBooks) * 100) 
    : 0;

  return (
    <div className="space-y-4">
      <div className="terminal-amber font-bold">
        ═══ LIBRARY STATISTICS ═══
      </div>
      
      <div className="terminal-dim">
        {'─'.repeat(50)}
      </div>
      
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-3">
          <div className="terminal-cyan font-bold">BOOK INVENTORY</div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="terminal-dim">Total Books:</span>
              <span className="terminal-glow">{stats.totalBooks}</span>
            </div>
            <div className="flex justify-between">
              <span className="terminal-dim">Available:</span>
              <span className="text-green-400">{stats.availableBooks}</span>
            </div>
            <div className="flex justify-between">
              <span className="terminal-dim">Borrowed:</span>
              <span className="terminal-amber">{stats.borrowedBooks}</span>
            </div>
          </div>
          
          <div className="pt-2">
            <div className="terminal-dim text-xs mb-1">Availability Rate:</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-secondary h-3 rounded-none overflow-hidden">
                <div 
                  className="h-full bg-foreground transition-all duration-500"
                  style={{ width: `${availabilityRate}%` }}
                />
              </div>
              <span className="terminal-text text-sm">{availabilityRate}%</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="terminal-cyan font-bold">MEMBERSHIP</div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="terminal-dim">Total Members:</span>
              <span className="terminal-glow">{stats.totalMembers}</span>
            </div>
            <div className="flex justify-between">
              <span className="terminal-dim">Active Borrowers:</span>
              <span className="text-green-400">{stats.activeMembers}</span>
            </div>
            <div className="flex justify-between">
              <span className="terminal-dim">Inactive:</span>
              <span className="terminal-dim">{stats.totalMembers - stats.activeMembers}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="terminal-dim mt-6">
        {'─'.repeat(50)}
      </div>
      
      <div className="terminal-dim text-xs">
        Last updated: {new Date().toLocaleString()}
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
