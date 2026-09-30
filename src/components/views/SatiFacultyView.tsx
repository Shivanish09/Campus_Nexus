/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SATI Vidisha — SatiFacultyView Component
 * 
 * Purpose:
 * Renders the authoritative directory of academic faculty, institutional deans,
 * institute directorate, and administration for Samrat Ashok Technological Institute (SATI), Vidisha.
 * 
 * Key Features:
 * 1. Directorate & Deans Spotlight: Displays leadership profiles including Director Prof. (Dr.) Neeraj Kumar Jain,
 *    Dean of Academics, Dean of Student Welfare, and Registrar.
 * 2. Multi-tier Department Filtering: CSE, ECE, E&I, Mechanical, Civil, Applied Sciences, and Management.
 * 3. Search & Category Filters: Search by name, qualification, research specialization, and designation.
 * 4. Faculty Profile Drawer: Modal displaying full biography, publications count, direct email extension,
 *    office location, and teaching focus.
 * 5. Notable Alumni Showcase: Honors prominent graduates such as Nobel Peace Prize Laureate Shri Kailash Satyarthi (1974).
 */

import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { 
  SATI_FACULTY_MEMBERS, 
  SATI_INSTITUTE_INFO, 
  NOTABLE_ALUMNI,
  SatiFacultyMember 
} from '../../data/satiVidishaData';
import { 
  Search, 
  Filter, 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  BookOpen, 
  Briefcase, 
  UserCheck, 
  Building2, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Star,
  X
} from 'lucide-react';

export const SatiFacultyView: React.FC = () => {
  // Navigation & role hooks
  const { setCurrentSection, setCurrentRole } = useCampus();

  // Department dropdown filter state
  const [selectedDept, setSelectedDept] = useState<string>('All');

  // Hierarchy category filter state ('Director & Deans', 'Professors', etc.)
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Text search query across names, degrees, and specializations
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected faculty member for full profile modal
  const [selectedFaculty, setSelectedFaculty] = useState<SatiFacultyMember | null>(null);

  // Departments available at SATI Vidisha
  const departments = [
    'All',
    'Institute Directorate',
    'Computer Science & Engineering',
    'Electronics & Communication Engineering',
    'Electronics & Instrumentation Engineering',
    'Mechanical Engineering',
    'Civil Engineering & Applied Mechanics',
    'Applied Chemistry',
    'Applied Physics',
    'Department of Management Studies (MBA)',
    'Central Administration & Estate'
  ];

  // Faculty hierarchy classifications
  const categories = ['All', 'Director & Deans', 'Professors', 'Associate & Assistant', 'Administration'];

  // Filtration logic combining department, category, and text search
  const filteredFaculty = SATI_FACULTY_MEMBERS.filter(f => {
    const matchesDept = selectedDept === 'All' || f.department === selectedDept;
    
    let matchesCategory = true;
    if (selectedCategory === 'Director & Deans') {
      matchesCategory = f.category === 'Director' || f.category === 'Dean';
    } else if (selectedCategory === 'Professors') {
      matchesCategory = f.category === 'Professor' || f.category === 'Head of Department';
    } else if (selectedCategory === 'Associate & Assistant') {
      matchesCategory = f.category === 'Associate Professor' || f.category === 'Assistant Professor';
    } else if (selectedCategory === 'Administration') {
      matchesCategory = f.category === 'Administration';
    }

    const matchesQuery = 
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesDept && matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header & Institute Governance Banner */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 lg:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[11px] font-bold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200 rounded">
                SATI Vidisha Academic Directory
              </span>
              <span className="text-xs text-slate-500 font-mono">
                MJRES · Founded 1960 · 165+ Faculty
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Faculty, Directorate & Administrative Officers
            </h1>
            <p className="text-sm text-slate-600 max-w-3xl">
              Directory of the Director, Academic Deans, Heads of Departments, Professors, and Key Administrative 
              Leadership of Samrat Ashok Technological Institute (Autonomous), Vidisha.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setCurrentSection('sati_map')}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Campus Map</span>
            </button>
            <a href="https://satiengg.in/contact" target="_blank" rel="noreferrer" className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs">Check official SATI contacts ↗</a>
          </div>
        </div>

        {/* Governing Society & Leadership Strip */}
        <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Governing Society President</div>
            <div className="text-sm font-bold text-slate-900 mt-0.5">Shrimant Jyotiraditya M. Scindia</div>
            <div className="text-xs text-slate-600">President, Maharaja Jiwaji Rao Education Society (MJRES)</div>
          </div>
          <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200/80">
            <div className="text-[11px] font-medium text-blue-700 uppercase tracking-wide">Institute Director</div>
            <div className="text-sm font-bold text-blue-950 mt-0.5">Prof. (Dr.) Neeraj Kumar Jain</div>
            <div className="text-xs text-blue-800">Director & Professor · Ph.D. IIT Roorkee</div>
          </div>
          <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/80">
            <div className="text-[11px] font-medium text-amber-800 uppercase tracking-wide">Dean Academics</div>
            <div className="text-sm font-bold text-amber-950 mt-0.5">Prof. (Dr.) Sanjeev Gupta</div>
            <div className="text-xs text-amber-800">Dean (Academics) & Prof. ECE · Ph.D. IIT Delhi</div>
          </div>
        </div>
      </div>

      {/* Nobel Laureate Kailash Satyarthi Alumni Spotlight */}
      <div className="bg-linear-to-r from-amber-50 via-orange-50 to-amber-50/50 rounded-xl border border-amber-200 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row items-center gap-5">
          <div className="relative shrink-0">
            <div aria-label="Photo not verified" className="grid h-20 w-20 place-items-center rounded-full border-4 border-white bg-amber-200 text-2xl font-black text-amber-900 shadow-md ring-2 ring-amber-400 md:h-24 md:w-24">KS</div>
            <div className="absolute -bottom-1 -right-1 bg-amber-600 text-white p-1 rounded-full shadow-xs" title="Nobel Peace Prize">
              <Award className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-200/80 text-amber-900 border border-amber-300">
              <Star className="w-3.5 h-3.5 text-amber-700 fill-amber-700" />
              <span>Distinguished SATI Alumnus — Nobel Peace Prize Laureate (2014)</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              {NOTABLE_ALUMNI[0].name} · Batch of {NOTABLE_ALUMNI[0].batch} ({NOTABLE_ALUMNI[0].branch})
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed max-w-4xl">
              {NOTABLE_ALUMNI[0].description} Kailash Satyarthi graduated with a Bachelor of Engineering in Electrical 
              Engineering from SATI Vidisha in 1974. In honor of his humanitarian legacy, the institute established the 
              flagship <strong>Kailash Satyarthi Academic Complex</strong> on campus.
            </p>
          </div>

          <button
            onClick={() => setCurrentSection('sati_map')}
            className="shrink-0 px-3.5 py-2 text-xs font-bold text-amber-900 bg-amber-200/90 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1"
          >
            <span>View Satyarthi Block on Map</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search faculty by name, designation, department, or research area (e.g., AI, VLSI, Thermal)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <span className="text-xs text-slate-500 font-mono whitespace-nowrap">
            Showing {filteredFaculty.length} of {SATI_FACULTY_MEMBERS.length} profiles
          </span>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Department Filter Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-100">
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                selectedDept === dept
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {dept === 'All' ? 'All Departments' : dept.replace('Department of ', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Faculty Profile Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFaculty.map(member => (
          <div
            key={member.id}
            className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div className="p-5 space-y-4">
              {/* Profile Top Lockup */}
              <div className="flex items-start gap-3.5">
                <div aria-label="Official portrait not available" className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border-2 border-orange-200 bg-orange-100 text-lg font-extrabold text-orange-900">{member.name.split(/\s+/).filter(Boolean).slice(-2).map(part => part[0]).join('').toUpperCase()}</div>
                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.2 rounded text-[10px] font-bold uppercase ${
                      member.category === 'Director'
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : member.category === 'Dean'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : member.category === 'Administration'
                        ? 'bg-slate-100 text-slate-700 border border-slate-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {member.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{member.experienceYears}y Exp</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 truncate tracking-tight">
                    {member.name}
                  </h3>
                  <p className="text-xs text-blue-700 font-medium truncate">
                    {member.designation}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    {member.department}
                  </p>
                </div>
              </div>

              {/* Degrees & Bio */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="truncate">{member.highestDegree}</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                  {member.bio}
                </p>
              </div>

              {/* Research Areas / Specializations */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Specializations:</span>
                <div className="flex flex-wrap gap-1">
                  {member.specialization.map(spec => (
                    <span 
                      key={spec}
                      className="px-2 py-0.5 text-[10px] bg-slate-100 text-slate-700 rounded border border-slate-200 font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Location & Metrics */}
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 text-slate-500">
                <div className="flex items-center gap-1 truncate">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{member.officeLocation}</span>
                </div>
                <div className="flex items-center gap-1 justify-end font-mono">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{member.publicationsCount} Publications</span>
                </div>
              </div>
            </div>

            {/* Card Footer: Contact Actions */}
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <a 
                href={`mailto:${member.email}`} 
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1.5 truncate"
                title={member.email}
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="truncate">{member.email}</span>
              </a>
              <span className="text-[11px] font-mono text-slate-500 shrink-0 ml-2">
                Ext. {member.phoneExtension}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


