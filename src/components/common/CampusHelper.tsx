import React, { useState } from 'react';
import { Bot, X, Send, MapPin, Users, GraduationCap, Waypoints, SlidersHorizontal, History, ClipboardCheck } from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

const prompts = ['How does Nexus work?', 'Compare response options', 'Find a staff member', 'Open the map', 'Student help'];
export const CampusHelper: React.FC = () => {
  const { setCurrentSection, setDemoStep } = useCampus();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('Hi! I can help with the map, people and offices, student steps, or the Campus Nexus walkthrough. What would you like to find?');
  const ask = (text: string) => {
    const q = text.toLowerCase(); setQuestion('');
    if (/compare|scenario|what.?if|option|response choice/.test(q)) {
      setDemoStep('scenarios'); setCurrentSection('response_demo'); setAnswer('The walkthrough compares sample response options and shows their assumptions. These are illustrative choices, not live instructions.');
    } else if (/similar|past|history|memory|previous incident/.test(q)) {
      setDemoStep('memory'); setCurrentSection('response_demo'); setAnswer('The Similar Cases step shows sample past incidents and their recorded outcomes. You can review why a case was matched.');
    } else if (/approve|approval|review plan|recovery|human review/.test(q)) {
      setDemoStep('approval'); setCurrentSection('response_demo'); setAnswer('The Human Review step shows a draft response plan. A person must review and approve actions; this demo does not dispatch anything.');
    } else if (/connect|affected|dependency|graph|relationship/.test(q)) {
      setDemoStep('connections'); setCurrentSection('response_demo'); setAnswer('The Campus Links step shows relationships in the sample data and helps separate observed facts from possible connections.');
    } else if (/nexus|incident|issue|event|how does|walkthrough|demo/.test(q)) {
      setDemoStep('event'); setCurrentSection('response_demo'); setAnswer('Campus Nexus demonstrates a sample issue from its timeline, through campus connections and past cases, to response options and human review. It uses illustrative data, not live campus feeds.');
    } else if (/teacher|faculty|staff|person|office|director|dean|contact/.test(q)) {
      setCurrentSection('sati_faculty'); setAnswer('People & offices lets you search the directory. For verified current contacts, use the official SATI contacts link on that page. Portraits are not shown unless verified.');
    } else if (/map|building|library|hostel|lab|class|location|place|where|photo/.test(q)) {
      setCurrentSection('sati_map'); setAnswer('The map shows SATI’s institute location and nearby streets. Open directions there, or visit SATI’s official campus photo gallery. Internal building pins are not shown because a verified campus plan is not available.');
    } else if (/student|course|academic|journey|help|admission|enrol/.test(q)) {
      setCurrentSection('journey'); setAnswer('The Student Guide shows sample academic steps and common next actions. It does not make eligibility or academic decisions.');
    } else {
      setAnswer('I can help you find the map, people and offices, student guide, or one of the Campus Nexus demo steps: timeline, campus links, similar cases, response choices, and human review.');
    }
  };
  const iconFor = (prompt: string) => /compare/i.test(prompt) ? <SlidersHorizontal className="mr-1 inline" size={13}/> : /staff/i.test(prompt) ? <Users className="mr-1 inline" size={13}/> : /map/i.test(prompt) ? <MapPin className="mr-1 inline" size={13}/> : /student/i.test(prompt) ? <GraduationCap className="mr-1 inline" size={13}/> : <Waypoints className="mr-1 inline" size={13}/>;
  return <>
    <button onClick={() => setOpen(!open)} aria-label={open ? 'Close Campus Helper' : 'Open Campus Helper'} className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-purple-600 px-5 py-4 font-bold text-white shadow-xl hover:bg-purple-700"><Bot size={21}/><span>Campus Helper</span></button>
    {open && <section aria-label="Campus Helper chat" className="fixed bottom-24 right-4 z-50 flex h-[min(540px,75vh)] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border-2 border-purple-200 bg-white shadow-2xl">
      <header className="flex items-center justify-between bg-purple-600 p-4 text-white"><div className="flex items-center gap-2"><Bot/><div><b>Campus Helper</b><div className="text-xs text-purple-100">Ask about campus or Nexus</div></div></div><button onClick={() => setOpen(false)} aria-label="Close"><X/></button></header>
      <div className="flex-1 overflow-y-auto bg-purple-50 p-4"><div className="max-w-[95%] rounded-2xl rounded-tl-sm bg-white p-3 text-sm leading-relaxed text-slate-800 shadow-sm">{answer}</div><div className="mt-4 flex flex-wrap gap-2">{prompts.map(prompt => <button key={prompt} onClick={() => ask(prompt)} className="rounded-full border border-purple-200 bg-white px-3 py-2 text-left text-xs font-bold text-purple-800 hover:bg-purple-100">{iconFor(prompt)}{prompt}</button>)}</div></div>
      <form onSubmit={e => { e.preventDefault(); if(question.trim()) ask(question); }} className="flex gap-2 border-t p-3"><input value={question} onChange={e => setQuestion(e.target.value)} placeholder="Type a question..." className="min-w-0 flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-purple-500"/><button aria-label="Send message" className="rounded-xl bg-purple-600 p-3 text-white hover:bg-purple-700"><Send size={17}/></button></form>
    </section>}
  </>;
};
