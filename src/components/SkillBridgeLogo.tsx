import React from 'react';

interface SkillBridgeLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showTagline?: boolean;
  variant?: 'full' | 'icon' | 'horizontal';
  inverted?: boolean;
}

export const SkillBridgeLogo: React.FC<SkillBridgeLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
  variant = 'horizontal',
  inverted = false,
}) => {
  const sizeMap = {
    sm: { img: 'h-7', icon: 28, text: 'text-sm', sub: 'text-[9px]' },
    md: { img: 'h-9', icon: 36, text: 'text-base', sub: 'text-[10px]' },
    lg: { img: 'h-12', icon: 48, text: 'text-xl', sub: 'text-xs' },
    xl: { img: 'h-16', icon: 64, text: 'text-2xl', sub: 'text-sm' },
    '2xl': { img: 'h-24', icon: 96, text: 'text-4xl', sub: 'text-base' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  if (variant === 'icon') {
    return (
      <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
        <img
          src="/skillbridge-logo.png"
          alt="SkillBridge Emblem"
          className={`${currentSize.img} w-auto object-contain rounded-lg drop-shadow-sm`}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <img
          src="/skillbridge-logo.png"
          alt="SkillBridge Logo"
          className={`${currentSize.img} w-auto object-contain rounded-xl drop-shadow-md mb-2`}
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col items-center">
          <div className="flex items-center tracking-tight font-extrabold">
            <span className={`${inverted ? 'text-white' : 'text-[#0A2540] dark:text-white'} ${currentSize.text}`}>
              Skill
            </span>
            <span className={`text-[#15803D] dark:text-[#22C55E] ${currentSize.text}`}>
              Bridge
            </span>
          </div>
          {showTagline && (
            <span className={`${inverted ? 'text-slate-300' : 'text-[#0A2540]/70 dark:text-slate-400'} font-medium tracking-wider ${currentSize.sub} mt-0.5`}>
              Learn • Build • Grow
            </span>
          )}
        </div>
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/skillbridge-logo.png"
        alt="SkillBridge Logo"
        className={`${currentSize.img} w-auto object-contain shrink-0 rounded-lg drop-shadow-xs`}
        referrerPolicy="no-referrer"
      />
      <div className="flex flex-col leading-tight">
        <div className="flex items-center tracking-tight font-extrabold">
          <span className={`${inverted ? 'text-white' : 'text-[#0A2540] dark:text-white'} ${currentSize.text}`}>
            Skill
          </span>
          <span className={`text-[#15803D] dark:text-[#22C55E] ${currentSize.text}`}>
            Bridge
          </span>
        </div>
        {showTagline && (
          <span className={`${inverted ? 'text-slate-300' : 'text-[#0A2540]/70 dark:text-slate-400'} font-medium tracking-wider ${currentSize.sub}`}>
            Learn • Build • Grow
          </span>
        )}
      </div>
    </div>
  );
};
