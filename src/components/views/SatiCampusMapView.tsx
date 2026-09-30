import React from 'react';
import { ExternalLink, MapPin, Navigation } from 'lucide-react';

const instituteQuery = encodeURIComponent('Samrat Ashok Technological Institute, Civil Lines, Vidisha, Madhya Pradesh 464001');
export const SatiCampusMapView: React.FC = () => <div className="mx-auto max-w-5xl space-y-6">
  <header className="rounded-3xl bg-gradient-to-r from-sky-400 via-cyan-300 to-lime-200 p-7 sm:p-9">
    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-sm font-bold text-sky-900"><MapPin size={16}/> SATI · Vidisha</div>
    <h1 className="text-3xl font-black sm:text-4xl">Find SATI on the map</h1>
    <p className="mt-2 max-w-2xl text-slate-800">This map shows the institute’s campus location and nearby streets. Building-by-building directions need an official campus plan, so no building pins are shown here.</p>
  </header>
  <section className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-sm">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-4">
      <div><h2 className="font-extrabold">Samrat Ashok Technological Institute</h2><p className="text-sm text-slate-600">Civil Lines, Vidisha, Madhya Pradesh 464001</p></div>
      <a href={`https://www.google.com/maps/search/?api=1&query=${instituteQuery}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 font-bold text-white hover:bg-sky-700"><Navigation size={17}/> Open directions</a>
    </div>
    <iframe title="SATI Vidisha campus location map" src={`https://maps.google.com/maps?q=${instituteQuery}&z=16&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[420px] w-full border-0" />
  </section>
  <section className="grid gap-4 sm:grid-cols-2">
    <a href="https://satiengg.in/" target="_blank" rel="noreferrer" className="rounded-2xl border-2 border-orange-200 bg-orange-50 p-5 hover:bg-orange-100"><h2 className="font-extrabold text-orange-950">SATI official website</h2><p className="mt-1 text-sm text-slate-700">Check official campus information and contacts.</p><span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-orange-800">Visit website <ExternalLink size={15}/></span></a>
    <a href="https://satiengg.in/gallery/photo-gallery/sati" target="_blank" rel="noreferrer" className="rounded-2xl border-2 border-purple-200 bg-purple-50 p-5 hover:bg-purple-100"><h2 className="font-extrabold text-purple-950">Official campus photos</h2><p className="mt-1 text-sm text-slate-700">See campus photographs published by SATI.</p><span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-purple-800">Open photo gallery <ExternalLink size={15}/></span></a>
  </section>
  <p className="text-xs text-slate-500">Map provided by Google Maps. This is an institute location map, not an internal campus navigation plan.</p>
</div>;
