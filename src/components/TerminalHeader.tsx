interface TerminalHeaderProps {
  title: string;
}

export function TerminalHeader({ title }: TerminalHeaderProps) {
  return (
    <div className="mb-6">
      <pre className="terminal-glow text-sm md:text-base">
{`╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║   ██╗     ██╗██████╗ ██████╗  █████╗ ██████╗ ██╗   ██╗         ║
║   ██║     ██║██╔══██╗██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝         ║
║   ██║     ██║██████╔╝██████╔╝███████║██████╔╝ ╚████╔╝          ║
║   ██║     ██║██╔══██╗██╔══██╗██╔══██║██╔══██╗  ╚██╔╝           ║
║   ███████╗██║██████╔╝██║  ██║██║  ██║██║  ██║   ██║            ║
║   ╚══════╝╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝            ║
║                                                                ║
║            M A N A G E M E N T   S Y S T E M                   ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝`}
      </pre>
      <div className="mt-4 terminal-dim text-xs">
        [System Ready] {new Date().toLocaleDateString()} | v1.0.0
      </div>
    </div>
  );
}
