/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RoleBasedBanner } from '../common/RoleBasedBanner';
import { 
  ShieldCheck, 
  Layers, 
  Database, 
  Lock, 
  FileText, 
  RotateCcw, 
  EyeOff
} from 'lucide-react';

export const IntegrationsTrustView: React.FC = () => {
  const enterpriseConnectors = [
    {
      name: 'MPOnline & State Higher Education Gateway',
      type: 'STATE INTEGRATION GATEWAY',
      role: 'External credential verification, state scholarship validation, and entrance examination registry mapping.',
      status: 'Connected / Active Polling',
      dataMinimization: 'Read-only queries strictly scoped to student ID verification tokens; zero access to citizen tax or financial records.',
      manualFallback: 'Provisional registration clearance granted with 14-day student affidavit while manual transcript query is processed.'
    },
    {
      name: 'SATI Student Information System (ERP)',
      type: 'ENTERPRISE DATABASE CONNECTOR',
      role: 'Course catalog, student degree progression records, and academic department enrolments.',
      status: 'Synchronized / Daily Batch',
      dataMinimization: 'Operational roster metadata only (student name, email, enrolled course IDs). Financial ledgers and private health records excluded.',
      manualFallback: 'Physical signed course registration cards cross-verified at SATI Academic Registrar counter.'
    },
    {
      name: 'SATI Academic Timetable & Room Allocation Engine',
      type: 'SCHEDULING API GATEWAY',
      role: 'Classroom inventory, instructional block allocations, lecture schedules, and laboratory utility requirements.',
      status: 'Connected / 15-Minute Sync',
      dataMinimization: 'Room numbers, timeslots, and instructor contact handles only.',
      manualFallback: 'Master printed timetable sheet maintained on Dean of Academics notice board; SMS broadcast for venue relocations.'
    },
    {
      name: 'SATI Facilities & SCADA Utility Broker',
      type: 'SCADA TELEMETRY STREAM',
      role: 'Booster pump relay states, water tank ultrasonic transducers, Substation 2 feeder loads.',
      status: 'Live Stream / 60-Second Interval',
      dataMinimization: 'Sensor telemetry packets and equipment state strings; no personal technician location surveillance.',
      manualFallback: 'Duty operator logbook readings recorded at 60-minute rounds on physical sight-glasses and pressure gauges.'
    },
    {
      name: 'SATI Autonomous ERP & Procurement Gateway',
      type: 'FINANCIAL ERP CONNECTOR',
      role: 'Contingency maintenance budget lines, Vidisha municipal emergency water vouchers, work order dispatch.',
      status: 'Connected / Real-Time Dispatch',
      dataMinimization: 'Contingency expense authorization numbers only; no employee payroll or proprietary vendor commercial terms.',
      manualFallback: 'Emergency physical imprest cash voucher authorized by SATI Registrar.'
    },
    {
      name: 'SATI E-Learning & Digital Library Portal',
      type: 'ACADEMIC LMS CONNECTOR',
      role: 'Laboratory evaluations, coursework milestones, and examination calendars.',
      status: 'Connected / Real-Time Sync',
      dataMinimization: 'Calendar event dates and course tags; zero student assignment text or grading logs.',
      manualFallback: 'Broadcast notice posted on student portal bulletin board.'
    }
  ];

  const trustPrinciples = [
    {
      icon: <Lock className="w-4 h-4 text-blue-600" />,
      title: 'Role-Based Access Control (RBAC)',
      desc: 'Strict multi-tier security mapping interface capabilities to verified user credentials. Sensitive operations require Directorate or Facilities authorization.'
    },
    {
      icon: <EyeOff className="w-4 h-4 text-blue-600" />,
      title: 'Data Minimization Standard',
      desc: 'The platform ingests solely the metadata necessary for operational coordination. Private medical data, personal finances, and confidential student records are never imported or indexed.'
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-blue-600" />,
      title: 'Mandatory Human Authorization Gate',
      desc: 'Algorithms correlate and formulate draft options; human officials must formally approve, modify, or reject every consequential action. Automated emergency dispatch is strictly barred.'
    },
    {
      icon: <FileText className="w-4 h-4 text-blue-600" />,
      title: 'Traceable Audit Ledger',
      desc: 'Every state transition, owner reassignment, contingency adoption, and recovery certification is permanently recorded in the institutional audit ledger.'
    },
    {
      icon: <RotateCcw className="w-4 h-4 text-blue-600" />,
      title: 'Resilient Standard Operating Procedures (SOPs)',
      desc: 'When an IoT sensor or scheduling feed drops offline, the system flags the feed and presents actionable standard operating procedures so operations continue smoothly.'
    },
    {
      icon: <Database className="w-4 h-4 text-blue-600" />,
      title: 'Institutional Data Sovereignty',
      desc: 'All operational records remain under SATI Vidisha governance and retention policy. No operational data is shared with external commercial advertising or unauthorized third parties.'
    }
  ];

  return (
    <div className="space-y-6">
      <RoleBasedBanner />

      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
              Enterprise Connectors, Data Governance & Security
            </h1>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            SATI Vidisha operational intelligence connects existing enterprise systems without replacing source registries. Transparent data minimization policies, read-only connector boundaries, and standard operating fallback procedures are enforced across all services.
          </p>
        </div>
      </div>

      {/* Trust Principles Grid */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900">SATI Operational Trust & Security Architecture</h2>
          <p className="text-xs text-slate-500">Six architectural guarantees governing privacy, data integrity, and institutional oversight</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {trustPrinciples.map((item, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-50 border border-blue-200 shadow-2xs">
                  {item.icon}
                </div>
                <h3 className="font-bold text-xs text-slate-900">{item.title}</h3>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Connectors Table & Cards */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Configured Enterprise System Integrations</h2>
            <p className="text-xs text-slate-500">Real-time status, data minimization scopes, and offline fallback SOPs</p>
          </div>
          <span className="text-xs font-mono text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            6 Connected Systems
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {enterpriseConnectors.map((conn, idx) => (
            <div 
              key={idx} 
              className="p-4.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-3 shadow-2xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-blue-700 font-bold uppercase tracking-wider block">
                    {conn.type}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm mt-0.5">{conn.name}</h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                  {conn.status.split(' / ')[0]}
                </span>
              </div>

              <p className="text-slate-600 leading-relaxed">
                {conn.role}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div>
                  <span className="text-slate-500 text-[11px] font-semibold block">Data Minimization Boundary:</span>
                  <p className="text-slate-700 text-[11px] leading-relaxed mt-0.5">
                    {conn.dataMinimization}
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                  <span className="text-slate-800 text-[11px] font-bold block">Offline Manual SOP:</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed mt-0.5">
                    {conn.manualFallback}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
