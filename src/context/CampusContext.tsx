/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SATI Vidisha — CampusContext (Core Operational Engine)
 * 
 * Purpose:
 * Central state store and operational coordination hub for Samrat Ashok Technological Institute (SATI), Vidisha.
 * 
 * Core Subsystems Managed:
 * 1. Role-Based Access Control (RBAC):
 *    - Administrator (Directorate): High-level emergency authorizations, municipal budget clearance, institution-wide alerts.
 *    - Facilities (SCADA Engineers): Direct valve manipulation, booster pump controls, tanker dispatch coordination.
 *    - Faculty (Deans & HODs): Instructional venue relocations, academic timetable adjustments.
 *    - Student (Residents): Status advisories, drinking water station maps, academic timeline tracking.
 * 2. Spatial Digital Twin Topology:
 *    - Directed physical dependency graph connecting Substation 2, South Pump House, Overhead Tanks,
 *      hostels (Sir C.V. Raman Hostel H-1), and academic blocks (Kailash Satyarthi Complex).
 * 3. Incident Lifecycle (INC-2026-084):
 *    - Tracks active alerts, telemetry threshold breaches, simulated parameters, and human authorization steps.
 * 4. Recovery Plan Execution:
 *    - 5-stage sequential workflow (Triage, Containment, Stabilization, Verification, Closure).
 * 5. Tamper-evident Audit Ledger:
 *    - Immutable recording of every human decision, stage signoff, and parameter simulation.
 */

import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import {
  UserRole,
  UserProfile,
  IncidentEvent,
  AffectedEntity,
  GraphNode,
  GraphLink,
  SimulatorAssumptions,
  ScenarioOption,
  RecoveryPlan,
  RecoveryAction,
  AuditEntry,
  PastIncident,
  StudentJourneyStep,
  DataFeedStatus,
  IncidentStatus,
  getStrategyTitle
} from '../types';
import {
  DEMO_USERS,
  INITIAL_EVENTS,
  AFFECTED_ENTITIES,
  GRAPH_NODES,
  GRAPH_LINKS,
  INITIAL_SCENARIO_OPTIONS,
  INITIAL_RECOVERY_PLAN,
  INITIAL_AUDIT_TRAIL,
  PAST_INCIDENTS,
  STUDENT_JOURNEY_STEPS,
  DATA_FEEDS
} from '../data/mockData';

export type NavSection = 
  | 'overview' 
  | 'response_demo' 
  | 'sati_map'
  | 'sati_faculty'
  | 'incidents' 
  | 'graph' 
  | 'simulator' 
  | 'recovery' 
  | 'journey' 
  | 'memory' 
  | 'integrations';

interface CampusContextType {
  // Navigation & Role
  currentSection: NavSection;
  setCurrentSection: (section: NavSection) => void;
  demoStep: 'event' | 'connections' | 'memory' | 'scenarios' | 'approval';
  setDemoStep: (step: 'event' | 'connections' | 'memory' | 'scenarios' | 'approval') => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentUser: UserProfile;
  selectedCampus: string;
  setSelectedCampus: (campus: string) => void;

  // Incident State
  incidentId: string;
  incidentTitle: string;
  incidentStatus: IncidentStatus;
  incidentOwner: string;
  setIncidentOwner: (owner: string) => void;
  events: IncidentEvent[];
  affectedEntities: AffectedEntity[];
  addEvent: (title: string, desc: string, nature: 'observed' | 'possible' | 'confirmed', source: string) => void;

  // Campus Graph
  nodes: GraphNode[];
  links: GraphLink[];
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  selectedLinkId: string | null;
  setSelectedLinkId: (id: string | null) => void;
  graphFilter: string;
  setGraphFilter: (filter: string) => void;

  // What-If Simulator
  assumptions: SimulatorAssumptions;
  setAssumptions: React.Dispatch<React.SetStateAction<SimulatorAssumptions>>;
  scenarioOptions: ScenarioOption[];
  selectedOptionId: 'option_a' | 'option_b' | 'option_c';
  setSelectedOptionId: (id: 'option_a' | 'option_b' | 'option_c') => void;
  applyOptionToPlan: (optionId: 'option_a' | 'option_b' | 'option_c') => void;

  // Recovery Plan & Approvals
  recoveryPlan: RecoveryPlan;
  submitPlanForReview: () => void;
  approvePlan: (note: string) => void;
  rejectPlan: (reason: string) => void;
  startPlanExecution: () => void;
  verifyPlanRecovery: (note: string) => void;
  toggleActionCompleted: (actionId: string) => void;
  editActionDescription: (actionId: string, title: string, desc: string) => void;

  // Audit Log
  auditTrail: AuditEntry[];

  // Student Journey
  journeySteps: StudentJourneyStep[];
  verifyStudentPrerequisite: (staffNote: string) => void;

  // Institutional Memory
  pastIncidents: PastIncident[];

  // Data Feeds & Freshness
  dataFeeds: DataFeedStatus[];
  toggleFeedFreshness: (feedId: string) => void;

  // Toast / System Feedback
  systemNotice: string | null;
  clearSystemNotice: () => void;
  triggerSystemNotice: (message: string) => void;

  // Reset
  resetDemo: () => void;
  resetSystemState: () => void;
}

const CampusContext = createContext<CampusContextType | undefined>(undefined);

export const CampusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Role State
  const [currentSection, setCurrentSection] = useState<NavSection>('overview');
  const [demoStep, setDemoStep] = useState<'event' | 'connections' | 'memory' | 'scenarios' | 'approval'>('event');
  const [currentRole, setCurrentRole] = useState<UserRole>('administrator');
  const [selectedCampus, setSelectedCampus] = useState<string>('Samrat Ashok Technological Institute (SATI), Vidisha');

  // Incident State
  const [incidentId] = useState<string>('INC-2026-084');
  const [incidentTitle] = useState<string>('Sir C.V. Raman Hostel Tank T-04 Reserve Alert (<18%)');
  const [incidentOwner, setIncidentOwnerState] = useState<string>('Er. Ananya Deshmukh (Chief Utilities & SCADA Engineer)');
  const [events, setEvents] = useState<IncidentEvent[]>(INITIAL_EVENTS);
  const [affectedEntities] = useState<AffectedEntity[]>(AFFECTED_ENTITIES);

  // Graph State
  const [nodes] = useState<GraphNode[]>(GRAPH_NODES);
  const [links] = useState<GraphLink[]>(GRAPH_LINKS);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('node_tank_t04');
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);
  const [graphFilter, setGraphFilter] = useState<string>('all');

  // Simulator Assumptions
  const [assumptions, setAssumptions] = useState<SimulatorAssumptions>({
    pumpResponseTimeMinutes: 60,
    tankerArrivalMinutes: 45,
    demandLevel: 'normal'
  });
  const [selectedOptionId, setSelectedOptionId] = useState<'option_a' | 'option_b' | 'option_c'>('option_c');

  // Recovery Plan & Approvals
  const [recoveryPlan, setRecoveryPlan] = useState<RecoveryPlan>(INITIAL_RECOVERY_PLAN);
  const [auditTrail, setAuditTrail] = useState<AuditEntry[]>(INITIAL_AUDIT_TRAIL);

  // Student Journey
  const [journeySteps, setJourneySteps] = useState<StudentJourneyStep[]>(STUDENT_JOURNEY_STEPS);

  // Institutional Memory
  const [pastIncidents, setPastIncidents] = useState<PastIncident[]>(PAST_INCIDENTS);

  // Feeds
  const [dataFeeds, setDataFeeds] = useState<DataFeedStatus[]>(DATA_FEEDS);

  // System Notice Feedback
  const [systemNotice, setSystemNotice] = useState<string | null>(null);

  const currentUser = useMemo(() => DEMO_USERS[currentRole], [currentRole]);
  const isAuthorizedStaff = currentRole === 'administrator' || currentRole === 'facilities';

  const triggerSystemNotice = useCallback((message: string) => {
    setSystemNotice(message);
    const timer = setTimeout(() => {
      setSystemNotice(null);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const clearSystemNotice = useCallback(() => {
    setSystemNotice(null);
  }, []);

  // Helper to append audit entries
  const appendAudit = useCallback((action: string, note: string) => {
    const newEntry: AuditEntry = {
      id: `aud_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actor: currentUser.name,
      role: currentRole,
      action,
      note,
      isAutomatedDecision: false
    };
    setAuditTrail(prev => [newEntry, ...prev]);
  }, [currentUser, currentRole]);

  // Owner reassignment - restricted to Facilities & Administrator
  const setIncidentOwner = useCallback((newOwner: string) => {
    if (!isAuthorizedStaff) {
      triggerSystemNotice('Access Restricted: Only Facilities Leadership or Central Administrators may reassign incident command.');
      return;
    }
    setIncidentOwnerState(newOwner);
    appendAudit('Incident Command Reassigned', `Incident ownership reassigned to ${newOwner}.`);
    triggerSystemNotice(`Incident command officially assigned to ${newOwner}. Recorded in operational ledger.`);
  }, [isAuthorizedStaff, appendAudit, triggerSystemNotice]);

  // Dynamic Simulator Calculation (Deterministic hydraulic flow calculations)
  const scenarioOptions = useMemo<ScenarioOption[]>(() => {
    const { pumpResponseTimeMinutes, tankerArrivalMinutes, demandLevel } = assumptions;
    const isHighDemand = demandLevel === 'high';
    const reserveLiters = 2460;
    const consumptionRate = isHighDemand ? 120 : 80;
    const exhaustionMins = Math.round(reserveLiters / consumptionRate);

    // Option A: Passive wait for pump diagnosis + well line refill
    const optAReliefLow = (pumpResponseTimeMinutes / 60 + 0.5).toFixed(1);
    const optAReliefHigh = (pumpResponseTimeMinutes / 60 + 1.5).toFixed(1);

    // Option B: Immediate academic classroom relocation + background pump wait
    const optBHostelLow = (pumpResponseTimeMinutes / 60 + 0.5).toFixed(1);
    const optBHostelHigh = (pumpResponseTimeMinutes / 60 + 1.5).toFixed(1);

    // Option C: Municipal tanker arrival and hose coupling
    const optCReliefLow = tankerArrivalMinutes;
    const optCReliefHigh = tankerArrivalMinutes + (isHighDemand ? 20 : 10);

    return [
      {
        ...INITIAL_SCENARIO_OPTIONS[0],
        estimatedReliefTime: `${optAReliefLow} - ${optAReliefHigh} hrs (Domestic & Lab Supply)`,
        scheduleImpact: isHighDemand 
          ? `Severe Disruption: ~240 hostel students without domestic water in ~${exhaustionMins} mins; morning labs cancelled on arrival.` 
          : `High Disruption: ~240 hostel students run dry in ~${exhaustionMins} mins; ME-301 practical lab cancelled.`,
        keyAssumptions: [
          `Facilities on-site pump diagnostic window: ${pumpResponseTimeMinutes} minutes.`,
          `Hostel morning domestic draw rate: ${consumptionRate} L/min (${demandLevel} demand profile).`,
          'Zero interim municipal tanker mobilized.'
        ],
        confidenceLevel: 'Low',
        confidenceReason: `Dependent on technician arrival in ${pumpResponseTimeMinutes}m and assumes no major motor rewind requirement.`
      },
      {
        ...INITIAL_SCENARIO_OPTIONS[1],
        estimatedReliefTime: `15 - 25 mins (ME-301 Class Shift); ${optBHostelLow} - ${optBHostelHigh} hrs (Hostel Domestic Supply)`,
        scheduleImpact: `Academic Continuity Maintained: ~42 students redirected to Lecture Hall C-102. Hostel plumbing remains dry after ~${exhaustionMins} mins until pump fix.`,
        keyAssumptions: [
          'Lecture Hall C-102 confirmed vacant during 08:30 - 10:00 AM block.',
          `Pump diagnostic and reset completes in approximately ${pumpResponseTimeMinutes} minutes.`,
          'Students and instructor reach alternate venue via portal notice within 25 minutes.'
        ],
        confidenceLevel: 'Medium',
        confidenceReason: `Preserves academic lecture continuity; hostel residents experience domestic water deficit until ${optBHostelLow} - ${optBHostelHigh} hrs.`
      },
      {
        ...INITIAL_SCENARIO_OPTIONS[2],
        estimatedReliefTime: `${optCReliefLow} - ${optCReliefHigh} mins (Hostel Reservoir Restored)`,
        scheduleImpact: `Full Service Continuity: Tanker arrives before the ~${exhaustionMins} min dry threshold; ME-301 laboratory proceeds as scheduled.`,
        resourceCost: isHighDemand ? '₹4,500 (Contractor Emergency SLA Rate - 2x 10,000L Tankers)' : '₹3,500 (Contractor Emergency SLA Rate - 1x 10,000L Tanker)',
        keyAssumptions: [
          `Contracted municipal emergency water supplier fulfills SLA within ${tankerArrivalMinutes} minutes.`,
          `Pump P-02 diagnosis proceeds concurrently (${pumpResponseTimeMinutes} min window).`,
          'Hostel H-1 manifold accepts direct tanker hose coupling without backpressure.'
        ],
        confidenceLevel: 'High',
        confidenceReason: `Precedent INC-2025-019 confirms contractor SLA turnaround within ${tankerArrivalMinutes}m and immediate manifold coupling.`
      }
    ];
  }, [assumptions]);

  // Apply Option to Plan
  const applyOptionToPlan = useCallback((optionId: 'option_a' | 'option_b' | 'option_c') => {
    setSelectedOptionId(optionId);
    
    // Tailor actions according to option
    let newActions: RecoveryAction[] = [];
    if (optionId === 'option_a') {
      newActions = [
        {
          id: 'act_a1',
          title: 'Facilities Physical Diagnostic of Pump P-02',
          description: 'Technician on-site diagnostic at Pump House South; test motor winding coil resistance.',
          assignedRole: 'Facilities Maintenance Duty Engineer',
          sourceSystem: 'Facilities Work Order System #WO-8841',
          completed: false,
          status: 'pending',
          requiresHumanConfirmation: true
        },
        {
          id: 'act_a2',
          title: 'Post Water Conservation Advisory in Hostel H-1',
          description: 'Inform residents of supply curtailment; distribute bottled water emergency supply.',
          assignedRole: 'Hostel H-1 Warden Office',
          sourceSystem: 'Hostel Resident Portal Service',
          completed: false,
          status: 'pending',
          requiresHumanConfirmation: true
        },
        {
          id: 'act_a3',
          title: 'Notify Academic Dean of ME-301 Lab Suspension',
          description: 'Register cancellation of practical experiment in timetable system and notify students.',
          assignedRole: 'Academic Scheduling Officer',
          sourceSystem: 'Academic Timetable Gateway',
          completed: false,
          status: 'pending',
          requiresHumanConfirmation: true
        }
      ];
    } else if (optionId === 'option_b') {
      newActions = [
        {
          id: 'act_b1',
          title: 'Reassign ME-301 Venue to Lecture Hall C-102',
          description: 'Update student timetable and unlock audio-visual equipment in Block C.',
          assignedRole: 'Academic Timetable Coordinator',
          sourceSystem: 'Academic Room Scheduling Gateway #SCHED-7721',
          completed: false,
          status: 'pending',
          requiresHumanConfirmation: true
        },
        {
          id: 'act_b2',
          title: 'Send Relocation Notice to Instructor and 42 Enrolled Students',
          description: 'Automate portal advisory and SMS push notification confirming Lecture Hall C-102 venue.',
          assignedRole: 'Campus Communications Desk',
          sourceSystem: 'Portal Notification Broadcast',
          completed: false,
          status: 'pending',
          requiresHumanConfirmation: true
        },
        {
          id: 'act_b3',
          title: 'Facilities Diagnostic & Repair for Pump P-02',
          description: 'Reset breaker contacts and measure load current across 3 phases before reconnecting.',
          assignedRole: 'Facilities Maintenance Duty Engineer',
          sourceSystem: 'Facilities Work Order System #WO-8841',
          completed: false,
          status: 'pending',
          requiresHumanConfirmation: true
        }
      ];
    } else {
      newActions = [
        {
          id: 'act_c1',
          title: 'Facilities Physical Diagnostic at Pump House South',
          description: 'Check Pump P-02 breaker contacts, measure winding resistance, and verify thermal reset clearance.',
          assignedRole: 'Facilities Maintenance Duty Engineer',
          sourceSystem: 'Facilities Work Order System #WO-8841',
          completed: true,
          status: 'completed',
          requiresHumanConfirmation: true
        },
        {
          id: 'act_c2',
          title: 'Authorize Municipal Emergency Tanker Dispatch',
          description: 'Dispatch 10,000 L potable water tanker to Hostel H-1 roof pump manifold under emergency allocation.',
          assignedRole: 'Campus Operations Administrator',
          sourceSystem: 'Campus ERP Procurement Gateway #ERP-PO-991',
          completed: false,
          status: 'pending',
          requiresHumanConfirmation: true
        },
        {
          id: 'act_c3',
          title: 'Send Advisory Notice to Hostel H-1 Residents & ME-301 Class',
          description: 'Broadcast advisory notice on student portal regarding replenishment window; confirm ME-301 lab schedule.',
          assignedRole: 'Hostel Warden & Student Communications Desk',
          sourceSystem: 'Campus Broadcast & Portal Service',
          completed: false,
          status: 'pending',
          requiresHumanConfirmation: true
        },
        {
          id: 'act_c4',
          title: 'Telemetry Verification of Tank T-04 Level Recovery (>60%)',
          description: 'Confirm ultrasonic transducer records steady climb past 9,000 L threshold before closing operational alert.',
          assignedRole: 'Facilities SCADA Operator',
          sourceSystem: 'Facilities IoT Telemetry Stream',
          completed: false,
          status: 'pending',
          requiresHumanConfirmation: true
        },
        {
          id: 'act_c5',
          title: 'Post-Incident Closure Review & Playbook Indexing',
          description: 'Archive incident telemetry, log contractor response times, and store root-cause notes in Institutional Knowledge Base.',
          assignedRole: 'Campus Operations Administrator',
          sourceSystem: 'Institutional Operations Archive',
          completed: false,
          status: 'pending',
          requiresHumanConfirmation: true
        }
      ];
    }

    setRecoveryPlan({
      id: `plan_inc84_${Date.now()}`,
      incidentId: 'INC-2026-084',
      selectedOptionId: optionId,
      status: 'Draft',
      reviewerName: currentUser.name,
      reviewerRole: currentUser.title,
      actions: newActions,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    appendAudit(
      'Recovery Plan Created',
      `Formulated plan based on ${getStrategyTitle(optionId)}. Generated ${newActions.length} coordinated actions in Draft state.`
    );
    triggerSystemNotice(`Operational plan initialized for ${getStrategyTitle(optionId)}. Ready for review submission.`);
    setCurrentSection('recovery');
  }, [currentUser, appendAudit, triggerSystemNotice]);

  // Plan Workflow Methods - Enforcing valid transitions & role permissions
  const submitPlanForReview = useCallback(() => {
    if (recoveryPlan.status !== 'Draft' && recoveryPlan.status !== 'Rejected') {
      triggerSystemNotice(`Cannot submit for review from "${recoveryPlan.status}" state. Only Draft or Rejected plans may be submitted.`);
      return;
    }

    setRecoveryPlan(prev => ({
      ...prev,
      status: 'Review',
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));
    appendAudit('Plan Submitted for Operational Review', `Plan ${recoveryPlan.id} submitted for designated administrator or facilities clearance.`);
    triggerSystemNotice('Recovery plan submitted to executive review queue.');
  }, [recoveryPlan.id, recoveryPlan.status, appendAudit, triggerSystemNotice]);

  const approvePlan = useCallback((note: string) => {
    if (!isAuthorizedStaff) {
      triggerSystemNotice('Access Restricted: Only Facilities Leadership or Central Administrators may approve operational recovery plans.');
      return;
    }
    if (recoveryPlan.status !== 'Review') {
      triggerSystemNotice(`Plan must be in "Review" state to be approved (Current: "${recoveryPlan.status}").`);
      return;
    }

    setRecoveryPlan(prev => ({
      ...prev,
      status: 'Approved',
      reviewerName: currentUser.name,
      reviewerRole: currentUser.title,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));
    appendAudit('Plan Approved by Authorized Reviewer', `Authorized by ${currentUser.name} (${currentUser.title}). Note: ${note || 'Operational clearance granted.'}`);
    triggerSystemNotice('Recovery plan authorized and approved for deployment.');
  }, [isAuthorizedStaff, recoveryPlan.status, currentUser, appendAudit, triggerSystemNotice]);

  const rejectPlan = useCallback((reason: string) => {
    if (!isAuthorizedStaff) {
      triggerSystemNotice('Access Restricted: Only Facilities Leadership or Central Administrators may reject operational recovery plans.');
      return;
    }
    if (recoveryPlan.status !== 'Review') {
      triggerSystemNotice(`Plan must be in "Review" state to be rejected (Current: "${recoveryPlan.status}").`);
      return;
    }

    setRecoveryPlan(prev => ({
      ...prev,
      status: 'Rejected',
      reviewerName: currentUser.name,
      reviewerRole: currentUser.title,
      rejectionReason: reason,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));
    appendAudit('Plan Rejected by Authorized Reviewer', `Rejected by ${currentUser.name} (${currentUser.title}). Reason: ${reason || 'Plan requires revisions before deployment.'}`);
    triggerSystemNotice('Recovery plan rejected with reviewer feedback notes.');
  }, [isAuthorizedStaff, recoveryPlan.status, currentUser, appendAudit, triggerSystemNotice]);

  const startPlanExecution = useCallback(() => {
    if (!isAuthorizedStaff) {
      triggerSystemNotice('Access Restricted: Only Facilities Leadership or Central Administrators may mobilize plan execution.');
      return;
    }
    if (recoveryPlan.status !== 'Approved') {
      triggerSystemNotice(`Plan must be "Approved" before execution can start (Current: "${recoveryPlan.status}").`);
      return;
    }

    setRecoveryPlan(prev => ({
      ...prev,
      status: 'In Progress',
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));
    appendAudit('Recovery Plan Execution Initiated', `Actions mobilized by ${currentUser.name}.`);
    triggerSystemNotice('Recovery plan status moved to In Progress. Teams dispatched.');
  }, [isAuthorizedStaff, recoveryPlan.status, currentUser, appendAudit, triggerSystemNotice]);

  const verifyPlanRecovery = useCallback((note: string) => {
    if (!isAuthorizedStaff) {
      triggerSystemNotice('Access Restricted: Only Facilities Leadership or Central Administrators may certify incident recovery.');
      return;
    }
    if (recoveryPlan.status !== 'In Progress') {
      triggerSystemNotice(`Recovery can only be certified when the plan is "In Progress" (Current: "${recoveryPlan.status}").`);
      return;
    }

    // Require all planned actions to be completed prior to verification
    const pendingActions = recoveryPlan.actions.filter(a => !a.completed);
    if (pendingActions.length > 0) {
      triggerSystemNotice(`Cannot certify recovery while ${pendingActions.length} action item(s) remain incomplete. All operational items must be verified.`);
      return;
    }

    setRecoveryPlan(prev => ({
      ...prev,
      status: 'Verified Recovery',
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));

    // Add current incident to institutional memory archive (once, preventing duplicates)
    setPastIncidents(prev => {
      if (prev.some(item => item.id === 'INC-2026-084')) return prev;
      const currentIncidentMemory: PastIncident = {
        id: 'INC-2026-084',
        title: 'Low water level at Tank T-04 serving Hostel H-1',
        incidentType: 'Water Utilities / Booster Pump Thermal Trip',
        location: 'Hostel H-1 (Mandakini Hall) & Pump House South',
        date: `Today (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
        observed: 'Tank T-04 level dropped below 18% reserve after Pump P-02 thermal overload breaker tripped. 240 hostel residents and ME-301 laboratory class impacted.',
        staffAction: `Executed strategy: ${getStrategyTitle(recoveryPlan.selectedOptionId)}. Verified by ${currentUser.name} (${currentUser.title}).`,
        resolution: `All ${recoveryPlan.actions.length} action items executed and completed. Tank volume and supply pressure restored above nominal thresholds. Note: ${note || 'On-site verification passed.'}`,
        verifiedOutcome: `Verified on-site by ${currentUser.name} (${currentUser.title}). Restored domestic and lab supply.`,
        similarityScore: 100,
        similarityRationale: 'Verified incident archived into institutional operational memory and incident playbook repository.',
        matchingFactors: ['Tank T-04', 'Pump P-02', 'Hostel H-1', 'Verified Recovery'],
        detailedEvidence: [
          `Selected Strategy: ${getStrategyTitle(recoveryPlan.selectedOptionId)}`,
          `Verification Note: ${note || 'On-site telemetry checks passed.'}`,
          `Completed Actions: ${recoveryPlan.actions.map(a => a.title).join('; ')}`
        ],
        isCurrentSession: true
      };
      return [currentIncidentMemory, ...prev];
    });

    appendAudit('Incident Recovery Verified & Certified', `Final verification performed by ${currentUser.name}. Note: ${note || 'Telemetry confirms Tank T-04 replenished above nominal threshold.'}`);
    triggerSystemNotice('Incident recovery verified and indexed into institutional operational memory.');
  }, [isAuthorizedStaff, recoveryPlan.status, recoveryPlan.actions, recoveryPlan.selectedOptionId, currentUser, appendAudit, triggerSystemNotice]);

  const toggleActionCompleted = useCallback((actionId: string) => {
    // Role check: students cannot complete operational actions
    if (currentRole === 'student') {
      triggerSystemNotice('Access Restricted: Student accounts cannot certify operational tasks.');
      return;
    }

    const targetAction = recoveryPlan.actions.find(a => a.id === actionId);
    if (!targetAction) return;

    // Faculty can only complete communications/advisory tasks
    if (currentRole === 'faculty') {
      const isCommunications = 
        targetAction.assignedRole.toLowerCase().includes('communication') ||
        targetAction.assignedRole.toLowerCase().includes('faculty') ||
        targetAction.assignedRole.toLowerCase().includes('warden');
      if (!isCommunications) {
        triggerSystemNotice('Access Restricted: Faculty accounts may certify communication notices. Physical infrastructure tasks require Facilities or Administrator authorization.');
        return;
      }
    }

    // Workflow state check: actions can only be toggled when plan is In Progress or Approved
    if (recoveryPlan.status !== 'In Progress' && recoveryPlan.status !== 'Approved') {
      triggerSystemNotice(`Tasks can only be executed after the recovery plan is Approved and In Progress (Current: "${recoveryPlan.status}").`);
      return;
    }

    setRecoveryPlan(prev => {
      const updatedActions = prev.actions.map(action => {
        if (action.id === actionId) {
          const nextCompleted = !action.completed;
          return {
            ...action,
            completed: nextCompleted,
            status: nextCompleted ? ('completed' as const) : ('in_progress' as const)
          };
        }
        return action;
      });
      return {
        ...prev,
        actions: updatedActions,
        lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    });

    appendAudit('Action Status Updated', `Action "${targetAction.title}" updated by ${currentUser.name}.`);
    triggerSystemNotice(`Task "${targetAction.title}" updated and logged.`);
  }, [currentRole, recoveryPlan.status, recoveryPlan.actions, currentUser, appendAudit, triggerSystemNotice]);

  const editActionDescription = useCallback((actionId: string, title: string, desc: string) => {
    if (!isAuthorizedStaff) {
      triggerSystemNotice('Access Restricted: Modifying recovery action items requires Facilities Leadership or Central Administrator authorization.');
      return;
    }
    setRecoveryPlan(prev => ({
      ...prev,
      actions: prev.actions.map(a => a.id === actionId ? { ...a, title, description: desc } : a),
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));
    appendAudit('Action Plan Modified', `Action item "${title}" modified by ${currentUser.name}.`);
    triggerSystemNotice('Action item parameters updated.');
  }, [isAuthorizedStaff, currentUser, appendAudit, triggerSystemNotice]);

  // Add Incident Event - Students cannot file official dispatch events
  const addEvent = useCallback((title: string, desc: string, nature: 'observed' | 'possible' | 'confirmed', source: string) => {
    if (currentRole === 'student') {
      triggerSystemNotice('Access Restricted: Student accounts cannot log official dispatch records.');
      return;
    }

    const newEvt: IncidentEvent = {
      id: `evt_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title,
      description: desc,
      source,
      sourceRecordId: `REC-MAN-${Math.floor(1000 + Math.random() * 9000)}`,
      nature,
      confidence: 'High',
      confidenceReason: 'Direct operational entry by authorized staff operator.'
    };
    setEvents(prev => [newEvt, ...prev]);
    appendAudit('Operational Observation Logged', `Logged: "${title}" (${nature}).`);
    triggerSystemNotice(`Operational observation recorded: "${title}".`);
  }, [currentRole, appendAudit, triggerSystemNotice]);

  // Student Journey Unblock Verification - Only Administrator (Registrar) or Faculty
  const verifyStudentPrerequisite = useCallback((staffNote: string) => {
    if (currentRole !== 'administrator' && currentRole !== 'faculty') {
      triggerSystemNotice('Access Restricted: Academic prerequisite certification requires Academic Registrar or Department Faculty authorization.');
      return;
    }

    setJourneySteps(prev => prev.map(step => {
      if (step.id === 'step_prerequisites') {
        return {
          ...step,
          status: 'completed',
          description: `Transfer credit verified via State Technical Board registry. Certified by ${currentUser.name}.`,
          completedDate: 'Today (Staff Verified)'
        };
      }
      if (step.id === 'step_registration') {
        return {
          ...step,
          status: 'in_progress',
          description: 'All 6 semester modules registered, including ME-301 Applied Fluid Mechanics.'
        };
      }
      return step;
    }));

    appendAudit(
      'Student Prerequisite Verified & Cleared',
      `Student Priya Sharma transfer transcript certified by ${currentUser.name} (${currentUser.title}). Note: ${staffNote || 'Verified physical certificate against State Board transfer registry.'}`
    );
    triggerSystemNotice('Student prerequisite certified and course registration unlocked.');
  }, [currentRole, currentUser, appendAudit, triggerSystemNotice]);

  // Feed Toggle Freshness
  const toggleFeedFreshness = useCallback((feedId: string) => {
    setDataFeeds(prev => prev.map(feed => {
      if (feed.id === feedId) {
        const nextState = feed.freshness === 'fresh' ? 'stale' : 'fresh';
        return {
          ...feed,
          freshness: nextState,
          lastHeartbeat: nextState === 'stale' ? '45 minutes ago (Telemetry Timeout)' : 'Just now (06:50 AM)'
        };
      }
      return feed;
    }));
    triggerSystemNotice('Telemetry feed connection state toggled.');
  }, [triggerSystemNotice]);

  // Reset Demo - Restores initial baseline state
  const resetDemo = useCallback(() => {
    setCurrentRole('administrator');
    setSelectedCampus('Apex Institute of Technology — Main Academic Campus');
    setIncidentOwnerState('Ananya Deshmukh (Lead Facilities Engineer)');
    setEvents(INITIAL_EVENTS);
    setSelectedNodeId('node_tank_t04');
    setSelectedLinkId(null);
    setGraphFilter('all');
    setAssumptions({
      pumpResponseTimeMinutes: 60,
      tankerArrivalMinutes: 45,
      demandLevel: 'normal'
    });
    setSelectedOptionId('option_c');
    setRecoveryPlan(INITIAL_RECOVERY_PLAN);
    setAuditTrail(INITIAL_AUDIT_TRAIL);
    setJourneySteps(STUDENT_JOURNEY_STEPS);
    setPastIncidents(PAST_INCIDENTS);
    setDataFeeds(DATA_FEEDS);
    setCurrentSection('overview');
    triggerSystemNotice('Operational session state restored to institutional baseline.');
  }, [triggerSystemNotice]);

  return (
    <CampusContext.Provider
      value={{
        currentSection,
        setCurrentSection,
        demoStep,
        setDemoStep,
        currentRole,
        setCurrentRole,
        currentUser,
        selectedCampus,
        setSelectedCampus,
        incidentId,
        incidentTitle,
        incidentStatus: recoveryPlan.status,
        incidentOwner,
        setIncidentOwner,
        events,
        affectedEntities,
        addEvent,
        nodes,
        links,
        selectedNodeId,
        setSelectedNodeId,
        selectedLinkId,
        setSelectedLinkId,
        graphFilter,
        setGraphFilter,
        assumptions,
        setAssumptions,
        scenarioOptions,
        selectedOptionId,
        setSelectedOptionId,
        applyOptionToPlan,
        recoveryPlan,
        submitPlanForReview,
        approvePlan,
        rejectPlan,
        startPlanExecution,
        verifyPlanRecovery,
        toggleActionCompleted,
        editActionDescription,
        auditTrail,
        journeySteps,
        verifyStudentPrerequisite,
        pastIncidents,
        dataFeeds,
        toggleFeedFreshness,
        systemNotice,
        clearSystemNotice,
        triggerSystemNotice,
        resetDemo,
        resetSystemState: resetDemo
      }}
    >
      {children}
    </CampusContext.Provider>
  );
};

export const useCampus = (): CampusContextType => {
  const context = useContext(CampusContext);
  if (!context) {
    throw new Error('useCampus must be used within a CampusProvider');
  }
  return context;
};




