/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useCampus } from '../../context/CampusContext';
import { Shield, GraduationCap, Briefcase, Wrench, Lock } from 'lucide-react';

export const RoleBasedBanner: React.FC = () => {
  const { currentRole, currentUser } = useCampus();

  const getWorkspaceConfig = () => {
    switch (currentRole) {
      case 'student':
        return {
          icon: <GraduationCap className="w-4 h-4 text-emerald-600" />,
          accent: 'border-emerald-200 bg-emerald-50/60 text-slate-700',
          badgeBg: 'bg-white border-emerald-200 text-emerald-800',
          title: 'SATI Student Portal',
          scope: 'Academic course schedules, hostel utility notices, and prerequisite transfer milestones.',
          level: 'Tier 1 Student Access'
        };
      case 'faculty':
        return {
          icon: <Briefcase className="w-4 h-4 text-blue-600" />,
          accent: 'border-blue-200 bg-blue-50/60 text-slate-700',
          badgeBg: 'bg-white border-blue-200 text-blue-800',
          title: 'Dean Academics & Faculty Workspace',
          scope: 'Laboratory facility status, instructional venue allocations, and departmental student rosters.',
          level: 'Tier 2 Faculty Clearance'
        };
      case 'facilities':
        return {
          icon: <Wrench className="w-4 h-4 text-amber-600" />,
          accent: 'border-amber-200 bg-amber-50/60 text-slate-700',
          badgeBg: 'bg-white border-amber-200 text-amber-900',
          title: 'SATI Estate & Utilities Directorate',
          scope: 'Live SCADA sensor streams, physical emergency dispatches, and field recovery sign-offs.',
          level: 'Tier 3 Infrastructure Command'
        };
      case 'administrator':
      default:
        return {
          icon: <Shield className="w-4 h-4 text-purple-600" />,
          accent: 'border-purple-200 bg-purple-50/50 text-slate-700',
          badgeBg: 'bg-white border-purple-200 text-purple-900',
          title: 'SATI Directorate Operations Console',
          scope: 'Full institutional authority: cross-departmental incident command, contingency plan sign-off, and compliance auditing.',
          level: 'Tier 4 Executive Authority'
        };
    }
  };

  const config = getWorkspaceConfig();

  return (
    <div className={`p-3 rounded-xl border text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-2xs ${config.accent}`}>
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs shrink-0">
          {config.icon}
        </div>
        <div>
          <span className="font-bold text-slate-900">{config.title}:</span>{' '}
          <span className="text-slate-600">{config.scope}</span>
        </div>
      </div>
      <div className={`flex items-center gap-2 shrink-0 font-mono text-[11px] px-2.5 py-1 rounded-lg border shadow-2xs ${config.badgeBg}`}>
        <Lock className="w-3 h-3 text-slate-500" />
        <span className="font-semibold">{config.level}</span>
        <span className="text-slate-400">·</span>
        <span className="font-medium text-slate-800">{currentUser.name}</span>
      </div>
    </div>
  );
};
