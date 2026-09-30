/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SATI Vidisha — Authoritative Institutional Datasets
 * Samrat Ashok Technological Institute (Autonomous), Vidisha (M.P.)
 * 
 * Overview:
 * Founded in 1960 by Late Maharaja Jiwajirao Scindia of Gwalior and managed by the
 * Maharaja Jiwaji Rao Education Society (MJRES), SATI Vidisha spans 85 acres in Civil Lines, Vidisha.
 * 
 * This dataset provides:
 * 1. SATI_INSTITUTE_INFO: Accreditations (NAAC, NBA, AICTE, UGC Autonomous), student and faculty counts.
 * 2. SATI_BUILDINGS: 85-acre spatial coordinates, building names (Hindi & English), zones, floor counts,
 *    square footage, research labs, in-charge faculty, and ground photography.
 * 3. SATI_FACULTY_MEMBERS: Director, Deans, HODs, and professors across engineering, sciences, and administration.
 * 4. NOTABLE_ALUMNI: Prominent figures including Nobel Peace Prize Laureate Shri Kailash Satyarthi (1974).
 * 5. SATI_CAMPUS_ZONES: Campus zone taxonomy and operational color codes.
 */

export interface SatiBuilding {
  id: string;
  name: string;
  hindiName?: string;
  zone: 'Academic' | 'Administrative' | 'Residential' | 'Labs & Workshops' | 'Amenities & Sports';
  establishedYear: number;
  floors: number;
  totalAreaSqFt: string;
  description: string;
  departments: string[];
  keyLabs: string[];
  inCharge: string;
  contactEmail: string;
  image: string;
  status: 'Operational' | 'Active Inspection' | 'Notice';
  statusDetails?: string;
  coordinates: { x: number; y: number }; // percentage on 2D map
}

export interface SatiFacultyMember {
  id: string;
  name: string;
  designation: string;
  category: 'Director' | 'Dean' | 'Head of Department' | 'Professor' | 'Associate Professor' | 'Assistant Professor' | 'Administration';
  department: string;
  highestDegree: string;
  specialization: string[];
  email: string;
  phoneExtension: string;
  officeLocation: string;
  experienceYears: number;
  avatar: string;
  publicationsCount: number;
  bio: string;
}

export interface SatiAlumni {
  name: string;
  batch: string;
  branch: string;
  achievement: string;
  description: string;
  photo: string;
}

export const SATI_INSTITUTE_INFO = {
  fullName: 'Samrat Ashok Technological Institute (Autonomous)',
  abbreviation: 'SATI Vidisha',
  tagline: 'Excellence in Engineering, Innovation & Research Since 1960',
  foundedYear: 1960,
  founder: 'Late Maharaja Jiwajirao Scindia of Gwalior',
  patronPresident: 'Shrimant Jyotiraditya M. Scindia (President, MJRES)',
  director: 'Prof. (Dr.) Neeraj Kumar Jain',
  governingBody: 'Maharaja Jiwaji Rao Education Society (MJRES)',
  campusAreaAcres: 85,
  location: 'Civil Lines, Vidisha, Madhya Pradesh - 464001, India',
  affiliation: 'Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV Bhopal)',
  approvals: ['AICTE New Delhi', 'Autonomous Status by UGC', 'Govt. of Madhya Pradesh (Grant-in-Aid)', 'TEQIP-III World Bank Project'],
  accreditations: 'NBA Accredited Programs, NAAC Accredited',
  totalStudents: 3850,
  totalFaculty: 165,
  programsOffered: [
    'B.Tech Computer Science & Engineering',
    'B.Tech CSE (Artificial Intelligence & Machine Learning)',
    'B.Tech Electronics & Communication Engineering',
    'B.Tech Electronics & Instrumentation',
    'B.Tech Mechanical Engineering',
    'B.Tech Civil Engineering',
    'B.Tech Electrical Engineering',
    'B.Tech Chemical Engineering',
    'M.Tech in 8 Specializations',
    'Master of Computer Applications (MCA)',
    'Master of Business Administration (MBA)',
    'Ph.D. Research Programs'
  ]
};

export const NOTABLE_ALUMNI: SatiAlumni[] = [
  {
    name: 'Shri Kailash Satyarthi',
    batch: '1974',
    branch: 'B.E. Electrical Engineering',
    achievement: 'Nobel Peace Prize Laureate (2014)',
    description: 'Renowned children’s rights activist, founder of Bachpan Bachao Andolan, and recipient of the 2014 Nobel Peace Prize. Studied electrical engineering at SATI Vidisha.',
    photo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Er. V. K. Saraswat (Hon. Fellow)',
    batch: 'Distinguished Associated',
    branch: 'Engineering & Technology',
    achievement: 'Member NITI Aayog & Former Director General DRDO',
    description: 'Frequent mentor and advisor to SATI technological research forums and defense innovation cell.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Dr. Anand Kumar',
    batch: '1988',
    branch: 'B.E. Mechanical Engineering',
    achievement: 'Chief Scientist, ISRO Propulsion Systems',
    description: 'Led liquid rocket stage sensor validation teams for Chandrayaan and Gaganyaan human spaceflight subsystems.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
  }
];

export const SATI_BUILDINGS: SatiBuilding[] = [
  {
    id: 'bld_admin',
    name: 'Main Administrative Block (Heritage 1960)',
    hindiName: 'मुख्य प्रशासनिक भवन',
    zone: 'Administrative',
    establishedYear: 1960,
    floors: 3,
    totalAreaSqFt: '45,000 sq.ft',
    description: 'Historic foundation building erected in 1960. Houses the Secretariat of the Director, Office of the Registrar, Dean Academics, Central Finance, and Council Board Room.',
    departments: ['Director Secretariat', 'Registrar Office', 'Dean Academics', 'Finance & Accounts', 'Council Chambers'],
    keyLabs: ['Central Board Room', 'Executive Video-Conference Suite', 'Confidential Exam Cell'],
    inCharge: 'Er. R. S. Rajput (Administrative Officer)',
    contactEmail: 'registrar@satiengg.in',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    status: 'Operational',
    statusDetails: 'All offices operating normally. Council chamber hosted Academic Council meet.',
    coordinates: { x: 50, y: 35 }
  },
  {
    id: 'bld_kailash_satyarthi',
    name: 'Kailash Satyarthi Academic Complex',
    hindiName: 'कैलाश सत्यार्थी शैक्षणिक संकुल',
    zone: 'Academic',
    establishedYear: 2016,
    floors: 4,
    totalAreaSqFt: '80,000 sq.ft',
    description: 'Flagship academic complex named in honor of SATI alumnus & Nobel Peace Laureate Kailash Satyarthi. Houses advanced lecture auditoriums and smart classrooms.',
    departments: ['Electrical Engineering', 'Applied Sciences', 'Central Lecture Theatres', 'Smart Classroom Wing'],
    keyLabs: ['Advanced Power Systems Lab', 'Renewable Energy R&D Cell', 'Electrical Machines Lab', 'Smart Grid Simulator'],
    inCharge: 'Dr. Sudhir Sharma (Head, EE)',
    contactEmail: 'ee.hod@satiengg.in',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    status: 'Operational',
    statusDetails: 'Full academic timetable active. 42 smart lecture halls in continuous session.',
    coordinates: { x: 38, y: 48 }
  },
  {
    id: 'bld_cse_it',
    name: 'Computer Science & IT Complex',
    hindiName: 'कंप्यूटर विज्ञान एवं सूचना प्रौद्योगिकी भवन',
    zone: 'Academic',
    establishedYear: 1998,
    floors: 3,
    totalAreaSqFt: '52,000 sq.ft',
    description: 'High-tech computing hub housing modern software laboratories, AI/ML Innovation Centre, Cisco Certified Networking Academy, and Cloud Computing facilities.',
    departments: ['Computer Science & Engineering', 'Information Technology', 'MCA Department'],
    keyLabs: ['AI & Deep Learning Lab', 'High Performance Computing Cluster', 'Cisco Network Lab', 'Software Engineering Lab'],
    inCharge: 'Dr. Kanak Saxena (Professor & Head, CSE)',
    contactEmail: 'cse.hod@satiengg.in',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    status: 'Operational',
    statusDetails: 'Gigabit LAN online. 1Gbps NKN leased line operating at 99.98% availability.',
    coordinates: { x: 62, y: 45 }
  },
  {
    id: 'bld_mech_civil',
    name: 'Mechanical & Civil Engineering Complex',
    hindiName: 'यांत्रिकी एवं सिविल अभियांत्रिकी संकुल',
    zone: 'Labs & Workshops',
    establishedYear: 1961,
    floors: 2,
    totalAreaSqFt: '75,000 sq.ft',
    description: 'Sprawling engineering facilities featuring the Heavy Structures Lab, CNC Machining Center, Fluid Mechanics Lab, Heat Transfer Lab, and Central Workshops.',
    departments: ['Mechanical Engineering', 'Civil Engineering & Applied Mechanics'],
    keyLabs: ['Central Mechanical Workshop', 'Fluid Dynamics & Hydraulics Bench', 'Strength of Materials Lab', 'Geotech Soil Testing Lab', 'Robotics & CAD/CAM Center'],
    inCharge: 'Dr. Pankaj Agarwal (Professor & DSW)',
    contactEmail: 'me.hod@satiengg.in',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    status: 'Active Inspection',
    statusDetails: 'Fluid Mechanics Lab bench water line secondary pressure monitored by Facilities team.',
    coordinates: { x: 26, y: 60 }
  },
  {
    id: 'bld_ece_ei',
    name: 'Electronics, Communication & Instrumentation Block',
    hindiName: 'इलेक्ट्रॉनिक्स एवं इंस्ट्रूमेंटेशन भवन',
    zone: 'Academic',
    establishedYear: 1985,
    floors: 3,
    totalAreaSqFt: '48,000 sq.ft',
    description: 'Dedicated building for microelectronics, RF communication, sensor instrumentation, IoT testbeds, and biomedical electronics research.',
    departments: ['Electronics & Communication Engineering', 'Electronics & Instrumentation Engineering'],
    keyLabs: ['VLSI Design Center (Cadence/Synopsys)', 'Embedded Systems & IoT Lab', 'Digital Signal Processing Lab', 'Industrial Process Instrumentation'],
    inCharge: 'Dr. Sanjeev Gupta (Dean Academics & Head, ECE)',
    contactEmail: 'ece.hod@satiengg.in',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    status: 'Operational',
    statusDetails: 'VLSI EDA licenses active. Sensor testbeds operational.',
    coordinates: { x: 74, y: 55 }
  },
  {
    id: 'bld_library',
    name: 'Dr. S. Radhakrishnan Central Library',
    hindiName: 'डॉ. सर्वपल्ली राधाकृष्णन केंद्रीय पुस्तकालय',
    zone: 'Academic',
    establishedYear: 1968,
    floors: 3,
    totalAreaSqFt: '35,000 sq.ft',
    description: 'Knowledge resource centre boasting over 75,000 textbooks, reference volumes, IEEE Xplore, ScienceDirect digital subscriptions, and 24/7 reading halls.',
    departments: ['Library & Information Science', 'Digital Knowledge Resource Centre'],
    keyLabs: ['E-Resource Access Terminal (100 Nodes)', 'Language Lab', 'Reprographic Unit'],
    inCharge: 'Dr. R. C. Sharma (Librarian)',
    contactEmail: 'library@satiengg.in',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
    status: 'Operational',
    statusDetails: 'Digital repository and reading halls open 08:00 AM - 10:00 PM.',
    coordinates: { x: 50, y: 60 }
  },
  {
    id: 'bld_auditorium',
    name: 'Sir M. Visvesvaraya Memorial Auditorium',
    hindiName: 'सर एम. विश्वेश्वरैया स्मृति सभागार',
    zone: 'Amenities & Sports',
    establishedYear: 1982,
    floors: 2,
    totalAreaSqFt: '28,000 sq.ft',
    description: 'Premier air-conditioned collegiate auditorium with a seating capacity of 1,200, acoustic treatment, stage lighting, and attached Open Air Theatre (OAT).',
    departments: ['Cultural Affairs', 'Student Affairs Committee', 'Training & Placement Cell'],
    keyLabs: ['Audio-Visual Control Booth', 'Rehearsal Rooms', 'Green Rooms'],
    inCharge: 'Prof. D. K. Shakya (Cultural Convenor)',
    contactEmail: 'events@satiengg.in',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    status: 'Operational',
    statusDetails: 'Prepped for upcoming National Conference on Sustainable Computing.',
    coordinates: { x: 42, y: 75 }
  },
  {
    id: 'bld_hostel_cv_raman',
    name: 'Sir C. V. Raman Boys Hostel (Hostel No. 1)',
    hindiName: 'सर सी. वी. रमन छात्र छात्रावास (हॉस्टल 1)',
    zone: 'Residential',
    establishedYear: 1963,
    floors: 3,
    totalAreaSqFt: '58,000 sq.ft',
    description: 'Primary undergraduate residential hall accommodating 240 engineering students with attached mess, recreation hall, reading room, and sports yard.',
    departments: ['Hostel Administration', 'Mess Operations'],
    keyLabs: ['Student Study Common Room', 'Gymnasium Unit', 'Wi-Fi Recreation Lounge'],
    inCharge: 'Dr. Manoj Sharma (Chief Warden)',
    contactEmail: 'warden.h1@satiengg.in',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
    status: 'Notice',
    statusDetails: 'Overhead Tank T-04 level under active replenishment protocol INC-2026-084.',
    coordinates: { x: 18, y: 35 }
  },
  {
    id: 'bld_hostel_kalpana',
    name: 'Kalpana Chawla Girls Hostel',
    hindiName: 'कल्पना चावला छात्रा छात्रावास',
    zone: 'Residential',
    establishedYear: 2004,
    floors: 4,
    totalAreaSqFt: '45,000 sq.ft',
    description: 'Secure, modern residential complex for 200 female engineering undergraduates with 24/7 security surveillance, solar water heaters, and fitness center.',
    departments: ['Women Student Welfare', 'Hostel Advisory'],
    keyLabs: ['Computer Room', 'Indoor Badminton Court', 'Dining Hall'],
    inCharge: 'Dr. Archana Saxena (Girls Hostel Warden)',
    contactEmail: 'warden.girls@satiengg.in',
    image: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=1200&q=80',
    status: 'Operational',
    statusDetails: 'Solar heating and domestic water lines nominal at 100% capacity.',
    coordinates: { x: 82, y: 35 }
  },
  {
    id: 'bld_sports_stadium',
    name: 'SATI Sports Stadium & Pavilion',
    hindiName: 'सती खेल मैदान एवं स्टेडियम',
    zone: 'Amenities & Sports',
    establishedYear: 1970,
    floors: 1,
    totalAreaSqFt: '120,000 sq.ft',
    description: 'Standard 400m athletic track, turf cricket pitch, football field, basketball courts, and indoor sports hall hosting inter-collegiate RGPV tournaments.',
    departments: ['Department of Physical Education', 'NSS & NCC Units'],
    keyLabs: ['Sports Physiotherapy Clinic', 'Weight Training Gym', 'Equipment Armory'],
    inCharge: 'Dr. V. P. Singh (Sports Director)',
    contactEmail: 'sports@satiengg.in',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    status: 'Operational',
    statusDetails: 'Grounds prepared for RGPV Nodal Football Championship.',
    coordinates: { x: 75, y: 80 }
  },
  {
    id: 'bld_gate_circle',
    name: 'Scindia Statue & Main Campus Entrance',
    hindiName: 'सिंधिया प्रतिमा एवं मुख्य प्रवेश द्वार',
    zone: 'Administrative',
    establishedYear: 1960,
    floors: 1,
    totalAreaSqFt: '12,000 sq.ft',
    description: 'Landmark campus entrance on Civil Lines NH-86, featuring the bronze statue of founder Maharaja Jiwajirao Scindia, visitor reception, and security checkpoint.',
    departments: ['Campus Security Force', 'Visitor Protocol Desk'],
    keyLabs: ['Central CCTV Monitoring Station', 'Vehicle Access Boom Barrier Control'],
    inCharge: 'Col. K. S. Rathore (Retd. - Chief Security Officer)',
    contactEmail: 'security@satiengg.in',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=80',
    status: 'Operational',
    statusDetails: 'Automated ANPR vehicle barriers active; guest logging streamlined.',
    coordinates: { x: 50, y: 15 }
  },
  {
    id: 'bld_utilities_solar',
    name: 'Central Utilities, Substation & 250 kWp Solar Plant',
    hindiName: 'केंद्रीय विद्युत उपकेंद्र एवं सौर ऊर्जा संयंत्र',
    zone: 'Labs & Workshops',
    establishedYear: 2018,
    floors: 1,
    totalAreaSqFt: '30,000 sq.ft',
    description: 'Institutional green energy grid: 11kV HT switchyard, dual 500kVA transformers, captive DG generators, and 250 kWp rooftop solar photovoltaic array.',
    departments: ['Electrical Maintenance Wing', 'SCADA Energy Monitoring Cell'],
    keyLabs: ['SCADA Operations Room', 'Battery Storage Bank', 'Water Treatment Filtration House'],
    inCharge: 'Er. Ananya Deshmukh (Lead Utilities Engineer)',
    contactEmail: 'utilities@satiengg.in',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    status: 'Operational',
    statusDetails: 'Solar generating 184 kW. Grid feed synchronized at 50.02 Hz.',
    coordinates: { x: 18, y: 75 }
  }
];

export const SATI_FACULTY_MEMBERS: SatiFacultyMember[] = [
  // Leadership & Administration
  {
    id: 'fac_dir_01',
    name: 'Prof. (Dr.) Neeraj Kumar Jain',
    designation: 'Director & Professor',
    category: 'Director',
    department: 'Institute Directorate',
    highestDegree: 'Ph.D. (IIT Roorkee), M.Tech',
    specialization: ['Institutional Governance', 'Structural Mechanics', 'Earthquake Resistant Structures'],
    email: 'director@satiengg.in',
    phoneExtension: '101',
    officeLocation: 'Administrative Block, Director Chamber, Room 101',
    experienceYears: 32,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    publicationsCount: 68,
    bio: 'Oversees SATI Vidisha academic autonomy, strategic R&D expansion, NIRF rankings, and industry partnerships. Pioneered modern accreditation standards across M.P.'
  },
  {
    id: 'fac_dean_acad',
    name: 'Prof. (Dr.) Sanjeev Gupta',
    designation: 'Dean (Academics) & Professor',
    category: 'Dean',
    department: 'Electronics & Communication Engineering',
    highestDegree: 'Ph.D., M.Tech (IIT Delhi)',
    specialization: ['Digital Signal Processing', 'Wireless Communications', 'Academic Curriculum Design'],
    email: 'dean.academic@satiengg.in',
    phoneExtension: '103',
    officeLocation: 'Administrative Block, Room 108 / ECE Block 204',
    experienceYears: 28,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    publicationsCount: 54,
    bio: 'Heads SATI academic curriculum revisions under NEP-2020, RGPV board of studies coordination, and OBE (Outcome Based Education) NBA compliance.'
  },
  {
    id: 'fac_dean_dsw',
    name: 'Dr. Pankaj Agarwal',
    designation: 'Dean (Student Welfare) & Professor',
    category: 'Dean',
    department: 'Mechanical Engineering',
    highestDegree: 'Ph.D. (MANIT Bhopal), M.E.',
    specialization: ['Thermal Engineering', 'Fluid Power Systems', 'Renewable Energy Systems'],
    email: 'dsw@satiengg.in',
    phoneExtension: '105',
    officeLocation: 'Mechanical Engineering Complex, Room M-104',
    experienceYears: 26,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    publicationsCount: 42,
    bio: 'Responsible for student welfare, hostel administration, disciplinary councils, scholarships, cultural fests (Samrat Utsav), and student technical clubs.'
  },
  {
    id: 'fac_dean_pd',
    name: 'Dr. Rajeev Jain',
    designation: 'Dean (Planning & Development) & Professor',
    category: 'Dean',
    department: 'Civil Engineering & Applied Mechanics',
    highestDegree: 'Ph.D. (IIT Roorkee), M.Tech',
    specialization: ['Concrete Technology', 'Structural Dynamics', 'Campus Infrastructure Planning'],
    email: 'dean.pd@satiengg.in',
    phoneExtension: '106',
    officeLocation: 'Civil Engineering Block, Room C-102',
    experienceYears: 29,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    publicationsCount: 61,
    bio: 'Directs physical campus master plans, TEQIP-III civil grants, modernization of laboratory wings, and green campus sustainability initiatives.'
  },
  {
    id: 'fac_dean_rd',
    name: 'Dr. Kanak Saxena',
    designation: 'Dean (Research & Consultancy) & Professor',
    category: 'Dean',
    department: 'Computer Science & Engineering',
    highestDegree: 'Ph.D. (Computer Applications)',
    specialization: ['Cloud Computing', 'Distributed Database Systems', 'Cyber Security'],
    email: 'dean.research@satiengg.in',
    phoneExtension: '107',
    officeLocation: 'CSE Complex, Second Floor, Room CS-201',
    experienceYears: 27,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    publicationsCount: 88,
    bio: 'Heads R&D consultancy cells, sponsored research projects from DST, AICTE, and CSIR, patent filings, and PhD doctoral research committee at SATI.'
  },
  {
    id: 'fac_admin_reg',
    name: 'Er. R. S. Rajput',
    designation: 'Registrar & Chief Estate Officer',
    category: 'Administration',
    department: 'Central Administration & Estate',
    highestDegree: 'B.E. (Civil), PGD-HRM',
    specialization: ['Public Administration', 'Campus Estate Operations', 'Service Regulations'],
    email: 'registrar@satiengg.in',
    phoneExtension: '102',
    officeLocation: 'Administrative Block, Ground Floor, Room 10',
    experienceYears: 24,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    publicationsCount: 8,
    bio: 'Directs statutory compliance, human resources, non-teaching staff operations, legal matters, and campus estate maintenance protocols.'
  },

  // Computer Science & Engineering
  {
    id: 'fac_cse_02',
    name: 'Dr. Shailendra Shrivastava',
    designation: 'Professor',
    category: 'Professor',
    department: 'Computer Science & Engineering',
    highestDegree: 'Ph.D. (Computer Science)',
    specialization: ['Data Mining', 'Machine Learning', 'Artificial Intelligence'],
    email: 's.shrivastava@satiengg.in',
    phoneExtension: '211',
    officeLocation: 'CSE Complex, Room CS-205',
    experienceYears: 22,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    publicationsCount: 46,
    bio: 'Leading AI research group at SATI. Mentors undergraduate capstone projects in deep neural networks and NLP.'
  },
  {
    id: 'fac_cse_03',
    name: 'Prof. D. K. Shakya',
    designation: 'Associate Professor',
    category: 'Associate Professor',
    department: 'Computer Science & Engineering',
    highestDegree: 'M.Tech (CSE), Ph.D. (Pursuing)',
    specialization: ['Network Security', 'Cryptography', 'Cloud Virtualization'],
    email: 'dkshakya@satiengg.in',
    phoneExtension: '213',
    officeLocation: 'CSE Complex, Room CS-112',
    experienceYears: 18,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
    publicationsCount: 29,
    bio: 'Coordinates campus-wide networking backbone, Cisco Academy lab courses, and annual hackathon competitions.'
  },
  {
    id: 'fac_cse_04',
    name: 'Prof. Shailendra Goswami',
    designation: 'Associate Professor',
    category: 'Associate Professor',
    department: 'Computer Science & Engineering',
    highestDegree: 'M.Tech, Ph.D. (Pursuing)',
    specialization: ['Computer Graphics', 'Operating Systems', 'Algorithmic Optimization'],
    email: 'sgoswami@satiengg.in',
    phoneExtension: '215',
    officeLocation: 'CSE Complex, Room CS-109',
    experienceYears: 16,
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80',
    publicationsCount: 21,
    bio: 'Specialist in compiler design and parallel computing algorithms. Member of institute examination evaluation board.'
  },
  {
    id: 'fac_cse_05',
    name: 'Er. Sachin Verma',
    designation: 'Assistant Professor',
    category: 'Assistant Professor',
    department: 'Computer Science & Engineering',
    highestDegree: 'M.Tech (CSE, NIT)',
    specialization: ['Full-Stack Development', 'Mobile Systems', 'Cloud Native Architecture'],
    email: 'sachin.verma@satiengg.in',
    phoneExtension: '218',
    officeLocation: 'CSE Complex, Room CS-106',
    experienceYears: 8,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    publicationsCount: 12,
    bio: 'Lead coordinator for SATI Developer Student Club. Mentors student startups incubated under SATI Innovation Cell.'
  },

  // Electronics & Communication / Instrumentation
  {
    id: 'fac_ece_02',
    name: 'Dr. Alok Jain',
    designation: 'Professor',
    category: 'Professor',
    department: 'Electronics & Communication Engineering',
    highestDegree: 'Ph.D., M.Tech (MANIT)',
    specialization: ['VLSI Design', 'Microelectronic Circuits', 'Semiconductor Devices'],
    email: 'alok.jain@satiengg.in',
    phoneExtension: '232',
    officeLocation: 'ECE Block, Room EC-208',
    experienceYears: 24,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    publicationsCount: 39,
    bio: 'Principal Investigator for Ministry of Electronics and IT (MeitY) sponsored chip-design laboratory program.'
  },
  {
    id: 'fac_ece_03',
    name: 'Dr. Ashish Verma',
    designation: 'Associate Professor',
    category: 'Associate Professor',
    department: 'Electronics & Communication Engineering',
    highestDegree: 'Ph.D. (IIT BHU), M.Tech',
    specialization: ['Antenna & Wave Propagation', 'Electromagnetic Metamaterials', '5G Technologies'],
    email: 'ashish.verma@satiengg.in',
    phoneExtension: '235',
    officeLocation: 'ECE Block, Room EC-214',
    experienceYears: 15,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    publicationsCount: 33,
    bio: 'Author of 3 international book chapters on microstrip antennas; recipient of Young Scientist Fellowship.'
  },
  {
    id: 'fac_ece_04',
    name: 'Prof. Praveen Kapse',
    designation: 'Assistant Professor',
    category: 'Assistant Professor',
    department: 'Electronics & Instrumentation Engineering',
    highestDegree: 'M.Tech (Instrumentation)',
    specialization: ['Industrial Process Control', 'PLC & SCADA Systems', 'Biomedical Sensors'],
    email: 'pkapse@satiengg.in',
    phoneExtension: '241',
    officeLocation: 'EI Block, Room EI-105',
    experienceYears: 11,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    publicationsCount: 16,
    bio: 'In-charge of Campus Utilities SCADA calibration and sensor instrumentation validation testbenches.'
  },

  // Mechanical Engineering
  {
    id: 'fac_me_02',
    name: 'Dr. Manoj Sharma',
    designation: 'Professor & Chief Warden',
    category: 'Professor',
    department: 'Mechanical Engineering',
    highestDegree: 'Ph.D. (MANIT), M.E.',
    specialization: ['Robotics', 'CAD/CAM/CIM', 'Rapid Prototyping & 3D Printing'],
    email: 'm.sharma@satiengg.in',
    phoneExtension: '252',
    officeLocation: 'Mechanical Engineering Block, Room M-202',
    experienceYears: 23,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    publicationsCount: 35,
    bio: 'Manages SATI Advanced CNC machining cell and serves as Chief Warden of collegiate residential halls.'
  },
  {
    id: 'fac_me_03',
    name: 'Dr. Yogesh Shrivastava',
    designation: 'Associate Professor',
    category: 'Associate Professor',
    department: 'Mechanical Engineering',
    highestDegree: 'Ph.D. (IIT Indore), M.Tech',
    specialization: ['Vibration Analysis', 'Condition Monitoring', 'Non-Destructive Testing'],
    email: 'yshrivastava@satiengg.in',
    phoneExtension: '256',
    officeLocation: 'Mechanical Engineering Block, Room M-210',
    experienceYears: 14,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
    publicationsCount: 27,
    bio: 'Expert in rotary pump acoustics and mechanical condition monitoring; leads facility fault-detection forensics.'
  },

  // Civil Engineering
  {
    id: 'fac_ce_02',
    name: 'Dr. Pramod Sharma',
    designation: 'Professor',
    category: 'Professor',
    department: 'Civil Engineering & Applied Mechanics',
    highestDegree: 'Ph.D., M.E. (Geotechnical)',
    specialization: ['Soil Mechanics', 'Foundation Engineering', 'Ground Improvement Techniques'],
    email: 'psharma@satiengg.in',
    phoneExtension: '272',
    officeLocation: 'Civil Engineering Block, Room C-204',
    experienceYears: 25,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    publicationsCount: 38,
    bio: 'Lead consultant for Madhya Pradesh state highway soil testing and bridge foundation assessments.'
  },
  {
    id: 'fac_ce_03',
    name: 'Dr. R. N. Khare',
    designation: 'Associate Professor',
    category: 'Associate Professor',
    department: 'Civil Engineering & Applied Mechanics',
    highestDegree: 'Ph.D. (Hydrology), M.Tech',
    specialization: ['Water Resources Engineering', 'Hydraulic Structures', 'GIS Watershed Modeling'],
    email: 'rnkhare@satiengg.in',
    phoneExtension: '275',
    officeLocation: 'Civil Engineering Block, Room C-209',
    experienceYears: 20,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    publicationsCount: 24,
    bio: 'Advisor to Vidisha Betwa river basin water management committee and SATI campus rain harvesting projects.'
  },

  // Applied Sciences & Humanities
  {
    id: 'fac_sci_01',
    name: 'Dr. Archana Saxena',
    designation: 'Professor & Head',
    category: 'Head of Department',
    department: 'Applied Chemistry',
    highestDegree: 'Ph.D. (Chemistry)',
    specialization: ['Environmental Chemistry', 'Water Quality Remediation', 'Corrosion Inhibitors'],
    email: 'asaxena@satiengg.in',
    phoneExtension: '281',
    officeLocation: 'Applied Sciences Wing, Room AS-102',
    experienceYears: 24,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    publicationsCount: 45,
    bio: 'Heads collegiate drinking water purity assay laboratory and Kalpana Chawla Girls Hostel management.'
  },
  {
    id: 'fac_sci_02',
    name: 'Dr. Rajesh Kumar',
    designation: 'Professor & Head',
    category: 'Head of Department',
    department: 'Applied Physics',
    highestDegree: 'Ph.D. (IIT Delhi), M.Sc.',
    specialization: ['Solid State Physics', 'Nanomaterials', 'Solar Photovoltaic Thin Films'],
    email: 'rkumar@satiengg.in',
    phoneExtension: '284',
    officeLocation: 'Applied Sciences Wing, Room AS-204',
    experienceYears: 21,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    publicationsCount: 52,
    bio: 'Conducts characterization of solar cell coatings in conjunction with SATI 250 kWp solar farm.'
  },

  // Management Studies & MCA
  {
    id: 'fac_mba_01',
    name: 'Dr. Gourav Shrivastava',
    designation: 'Associate Professor & Head',
    category: 'Head of Department',
    department: 'Department of Management Studies (MBA)',
    highestDegree: 'Ph.D. (Management), MBA',
    specialization: ['Operations Research', 'Strategic Management', 'Technology Entrepreneurship'],
    email: 'mba.hod@satiengg.in',
    phoneExtension: '291',
    officeLocation: 'Management Block, Room MB-101',
    experienceYears: 17,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    publicationsCount: 31,
    bio: 'Directs SATI Incubation Center, corporate placement training sessions, and student startup mentor networks.'
  }
];

export const SATI_CAMPUS_ZONES = [
  { id: 'zone_academic', name: 'Academic Zone', desc: 'Classrooms, Lecture Halls & Central Library' },
  { id: 'zone_admin', name: 'Administrative Zone', desc: 'Director Office, Registrar & Board Chambers' },
  { id: 'zone_labs', name: 'Labs & Workshops', desc: 'Central Workshops, Heavy Structures & SCADA' },
  { id: 'zone_residential', name: 'Residential Hostels', desc: 'Undergraduate & PG Student Halls' },
  { id: 'zone_amenities', name: 'Sports & Amenities', desc: 'Stadium, Auditorium & Student Activity Center' }
];
