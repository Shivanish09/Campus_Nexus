/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { RoleBasedBanner } from '../common/RoleBasedBanner';
import { 
  Clock, 
  SlidersHorizontal, 
  ClipboardCheck, 
  History, 
  PlusCircle, 
  CheckCircle2, 
  ChevronRight,
  Filter,
  Network,
  MapPin
} from 'lucide-react';
import { LinkNature } from '../../types';

export const IncidentsView: React.FC = () => {
  const { 
    incidentId, 
    incidentTitle, 
    incidentStatus, 
    incidentOwner, 
    setIncidentOwner,
    events, 
    affectedEntities, 
    addEvent, 
    setCurrentSection,
    pastIncidents,
    currentRole,
    setSelectedNodeId
  } = useCampus();

  const [activeTab, setActiveTab] = useState<'timeline' | 'entities' | 'memory' | 'new-event'>('timeline');
  const [filterNature, setFilterNature] = useState<string>('all');
  const [isChangingOwner, setIsChangingOwner] = useState(false);
  const [newOwnerValue, setNewOwnerValue] = useState(incidentOwner);

  // New Event Form State
  const [newEvtTitle, setNewEvtTitle] = useState('');
  const [newEvtDesc, setNewEvtDesc] = useState('');
  const [newEvtNature, setNewEvtNature] = useState<LinkNature>('observed');
  const [newEvtSource, setNewEvtSource] = useState('SATI Helpdesk Log #HD-4491');

  const filteredEvents = events.filter(evt => {
    if (filterNature === 'all') return true;
    return evt.nature === filterNature;
  });

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvtTitle.trim() || !newEvtDesc.trim()) return;
    addEvent(newEvtTitle, newEvtDesc, newEvtNature, newEvtSource);
    setNewEvtTitle('');
    setNewEvtDesc('');
    setActiveTab('timeline');
  };

  const handleSaveOwner = () => {
    setIncidentOwner(newOwnerValue);
    setIsChangingOwner(false);
  };

  const isStaff = currentRole === 'administrator' || currentRole === 'facilities';

  return (
    <div className="space-y-6">
      <RoleBasedBanner />

      {/* Incident Header Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-0.5 rounded bg-amber-100 border border-amber-300 text-amber-900 font-bold">
                {incidentId}
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-amber-800 font-semibold">Priority 2 Incident Command</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500 font-mono">Logged 06:15 AM IST</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
              {incidentTitle}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setCurrentSection('sati_map')}
              className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Campus Map</span>
            </button>
            <button
              onClick={() => setCurrentSection('simulator')}
              className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
              <span>Contingency Simulator</span>
            </button>
            <button
              onClick={() => setCurrentSection('recovery')}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <ClipboardCheck className="w-3.5 h-3.5" />
              <span>Recovery Protocol</span>
            </button>
          </div>
        </div>

        {/* Metadata Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 text-xs">
          <div>
            <span className="text-slate-500 text-[11px] block">Current Workflow Stage</span>
            <span className="font-bold text-amber-800 font-mono text-sm mt-0.5 inline-block">
              {incidentStatus}
            </span>
          </div>

          <div>
            <span className="text-slate-500 text-[11px] block">Incident Lead</span>
            {isChangingOwner ? (
              <div className="flex items-center gap-1.5 mt-1">
                <input
                  type="text"
                  value={newOwnerValue}
                  onChange={e => setNewOwnerValue(e.target.value)}
                  className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs text-slate-900 focus:outline-hidden focus:border-blue-500"
                />
                <button
                  onClick={handleSaveOwner}
                  className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md text-[11px]"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsChangingOwner(false)}
                  className="text-slate-500 text-[11px] hover:text-slate-800"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-slate-900 font-medium truncate">{incidentOwner}</span>
                {isStaff ? (
                  <button
                    onClick={() => setIsChangingOwner(true)}
                    className="text-[10px] text-blue-600 hover:underline font-medium"
                    title="Reassign incident command"
                  >
                    Change
                  </button>
                ) : (
                  <span className="text-[10px] text-slate-400 font-mono" title="Restricted Access">
                    (Restricted)
                  </span>
                )}
              </div>
            )}
          </div>

          <div>
            <span className="text-slate-500 text-[11px] block">Primary Geographic Zone</span>
            <span className="text-slate-800 font-medium mt-0.5 block">Sir C.V. Raman Hostel (H-1) & South Pump House</span>
          </div>

          <div>
            <span className="text-slate-500 text-[11px] block">Downstream Risk</span>
            <span className="text-rose-600 font-semibold mt-0.5 block">240 Residents / 42 Students (ME-301)</span>
          </div>
        </div>
      </div>

      {/* Workspace Tabs & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'timeline'
                ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Chronological Telemetry ({events.length})
          </button>
          <button
            onClick={() => setActiveTab('entities')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'entities'
                ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Affected Assets & Cohorts ({affectedEntities.length})
          </button>
          <button
            onClick={() => setActiveTab('memory')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'memory'
                ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Historical Precedents ({pastIncidents.length})
          </button>
          {isStaff && (
            <button
              onClick={() => setActiveTab('new-event')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'new-event'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5 text-blue-600" />
              <span>Log Observation</span>
            </button>
          )}
        </div>

        {activeTab === 'timeline' && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 text-[11px] flex items-center gap-1">
              <Filter className="w-3 h-3 text-slate-400" />
              <span>Filter:</span>
            </span>
            <select
              value={filterNature}
              onChange={e => setFilterNature(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500 shadow-2xs"
            >
              <option value="all">All Nature Categories</option>
              <option value="observed">Observed Telemetry</option>
              <option value="possible">Possible Links (Inferred)</option>
              <option value="confirmed">Confirmed Actions</option>
            </select>
          </div>
        )}
      </div>

      {/* Tab 1: Timeline */}
      {activeTab === 'timeline' && (
        <div className="space-y-3">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 text-xs hover:border-slate-300 transition-colors shadow-2xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-blue-700 font-bold">{evt.id}</span>
                  <span className="text-slate-300">·</span>
                  <h3 className="font-bold text-slate-900 text-sm">{evt.title}</h3>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{evt.timestamp}</span>
                </div>
              </div>

              <p className="text-slate-600 text-xs mt-3 leading-relaxed">
                {evt.description}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded font-semibold ${
                    evt.nature === 'observed'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : evt.nature === 'possible'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    Nature: {evt.nature}
                  </span>
                  <span className="text-slate-500 font-sans">
                    Source: <strong className="text-slate-700 font-medium">{evt.source}</strong> ({evt.sourceRecordId})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-sans">Evidence Confidence:</span>
                  <span className="text-blue-700 font-bold">{evt.confidence}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Affected Entities */}
      {activeTab === 'entities' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {affectedEntities.map(ent => (
            <div
              key={ent.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 text-xs space-y-3 shadow-2xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-blue-700 text-[10px] uppercase font-bold">{ent.type}</span>
                    <span className="text-slate-300">·</span>
                    <span className="font-mono text-slate-500 text-[10px]">{ent.location}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mt-1">{ent.name}</h3>
                </div>

                <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-semibold ${
                  ent.impactLevel === 'Direct'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : ent.impactLevel === 'Probable Secondary'
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {ent.impactLevel} Impact
                </span>
              </div>

              <p className="text-slate-600 text-xs leading-relaxed">
                {ent.note}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Record: {ent.sourceRecord}</span>
                <button
                  onClick={() => {
                    setSelectedNodeId('node_tank_t04');
                    setCurrentSection('graph');
                  }}
                  className="text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Locate in topology</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Historical Precedents */}
      {activeTab === 'memory' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <History className="w-4 h-4 text-blue-600" />
              <span>SATI Operations correlated 3 historical campus incidents with high operational similarity.</span>
            </span>
            <button
              onClick={() => setCurrentSection('memory')}
              className="text-blue-700 hover:text-blue-900 underline font-semibold"
            >
              Institutional Memory Archive →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pastIncidents.slice(0, 3).map(inc => (
              <div
                key={inc.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 text-xs flex flex-col justify-between space-y-3 shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between text-slate-500 font-mono text-[10px]">
                    <span className="font-bold">{inc.id}</span>
                    <span className="text-amber-800 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">{inc.similarityScore}% Match</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mt-1">{inc.title}</h3>
                  <p className="text-slate-600 text-xs mt-2 line-clamp-3">
                    {inc.observed}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="text-[11px] text-slate-600">
                    <strong className="text-slate-900">Adopted Action: </strong>
                    {inc.staffAction}
                  </div>
                  <div className="text-[11px] font-mono text-emerald-700 font-semibold">
                    Outcome: {inc.verifiedOutcome}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Log Observation */}
      {activeTab === 'new-event' && isStaff && (
        <form onSubmit={handleCreateEvent} className="bg-white border border-slate-200/90 rounded-2xl p-6 text-xs space-y-4 max-w-2xl shadow-xs">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">Log SATI Operational Observation</h2>
            <p className="text-slate-500 text-xs mt-0.5">
              Record new hardware telemetry, spatial link, or verified field action
            </p>
          </div>

          <div>
            <label className="text-slate-700 font-semibold block mb-1">Observation Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Electrician confirmed contactor coil continuity on Pump P-02"
              value={newEvtTitle}
              onChange={e => setNewEvtTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:outline-hidden focus:border-blue-500 text-xs"
            />
          </div>

          <div>
            <label className="text-slate-700 font-semibold block mb-1">Detailed Description & Evidence</label>
            <textarea
              rows={3}
              required
              placeholder="Provide equipment serial, measured electrical or hydraulic values, and location."
              value={newEvtDesc}
              onChange={e => setNewEvtDesc(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:outline-hidden focus:border-blue-500 text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-700 font-semibold block mb-1">Observation Nature</label>
              <select
                value={newEvtNature}
                onChange={e => setNewEvtNature(e.target.value as LinkNature)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:outline-hidden focus:border-blue-500 text-xs"
              >
                <option value="observed">Observed Telemetry (Direct hardware ping)</option>
                <option value="possible">Possible Connection (Spatial inference)</option>
                <option value="confirmed">Confirmed Action (Verified crew deployment)</option>
              </select>
            </div>
            <div>
              <label className="text-slate-700 font-semibold block mb-1">Source & System Record ID</label>
              <input
                type="text"
                value={newEvtSource}
                onChange={e => setNewEvtSource(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:outline-hidden focus:border-blue-500 text-xs"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('timeline')}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Record Observation</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
