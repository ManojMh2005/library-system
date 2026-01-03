import { useState } from 'react';

interface RegisterMemberProps {
  onSubmit: (name: string, email: string) => { success: boolean; message: string };
  onBack: () => void;
}

export function RegisterMember({ onSubmit, onBack }: RegisterMemberProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      setMessage({ text: 'ERROR: All fields are required!', success: false });
      return;
    }
    
    const result = onSubmit(name, email);
    setMessage({ text: result.message, success: result.success });
    
    if (result.success) {
      setName('');
      setEmail('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="terminal-amber font-bold">
        ═══ REGISTER NEW MEMBER ═══
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="terminal-dim w-24">Name:</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="terminal-input flex-1 px-2 py-1 terminal-text"
            placeholder="Enter member name..."
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="terminal-dim w-24">Email:</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="terminal-input flex-1 px-2 py-1 terminal-text"
            placeholder="Enter email address..."
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
            [Register]
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
