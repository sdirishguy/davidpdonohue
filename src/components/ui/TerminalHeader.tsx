import React from 'react';

interface TerminalHeaderProps {
  terminalPath: string;
  isAnimationComplete: boolean;
  onSkip: () => void;
  onReplay: () => void;
}

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  terminalPath,
  isAnimationComplete,
  onSkip,
  onReplay,
}) => {
  return (
    <div className="flex items-center justify-between mb-4 border-b border-primary-blue/20 pb-2">
      <div className="text-primary-blue/70 font-mono text-sm">
        terminal@davidpdonohue.com:{terminalPath}$
      </div>
      <div className="flex items-center gap-4">
        {/* Decorative traffic lights */}
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-primary-sunset-orange"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        
        {/* Animation controls */}
        <div className="flex gap-2">
          {!isAnimationComplete && (
            <button
              onClick={onSkip}
              className="px-3 py-1 text-xs bg-primary-blue/20 text-primary-blue rounded border border-primary-blue/30 hover:bg-primary-blue/30 transition-colors font-mono"
              title="Skip animation (Space)"
            >
              ⏭️ Skip
            </button>
          )}
          {isAnimationComplete && (
            <button
              onClick={onReplay}
              className="px-3 py-1 text-xs bg-primary-blue/20 text-primary-blue rounded border border-primary-blue/30 hover:bg-primary-blue/30 transition-colors font-mono"
              title="Replay animation (R)"
            >
              🔄 Replay
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
