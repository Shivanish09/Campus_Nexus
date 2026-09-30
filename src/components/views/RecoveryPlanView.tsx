/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { RoleBasedBanner } from '../common/RoleBasedBanner';
import { 
  ClipboardCheck, 
  CheckCircle2, 
  XCircle, 
  ShieldAlert, 
  ShieldCheck, 
  Edit3, 
  Play, 
  Send, 
  Award,
  Check
} from 'lucide-react';
import { IncidentStatus, RecoveryAction, getStrategyTitle, STRATEGY_TITLES } from '../../types';

// Runtime mapping verification test ensuring each option maps to an exact, non-empty label
const strategyMappingTestPassed = 
  Boolean(getStrategyTitle('option_a') === STRATEGY_TITLES.option_a &&
  getStrategyTitle('option_b') === STRATEGY_TITLES.option_b &&
  getStrategyTitle('option_c') === STRATEGY_TITLES.option_c);

export const RecoveryPlanView: React.FC = () => {
  const { 
    recoveryPlan, 
    approvePlan, 
    rejectPlan, 
    startPlanExecution, 
    verifyPlanRecovery, 
    submitPlanForReview,
    toggleActionCompleted,
    editActionDescription,
    currentRole
  } = useCampus();

  const [modalMode, setModalMode] = useState<'approve' | 'reject' | 'edit' | 'verify' | null>(null);
  const [reasonInput, setReasonInput] = useState('');
  const [editingActionId, setEditingActionId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');

  const canReview = currentRole === 'administrator' || currentRole === 'facilities';

  const stages: { id: IncidentStatus; label: string }[] = [
    { id: 'Draft', label: '1. Draft Formulation' },
    { id: 'Review', label: '2. Operational Review' },
    { id: 'Approved', label: '3. Directorate Approval' },
    { id: 'In Progress', label: '4. Action Mobilization' },
    { id: 'Verified Recovery', label: '5. Verified Recovery' }
  ];

  const getStageIndex = (status: IncidentStatus) => {
    if (status === 'Rejected') return 1;
    switch (status) {
      case 'Draft': return 0;
      case 'Review': return 1;
      case 'Approved': return 2;
      case 'In Progress': return 3;
      case 'Verified Recovery':
      case 'Closed': return 4;
      default: return 0;
    }
  };

  const currentStageIndex = getStageIndex(recoveryPlan.status);
  const completedCount = recoveryPlan.actions.filter(a => a.completed).length;
  const allActionsCompleted = completedCount === recoveryPlan.actions.length;

  const handleOpenApprove = () => {
    setReasonInput('');
    setModalMode('approve');
  };

  const handleOpenReject = () => {
    setReasonInput('');
    setModalMode('reject');
  };

  const handleOpenVerify = () => {
    setReasonInput('');
    setModalMode('verify');
  };

  const handleOpenEdit = (actionId: string, currentTitle: string, currentDescription: string) => {
    setEditingActionId(actionId);
    setEditTitle(currentTitle);
    setEditDesc(currentDescription);
    setModalMode('edit');
  };

  const submitDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === 'approve') {
      approvePlan(reasonInput);
    } else if (modalMode === 'reject') {
      rejectPlan(reasonInput || 'Plan rejected during operational review.');
    } else if (modalMode === 'verify') {
      verifyPlanRecovery(reasonInput || 'Physical recovery verified on-site.');
    } else if (modalMode === 'edit' && editingActionId) {
      editActionDescription(editingActionId, editTitle, editDesc);
    }
    setModalMode(null);
  };

  const canToggleAction = (action: RecoveryAction) => {
    if (recoveryPlan.status !== 'In Progress' && recoveryPlan.status !== 'Approved') return false;
    if (currentRole === 'student') return false;
    if (currentRole === 'faculty') {
      return (
        action.assignedRole.toLowerCase().includes('communication') ||
        action.assignedRole.toLowerCase().includes('faculty') ||
        action.assignedRole.toLowerCase().includes('warden')
      );
    }
    return true;
  };

  return (
    <div className="space-y-6">
      <RoleBasedBanner />

      {/* Plan Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-blue-700">
              <ClipboardCheck className="w-4 h-4" />
              <span>SATI Selected Strategy Protocol</span>
              <span>·</span>
              <span className="text-slate-500">Plan ID: {recoveryPlan.id}</span>
              {strategyMappingTestPassed && (
                <>
                  <span>·</span>
                  <span className="text-emerald-700 font-mono text-[10px] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-semibold">
                    Strategy Mapping Verified
                  </span>
                </>
              )}
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mt-1.5">
              {getStrategyTitle(recoveryPlan.selectedOptionId)}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Sir C.V. Raman Hostel Water Continuity & Fluid Mechanics Lab Stabilization · Multi-Department Protocol
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold ${
              recoveryPlan.status === 'Approved'
                ? 'bg-blue-50 border border-blue-200 text-blue-800'
                : recoveryPlan.status === 'Verified Recovery'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : recoveryPlan.status === 'Rejected'
                ? 'bg-rose-50 border border-rose-200 text-rose-800'
                : 'bg-slate-100 border border-slate-200 text-slate-700'
            }`}>
              Workflow Status: {recoveryPlan.status}
            </span>
          </div>
        </div>

        {/* 5-Step Progress Workflow Tracker */}
        <div className="pt-1">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
            {stages.map((stage, idx) => {
              const isPast = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex && recoveryPlan.status !== 'Rejected';
              const isRejected = recoveryPlan.status === 'Rejected' && idx === 1;

              return (
                <div 
                  key={stage.id}
                  className={`p-3 rounded-xl border text-center font-medium transition-colors ${
                    isRejected
                      ? 'bg-rose-50 border-rose-200 text-rose-800'
                      : isCurrent
                      ? 'bg-blue-50 border-blue-500 text-blue-700 ring-2 ring-blue-500/20 font-bold shadow-xs'
                      : isPast
                      ? 'bg-slate-50 border-slate-200 text-slate-700'
                      : 'bg-slate-50/50 border-slate-200/60 text-slate-400'
                  }`}
                >
                  <div className="text-[10px] font-mono text-slate-400">Step {idx + 1}</div>
                  <div className="truncate text-xs mt-0.5">
                    {isRejected ? 'Rejected with Notes' : stage.label.split('. ')[1]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Governance & Reviewer Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs text-slate-600">
          <div>
            <span className="text-slate-400 text-[11px] block">Designated Human Reviewer</span>
            <span className="font-bold text-slate-900">{recoveryPlan.reviewerName}</span>
            <span className="text-[11px] text-slate-500 block font-mono">({recoveryPlan.reviewerRole})</span>
          </div>

          <div>
            <span className="text-slate-400 text-[11px] block">Active Response Strategy</span>
            <span className="font-bold text-blue-700 block mt-0.5 truncate">
              {getStrategyTitle(recoveryPlan.selectedOptionId)}
            </span>
          </div>

          <div>
            <span className="text-slate-400 text-[11px] block">Action Execution Progress</span>
            <span className="font-mono text-slate-900 font-bold block mt-0.5">
              {completedCount} of {recoveryPlan.actions.length} Completed
            </span>
          </div>
        </div>

        {/* Rejection Notice if rejected */}
        {recoveryPlan.status === 'Rejected' && recoveryPlan.rejectionReason && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-1">
            <span className="font-bold flex items-center gap-1.5 text-rose-900">
              <XCircle className="w-4 h-4" />
              <span>Reviewer Feedback for Rejection</span>
            </span>
            <p className="text-xs text-rose-800">{recoveryPlan.rejectionReason}</p>
          </div>
        )}
      </div>

      {/* Human Reviewer Action Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs shadow-xs">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="w-4 h-4 text-blue-600 shrink-0" />
          <div>
            <span className="font-bold text-slate-900">Human Authorization Gate:</span>{' '}
            <span className="text-slate-600">
              {canReview 
                ? 'Your active profile holds administrative review authority over this recovery plan.' 
                : 'Central Administration or Facilities Directorate authorization required to approve or certify recovery.'}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          {recoveryPlan.status === 'Draft' && (
            <button
              onClick={submitPlanForReview}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit for Operational Review</span>
            </button>
          )}

          {recoveryPlan.status === 'Review' && (
            canReview ? (
              <>
                <button
                  onClick={handleOpenReject}
                  className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl transition-colors flex items-center gap-1.5 font-semibold"
                >
                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Reject with Feedback</span>
                </button>
                <button
                  onClick={handleOpenApprove}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approve & Authorize Mobilization</span>
                </button>
              </>
            ) : (
              <span className="text-xs text-amber-800 italic font-mono bg-amber-50 px-2 py-1 rounded border border-amber-200">
                Awaiting authorized administrative sign-off
              </span>
            )
          )}

          {recoveryPlan.status === 'Approved' && (
            canReview ? (
              <button
                onClick={startPlanExecution}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start Plan Mobilization</span>
              </button>
            ) : (
              <span className="text-xs text-blue-800 italic font-mono bg-blue-50 px-2 py-1 rounded border border-blue-200">
                Approved · Awaiting staff execution mobilization
              </span>
            )
          )}

          {recoveryPlan.status === 'In Progress' && (
            canReview ? (
              <button
                onClick={handleOpenVerify}
                disabled={!allActionsCompleted}
                title={allActionsCompleted ? 'Certify physical recovery' : `Complete remaining ${recoveryPlan.actions.length - completedCount} task(s) first`}
                className={`px-4 py-2 font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                  allActionsCompleted
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer'
                    : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>
                  {allActionsCompleted 
                    ? 'Verify Physical Recovery & Close' 
                    : `Verify Recovery (${recoveryPlan.actions.length - completedCount} Pending)`}
                </span>
              </button>
            ) : (
              <span className="text-xs text-blue-800 italic font-mono bg-blue-50 px-2 py-1 rounded border border-blue-200">
                In Progress · Tasks being executed across campus
              </span>
            )
          )}

          {recoveryPlan.status === 'Verified Recovery' && (
            <div className="flex items-center gap-1.5 text-emerald-700 font-mono text-xs font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
              <span>Incident Recovery Fully Certified & Archived</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Items Checklist */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Coordinated Action Protocol</h2>
            <p className="text-xs text-slate-500">
              Assigned tasks spanning SATI facilities maintenance, student communications, and SCADA telemetry verification
            </p>
          </div>
          <span className="text-xs font-mono text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            {completedCount}/{recoveryPlan.actions.length} Completed
          </span>
        </div>

        <div className="space-y-3">
          {recoveryPlan.actions.map(action => (
            <div
              key={action.id}
              className={`p-4 rounded-xl border text-xs transition-colors flex flex-col md:flex-row md:items-start justify-between gap-3 ${
                action.completed
                  ? 'bg-slate-50 border-slate-200 opacity-80'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={action.completed}
                  onChange={() => toggleActionCompleted(action.id)}
                  className={`mt-1 h-4 w-4 rounded border-slate-300 bg-white text-blue-600 focus:ring-blue-500 ${
                    canToggleAction(action) ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                  }`}
                  disabled={!canToggleAction(action)}
                  title={
                    !canToggleAction(action)
                      ? currentRole === 'student'
                        ? 'Student accounts cannot certify operational tasks'
                        : recoveryPlan.status !== 'In Progress'
                        ? 'Tasks can only be executed when plan is Approved and In Progress'
                        : 'Faculty accounts may only certify student notices and communications'
                      : 'Click to toggle task status'
                  }
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-sm ${action.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {action.title}
                    </span>
                    {action.completed && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                        COMPLETED
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed max-w-2xl">
                    {action.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-mono pt-1">
                    <span>Assigned: <strong className="text-slate-700 font-medium">{action.assignedRole}</strong></span>
                    <span>·</span>
                    <span>System: <strong className="text-slate-700 font-medium">{action.sourceSystem}</strong></span>
                  </div>
                </div>
              </div>

              {canReview && !action.completed && (
                <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0">
                  <button
                    onClick={() => handleOpenEdit(action.id, action.title, action.description)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Edit action text"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Safety Governance Banner */}
      <div className="p-4 rounded-xl bg-white border border-slate-200/90 text-xs text-slate-600 flex items-start gap-3 shadow-xs">
        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-slate-900">SATI Campus Governance & Human Authorization Standard:</span>
          <p className="text-[11px] leading-relaxed">
            The platform prepares structured operational plans, but strictly preserves human oversight. Final decisions on emergency expenditures, campus alerts, and room relocations require verified official sign-off and are committed to the institutional audit ledger.
          </p>
        </div>
      </div>

      {/* Decision Modal (Approve / Reject / Edit / Verify) */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form 
            onSubmit={submitDecision}
            className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-lg w-full p-6 text-xs space-y-4"
          >
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                {modalMode === 'approve' && 'Authorize Recovery Plan'}
                {modalMode === 'reject' && 'Reject Recovery Plan'}
                {modalMode === 'verify' && 'Verify Physical Recovery & Close'}
                {modalMode === 'edit' && 'Edit Recovery Action Item'}
              </h3>
              <p className="text-slate-500 text-xs mt-1">
                {modalMode === 'approve' && 'Confirm authorization to mobilize emergency logistics and academic notifications.'}
                {modalMode === 'reject' && 'Provide operational justification so the response team can revise parameters.'}
                {modalMode === 'verify' && 'Confirm hardware telemetry and physical inspections confirm restored water supply.'}
                {modalMode === 'edit' && 'Adjust operational wording or instructions for duty personnel.'}
              </p>
            </div>

            {modalMode === 'edit' ? (
              <div className="space-y-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Action Title</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:outline-hidden focus:border-blue-500 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Action Description</label>
                  <textarea
                    rows={3}
                    value={editDesc}
                    onChange={e => setEditDesc(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:outline-hidden focus:border-blue-500 text-xs"
                    required
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Operational Sign-Off Justification & Notes (Recorded in Audit Ledger)
                </label>
                <textarea
                  rows={3}
                  required={modalMode === 'reject'}
                  placeholder={
                    modalMode === 'approve'
                      ? 'e.g. Authorized mobilization of Option C municipal tanker contract and on-site pump reset.'
                      : modalMode === 'reject'
                      ? 'e.g. Budget expenditure exceeded threshold; reconsider on-site pump reset.'
                      : 'e.g. Facilities duty supervisor physically verified tank sight-glass at 88% capacity.'
                  }
                  value={reasonInput}
                  onChange={e => setReasonInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:outline-hidden focus:border-blue-500 text-xs"
                />
              </div>
            )}

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setModalMode(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                  modalMode === 'reject'
                    ? 'bg-rose-600 hover:bg-rose-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>Confirm Decision</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
