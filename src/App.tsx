import React, { useState } from 'react';
import { CampusProvider, useCampus } from './context/CampusContext';
import { Sidebar } from './components/layout/Sidebar';
import { SimpleHomeView } from './components/views/SimpleHomeView';
import { SatiCampusMapView } from './components/views/SatiCampusMapView';
import { SatiFacultyView } from './components/views/SatiFacultyView';
import { StudentJourneyView } from './components/views/StudentJourneyView';
import { CampusNexusDemoView } from './components/views/CampusNexusDemoView';
import { CampusHelper } from './components/common/CampusHelper';
import { Menu } from 'lucide-react';

const labels = { overview: 'Home', sati_map: 'Campus map', sati_faculty: 'People & offices', journey: 'Student guide', response_demo: 'How Campus Nexus works' } as const;
const MainContent: React.FC = () => {
  const { currentSection } = useCampus();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const page = currentSection === 'sati_map' ? <SatiCampusMapView /> : currentSection === 'sati_faculty' ? <SatiFacultyView /> : currentSection === 'journey' ? <StudentJourneyView /> : currentSection === 'response_demo' ? <CampusNexusDemoView /> : <SimpleHomeView />;
  return <div className="min-h-screen bg-amber-50/60 text-slate-900">
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b-2 border-orange-200 bg-white px-4 shadow-sm lg:hidden">
      <button onClick={() => setMobileMenuOpen(true)} aria-label="Open navigation" className="rounded-lg bg-orange-100 p-2"><Menu/></button><b className="text-lg">SATI Campus Guide</b>
    </header>
    <Sidebar mobileOpen={mobileMenuOpen} onCloseMobile={() => setMobileMenuOpen(false)} />
    <main className="min-h-screen px-4 py-6 sm:px-7 lg:ml-64 lg:px-10 lg:py-9"><div className="mx-auto mb-6 hidden max-w-5xl text-sm font-semibold text-slate-500 lg:block">SATI Campus Guide <span className="mx-2 text-orange-500">›</span><span className="text-slate-800">{labels[currentSection as keyof typeof labels] || 'Home'}</span></div>{page}<footer className="mx-auto mt-12 max-w-5xl border-t border-orange-200 py-5 text-center text-sm text-slate-500">Samrat Ashok Technological Institute · Vidisha, Madhya Pradesh</footer></main>
    <CampusHelper />
  </div>;
};
export default function App() { return <CampusProvider><MainContent /></CampusProvider>; }

