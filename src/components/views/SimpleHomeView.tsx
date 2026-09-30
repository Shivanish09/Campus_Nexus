import React from 'react';
import { MapPin, Users, GraduationCap, ArrowRight, Search, Waypoints } from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

export const SimpleHomeView: React.FC = () => {
  const { setCurrentSection } = useCampus();
  const choices = [
    { id: 'response_demo' as const, title: 'See how Campus Nexus works', detail: 'Follow one sample campus issue from evidence to a human-reviewed response.', icon: <Waypoints size={25}/>, color: 'bg-purple-100 text-purple-800' },
    { id: 'sati_map' as const, title: 'Find a place', detail: 'See SATI’s institute location and open its official campus photo gallery.', icon: <MapPin size={25}/>, color: 'bg-sky-100 text-sky-800' },
    { id: 'sati_faculty' as const, title: 'Find a person', detail: 'Search the people and office directory, or check official SATI contacts.', icon: <Users size={25}/>, color: 'bg-pink-100 text-pink-800' },
    { id: 'journey' as const, title: 'Student guide', detail: 'See helpful steps for your campus journey.', icon: <GraduationCap size={25}/>, color: 'bg-lime-100 text-lime-900' },
  ];
  return <div className="mx-auto max-w-5xl space-y-8">
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-200 p-7 sm:p-10">
      <p className="mb-2 font-bold uppercase tracking-wide text-orange-950">Samrat Ashok Technological Institute</p>
      <h1 className="max-w-2xl text-3xl font-black leading-tight text-slate-900 sm:text-5xl">Welcome to SATI. Let’s find what you need.</h1>
      <p className="mt-4 max-w-xl text-lg text-slate-800">A simple guide to campus places, people, and student services.</p>
      <button onClick={() => setCurrentSection('sati_map')} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-bold text-white hover:bg-slate-700">Explore the campus <ArrowRight size={18}/></button>
    </section>
    <section><h2 className="mb-4 text-2xl font-extrabold text-slate-900">What are you looking for?</h2><div className="grid gap-4 sm:grid-cols-2">{choices.map(choice => <button key={choice.id} onClick={() => setCurrentSection(choice.id)} className="rounded-2xl border-2 border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-md"><span className={`mb-4 inline-grid h-12 w-12 place-items-center rounded-xl ${choice.color}`}>{choice.icon}</span><h3 className="text-xl font-extrabold">{choice.title}</h3><p className="mt-2 min-h-12 text-slate-600">{choice.detail}</p><span className="mt-4 inline-flex items-center gap-2 font-bold text-orange-700">Open <ArrowRight size={16}/></span></button>)}</div></section>
    <div className="rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50 p-5"><div className="flex items-start gap-3"><Search className="mt-1 text-blue-700"/><div><h2 className="font-bold text-blue-950">Not sure where to start?</h2><p className="text-blue-900">Open the Campus Helper and ask about places, staff, student steps, or how Campus Nexus handles a sample campus issue.</p></div></div></div>
  </div>;
};
