/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { RoleBasedBanner } from '../common/RoleBasedBanner';
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  UserCheck, 
  ShieldCheck, 
  Building, 
  Mail
} from 'lucide-react';

export const StudentJourneyView: React.FC = () => {
  const { journeySteps, verifyStudentPrerequisite, currentRole } = useCampus();
  const [isVerifying, setIsVerifying] = useState(false);
  const [staffNote, setStaffNote] = useState('');

  const canVerify = currentRole === 'administrator' || currentRole === 'faculty';
  const blockedStep = journeySteps.find(s => s.status === 'blocked');

  const handleStaffVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffNote.trim()) return;
    verifyStudentPrerequisite(staffNote);
    setIsVerifying(false);
    setStaffNote('');
  };

  return (
    <div className="space-y-6">
      <RoleBasedBanner />

      {/* Student Profile & Academic Overview Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-base shadow-2xs font-mono">
              PS
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-blue-700 font-semibold">
                <span>Enrollment #0108CS221088</span>
                <span>·</span>
                <span className="text-slate-500">SATI Vidisha Campus</span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
                Priya Sharma — SATI Academic Progression Roadmap
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-700">
              Program: B.Tech Computer Science & Engg (Semester V)
            </span>
          </div>
        </div>

        {/* 6-Stage Lifecycle Horizontal Stepper */}
        <div className="pt-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-xs">
            {journeySteps.map((step, idx) => (
              <div
                key={step.id}
                className={`p-3.5 rounded-xl border text-center transition-all flex flex-col justify-between min-h-[96px] ${
                  step.status === 'completed'
                    ? 'bg-slate-50 border-emerald-300 text-slate-700'
                    : step.status === 'blocked'
                    ? 'bg-rose-50 border-rose-300 text-rose-900 ring-2 ring-rose-400/20'
                    : step.status === 'in_progress'
                    ? 'bg-blue-50 border-blue-300 text-blue-900 font-semibold'
                    : 'bg-slate-50/50 border-slate-200/70 text-slate-400'
                }`}
              >
                <div>
                  <div className="text-[10px] font-mono text-slate-400">Stage {idx + 1}</div>
                  <div className="font-bold text-xs mt-1 leading-tight line-clamp-2">
                    {step.title.split('. ')[1]}
                  </div>
                </div>

                <div className="mt-2 text-[10px] font-mono font-bold">
                  {step.status === 'completed' && <span className="text-emerald-700">✓ Verified</span>}
                  {step.status === 'blocked' && <span className="text-rose-700 font-bold">Action Needed</span>}
                  {step.status === 'in_progress' && <span className="text-blue-700">In Progress</span>}
                  {step.status === 'upcoming' && <span className="text-slate-400">Upcoming</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deep-Dive Card on Blocked Stage */}
      {blockedStep && blockedStep.blockerDetails ? (
        <div className="bg-white border border-rose-300 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5 text-rose-700">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Prerequisite Clearance Notice: ME-204 Transfer Credit
                </h2>
                <span className="text-xs text-slate-500">
                  Course Registration Pending SATI Academic Registrar Verification
                </span>
              </div>
            </div>

            <span className="px-3 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 font-mono text-xs font-semibold">
              Provisional Enrollment Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            {/* Left: Administrative Details */}
            <div className="space-y-3 p-4.5 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-slate-500 text-[11px] font-semibold block">Academic Regulation:</span>
                <p className="text-slate-700 text-xs mt-1 leading-relaxed">
                  {blockedStep.blockerDetails.rule}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="text-slate-500 text-[11px] font-semibold block">Missing Verification Record:</span>
                <p className="text-slate-800 text-xs mt-1 font-mono font-medium">
                  {blockedStep.blockerDetails.missingRecord}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="text-slate-500 text-[11px] font-semibold block">Student Guidance Notice:</span>
                <p className="text-slate-700 text-xs mt-1 leading-relaxed italic">
                  "{blockedStep.blockerDetails.plainLanguageNotice}"
                </p>
              </div>
            </div>

            {/* Right: Student Action Steps & Office Contacts */}
            <div className="space-y-3 p-4.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[11px] font-semibold block">Next Steps for Priya:</span>
              <p className="text-slate-700 text-xs leading-relaxed">
                {blockedStep.blockerDetails.nextStepForStudent}
              </p>
              <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Office: <strong className="text-slate-800 font-semibold">{blockedStep.blockerDetails.verifyingOffice}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{blockedStep.blockerDetails.officeHours}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{blockedStep.blockerDetails.deskContact}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Staff Verification Action Area */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-600">
              <span className="font-bold text-slate-900">Staff Resolution Control: </span>
              {canVerify
                ? 'As authorized staff, you can inspect the verified certificate and certify the prerequisite immediately.'
                : 'Central Administration or Faculty accounts can certify the student\'s verified document.'}
            </div>

            {canVerify && (
              <button
                onClick={() => setIsVerifying(true)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs shrink-0"
              >
                <UserCheck className="w-4 h-4" />
                <span>Certify Prerequisite as Registrar</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Completed State */
        <div className="bg-white border border-emerald-300 rounded-2xl p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-emerald-700 font-bold">
            <CheckCircle2 className="w-5 h-5" />
            <h2 className="text-base">All Academic Prerequisites Certified</h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Priya Sharma's ME-204 transfer credits have been certified by the SATI Academic Registrar. Semester V course enrollment is fully verified and cleared for final exam registration.
          </p>
          <div className="text-[11px] font-mono text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
            Audit Ledger: Certified by SATI Registrar Desk · Cleared for End-Semester Exam Registration.
          </div>
        </div>
      )}

      {/* Student Protection Standards */}
      <div className="p-4.5 rounded-xl bg-white border border-slate-200/90 text-xs text-slate-600 flex items-start gap-3 shadow-xs">
        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-slate-900">SATI Student Protection Standard:</span>
          <p className="text-[11px] leading-relaxed">
            The platform discovers administrative delays early to enable proactive academic assistance. The system never denies access or de-registers students automatically; human verification is preserved across all academic gateways.
          </p>
        </div>
      </div>

      {/* Staff Verification Modal */}
      {isVerifying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form 
            onSubmit={handleStaffVerification}
            className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-lg w-full p-6 text-xs space-y-4"
          >
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                Staff Prerequisite Certification & Override
              </h3>
              <p className="text-slate-500 text-xs mt-1">
                Certifying transfer transcript record for student Priya Sharma (Roll #0108CS221088).
              </p>
            </div>

            <div>
              <label className="text-slate-700 font-semibold block mb-1">
                Verification Details & Reference Voucher (Committed to Security Audit Ledger)
              </label>
              <textarea
                rows={3}
                required
                placeholder="e.g. Inspected physical attested mark sheet from State Technical Board; serial number BTE-7721 verified against gazette."
                value={staffNote}
                onChange={e => setStaffNote(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:outline-hidden focus:border-blue-500 text-xs placeholder-slate-400"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsVerifying(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm & Certify</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
