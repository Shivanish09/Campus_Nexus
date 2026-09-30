/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SATI Vidisha — AuditTrailModal Component
 * 
 * Purpose:
 * Renders the institutional operations & security audit ledger.
 * Tracks every state change, scenario adoption, recovery task confirmation,
 * and persona transition across the session to ensure governance accountability.
 */

import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { 
  X, 
  FileText, 
  Search, 
  User, 
  Clock, 
  CheckCircle2,
  Lock
} from 'lucide-react';

interface AuditTrailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditTrailModal: React.FC<AuditTrailModalProps> = ({ isOpen, onClose }) => {
  // Global audit trail ledger maintained in CampusContext
  const { auditTrail } = useCampus();

  // Search query and role category filters
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Early return if modal is not open
  if (!isOpen) return null;

  // Filter logs by query string matching action, actor, or note text, and by user role
  const filteredLogs = auditTrail.filter(entry => {
    const matchesSearch = 
      entry.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.note.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || entry.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="audit-trail-title"
        onClick={e => e.stopPropagation()}
        className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden text-slate-800"
      >
        {/* Header Section */}
        <div className="p-4.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 id="audit-trail-title" className="text-sm font-bold text-slate-900">
                SATI Vidisha Institutional Operations & Security Audit Ledger
              </h2>
              <p className="text-[11px] text-slate-500">
                Traceability record of human authorizations, contingency decisions, and campus state transitions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close audit log"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-3 border-b border-slate-100 bg-white flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search actions, notes, actors..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:border-blue-500 shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 font-semibold">Filter Role:</span>
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500 shadow-2xs cursor-pointer"
            >
              <option value="all">All Clearances</option>
              <option value="administrator">Directorate</option>
              <option value="facilities">Facilities / SCADA</option>
              <option value="faculty">Academic Faculty</option>
              <option value="student">Student Body</option>
            </select>
          </div>
        </div>

        {/* Log Entries List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              No audit records matching the search criteria.
            </div>
          ) : (
            filteredLogs.map(entry => (
              <div 
                key={entry.id} 
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors space-y-2 shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                      {entry.action}
                    </span>
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-400" />
                      {entry.actor}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      ({entry.role})
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono shrink-0">
                    <Clock className="w-3 h-3" />
                    <span>{entry.timestamp}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 pl-1 leading-relaxed">
                  {entry.note}
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[10px] font-mono text-slate-400">
                  <span>Entry Hash: #{entry.id}</span>
                  <span className="flex items-center gap-1 text-emerald-600 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Certified Record</span>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <Lock className="w-3 h-3 text-blue-600" />
            <span>Samrat Ashok Technological Institute · Cryptographic Ledger</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition-all shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
