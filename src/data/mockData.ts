/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  UserProfile,
  IncidentEvent,
  AffectedEntity,
  GraphNode,
  GraphLink,
  ScenarioOption,
  RecoveryAction,
  AuditEntry,
  PastIncident,
  StudentJourneyStep,
  DataFeedStatus,
  RecoveryPlan
} from '../types';

export const CAMPUS_USERS: Record<string, UserProfile> = {
  student: {
    id: 'usr_student_sati',
    name: 'Priya Sharma',
    role: 'student',
    title: 'B.Tech CSE, 3rd Year (Enrollment 0108CS221088)',
    department: 'Department of Computer Science & Engineering',
    email: 'priya.sharma@satiengg.in',
    avatarInitials: 'PS'
  },
  faculty: {
    id: 'usr_faculty_sati',
    name: 'Prof. (Dr.) Sanjeev Gupta',
    role: 'faculty',
    title: 'Dean (Academics) & Professor, ECE Dept',
    department: 'Electronics & Communication Engineering',
    email: 'dean.academic@satiengg.in',
    avatarInitials: 'SG'
  },
  facilities: {
    id: 'usr_facilities_sati',
    name: 'Er. Ananya Deshmukh',
    role: 'facilities',
    title: 'Chief Utilities & SCADA Engineer',
    department: 'SATI Campus Estate & Maintenance Directorate',
    email: 'utilities@satiengg.in',
    avatarInitials: 'AD'
  },
  administrator: {
    id: 'usr_admin_sati',
    name: 'Prof. (Dr.) Neeraj Kumar Jain',
    role: 'administrator',
    title: 'Director & Executive Head, SATI Vidisha',
    department: 'Secretariat of the Director',
    email: 'director@satiengg.in',
    avatarInitials: 'NJ'
  }
};

export const DEMO_USERS = CAMPUS_USERS;

export const INITIAL_EVENTS: IncidentEvent[] = [
  {
    id: 'evt_001',
    timestamp: '06:15 AM',
    title: 'Sir C.V. Raman Hostel (H-1) Tank T-04 Low Level (<18%)',
    description: 'Ultrasonic telemetry sensor on Overhead Tank T-04 transmitted critical low reserve reading (16.4% reserve / 2,460 L remaining).',
    source: 'SATI Facilities IoT SCADA #IOT-VALVE-T04',
    sourceRecordId: 'REC-SATI-IOT-9942',
    nature: 'observed',
    confidence: 'High',
    confidenceReason: 'Verified hardware sensor telemetry reading across 3 consecutive 60-second ping cycles at Hostel 1 roof.'
  },
  {
    id: 'evt_002',
    timestamp: '06:22 AM',
    title: 'Booster Pump P-02 Thermal Overload Trip in Pump House South',
    description: 'Substation 2 SCADA switchboard registered that Pump P-02 motor circuit breaker tripped at 05:48 AM due to localized thermal coil overload.',
    source: 'SATI Utilities SCADA #SCADA-PUMP-P02',
    sourceRecordId: 'REC-SCADA-012',
    nature: 'observed',
    confidence: 'High',
    confidenceReason: 'Digital switchboard telemetry registers physical relay contact state in trip mode.'
  },
  {
    id: 'evt_003',
    timestamp: '06:30 AM',
    title: 'Residential Risk: 240 Undergraduate Students in C.V. Raman Hostel',
    description: 'Hostel No. 1 domestic washrooms (Rooms 101–320, 240 resident students) draw exclusively from Tank T-04. Morning wake-up draw (07:00–08:30 AM) will exhaust remaining buffer in ~48 minutes.',
    source: 'SATI Spatial Campus GIS #SATI-MAP-H1',
    sourceRecordId: 'SATI-MAP-H1',
    nature: 'possible',
    confidence: 'High',
    confidenceReason: 'Shared plumbing manifold topology and historical morning consumption rate (78 L/min).'
  },
  {
    id: 'evt_004',
    timestamp: '06:38 AM',
    title: 'Academic Dependency: Fluid Dynamics Lab in Mechanical Complex',
    description: 'Room M-204 (ME-301 Applied Fluid Mechanics Practical, 08:30 AM) depends on auxiliary water riser pipe connected to the South pump line for hydraulics bench test.',
    source: 'SATI Academic Timetable Gateway #SATI-SCHED-7721',
    sourceRecordId: 'REC-SATI-SCHED-7721',
    nature: 'possible',
    confidence: 'Medium',
    confidenceReason: 'Syllabus indicates scheduled laboratory experiment requires hydraulic test bench water feed.'
  },
  {
    id: 'evt_005',
    timestamp: '06:45 AM',
    title: 'SATI Estate Maintenance Crew Dispatched to Pump House South',
    description: 'Chief Estate Officer Er. R. S. Rajput authorized on-site physical diagnostic of Pump P-02 electrical contactor and impeller housing.',
    source: 'SATI Helpdesk Work Order Dispatch #WO-SATI-8841',
    sourceRecordId: 'REC-WO-8841',
    nature: 'confirmed',
    confidence: 'High',
    confidenceReason: 'Logged and dispatched by Duty Supervisor Er. Ananya Deshmukh.'
  }
];

export const AFFECTED_ENTITIES: AffectedEntity[] = [
  {
    id: 'ent_hostel_h1',
    name: 'Sir C. V. Raman Boys Hostel (Hostel No. 1)',
    type: 'hostel',
    location: 'North-West Residential Zone, SATI Campus',
    impactLevel: 'Direct',
    note: '240 undergraduate students across 3 residential wings; domestic morning washroom pressure critical.',
    sourceRecord: 'SATI-GIS-H1'
  },
  {
    id: 'ent_tank_t04',
    name: 'Overhead Tank T-04 (15,000 L Reservoir)',
    type: 'asset',
    location: 'Hostel H-1 Roof Level',
    impactLevel: 'Direct',
    note: 'Storage reserve currently at 16.4% capacity (2,460 L). Depletion projected by 07:18 AM at current draw.',
    sourceRecord: 'IOT-VALVE-T04'
  },
  {
    id: 'ent_pump_p02',
    name: 'Booster Pump P-02 (5.5 HP Kirloskar Motor)',
    type: 'asset',
    location: 'Pump House South, Sub-Station 2',
    impactLevel: 'Direct',
    note: 'Tripped on thermal overload relay. Impeller inspection and coil insulation test underway by SATI electricians.',
    sourceRecord: 'SCADA-PUMP-P02'
  },
  {
    id: 'ent_room_a204',
    name: 'Mechanical Complex - Fluid Mechanics Lab (M-204)',
    type: 'room',
    location: 'Mechanical Engineering Complex, Ground Floor',
    impactLevel: 'Probable Secondary',
    note: 'Hydraulic bench washdown relies on shared riser. Practical session may require relocation or dry lab demonstration.',
    sourceRecord: 'SATI-TIMETABLE-M204'
  },
  {
    id: 'ent_class_me301',
    name: 'ME-301: Applied Fluid Mechanics Practical (08:30 AM - 10:00 AM)',
    type: 'activity',
    location: 'Room M-204 (42 Enrolled B.Tech 3rd Year Students)',
    impactLevel: 'Potential',
    note: 'Instructor notified of possible room shift to Kailash Satyarthi Block C-102 or simulation-based substitute.',
    sourceRecord: 'SATI-SIS-COURSE-ME301'
  }
];

export const GRAPH_NODES: GraphNode[] = [
  {
    id: 'node_campus',
    label: 'SATI Vidisha (Central Authority)',
    type: 'campus',
    status: 'info',
    x: 480,
    y: 70,
    description: 'Samrat Ashok Technological Institute (Autonomous), Vidisha. Founded 1960. 85-acre institutional governance.',
    sourceRecord: 'SATI-REGISTRY-1960',
    timestamp: '06:00 AM'
  },
  {
    id: 'node_hostel_h1',
    label: 'Sir C.V. Raman Hostel (H-1)',
    type: 'building',
    status: 'warning',
    x: 230,
    y: 200,
    description: 'Residential hostel housing 240 undergraduate engineering students.',
    sourceRecord: 'SATI-GIS-H1',
    timestamp: '06:15 AM'
  },
  {
    id: 'node_academic_block_a',
    label: 'Kailash Satyarthi Academic Complex',
    type: 'building',
    status: 'info',
    x: 730,
    y: 200,
    description: 'Flagship academic complex honoring Nobel Laureate alumnus Kailash Satyarthi (1974 batch).',
    sourceRecord: 'SATI-GIS-KSB',
    timestamp: '06:00 AM'
  },
  {
    id: 'node_tank_t04',
    label: 'Overhead Tank T-04 (15kL)',
    type: 'asset',
    status: 'alert',
    x: 170,
    y: 350,
    description: '15,000L overhead water reserve serving Sir C.V. Raman Hostel and adjacent lab risers.',
    sourceRecord: 'REC-SATI-IOT-9942',
    timestamp: '06:15 AM'
  },
  {
    id: 'node_pump_p02',
    label: 'Booster Pump P-02 (5.5 HP)',
    type: 'asset',
    status: 'alert',
    x: 350,
    y: 440,
    description: '5.5 HP booster pump located in Pump House South supplying Tank T-04 reservoir.',
    sourceRecord: 'REC-SCADA-012',
    timestamp: '06:22 AM'
  },
  {
    id: 'node_incident_water',
    label: 'Incident INC-2026-084',
    type: 'incident',
    status: 'alert',
    x: 480,
    y: 290,
    description: 'Active event: Low water level at Tank T-04 threatening morning hostel domestic supply and lab benches.',
    sourceRecord: 'SATI-OPS-INC84',
    timestamp: '06:15 AM'
  },
  {
    id: 'node_room_a204',
    label: 'Fluid Mechanics Lab (M-204)',
    type: 'room',
    status: 'warning',
    x: 770,
    y: 350,
    description: 'Fluid Mechanics Laboratory bench in Mechanical Complex requiring water pressure.',
    sourceRecord: 'SATI-SPACE-M204',
    timestamp: '06:38 AM'
  },
  {
    id: 'node_class_me301',
    label: 'ME-301 Morning Practical Session',
    type: 'activity',
    status: 'warning',
    x: 790,
    y: 470,
    description: 'Scheduled practical session: 08:30 AM - 10:00 AM (42 SATI students enrolled).',
    sourceRecord: 'REC-SATI-SCHED-7721',
    timestamp: '06:38 AM'
  }
];

export const GRAPH_LINKS: GraphLink[] = [
  {
    source: 'node_campus',
    target: 'node_hostel_h1',
    label: 'contains facility',
    nature: 'observed',
    reason: 'SATI campus registry establishes Sir C.V. Raman Hostel as residential hall within North-West Zone.',
    sourceRecord: 'SATI-HIERARCHY-01',
    timestamp: '06:00 AM'
  },
  {
    source: 'node_campus',
    target: 'node_academic_block_a',
    label: 'contains building',
    nature: 'observed',
    reason: 'SATI campus registry establishes Kailash Satyarthi Complex as central instructional facility.',
    sourceRecord: 'SATI-HIERARCHY-02',
    timestamp: '06:00 AM'
  },
  {
    source: 'node_hostel_h1',
    target: 'node_tank_t04',
    label: 'supplied by',
    nature: 'observed',
    reason: 'Physical plumbing schematic connects Tank T-04 manifold directly to H-1 riser.',
    sourceRecord: 'CAD-MEP-PLUMB-04',
    timestamp: '06:00 AM'
  },
  {
    source: 'node_pump_p02',
    target: 'node_tank_t04',
    label: 'fills reservoir',
    nature: 'observed',
    reason: 'Underground delivery conduit connects Pump P-02 discharge line to Tank T-04 inlet.',
    sourceRecord: 'CAD-MEP-PUMP-02',
    timestamp: '06:00 AM'
  },
  {
    source: 'node_incident_water',
    target: 'node_tank_t04',
    label: 'origin asset',
    nature: 'observed',
    reason: 'Telemetry sensor on Tank T-04 triggered the primary low-water threshold event.',
    sourceRecord: 'REC-SATI-IOT-9942',
    timestamp: '06:15 AM'
  },
  {
    source: 'node_incident_water',
    target: 'node_pump_p02',
    label: 'root cause candidate',
    nature: 'possible',
    reason: 'Thermal overload trip in P-02 coincides with the failure of tank replenishment during 05:00-06:00 window.',
    sourceRecord: 'REC-SCADA-012',
    timestamp: '06:22 AM'
  },
  {
    source: 'node_tank_t04',
    target: 'node_room_a204',
    label: 'secondary riser feed',
    nature: 'possible',
    reason: 'Secondary pipe run crosses interconnect from H-1 to Mechanical Complex West Wing.',
    sourceRecord: 'SATI-FACILITIES-ANNEX-B',
    timestamp: '06:38 AM'
  },
  {
    source: 'node_academic_block_a',
    target: 'node_room_a204',
    label: 'houses curriculum',
    nature: 'observed',
    reason: 'Department course syllabus coordinates experimental labs between Mechanical Block and Satyarthi Complex.',
    sourceRecord: 'ARCH-FLR-2W',
    timestamp: '06:00 AM'
  },
  {
    source: 'node_room_a204',
    target: 'node_class_me301',
    label: 'scheduled venue',
    nature: 'confirmed',
    reason: 'Dean Academics timetable confirmed Room M-204 booked for ME-301 from 08:30 to 10:00 AM.',
    sourceRecord: 'REC-SATI-SCHED-7721',
    timestamp: '06:38 AM'
  }
];

export const INITIAL_SCENARIO_OPTIONS: ScenarioOption[] = [
  {
    id: 'option_a',
    title: 'Option A: Passive Monitoring & Technician Standby',
    tagline: 'Await on-site electrical technician diagnostic at Pump House South without interim tanker intervention.',
    estimatedReliefTime: '4.5 - 6.0 hrs',
    scheduleImpact: 'High Disruption: 240 hostel students without domestic water; ME-301 lab cancelled on arrival.',
    scheduleImpactSeverity: 'high',
    resourceCost: '₹0 immediate cash spend (High student dissatisfaction & operational disruption)',
    keyAssumptions: [
      'Pump technician completes diagnostic within standard 3-hour window.',
      'No secondary motor winding burn-out requiring workshop rewind.',
      'Residents utilize emergency bottled water supplies.'
    ],
    confidenceLevel: 'Low',
    confidenceReason: 'Dependent on physical technician diagnostic turnaround; vulnerable to severe domestic outages.',
    recommendedReviewTime: '07:30 AM (in 45 mins)',
    recommendedNextStep: 'Log passive monitoring posture; alert hostel warden of potential supply disruption.'
  },
  {
    id: 'option_b',
    title: 'Option B: Academic Class Relocation to Kailash Satyarthi Block C-102',
    tagline: 'Proactively relocate ME-301 to Kailash Satyarthi Hall C-102 while Facilities continues pump restoration.',
    estimatedReliefTime: '2.5 - 3.5 hrs (Hostel domestic relief delayed)',
    scheduleImpact: 'Academic Continuity Preserved: 42 students rerouted via SMS and SATI portal to Room C-102.',
    scheduleImpactSeverity: 'medium',
    resourceCost: '₹0 direct expenditure; administrative room re-allocation',
    keyAssumptions: [
      'Instructor swaps practical lab session with theoretical CFD simulation lecture.',
      'Room C-102 confirmed available between 08:30 - 10:00 AM.',
      'Hostel students tolerate reduced domestic water pressure until 09:30 AM.'
    ],
    confidenceLevel: 'Medium',
    confidenceReason: 'Eliminates academic class cancellation risk, but leaves residential hostel unreplenished.',
    recommendedReviewTime: '07:15 AM (in 30 mins)',
    recommendedNextStep: 'Send room relocation notice to 42 enrolled students and unlock Lecture Hall C-102.'
  },
  {
    id: 'option_c',
    title: 'Option C: Vidisha Municipal Water Tanker + On-Site Pump Reset',
    tagline: 'Dual-track operational response: 10,000L tanker replenishes Tank T-04 while SATI crew resets pump.',
    estimatedReliefTime: '45 - 60 mins',
    scheduleImpact: 'Negligible Disruption: Hostel domestic water restored before morning peak; ME-301 proceeds as scheduled.',
    scheduleImpactSeverity: 'low',
    resourceCost: '₹3,500 Contingency Allocation (Vidisha Municipality Emergency SLA)',
    keyAssumptions: [
      'Vidisha municipal water tanker contractor responds within 45-minute emergency SLA.',
      'Inlet manifold on Tank T-04 accepts direct tanker hose coupling.',
      'Facilities crew completes Pump P-02 breaker reset within 90 minutes.'
    ],
    confidenceLevel: 'High',
    confidenceReason: 'Validated by past precedent INC-2025-019 which achieved 100% service continuity under identical parameters.',
    recommendedReviewTime: '07:00 AM (in 15 mins)',
    recommendedNextStep: 'Authorize tanker procurement voucher and verify Pump House South vehicle access.'
  }
];

export const INITIAL_RECOVERY_ACTIONS: RecoveryAction[] = [
  {
    id: 'act_01',
    title: 'SATI Facilities Physical Diagnostic at Pump House South',
    description: 'Check Pump P-02 breaker contacts, measure winding resistance, and verify thermal reset clearance.',
    assignedRole: 'Chief Utilities & SCADA Engineer',
    sourceSystem: 'SATI Facilities Work Order #WO-SATI-8841',
    completed: true,
    status: 'completed',
    requiresHumanConfirmation: true
  },
  {
    id: 'act_02',
    title: 'Authorize Vidisha Municipal Emergency Tanker Dispatch',
    description: 'Dispatch 10,000 L potable water tanker to Sir C.V. Raman Hostel roof pump manifold under emergency allocation.',
    assignedRole: 'Director & Executive Head, SATI Vidisha',
    sourceSystem: 'SATI ERP Procurement Gateway #ERP-PO-991',
    completed: false,
    status: 'pending',
    requiresHumanConfirmation: true
  },
  {
    id: 'act_03',
    title: 'Broadcast Advisory Notice to C.V. Raman Hostel & ME-301 Class',
    description: 'Broadcast advisory notice on SATI student portal regarding replenishment window; confirm ME-301 lab schedule.',
    assignedRole: 'Dean (Student Welfare) & Chief Warden',
    sourceSystem: 'SATI Campus Broadcast & Portal Service',
    completed: false,
    status: 'pending',
    requiresHumanConfirmation: true
  },
  {
    id: 'act_04',
    title: 'SCADA Telemetry Verification of Tank T-04 Level Recovery (>60%)',
    description: 'Confirm ultrasonic transducer records steady climb past 9,000 L threshold before closing operational alert.',
    assignedRole: 'SCADA Utilities Operator',
    sourceSystem: 'SATI Facilities IoT SCADA Telemetry',
    completed: false,
    status: 'pending',
    requiresHumanConfirmation: true
  },
  {
    id: 'act_05',
    title: 'Post-Incident Closure Review & SATI Knowledge Base Archiving',
    description: 'Archive incident telemetry, log contractor response times, and store root-cause notes in SATI Institutional Archive.',
    assignedRole: 'Director & Executive Head, SATI Vidisha',
    sourceSystem: 'SATI Institutional Operations Archive',
    completed: false,
    status: 'pending',
    requiresHumanConfirmation: true
  }
];

export const INITIAL_AUDIT_TRAIL: AuditEntry[] = [
  {
    id: 'aud_001',
    timestamp: '06:15 AM',
    actor: 'SATI Facilities SCADA Subsystem',
    role: 'facilities',
    action: 'Telemetry Ingested & Alert Generated',
    note: 'Tank T-04 water level registered at 16.4% (<18% critical threshold). Incident INC-2026-084 opened.',
    isAutomatedDecision: false
  },
  {
    id: 'aud_002',
    timestamp: '06:25 AM',
    actor: 'Er. Ananya Deshmukh',
    role: 'facilities',
    action: 'Work Order WO-SATI-8841 Created',
    note: 'Dispatched electrical technician to inspect Pump P-02 thermal trip relay at Substation 2.',
    isAutomatedDecision: false
  },
  {
    id: 'aud_003',
    timestamp: '06:40 AM',
    actor: 'Prof. (Dr.) Neeraj Kumar Jain',
    role: 'administrator',
    action: 'Incident Command Assigned',
    note: 'Assigned incident leadership to Lead Utilities Engineer Er. Ananya Deshmukh; notified Dean Academics Prof. Sanjeev Gupta.',
    isAutomatedDecision: false
  }
];

export const INITIAL_RECOVERY_PLAN: RecoveryPlan = {
  id: 'plan_inc84_01',
  incidentId: 'INC-2026-084',
  selectedOptionId: 'option_c',
  status: 'Draft',
  reviewerName: 'Prof. (Dr.) Neeraj Kumar Jain',
  reviewerRole: 'Director, SATI Vidisha',
  actions: INITIAL_RECOVERY_ACTIONS,
  lastUpdated: '06:45 AM'
};

export const PAST_INCIDENTS: PastIncident[] = [
  {
    id: 'INC-2025-019',
    title: 'Pump P-01 pressure drop during winter morning peak at Visvesvaraya Hostel',
    incidentType: 'Water Utilities / Booster Pump Overload',
    location: 'Sir M. Visvesvaraya Hostel (Hostel No. 2), SATI',
    date: '14 Jan 2025, 06:10 AM',
    observed: 'Visvesvaraya Hostel telemetry reported supply line pressure falling below 1.1 bar during peak morning student hours (06:30 AM). Booster pump tripped on thermal cut-out.',
    staffAction: 'SATI Operations dispatched 10kL Vidisha water tanker within 40 minutes while electrical crew replaced contactor coil.',
    resolution: 'Tanker water maintained continuous domestic supply. Contactor replaced and tested by 08:15 AM. Normal supply restored before academic block labs opened.',
    verifiedOutcome: 'Verified by Chief Warden Dr. Manoj Sharma and Facilities Lead at 08:30 AM. Zero class cancellations.',
    similarityScore: 92,
    similarityRationale: 'Matching factors: Morning peak usage window (06:00-08:00 AM), booster pump thermal overload trip, multi-story student hostel domestic supply risk.',
    matchingFactors: ['Thermal pump overload', 'Hostel morning peak', 'Tank depletion trajectory', 'Dual-track tanker dispatch recovery'],
    detailedEvidence: [
      'Telemetry signature: Level decline rate matched 78 L/min during morning wake-up hours.',
      'Resolution playbook: Dispatching tanker within 45 minutes prevented 100% of student escalations.',
      'Cost incurred: ₹3,200 emergency contractor voucher (audited and approved by Registrar).'
    ]
  },
  {
    id: 'INC-2024-112',
    title: 'Overhead tank float valve bind in Mechanical Engineering Workshop',
    incidentType: 'Water Utilities / Mechanical Float Valve Failure',
    location: 'Mechanical Engineering Complex, SATI',
    date: '22 Aug 2024, 11:20 AM',
    observed: 'Overhead reservoir overflowed into courtyard stormwater drainage due to mechanical float arm binding on calcified pivot joint.',
    staffAction: 'SATI Facilities isolated inlet gate valve within 15 minutes, descaled float linkage, and calibrated sensor zero-point.',
    resolution: 'Mechanical linkage freed and re-greased. Water supply was unaffected because tank remained at 95% volume throughout.',
    verifiedOutcome: 'Verified zero classroom damage; acoustic water-loss log closed.',
    similarityScore: 48,
    similarityRationale: 'Shared domain: Water infrastructure, but failure mode was tank overflow rather than supply exhaustion.',
    matchingFactors: ['Overhead tank asset', 'Plumbing hardware inspection'],
    detailedEvidence: [
      'Telemetry signature: High overflow optical switch tripped.',
      'Resolution playbook: Mechanical de-scaling required, no external tanker required.'
    ]
  },
  {
    id: 'INC-2025-078',
    title: '33kV Substation feeder maintenance during online RGPV semester exams',
    incidentType: 'Electrical Infrastructure / Academic Schedule Conflict',
    location: 'SATI Central Computer Center (CCC-2)',
    date: '18 Oct 2025, 01:30 PM',
    observed: '33kV substation feeder maintenance was scheduled during afternoon slot overlapping with online RGPV examination for 180 SATI students.',
    staffAction: 'SATI timetable correlation detected schedule collision 48 hours in advance. Dual 250kVA diesel generators pre-routed and test-fired.',
    resolution: 'Dual captive diesel generators handled entire load smoothly. Zero server downtime or student test disconnects.',
    verifiedOutcome: 'Verified by SATI Exam Superintendent and Chief Electrical Engineer.',
    similarityScore: 35,
    similarityRationale: 'Shared characteristic: Cross-silo correlation between facility utility maintenance and scheduled academic milestones.',
    matchingFactors: ['Cross-departmental schedule clash', 'Proactive early alert window'],
    detailedEvidence: [
      'Timeline evidence: Cross-referenced RGPV examination timetable against SATI Estate preventive maintenance roster.'
    ]
  }
];

export const STUDENT_JOURNEY_STEPS: StudentJourneyStep[] = [
  {
    id: 'step_admission',
    title: '1. Admission & Program Enrollment (DTE / RGPV MP)',
    status: 'completed',
    description: 'JEE Mains merit entrance allocation verified via DTE Madhya Pradesh counselling.',
    completedDate: 'July 14, 2024'
  },
  {
    id: 'step_prerequisites',
    title: '2. Course Prerequisites Verification',
    status: 'blocked',
    description: 'Transfer credit verification for ME-204 (Fluid Fundamentals) awaiting technical board source certification.',
    blockerDetails: {
      rule: 'SATI Academic Autonomous Regulation 4.2(B): Enrolling in ME-301 requires certified passing marks in prerequisite course ME-204 or equivalent accredited polytechnic transfer record.',
      missingRecord: 'Higher Ed Verification Feed #REC-88219 (State Board of Technical Education transfer credit transcript).',
      nextStepForStudent: 'Your provisional class seat is safely held. Please submit your physical mark sheet or digital DigiLocker verification code at the Academic Registrar counter.',
      verifyingOffice: 'SATI Academic Registrar Verification Desk, Administrative Block Ground Floor, Window 4.',
      plainLanguageNotice: 'We are awaiting the digital transcript confirmation from the state technical board for your prerequisite subject. Your course registration is temporarily on provisional status so our staff can assist in certifying this requirement.',
      officeHours: 'Monday to Friday: 09:30 AM - 04:30 PM',
      deskContact: 'dean.academic@satiengg.in | Extension 104'
    }
  },
  {
    id: 'step_registration',
    title: '3. Semester Course Registration (SATI Autonomous ERP)',
    status: 'in_progress',
    description: 'Enrolled in 5 of 6 semester modules. ME-301 registration pending prerequisite record arrival.'
  },
  {
    id: 'step_learning',
    title: '4. Active Learning & Laboratory Work',
    status: 'upcoming',
    description: 'Continuous internal assessments, laboratory practica, and midterm seminar submissions at SATI.'
  },
  {
    id: 'step_exam',
    title: '5. End-Semester Examination (Autonomous / RGPV)',
    status: 'upcoming',
    description: 'Comprehensive theoretical paper, practical viva voce, and external moderation.'
  },
  {
    id: 'step_completion',
    title: '6. Degree Auditing & Graduation',
    status: 'upcoming',
    description: 'Final credit audit, no-dues clearance, and provisional degree certificate issuance at SATI Convocation.'
  }
];

export const DATA_FEEDS: DataFeedStatus[] = [
  {
    id: 'feed_facilities_iot',
    name: 'SATI Facilities & Utilities SCADA Feed',
    category: 'Sensors & Hardware Telemetry',
    freshness: 'fresh',
    lastHeartbeat: '2 minutes ago (06:48 AM)',
    sampleFrequency: '60 seconds',
    syntheticRecordCount: 1420,
    fallbackManualSOP: 'Facilities duty operator manually logs pressure gauge and tank sight-glass level in logbook every 60 minutes.'
  },
  {
    id: 'feed_room_scheduling',
    name: 'SATI Academic Timetable & Room Allocation Gateway',
    category: 'Campus Scheduling System',
    freshness: 'fresh',
    lastHeartbeat: '5 minutes ago (06:45 AM)',
    sampleFrequency: '15 minutes',
    syntheticRecordCount: 384,
    fallbackManualSOP: 'Dean Academics Office maintains printed master timetable sheet and issues campus broadcast notices for venue relocations.'
  },
  {
    id: 'feed_student_info',
    name: 'SATI Student Information System (ERP)',
    category: 'Academic Records & Enrollment',
    freshness: 'fresh',
    lastHeartbeat: '8 minutes ago (06:42 AM)',
    sampleFrequency: 'Daily batch sync',
    syntheticRecordCount: 3850,
    fallbackManualSOP: 'Student Affairs verification desk inspects physical student identity cards and registration dossiers.'
  },
  {
    id: 'feed_mponline_bte',
    name: 'MPOnline & State Higher Ed Verification Gateway',
    category: 'External Credential Verification',
    freshness: 'stale',
    lastHeartbeat: '42 minutes ago (Network sync delay)',
    sampleFrequency: 'Hourly polling',
    syntheticRecordCount: 42,
    fallbackManualSOP: 'Provisional registration clearance granted with 14-day student affidavit while manual transcript query is processed.'
  }
];
