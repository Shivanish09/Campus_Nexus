import React from 'react';
import { useCampus } from '../../context/CampusContext';
import { IncidentsView } from './IncidentsView';
import { CampusGraphView } from './CampusGraphView';
import { InstitutionalMemoryView } from './InstitutionalMemoryView';
import { SimulatorView } from './SimulatorView';
import { RecoveryPlanView } from './RecoveryPlanView';
import { AlertTriangle, Network, History, SlidersHorizontal, ClipboardCheck, ArrowLeft, ArrowRight } from 'lucide-react';

const steps = [
  { id: 'event', title: '1. See the issue', short: 'Incident evidence', icon: <AlertTriangle size={17}/>, help: 'Review the sample event and its timeline.' },
  { id: 'connections', title: '2. See connections', short: 'Campus links', icon: <Network size={17}/>, help: 'Explore which places and services may be connected.' },
  { id: 'memory', title: '3. Learn from history', short: 'Similar cases', icon: <History size={17}/>, help: 'Review earlier sample incidents and recorded outcomes.' },
  { id: 'scenarios', title: '4. Compare options', short: 'What-if choices', icon: <SlidersHorizontal size={17}/>, help: 'Compare response options and the assumptions behind them.' },
  { id: 'approval', title: '5. Human review', short: 'Plan and recovery', icon: <ClipboardCheck size={17}/>, help: 'A person reviews the draft before any action is marked approved.' },
] as const;

type StepId = typeof steps[number]['id'];
export const CampusNexusDemoView: React.FC = () => {
  const { demoStep, setDemoStep } = useCampus();
  const index = steps.findIndex(step => step.id === demoStep);
  const current = steps[index] || steps[0];
  const goTo = (step: StepId) => setDemoStep(step);
  const view = demoStep === 'connections' ? <CampusGraphView /> : demoStep === 'memory' ? <InstitutionalMemoryView /> : demoStep === 'scenarios' ? <SimulatorView /> : demoStep === 'approval' ? <RecoveryPlanView /> : <IncidentsView />;
  return <div className="mx-auto max-w-6xl space-y-6">
    <header className="rounded-3xl bg-gradient-to-r from-purple-500 via-indigo-400 to-sky-300 p-6 text-white sm:p-8">
      <p className="mb-2 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-bold">A Campus Nexus walkthrough</p>
      <h1 className="text-3xl font-black sm:text-4xl">From campus signal to reviewed response</h1>
      <p className="mt-2 max-w-3xl text-white/95">See how one sample issue can connect evidence, campus services, earlier cases, possible responses, and human review.</p>
      <p className="mt-4 rounded-xl bg-slate-950/25 p-3 text-sm"><b>Fictional demonstration:</b> sample operational details on this page are illustrative. This demo is not connected to live campus sensors or dispatch systems.</p>
    </header>
    <nav aria-label="Campus Nexus walkthrough steps" className="grid gap-2 sm:grid-cols-2 xl:grid-cols-5">{steps.map((step, i) => <button key={step.id} onClick={() => goTo(step.id)} aria-current={step.id === demoStep ? 'step' : undefined} className={`rounded-xl border-2 p-3 text-left transition ${step.id === demoStep ? 'border-purple-500 bg-purple-50 text-purple-950 shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-purple-200'}`}><div className="flex items-center gap-2 font-bold">{step.icon}<span>{step.title}</span></div><div className="mt-1 text-xs opacity-80">{step.help}</div></button>)}</nav>
    <section className="rounded-xl border border-purple-200 bg-purple-50 px-4 py-3 text-sm text-purple-950"><b>{current.short}:</b> {current.help} Step {index + 1} of {steps.length}.</section>
    <div className="rounded-2xl border-2 border-slate-200 bg-white p-3 shadow-sm sm:p-5">{view}</div>
    <div className="flex items-center justify-between gap-3"><button disabled={index <= 0} onClick={() => goTo(steps[index - 1].id)} className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-4 py-2 font-bold text-slate-700 disabled:opacity-40"><ArrowLeft size={17}/> Previous</button><span className="hidden text-sm text-slate-500 sm:block">You can also jump to any step above.</span><button disabled={index >= steps.length - 1} onClick={() => goTo(steps[index + 1].id)} className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 font-bold text-white hover:bg-purple-700 disabled:opacity-40">Next <ArrowRight size={17}/></button></div>
  </div>;
};
