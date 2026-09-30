/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { useCampus } from '../../context/CampusContext';
import { UserRole } from '../../types';
import { 
  Search, 
  LayoutDashboard, 
  AlertTriangle, 
  Network, 
  SlidersHorizontal, 
  ClipboardCheck, 
  GraduationCap, 
  History, 
  ShieldCheck, 
  FileText, 
  RotateCcw, 
  Building, 
  Droplets, 
  User, 
  ArrowRight,
  X,
  MapPin,
  Users
} from 'lucide-react';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuditTrail: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Incidents & Assets' | 'Operational Actions' | 'Profile Clearance';
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
  badge?: string;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({ 
  isOpen, 
  onClose, 
  onOpenAuditTrail 
}) => {
  const { 
    setCurrentSection, 
    setSelectedNodeId, 
    setCurrentRole, 
    incidentId, 
    resetSystemState, 
    applyOptionToPlan 
  } = useCampus();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-overview',
      title: 'Operations Overview',
      category: 'Navigation',
      subtitle: 'Real-time SATI infrastructure health, telemetry feeds, and scheduled sessions',
      icon: <LayoutDashboard className="w-4 h-4 text-blue-600" />,
      action: () => { setCurrentSection('overview'); onClose(); }
    },
    {
      id: 'nav-sati-map',
      title: 'SATI Vidisha 85-Acre Campus Map & Photos',
      category: 'Navigation',
      subtitle: 'Bird-eye digital twin, building image gallery, and architectural profiles',
      icon: <MapPin className="w-4 h-4 text-blue-600" />,
      badge: 'Interactive GIS',
      action: () => { setCurrentSection('sati_map'); onClose(); }
    },
    {
      id: 'nav-sati-faculty',
      title: 'SATI Faculty & Leadership Directory',
      category: 'Navigation',
      subtitle: 'Director, Deans, Heads of Departments, Professors, and Administrative officers',
      icon: <Users className="w-4 h-4 text-blue-600" />,
      badge: '165+ Faculty',
      action: () => { setCurrentSection('sati_faculty'); onClose(); }
    },
    {
      id: 'nav-incidents',
      title: 'Incident Workspace (INC-2026-084)',
      category: 'Navigation',
      subtitle: 'Active alert at Sir C.V. Raman Hostel Tank T-04 and South Pump House',
      icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
      badge: '1 Active Priority',
      action: () => { setCurrentSection('incidents'); onClose(); }
    },
    {
      id: 'nav-graph',
      title: 'Campus Topology Digital Twin',
      category: 'Navigation',
      subtitle: 'Spatial physical layout, utility pipelines, risers, and academic rooms',
      icon: <Network className="w-4 h-4 text-blue-600" />,
      action: () => { setCurrentSection('graph'); onClose(); }
    },
    {
      id: 'nav-simulator',
      title: 'Contingency Simulator',
      category: 'Navigation',
      subtitle: 'What-if parameter modeling: pump diagnostic SLA, municipal tanker dispatch',
      icon: <SlidersHorizontal className="w-4 h-4 text-blue-600" />,
      action: () => { setCurrentSection('simulator'); onClose(); }
    },
    {
      id: 'nav-recovery',
      title: 'Recovery Protocol & Actions',
      category: 'Navigation',
      subtitle: '5-stage human approval workflow and physical task coordination checklist',
      icon: <ClipboardCheck className="w-4 h-4 text-blue-600" />,
      action: () => { setCurrentSection('recovery'); onClose(); }
    },
    {
      id: 'nav-journey',
      title: 'Academic Lifecycle (Student Journey)',
      category: 'Navigation',
      subtitle: 'Priya Sharma (0108CS221088) degree progression and prerequisite tracker',
      icon: <GraduationCap className="w-4 h-4 text-blue-600" />,
      action: () => { setCurrentSection('journey'); onClose(); }
    },
    {
      id: 'nav-memory',
      title: 'Institutional Memory & Playbooks',
      category: 'Navigation',
      subtitle: 'Indexed historical incident precedents and audited response playbooks',
      icon: <History className="w-4 h-4 text-blue-600" />,
      action: () => { setCurrentSection('memory'); onClose(); }
    },
    {
      id: 'nav-integrations',
      title: 'Enterprise Connectors & Trust',
      category: 'Navigation',
      subtitle: 'SCADA, ERP, and MPOnline gateway policies and offline SOPs',
      icon: <ShieldCheck className="w-4 h-4 text-blue-600" />,
      action: () => { setCurrentSection('integrations'); onClose(); }
    },

    // Assets & Nodes
    {
      id: 'asset-raman-hostel',
      title: 'Sir C.V. Raman Hostel (Hostel No. 1)',
      category: 'Incidents & Assets',
      subtitle: '240 resident students; domestic water supplied by Tank T-04',
      icon: <Building className="w-4 h-4 text-rose-600" />,
      badge: 'Supply Alert',
      action: () => {
        setSelectedNodeId('node_hostel_h1');
        setCurrentSection('graph');
        onClose();
      }
    },
    {
      id: 'asset-satyarthi-block',
      title: 'Kailash Satyarthi Academic Complex',
      category: 'Incidents & Assets',
      subtitle: 'Flagship academic block honoring Nobel Laureate Kailash Satyarthi',
      icon: <Building className="w-4 h-4 text-blue-600" />,
      action: () => {
        setSelectedNodeId('node_academic_block_a');
        setCurrentSection('graph');
        onClose();
      }
    },
    {
      id: 'asset-tank-t04',
      title: 'Overhead Tank T-04 (15,000 L)',
      category: 'Incidents & Assets',
      subtitle: 'Current reserve at 16.4% capacity (2,460 L remaining)',
      icon: <Droplets className="w-4 h-4 text-amber-600" />,
      badge: '16.4% Reserve',
      action: () => {
        setSelectedNodeId('node_tank_t04');
        setCurrentSection('graph');
        onClose();
      }
    },

    // Operational Actions
    {
      id: 'action-audit',
      title: 'Open Institutional Audit Ledger',
      category: 'Operational Actions',
      subtitle: 'Inspect immutable cryptographic records of human decisions',
      icon: <FileText className="w-4 h-4 text-blue-600" />,
      action: () => {
        onClose();
        setTimeout(onOpenAuditTrail, 100);
      }
    },
    {
      id: 'action-reset',
      title: 'Reset Session State to Baseline',
      category: 'Operational Actions',
      subtitle: 'Restore demo telemetry, incident status, and student clearance state',
      icon: <RotateCcw className="w-4 h-4 text-blue-600" />,
      action: () => {
        resetSystemState();
        onClose();
      }
    },

    // Profile Switchers
    {
      id: 'role-admin',
      title: 'Switch to Directorate (Prof. Neeraj Kumar Jain)',
      category: 'Profile Clearance',
      subtitle: 'Executive authority: approve recovery plans and authorize dispatches',
      icon: <User className="w-4 h-4 text-purple-600" />,
      action: () => { setCurrentRole('administrator'); onClose(); }
    },
    {
      id: 'role-facilities',
      title: 'Switch to Estate & Utilities (Er. Ananya Deshmukh)',
      category: 'Profile Clearance',
      subtitle: 'Infrastructure command: verify SCADA telemetry and inspect breakers',
      icon: <User className="w-4 h-4 text-amber-600" />,
      action: () => { setCurrentRole('facilities'); onClose(); }
    },
    {
      id: 'role-faculty',
      title: 'Switch to Dean Academics (Prof. Sanjeev Gupta)',
      category: 'Profile Clearance',
      subtitle: 'Academic clearance: relocate lectures and verify prerequisites',
      icon: <User className="w-4 h-4 text-blue-600" />,
      action: () => { setCurrentRole('faculty'); onClose(); }
    },
    {
      id: 'role-student',
      title: 'Switch to Student Services (Priya Sharma)',
      category: 'Profile Clearance',
      subtitle: 'Student view: course schedules, degree roadmap, and hostel notices',
      icon: <User className="w-4 h-4 text-emerald-600" />,
      action: () => { setCurrentRole('student'); onClose(); }
    }
  ];

  const filteredCommands = commands.filter(cmd => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q) ||
      (cmd.subtitle && cmd.subtitle.toLowerCase().includes(q))
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredCommands.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredCommands.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={e => e.stopPropagation()}
        className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col overflow-hidden text-slate-800"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 bg-slate-50/80">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command, jump to a SATI module, or search campus assets... (Esc to close)"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden font-sans"
          />
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="hidden sm:inline-flex items-center text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
              ESC
            </span>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-slate-100">
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400 space-y-1">
              <p className="font-bold text-slate-700">No operational records match your query.</p>
              <p>Try searching for "Overview", "Campus Map", "Faculty", "Hostel", or "Simulator".</p>
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs transition-colors flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-blue-50 text-blue-900 border border-blue-200 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-lg shrink-0 ${
                      isSelected ? 'bg-white text-blue-700 shadow-2xs border border-blue-100' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {cmd.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 truncate">{cmd.title}</span>
                        {cmd.badge && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                            {cmd.badge}
                          </span>
                        )}
                      </div>
                      {cmd.subtitle && (
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">{cmd.subtitle}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 text-slate-400 text-[11px]">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {cmd.category}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-0.5 text-blue-600' : 'opacity-0'}`} />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>Navigate <strong className="text-slate-800 font-mono">↑↓</strong></span>
            <span>Select <strong className="text-slate-800 font-mono">↵</strong></span>
            <span>Close <strong className="text-slate-800 font-mono">ESC</strong></span>
          </div>
          <span className="text-blue-700 font-mono text-[10px] font-bold">
            SATI Vidisha Quick Switcher
          </span>
        </div>
      </div>
    </div>
  );
};
