/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { RoleBasedBanner } from '../common/RoleBasedBanner';
import { 
  History, 
  Search, 
  MapPin, 
  CheckCircle2, 
  BookOpen
} from 'lucide-react';
import { PastIncident } from '../../types';

export const InstitutionalMemoryView: React.FC = () => {
  const { pastIncidents } = useCampus();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIncident, setSelectedIncident] = useState<PastIncident | null>(pastIncidents[0]);

  const filteredIncidents = pastIncidents.filter(inc => {
    return (
      inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.incidentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.matchingFactors.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="space-y-6">
      <RoleBasedBanner />

      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-blue-600" />
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                SATI Institutional Memory & Incident Playbooks
              </h1>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              When operational challenges occur on campus, historical playbooks preserve verified response protocols. The system indexes past incidents, diagnostic dispatches, contractor turnaround benchmarks, and audited recovery outcomes for SATI Vidisha.
            </p>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 shrink-0 shadow-2xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>SATI Operational Archive</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-0.5 block font-mono">
              {filteredIncidents.length} Historical Precedents Indexed
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search SATI historical incident archives by asset, keyword, location, or tag..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:border-blue-500 font-sans shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* 2-Column Layout: Incident List + Detailed Evidence Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Incident List */}
        <div className="lg:col-span-1 space-y-3">
          {filteredIncidents.map(inc => {
            const isSelected = selectedIncident?.id === inc.id;
            return (
              <button
                type="button"
                key={inc.id}
                onClick={() => setSelectedIncident(inc)}
                aria-pressed={isSelected}
                className={`w-full text-left p-4.5 rounded-2xl border text-xs cursor-pointer transition-all focus:outline-hidden focus:ring-1 focus:ring-blue-500 ${
                  isSelected
                    ? 'bg-blue-50/50 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between pb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-blue-700 font-bold">{inc.id}</span>
                    {inc.isCurrentSession && (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold">
                        ACTIVE RECORD
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {inc.similarityScore}% Topological Match
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm mt-1 leading-snug">
                  {inc.title}
                </h3>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{inc.location}</span>
                  <span>·</span>
                  <span className="font-mono">{inc.date}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Inspection Dossier */}
        <div className="lg:col-span-2">
          {selectedIncident ? (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 text-xs space-y-5 shadow-xs">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-blue-700 font-bold">{selectedIncident.id}</span>
                  <span className="text-slate-500">{selectedIncident.date}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mt-1">
                  {selectedIncident.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 mt-1.5">
                  <span>Category: <strong className="text-slate-700">{selectedIncident.incidentType}</strong></span>
                  <span>·</span>
                  <span>Location: <strong className="text-slate-700">{selectedIncident.location}</strong></span>
                </div>
              </div>

              {/* Rationale & Topological Correlation */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-blue-700 block">Topological Match Analysis:</span>
                <p className="text-slate-700 leading-relaxed">
                  {selectedIncident.similarityRationale}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedIncident.matchingFactors.map((factor, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-50 text-blue-700 border border-blue-200 font-medium"
                    >
                      {factor}
                    </span>
                  ))}
                </div>
              </div>

              {/* Incident Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-800 block">Observed Condition:</span>
                  <p className="text-slate-600 leading-relaxed">
                    {selectedIncident.observed}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-800 block">Action Executed:</span>
                  <p className="text-slate-600 leading-relaxed">
                    {selectedIncident.staffAction}
                  </p>
                </div>
              </div>

              {/* Verified Resolution */}
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-800 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified Operational Outcome</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {selectedIncident.resolution}
                </p>
                <div className="text-[11px] font-mono text-emerald-800 pt-1 font-semibold">
                  Audited Result: {selectedIncident.verifiedOutcome}
                </div>
              </div>

              {/* Detailed Historical Evidence */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="font-bold text-slate-800 block">Logged Historical Evidence:</span>
                <ul className="space-y-1.5 text-slate-600">
                  {selectedIncident.detailedEvidence.map((ev, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold font-mono">0{idx + 1}.</span>
                      <span className="leading-relaxed">{ev}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 text-xs shadow-xs">
              Select an incident from the left archive list to inspect logged evidence and resolution strategies.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
