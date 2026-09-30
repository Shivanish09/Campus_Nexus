/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SATI Vidisha — TopBar Component
 * 
 * Purpose:
 * Provides the global operational header containing:
 * 1. SATI Vidisha institutional branding and complex selector dropdown.
 * 2. Real-time active incident beacon (Tank T-04 / Sir C.V. Raman Hostel).
 * 3. Quick command switcher search bar (keyboard shortcut: ⌘K / Ctrl+K).
 * 4. Audit ledger inspector trigger.
 * 5. Telemetry & notification alert drawer.
 * 6. Role-based persona switcher (Directorate, Facilities & SCADA, Faculty, Student).
 * 7. Operational baseline reset button.
 */

import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { UserRole } from '../../types';
import { 
  Building2, 
  RotateCcw, 
  Bell, 
  ChevronDown, 
  Check, 
  Menu, 
  X, 
  Radio, 
  Shield, 
  User, 
  Search, 
  Activity, 
  FileText, 
  AlertTriangle, 
  Command, 
  Clock 
} from 'lucide-react';

interface TopBarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onOpenAuditTrail: () => void;
  onOpenCommandPalette: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ 
  mobileMenuOpen, 
  setMobileMenuOpen,
  onOpenAuditTrail,
  onOpenCommandPalette
}) => {
  // Global campus context providing current persona, selected complex, and telemetry state
  const { 
    currentRole, 
    setCurrentRole, 
    currentUser, 
    selectedCampus, 
    setSelectedCampus,
    resetSystemState, 
    dataFeeds,
    recoveryPlan,
    incidentId,
    auditTrail,
    setCurrentSection
  } = useCampus();

  // Local dropdown visibility state
  const [campusDropdownOpen, setCampusDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // SATI Vidisha campus zones and complexes for the campus selector
  const campuses = [
    {
      name: 'Samrat Ashok Technological Institute (SATI), Vidisha',
      short: 'SATI Vidisha (Main Campus)',
      uptime: '99.9%',
      status: 'nominal'
    },
    {
      name: 'SATI Vidisha — Kailash Satyarthi Academic Complex',
      short: 'Kailash Satyarthi Complex',
      uptime: '99.8%',
      status: 'nominal'
    },
    {
      name: 'SATI Vidisha — Mechanical & Civil Workshops Wing',
      short: 'Workshops & SCADA Wing',
      uptime: '99.7%',
      status: 'nominal'
    }
  ];

  // RBAC Personas with authentic SATI Vidisha institutional credentials
  const roles: { id: UserRole; label: string; desc: string; roleType: string; badgeColor: string }[] = [
    { 
      id: 'administrator', 
      label: 'Institute Directorate', 
      desc: 'Prof. (Dr.) Neeraj Kumar Jain · Director, SATI Vidisha',
      roleType: 'Director Command',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    { 
      id: 'facilities', 
      label: 'Estate & Utilities', 
      desc: 'Er. Ananya Deshmukh · Chief Utilities & SCADA Engineer',
      roleType: 'Facilities Lead',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    { 
      id: 'faculty', 
      label: 'Academic Faculty', 
      desc: 'Dr. Sanjeev Gupta · Dean Academics & HOD CSE',
      roleType: 'Academic Dean',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    { 
      id: 'student', 
      label: 'Student Resident', 
      desc: 'Priya Sharma (0108CS221088) · Sir C.V. Raman Hostel H-1',
      roleType: 'Hostel Resident',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    }
  ];

  const currentRoleConfig = roles.find(r => r.id === currentRole) || roles[0];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
        <div className="h-16 px-4 sm:px-6 flex items-center justify-between gap-3">
          
          {/* Left: Mobile Toggle & SATI Vidisha Branding */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* SATI Vidisha Emblem & Complex Selector */}
            <div className="relative">
              <button
                onClick={() => setCampusDropdownOpen(!campusDropdownOpen)}
                className="flex items-center gap-2.5 text-left py-1 px-2 rounded-xl hover:bg-slate-100 transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-linear-to-br from-blue-700 to-indigo-800 text-white flex items-center justify-center font-bold font-mono text-sm tracking-tighter shadow-xs ring-1 ring-blue-900/20">
                  SATI
                </div>
                <div className="hidden sm:block">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors">
                      SATI VIDISHA
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-300 font-bold">
                      AUTONOMOUS
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono truncate max-w-[200px]">
                    Samrat Ashok Tech Institute · Est. 1960
                  </p>
                </div>
              </button>

              {/* Campus / Complex Selector Dropdown */}
              {campusDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setCampusDropdownOpen(false)} 
                  />
                  <div className="absolute left-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="p-3 border-b border-slate-100 bg-slate-50">
                      <p className="text-xs font-bold text-slate-900">SATI Vidisha 85-Acre Campus Divisions</p>
                      <p className="text-[11px] text-slate-500">Autonomous Engineering College · Affiliated to RGPV</p>
                    </div>
                    <div className="p-1 space-y-0.5">
                      {campuses.map(campus => {
                        const isSelected = selectedCampus.includes(campus.short.split(' ')[0]);
                        return (
                          <button
                            key={campus.name}
                            onClick={() => {
                              setSelectedCampus(campus.name);
                              setCampusDropdownOpen(false);
                            }}
                            className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                              isSelected 
                                ? 'bg-blue-50 text-blue-900 font-medium' 
                                : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div className="space-y-0.5">
                              <p className="font-semibold">{campus.short}</p>
                              <p className="text-[10px] text-slate-500">{campus.name}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                                {campus.uptime}
                              </span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Center: Global Quick Command Search Affordance */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-2">
            <button
              onClick={onOpenCommandPalette}
              className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-slate-500 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-xl transition-all group shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                <span className="truncate">Search SATI buildings, faculty, incidents...</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-mono text-slate-600 bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs">
                <Command className="w-2.5 h-2.5 text-slate-400" />
                <span>K</span>
              </div>
            </button>
          </div>

          {/* Right: Actions, Incident Beacon, Role Profile & Audit */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Active Priority Incident Beacon */}
            <button
              onClick={() => setCurrentSection('incidents')}
              className="hidden sm:flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg px-2.5 py-1.5 transition-colors shadow-2xs"
              title="Active Operational Incident: Tank T-04 / Sir C.V. Raman Hostel"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="font-mono font-semibold">{incidentId}</span>
              <span className="hidden lg:inline text-amber-700">· Hostel H-1</span>
            </button>

            {/* Audit Ledger Trigger */}
            <button
              onClick={onOpenAuditTrail}
              className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-lg px-2.5 py-1.5 transition-colors shadow-2xs"
              title="Inspect Institutional Audit Ledger"
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Audit</span>
            </button>

            {/* Telemetry Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors relative"
                aria-label="View system notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
              </button>

              {notificationsOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setNotificationsOpen(false)} 
                  />
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in duration-150">
                    <div className="p-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">SATI Telemetry Feeds</span>
                      <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        All Feeds Live
                      </span>
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                      {dataFeeds.map(feed => (
                        <div key={feed.id} className="p-3 text-xs space-y-1 hover:bg-slate-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-900">{feed.name}</span>
                            <span className="text-[10px] font-mono text-slate-500">{feed.lastHeartbeat}</span>
                          </div>
                          <p className="text-[11px] text-slate-500">{feed.sampleFrequency} · {feed.freshness.toUpperCase()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Role Profile Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all shadow-2xs"
              >
                <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold font-mono">
                  {currentUser.name[0]}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 leading-none">
                      {currentRoleConfig.label}
                    </span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </div>
                  <span className="text-[10px] text-slate-500 leading-none font-mono block mt-0.5">
                    {currentRoleConfig.roleType}
                  </span>
                </div>
              </button>

              {roleDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setRoleDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in duration-150">
                    <div className="p-3 border-b border-slate-100 bg-slate-50">
                      <p className="text-xs font-bold text-slate-900">Switch Operational Persona (RBAC)</p>
                      <p className="text-[11px] text-slate-500">
                        Active clearances update action capabilities across the portal
                      </p>
                    </div>
                    <div className="p-1 space-y-1">
                      {roles.map(role => {
                        const isSelected = role.id === currentRole;
                        return (
                          <button
                            key={role.id}
                            onClick={() => {
                              setCurrentRole(role.id);
                              setRoleDropdownOpen(false);
                            }}
                            className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors flex items-start justify-between gap-2 ${
                              isSelected 
                                ? 'bg-blue-50/80 border border-blue-200' 
                                : 'hover:bg-slate-50 border border-transparent'
                            }`}
                          >
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900">{role.label}</span>
                                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border ${role.badgeColor}`}>
                                  {role.roleType}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 leading-tight">{role.desc}</p>
                            </div>
                            {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Restore Baseline State Action */}
            <button
              onClick={() => {
                if (window.confirm('Restore SATI campus operational session state to baseline?')) {
                  resetSystemState();
                }
              }}
              className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-lg px-2.5 py-1.5 transition-colors shadow-2xs"
              title="Synchronize and restore campus state to baseline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Reset</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
