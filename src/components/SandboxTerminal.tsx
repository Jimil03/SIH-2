import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, RotateCcw, ShieldAlert, Cpu } from 'lucide-react';

export const SandboxTerminal: React.FC = () => {
  const [typedCommand, setTypedCommand] = useState('');
  const [logs, setLogs] = useState<string[]>([
    '[OK] Synchronizing sovereign agency profiles...',
    '[OK] Injecting randomized perimeter compromise scenario...',
    'Prompt: Establish triage protocols and authorize failover mesh within 3 minutes.',
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [currentModule, setCurrentModule] = useState(4);
  const [isDone, setIsDone] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  const defaultCommand = '$ capacity-connect init --module=cyber-gov';

  // Typing animation for initial command
  useEffect(() => {
    let charIndex = 0;
    let isDeleting = false;
    let timer: NodeJS.Timeout;

    const runTyping = () => {
      if (!isDeleting) {
        setTypedCommand(defaultCommand.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex === defaultCommand.length) {
          timer = setTimeout(() => {
            isDeleting = true;
            runTyping();
          }, 6000);
          return;
        }
        timer = setTimeout(runTyping, 50);
      } else {
        setTypedCommand(defaultCommand.substring(0, charIndex - 1));
        charIndex--;
        if (charIndex === 2) {
          isDeleting = false;
          timer = setTimeout(runTyping, 1200);
          return;
        }
        timer = setTimeout(runTyping, 25);
      }
    };

    timer = setTimeout(runTyping, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleRunCustomCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const cmd = inputVal.trim();
    setInputVal('');
    setLogs((prev) => [...prev, `$ ${cmd}`]);

    setIsRunning(true);
    setTimeout(() => {
      if (cmd.includes('help')) {
        setLogs((prev) => [
          ...prev,
          'Available commands:',
          '  status        - View sovereign node health & mesh ping',
          '  failover      - Trigger secondary regional node mesh switch',
          '  audit         - Inspect cryptographic model integrity check',
          '  certify       - Run ISO 4.0 validation diagnostics',
          '  clear         - Clear terminal screen',
        ]);
      } else if (cmd.includes('failover')) {
        setLogs((prev) => [
          ...prev,
          '[WARN] Rerouting public traffic to Sovereign Cluster B (Frankfurt-Gov-02)...',
          '[OK] Zero-loss packet mesh established. Latency: 1.2ms',
          '[SUCCESS] Incident mitigation completed. Triage verified.',
        ]);
        setCurrentModule(5);
      } else if (cmd.includes('status')) {
        setLogs((prev) => [
          ...prev,
          'Sovereign Gateway: 14 Active Nodes | Encryption: Post-Quantum Dilithium-3',
          'PKI Revocation Cache: Synced (Block #1,482,912) | Security Tier: Level 4',
        ]);
      } else if (cmd.includes('audit')) {
        setLogs((prev) => [
          ...prev,
          '[ANALYSIS] Algorithmic weights tested across 50k civic records.',
          '[OK] Parity deviation: 0.02% (well within 0.1% statutory limit).',
          '[CERTIFIED] Algorithmic audit signature: sig-did-gov-9921',
        ]);
        setCurrentModule(6);
        setIsDone(true);
      } else if (cmd.includes('clear')) {
        setLogs([]);
      } else {
        setLogs((prev) => [
          ...prev,
          `Executing: ${cmd}...`,
          `[OK] Command processed across federated sandbox nodes.`,
        ]);
      }
      setIsRunning(false);
    }, 450);
  };

  const handleQuickAction = (action: string) => {
    setInputVal(action);
  };

  return (
    <div className="bg-[#0f172a] text-[#e2e8f0] p-5 sm:p-6 rounded-xl shadow-2xl font-mono text-xs sm:text-sm leading-relaxed overflow-hidden border border-slate-700/60 w-full max-w-lg transition-all">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ef4444] inline-block shadow-sm"></span>
          <span className="w-3 h-3 rounded-full bg-[#f59e0b] inline-block shadow-sm"></span>
          <span className="w-3 h-3 rounded-full bg-[#10b981] inline-block shadow-sm"></span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-sans">
          <Terminal className="w-3.5 h-3.5 text-blue-400" />
          <span>sandbox-terminal.gov</span>
        </div>
        <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
          ISOLATED POD
        </div>
      </div>

      {/* Main Command Output */}
      <div className="min-h-[160px] max-h-[220px] overflow-y-auto space-y-1.5 pr-1 font-mono text-slate-300">
        <p className="text-[#4ade80] flex items-center font-bold">
          <span>{typedCommand}</span>
          <span className="typing-cursor"></span>
        </p>

        {logs.map((log, index) => {
          const isPrompt = log.startsWith('Prompt:');
          const isSuccess = log.includes('[OK]') || log.includes('[SUCCESS]') || log.includes('[CERTIFIED]');
          const isWarn = log.includes('[WARN]');
          return (
            <p
              key={index}
              className={`${
                isPrompt
                  ? 'text-sky-300 font-semibold mt-2'
                  : isSuccess
                  ? 'text-emerald-400'
                  : isWarn
                  ? 'text-amber-300'
                  : 'text-slate-300'
              }`}
            >
              {log}
            </p>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Interactive Command Input */}
      <form onSubmit={handleRunCustomCommand} className="mt-3 flex items-center gap-2 pt-2 border-t border-slate-800">
        <span className="text-emerald-400 font-bold">$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type command ('help', 'failover', 'audit')..."
          className="flex-1 bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-mono"
        />
        <button
          type="submit"
          disabled={isRunning}
          className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs flex items-center gap-1 transition-colors"
        >
          <Play className="w-3 h-3" />
          <span className="hidden sm:inline">Exec</span>
        </button>
      </form>

      {/* Quick Action Shortcuts */}
      <div className="flex flex-wrap items-center gap-1.5 mt-2 pt-1">
        <span className="text-[10px] text-slate-500 font-sans">Quick macros:</span>
        <button
          type="button"
          onClick={() => handleQuickAction('failover')}
          className="text-[10px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
        >
          failover
        </button>
        <button
          type="button"
          onClick={() => handleQuickAction('audit')}
          className="text-[10px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
        >
          audit
        </button>
        <button
          type="button"
          onClick={() => handleQuickAction('status')}
          className="text-[10px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
        >
          status
        </button>
      </div>

      {/* Simulation Progress Footer */}
      <div className="mt-3 p-2.5 bg-slate-800/70 rounded-lg flex items-center justify-between border border-slate-700/70">
        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-xs text-slate-200 font-sans font-medium">
            Simulation Progress: Module {currentModule}/6 {isDone && '✓ (Mastered)'}
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot"></span>
          ACTIVE
        </span>
      </div>
    </div>
  );
};
