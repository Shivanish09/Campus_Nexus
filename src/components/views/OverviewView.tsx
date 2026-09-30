/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SATI Vidisha — OverviewView Component
 * 
 * Purpose:
 * Primary executive mission control dashboard for SATI Vidisha.
 * Aggregates real-time telemetry, active incident perimeter, SCADA sensor streams,
 * institutional impact metrics, and quick navigation shortcuts to the 85-acre campus map.
 */

import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { RoleBasedBanner } from '../common/RoleBasedBanner';
import { 
  AlertTriangle, 
  ArrowRight, 
  Radio, 
  MapPin, 
  Building, 
  Droplets, 
  Calendar, 
  Clock, 
  Activity,
  SlidersHorizontal,
  ClipboardCheck,
  ChevronRight,
  Users,
  Compass
} from 'lucide-react';

export const OverviewView: React.FC = () => {
  const { 
    setCurrentSection, 
    incidentId, 
    incidentTitle, 
    incidentStatus, 
    incidentOwner, 
    events, 
    dataFeeds, 
    toggleFeedFreshness,
    setSelectedNodeId
  } = useCampus();

  const [eventFilter, setEventFilter] = useState<'all' | 'observed' | 'possible' | 'confirmed'>('all');

  const facilitiesFeed = dataFeeds.find(f => f.id === 'feed_facilities_iot');
  const schedulingFeed = dataFeeds.find(f => f.id === 'feed_room_scheduling');

  const filteredEvents = events.filter(evt => {
    if (eventFilter === 'all') return true;
    return evt.nature === eventFilter;
  });

  return (
    <div className="space-y-6">
      {/* Role & Workspace Context */}
      <RoleBasedBanner />

      {/* Header & Quick Action Launchpad */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[11px] font-bold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200 rounded">
              SATI Vidisha Command
            </span>
            <span className="text-xs text-slate-500 font-mono">Autonomous Institution · Est. 1960</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Operations & Campus Continuity Console
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Unified telemetry stream correlating SATI Vidisha 85-acre physical assets, utilities, and academic timetables.
          </p>
        </div>

        {/* Quick Nav Action Shortcuts */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setCurrentSection('sati_map')}
            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>SATI Campus Map</span>
          </button>
          <button
            onClick={() => setCurrentSection('sati_faculty')}
            className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span>Faculty Directory</span>
          </button>
          <button
            onClick={() => setCurrentSection('incidents')}
            className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Active Incident</span>
          </button>
        </div>
      </div>

      {/* Executive Key Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4.5 flex flex-col justify-between hover:border-amber-400 transition-colors shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold text-slate-700">Infrastructure Health</span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-amber-700 font-mono tracking-tight">1 Active Alert</div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
              <span>C.V. Raman Hostel / T-04</span>
              <span>·</span>
              <span className="text-amber-800 font-bold font-mono">16.4% Reserve</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-amber-700">
            <button onClick={() => setCurrentSection('incidents')} className="hover:underline flex items-center gap-1 font-semibold">
              <span>Inspect alert</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4.5 flex flex-col justify-between hover:border-blue-400 transition-colors shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold text-slate-700">Academic Continuity</span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-blue-700 font-mono tracking-tight">98.2% Normal</div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
              <span>ME-301 Relocation Ready</span>
              <span>·</span>
              <span className="text-blue-800 font-bold font-mono">42 Enrolled</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-blue-700">
            <button onClick={() => setCurrentSection('journey')} className="hover:underline flex items-center gap-1 font-semibold">
              <span>Student impact view</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4.5 flex flex-col justify-between hover:border-purple-400 transition-colors shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold text-slate-700">Recovery Protocol</span>
            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
              <ClipboardCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-slate-900 font-mono tracking-tight">{incidentStatus}</div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1 truncate">
              <span>Lead: {incidentOwner.split(' ')[0]} {incidentOwner.split(' ')[1]}</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-purple-700">
            <button onClick={() => setCurrentSection('recovery')} className="hover:underline flex items-center gap-1 font-semibold">
              <span>Workflow protocol</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4.5 flex flex-col justify-between hover:border-emerald-400 transition-colors shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold text-slate-700">SCADA Telemetry Streams</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-emerald-700 font-mono tracking-tight">All Online</div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
              <span>Sampling: 60s Interval</span>
              <span>·</span>
              <span className="text-emerald-700 font-bold font-mono">18ms Latency</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-emerald-700">
            <button onClick={() => setCurrentSection('integrations')} className="hover:underline flex items-center gap-1 font-semibold">
              <span>Connector health</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Prominent Active Incident Spotlight Card */}
      <div className="bg-linear-to-r from-amber-50 via-orange-50/40 to-white border border-amber-200 rounded-2xl p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-amber-100 border border-amber-300 text-amber-900 font-bold">
                {incidentId}
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-amber-800 font-semibold">Priority 2 Utility Disruption</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500">Observed 06:15 AM IST</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-800 font-semibold">Sir C.V. Raman Hostel Sector</span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
              {incidentTitle}
            </h2>

            <p className="text-xs text-slate-700 leading-relaxed">
              Overhead Tank T-04 ultrasonic transducer registers 16.4% reserve (2,460 L remaining). Cross-departmental correlation indicates direct domestic water risk to 240 students in Sir C.V. Raman Hostel (H-1) and cascading auxiliary supply deficit to ME-301 Fluid Mechanics Lab bench in Mechanical Complex at 08:30 AM.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs pt-1 text-slate-600 font-mono">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-sans">Active Stage:</span>
                <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-amber-800 font-semibold text-[11px] shadow-2xs">
                  {incidentStatus}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-sans">Incident Lead:</span>
                <span className="text-slate-900 font-sans font-medium">{incidentOwner}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-sans">Estimated Depletion:</span>
                <span className="text-rose-600 font-bold">~31 minutes without replenishment</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <button
              onClick={() => setCurrentSection('incidents')}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-xs whitespace-nowrap"
            >
              <span>Manage Incident Command</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSection('simulator')}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-2xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
              <span>Simulate Contingencies</span>
            </button>
            <button
              onClick={() => setCurrentSection('recovery')}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-2xs"
            >
              <ClipboardCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Review Recovery Plan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Feed Health + Campus Topology Summary + Academic Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* 1. Data Feed Monitor */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Telemetry Feed Health</h3>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Live Ingestion</span>
            </div>

            <div className="mt-3.5 space-y-3">
              {/* Facilities Feed */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800">Facilities & SCADA Telemetry</span>
                  <button
                    onClick={() => facilitiesFeed && toggleFeedFreshness(facilitiesFeed.id)}
                    className="text-[10px] text-blue-600 hover:text-blue-800 underline font-medium"
                    title="Simulate network disconnect"
                  >
                    Test Timeout
                  </button>
                </div>
                <div className="flex items-center justify-between mt-1.5 text-[11px]">
                  <span className="text-slate-500">Heartbeat: {facilitiesFeed?.lastHeartbeat}</span>
                  <span className={`font-mono font-bold ${facilitiesFeed?.freshness === 'fresh' ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {facilitiesFeed?.freshness.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Room Scheduling Feed */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800">SATI Timetable Gateway</span>
                  <button
                    onClick={() => schedulingFeed && toggleFeedFreshness(schedulingFeed.id)}
                    className="text-[10px] text-blue-600 hover:text-blue-800 underline font-medium"
                    title="Simulate network disconnect"
                  >
                    Test Timeout
                  </button>
                </div>
                <div className="flex items-center justify-between mt-1.5 text-[11px]">
                  <span className="text-slate-500">Heartbeat: {schedulingFeed?.lastHeartbeat}</span>
                  <span className={`font-mono font-bold ${schedulingFeed?.freshness === 'fresh' ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {schedulingFeed?.freshness.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Automated failover protocol active</span>
            <button
              onClick={() => setCurrentSection('integrations')}
              className="text-blue-600 hover:underline font-semibold"
            >
              Feed Configs →
            </button>
          </div>
        </div>

        {/* 2. Physical Infrastructure Summary */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">SATI Campus Facility Status</h3>
              </div>
              <button 
                onClick={() => setCurrentSection('sati_map')}
                className="text-[11px] text-blue-600 hover:underline font-semibold"
              >
                Campus Map →
              </button>
            </div>

            <div className="mt-3.5 space-y-2.5 text-xs">
              <button
                onClick={() => {
                  setSelectedNodeId('node_hostel_h1');
                  setCurrentSection('graph');
                }}
                className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between transition-colors shadow-2xs"
              >
                <div className="flex items-center gap-2.5">
                  <Building className="w-3.5 h-3.5 text-rose-600" />
                  <span className="text-slate-800 font-medium">Sir C.V. Raman Hostel (H-1)</span>
                </div>
                <span className="text-amber-800 font-mono text-[11px] font-semibold">Supply Alert</span>
              </button>

              <button
                onClick={() => {
                  setSelectedNodeId('node_room_a204');
                  setCurrentSection('graph');
                }}
                className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between transition-colors shadow-2xs"
              >
                <div className="flex items-center gap-2.5">
                  <Building className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-slate-800 font-medium">Mechanical Complex (M-204)</span>
                </div>
                <span className="text-slate-600 font-mono text-[11px]">Relocation Ready</span>
              </button>

              <button
                onClick={() => {
                  setSelectedNodeId('node_pump_p02');
                  setCurrentSection('graph');
                }}
                className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between transition-colors shadow-2xs"
              >
                <div className="flex items-center gap-2.5">
                  <Activity className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-slate-800 font-medium">Substation 2 Pump House (P-02)</span>
                </div>
                <span className="text-amber-800 font-mono text-[11px] font-semibold">Thermal Trip</span>
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            Topology route: Substation 2 → Tank T-04 → Raman Hostel & Lab Benches.
          </div>
        </div>

        {/* 3. Academic Milestones Monitor */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Scheduled Academic Sessions</h3>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Morning Slot</span>
            </div>

            <div className="mt-3.5 space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-amber-950 font-bold">ME-301: Applied Fluid Mechanics</span>
                  <span className="text-[10px] font-mono text-slate-500">08:30 - 10:00 AM</span>
                </div>
                <p className="text-[11px] text-slate-700 leading-snug">
                  Mechanical Complex Lab M-204 · 42 SATI Students · Relocation option prepared
                </p>
                <div className="flex items-center justify-between text-[11px] text-amber-800 pt-1 font-medium">
                  <span>Auxiliary water line at risk</span>
                  <button 
                    onClick={() => setCurrentSection('simulator')}
                    className="text-blue-600 hover:text-blue-800 hover:underline font-semibold"
                  >
                    View Relocation →
                  </button>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between font-medium">
                  <span className="text-slate-800">CS-202: Data Structures & Algorithms</span>
                  <span className="text-[10px] font-mono text-slate-500">09:00 - 10:30 AM</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Kailash Satyarthi Block Hall C-102 · 65 Enrolled · Nominal
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            Source: SATI Dean Academics Master Timetable Gateway
          </div>
        </div>
      </div>

      {/* Chronological Recent Events Feed */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Live SATI Campus Operational Log</h3>
            <p className="text-xs text-slate-500 mt-0.5">Chronological sensor readings, spatial inferences, and maintenance crew dispatches</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter buttons */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
              <button
                onClick={() => setEventFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  eventFilter === 'all' ? 'bg-white text-blue-700 font-semibold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Events
              </button>
              <button
                onClick={() => setEventFilter('observed')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  eventFilter === 'observed' ? 'bg-white text-blue-700 font-semibold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Observed
              </button>
              <button
                onClick={() => setEventFilter('possible')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  eventFilter === 'possible' ? 'bg-white text-blue-700 font-semibold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Inferred
              </button>
            </div>

            <button 
              onClick={() => setCurrentSection('incidents')}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1.5 ml-2"
            >
              <span>Full Incident Command</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {filteredEvents.slice(0, 5).map(evt => (
            <div 
              key={evt.id} 
              className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-start justify-between gap-3 hover:border-slate-300 transition-colors"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{evt.title}</span>
                  <span className={`text-[10px] uppercase font-mono px-1.5 py-0.2 rounded font-semibold ${
                    evt.nature === 'observed'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : evt.nature === 'possible'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {evt.nature}
                  </span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed max-w-2xl">
                  {evt.description}
                </p>
                <div className="text-[11px] text-slate-400 font-mono">
                  Source: {evt.source} · Record ID: {evt.sourceRecordId}
                </div>
              </div>

              <div className="text-[11px] font-mono text-slate-500 shrink-0 sm:text-right">
                <div className="flex items-center sm:justify-end gap-1 text-slate-700 font-medium">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{evt.timestamp}</span>
                </div>
                <div className="text-[10px] text-blue-700 font-semibold mt-1">
                  Confidence: {evt.confidence}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
