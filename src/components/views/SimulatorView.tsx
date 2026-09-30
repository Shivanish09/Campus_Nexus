/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useCampus } from '../../context/CampusContext';
import { RoleBasedBanner } from '../common/RoleBasedBanner';
import { 
  SlidersHorizontal, 
  Activity, 
  Clock, 
  Calendar, 
  Coins, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const SimulatorView: React.FC = () => {
  const { 
    assumptions, 
    setAssumptions, 
    scenarioOptions, 
    selectedOptionId, 
    setSelectedOptionId,
    applyOptionToPlan,
    setCurrentSection,
    triggerSystemNotice
  } = useCampus();

  const handlePumpTimeChange = (mins: number) => {
    setAssumptions(prev => ({
      ...prev,
      pumpResponseTimeMinutes: mins
    }));
  };

  const handleTankerTimeChange = (mins: number) => {
    setAssumptions(prev => ({
      ...prev,
      tankerArrivalMinutes: mins
    }));
  };

  const handleDemandToggle = (demand: 'normal' | 'high') => {
    setAssumptions(prev => ({
      ...prev,
      demandLevel: demand
    }));
  };

  const handleAdoptAndNavigate = (optionId: 'option_a' | 'option_b' | 'option_c') => {
    setSelectedOptionId(optionId);
    applyOptionToPlan(optionId);
    triggerSystemNotice(`Adopted Contingency Strategy ${optionId.toUpperCase().replace('_', ' ')} into SATI Recovery Protocol.`);
    setCurrentSection('recovery');
  };

  return (
    <div className="space-y-6">
      <RoleBasedBanner />

      {/* Simulator Explainer Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-blue-600" />
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                SATI Contingency Planning & Response Simulator
              </h1>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Model strategic response trade-offs for Incident INC-2026-084 (Tank T-04 / Sir C.V. Raman Hostel). Test variable SATI electrician diagnostic response times, Vidisha municipal tanker arrival speeds, and morning peak student consumption rates to evaluate trade-offs between student schedule continuity, municipal logistics spend, and relief timelines.
            </p>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 shrink-0 shadow-2xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-blue-600" />
              <span>Real-Time Hydraulic Model</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-0.5 block font-mono">
              Continuous reserve depletion & replenishment
            </span>
          </div>
        </div>

        {/* Interactive Assumption Controls */}
        <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {/* Assumption 1: Pump Diagnostic SLA */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-slate-800 font-semibold">Substation 2 Pump Repair Window</span>
              <span className="text-blue-700 font-mono font-bold">
                {assumptions.pumpResponseTimeMinutes} mins
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Time for on-site SATI electrician to test breaker & coil.
            </p>
            <div className="flex items-center gap-1.5 mt-3">
              {[30, 60, 120].map(mins => (
                <button
                  key={mins}
                  onClick={() => handlePumpTimeChange(mins)}
                  className={`flex-1 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-colors ${
                    assumptions.pumpResponseTimeMinutes === mins
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {mins}m
                </button>
              ))}
            </div>
          </div>

          {/* Assumption 2: Municipal Tanker SLA */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-slate-800 font-semibold">Vidisha Municipal Tanker ETA</span>
              <span className="text-blue-700 font-mono font-bold">
                {assumptions.tankerArrivalMinutes} mins
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Municipal contractor arrival with 10kL potable tanker.
            </p>
            <div className="flex items-center gap-1.5 mt-3">
              {[45, 90].map(mins => (
                <button
                  key={mins}
                  onClick={() => handleTankerTimeChange(mins)}
                  className={`flex-1 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-colors ${
                    assumptions.tankerArrivalMinutes === mins
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {mins}m
                </button>
              ))}
            </div>
          </div>

          {/* Assumption 3: Morning Peak Water Demand */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-slate-800 font-semibold">Morning Demand Profile</span>
              <span className="text-blue-700 font-mono font-bold capitalize">
                {assumptions.demandLevel} Rate
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Sir C.V. Raman Hostel student bathroom consumption draw.
            </p>
            <div className="flex items-center gap-1.5 mt-3">
              <button
                onClick={() => handleDemandToggle('normal')}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-colors ${
                  assumptions.demandLevel === 'normal'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                Normal (80 L/m)
              </button>
              <button
                onClick={() => handleDemandToggle('high')}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-colors ${
                  assumptions.demandLevel === 'high'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                Surge (120 L/m)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Cards Grid (Options A, B, C) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {scenarioOptions.map(opt => {
          const isSelected = selectedOptionId === opt.id;
          return (
            <div
              key={opt.id}
              className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                isSelected
                  ? 'bg-blue-50/40 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="border-b border-slate-100 pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider">
                      {opt.id.replace('_', ' ')}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                      opt.confidenceLevel === 'High'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : opt.confidenceLevel === 'Medium'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {opt.confidenceLevel} Operational Confidence
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-slate-900 mt-1.5">
                    {opt.title}
                  </h2>
                  <p className="text-xs text-slate-600 mt-1 leading-snug">
                    {opt.tagline}
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="space-y-2.5 text-xs">
                  {/* Estimated Relief */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between text-slate-500 text-[11px]">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        <span>Estimated Relief Window</span>
                      </span>
                      <span className="font-mono text-slate-900 font-bold">{opt.estimatedReliefTime}</span>
                    </div>
                  </div>

                  {/* Schedule Impact */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-start gap-1.5 text-slate-700">
                      <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[11px] text-slate-500 block font-semibold">Schedule Impact</span>
                        <p className="text-xs mt-0.5 leading-relaxed">{opt.scheduleImpact}</p>
                      </div>
                    </div>
                  </div>

                  {/* Cost & Resources */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-start gap-1.5 text-slate-700">
                      <Coins className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[11px] text-slate-500 block font-semibold">Contingency Expenditure</span>
                        <p className="text-xs mt-0.5 font-mono text-slate-900 font-semibold">{opt.resourceCost}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Assumptions */}
                <div className="pt-1 text-xs space-y-1.5">
                  <span className="text-slate-500 text-[11px] font-semibold block">Underlying Parameters:</span>
                  <ul className="space-y-1 text-slate-600 text-[11px]">
                    {opt.keyAssumptions.map((asm, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-blue-600">·</span>
                        <span>{asm}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Confidence Reason & Review Cadence */}
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-mono space-y-1">
                  <div>
                    <span className="text-slate-400">Rationale: </span>
                    <span className="text-slate-700 font-sans">{opt.confidenceReason}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Cadence Review: </span>
                    <span className="text-blue-700 font-bold">{opt.recommendedReviewTime}</span>
                  </div>
                </div>
              </div>

              {/* Action Button: Apply to Recovery Plan */}
              <div className="mt-5 pt-3 border-t border-slate-100">
                <button
                  onClick={() => handleAdoptAndNavigate(opt.id)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    isSelected
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Adopt Strategy & Open Protocol</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hydraulic Calculation Breakdown & Formulas */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 text-xs space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            <h2 className="font-bold text-slate-900 text-sm">Deterministic Physical Flow & Logistics Formulas</h2>
          </div>
          <span className="text-[11px] font-mono text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200 font-bold">
            Governing Hydraulic Equations
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 font-mono text-[11px]">
            <span className="text-blue-700 font-bold block">1. Reserve Depletion Window</span>
            <p className="text-slate-800">
              T_deplete = Remaining (2,460 L) ÷ Demand Rate ({assumptions.demandLevel === 'high' ? '120 L/m' : '80 L/m'})
            </p>
            <p className="text-slate-500 text-[10px]">
              Yields ~{Math.round(2460 / (assumptions.demandLevel === 'high' ? 120 : 80))} mins until dry reservoir without supply.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 font-mono text-[11px]">
            <span className="text-blue-700 font-bold block">2. Options A & B Restoration Time</span>
            <p className="text-slate-800">
              T_relief = Diagnostic ({assumptions.pumpResponseTimeMinutes}m) + Riser Recharge (~30–90m)
            </p>
            <p className="text-slate-500 text-[10px]">
              Option B shifts academic lecture in 15–25m; domestic plumbing awaits pump clearance.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 font-mono text-[11px]">
            <span className="text-blue-700 font-bold block">3. Option C Tanker Deployment</span>
            <p className="text-slate-800">
              T_relief = Dispatch SLA ({assumptions.tankerArrivalMinutes}m) + Hose Coupling (~10–20m)
            </p>
            <p className="text-slate-500 text-[10px]">
              Cost: {assumptions.demandLevel === 'high' ? '₹4,500 (2x 10kL potable tankers)' : '₹3,500 (1x 10kL potable tanker)'}.
            </p>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 pt-1">
          <strong>Operational Model:</strong> Parameters and resource requirements recalculate automatically whenever on-site response times are updated above.
        </p>
      </div>
    </div>
  );
};
