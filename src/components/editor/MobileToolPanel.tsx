import React from 'react';
import { X } from 'lucide-react';

interface MobileToolPanelProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const MobileToolPanel: React.FC<MobileToolPanelProps> = ({
  title,
  onClose,
  children,
  className = '',
}) => {
  return (
    <div className="fixed inset-x-0 bottom-[72px] z-40 lg:hidden pointer-events-none">
      <div className="mx-auto max-w-md px-2 pointer-events-auto">
        <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white/95 shadow-2xl backdrop-blur-md">
          <div className="flex cursor-default select-none items-center justify-center border-b border-slate-100 bg-white/90 px-4 py-2">
            <div className="h-1.5 w-12 rounded-full bg-neutral-300" />
          </div>

          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-3 py-2">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
              <span>{title}</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-700 min-h-[28px] min-w-[44px]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className={`max-h-[58vh] overflow-y-auto ${className}`}>{children}</div>
        </div>
      </div>
    </div>
  );
};
