/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useCampus } from '../../context/CampusContext';
import { CheckCircle2, X } from 'lucide-react';

export const SystemNoticeToast: React.FC = () => {
  const { systemNotice, clearSystemNotice } = useCampus();

  if (!systemNotice) return null;

  return (
    <aside 
      aria-label="System notification"
      className="fixed bottom-6 right-6 z-50 max-w-md w-full bg-white/95 backdrop-blur-md border border-slate-200 text-slate-800 rounded-xl shadow-2xl p-4 flex items-start gap-3 transition-all"
    >
      <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
        <CheckCircle2 className="w-5 h-5" />
      </div>
      <div className="flex-1 text-xs leading-relaxed">
        <p className="font-bold text-slate-900">SATI Operational Notice</p>
        <p className="text-slate-700 mt-0.5">{systemNotice}</p>
        <p className="text-[10px] text-slate-400 mt-1 font-mono">
          SATI Operations Ledger · Verified Entry
        </p>
      </div>
      <button
        onClick={clearSystemNotice}
        className="text-slate-400 hover:text-slate-700 transition-colors p-1"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </aside>
  );
};
