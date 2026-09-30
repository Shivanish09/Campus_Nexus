/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'student' | 'faculty' | 'facilities' | 'administrator';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  title: string;
  department: string;
  email: string;
  avatarInitials: string;
}

export type IncidentStatus = 
  | 'Draft' 
  | 'Review' 
  | 'Approved' 
  | 'Rejected' 
  | 'In Progress' 
  | 'Verified Recovery' 
  | 'Closed';

export type LinkNature = 'observed' | 'possible' | 'confirmed';

export interface IncidentEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  source: string;
  sourceRecordId: string;
  nature: LinkNature;
  confidence: 'High' | 'Medium' | 'Low' | 'Needs Confirmation';
  confidenceReason: string;
}

export interface AffectedEntity {
  id: string;
  name: string;
  type: 'building' | 'hostel' | 'room' | 'asset' | 'activity';
  location: string;
  impactLevel: 'Direct' | 'Probable Secondary' | 'Potential';
  note: string;
  sourceRecord: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'campus' | 'building' | 'asset' | 'room' | 'activity' | 'incident';
  status: 'nominal' | 'warning' | 'alert' | 'info';
  x: number;
  y: number;
  description: string;
  sourceRecord: string;
  timestamp: string;
  image?: string;
  subtitle?: string;
  zone?: string;
}

export interface GraphLink {
  source: string;
  target: string;
  label: string;
  nature: LinkNature;
  reason: string;
  sourceRecord: string;
  timestamp: string;
}

export interface SimulatorAssumptions {
  pumpResponseTimeMinutes: number; // e.g. 30, 60, 120
  tankerArrivalMinutes: number;     // e.g. 45, 90
  demandLevel: 'normal' | 'high';  // normal (80 L/min), high (120 L/min)
}

export interface ScenarioOption {
  id: 'option_a' | 'option_b' | 'option_c';
  title: string;
  tagline: string;
  estimatedReliefTime: string;
  scheduleImpact: string;
  scheduleImpactSeverity: 'low' | 'medium' | 'high';
  resourceCost: string;
  keyAssumptions: string[];
  confidenceLevel: 'High' | 'Medium' | 'Low';
  confidenceReason: string;
  recommendedReviewTime: string;
  recommendedNextStep: string;
}

export interface RecoveryAction {
  id: string;
  title: string;
  description: string;
  assignedRole: string;
  sourceSystem: string;
  completed: boolean;
  status: 'pending' | 'in_progress' | 'completed';
  requiresHumanConfirmation: boolean;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: UserRole;
  action: string;
  note: string;
  isAutomatedDecision: boolean; // Always false by protocol!
}

export interface RecoveryPlan {
  id: string;
  incidentId: string;
  selectedOptionId: 'option_a' | 'option_b' | 'option_c';
  status: IncidentStatus;
  reviewerName: string;
  reviewerRole: string;
  rejectionReason?: string;
  actions: RecoveryAction[];
  lastUpdated: string;
}

export interface PastIncident {
  id: string;
  title: string;
  incidentType: string;
  location: string;
  date: string;
  observed: string;
  staffAction: string;
  resolution: string;
  verifiedOutcome: string;
  similarityScore: number; // 0-100% indicative topological similarity
  similarityRationale: string;
  matchingFactors: string[];
  detailedEvidence: string[];
  isCurrentSession?: boolean;
}

export const STRATEGY_TITLES: Record<'option_a' | 'option_b' | 'option_c', string> = {
  option_a: 'Option A: Passive Monitoring & Technician Standby',
  option_b: 'Option B: Academic Class Relocation to Dry Lecture Hall',
  option_c: 'Option C: Emergency Water Tanker + On-Site Pump Reset'
};

export function getStrategyTitle(id: 'option_a' | 'option_b' | 'option_c'): string {
  return STRATEGY_TITLES[id] ?? 'Unspecified Strategy';
}

export interface StudentJourneyStep {
  id: string;
  title: string;
  status: 'completed' | 'blocked' | 'in_progress' | 'upcoming';
  description: string;
  completedDate?: string;
  blockerDetails?: {
    rule: string;
    missingRecord: string;
    nextStepForStudent: string;
    verifyingOffice: string;
    plainLanguageNotice: string;
    officeHours: string;
    deskContact: string;
  };
}

export interface DataFeedStatus {
  id: string;
  name: string;
  category: string;
  freshness: 'fresh' | 'stale' | 'offline';
  lastHeartbeat: string;
  sampleFrequency: string;
  syntheticRecordCount: number;
  fallbackManualSOP: string;
}
