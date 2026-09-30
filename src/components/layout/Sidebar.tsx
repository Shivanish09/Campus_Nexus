import React from 'react';
import { useCampus, NavSection } from '../../context/CampusContext';
import { Home, MapPin, Users, GraduationCap, Waypoints } from 'lucide-react';

const links: { id: NavSection; label: string; icon: React.ReactNode }[] = [
  { id: 'overview', label: 'Home', icon: <Home size={19} /> },
  { id: 'sati_map', label: 'Campus map', icon: <MapPin size={19} /> },
  { id: 'sati_faculty', label: 'People & offices', icon: <Users size={19} /> },
  { id: 'journey', label: 'Student guide', icon: <GraduationCap size={19} /> },
  { id: 'response_demo', label: 'How Campus Nexus works', icon: <Waypoints size={19} /> },
];

export const Sidebar: React.FC<{ mobileOpen: boolean; onCloseMobile: () => void }> = ({ mobileOpen, onCloseMobile }) => {
  const { currentSection, setCurrentSection } = useCampus();
  return <>
    {mobileOpen && <button aria-label="Close menu" onClick={onCloseMobile} className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden" />}
    <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r-2 border-orange-200 p-5 transition-transform lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="mb-8 rounded-2xl bg-orange-100 p-4 text-center"><div className="mx-auto mb-2 grid h-14 w-14 place-items-center rounded-full bg-orange-500 text-xl font-black text-white">S</div><div className="font-bold text-slate-900">SATI Vidisha</div><div className="text-sm text-slate-600">Campus guide</div></div>
      <nav aria-label="Main navigation" className="space-y-2">{links.map(link => <button key={link.id} onClick={() => { setCurrentSection(link.id); onCloseMobile(); }} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-semibold transition ${currentSection === link.id ? 'bg-orange-500 text-white shadow' : 'text-slate-700 hover:bg-yellow-100'}`}>{link.icon}<span>{link.label}</span></button>)}</nav>
      <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-green-50 p-3 text-sm text-green-900"><b>Need a hand?</b><br/>Ask the campus helper any time.</div>
    </aside>
  </>;
};
