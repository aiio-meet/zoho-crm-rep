import React from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  LayoutList, 
  Columns, 
  Clock, 
  Calendar, 
  MoreHorizontal, 
  ChevronDown,
  Plus,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Task {
  id: string;
  title: string;
  date: string;
  priority: 'High' | 'Normal' | 'Low';
  owner: string;
  assignee?: string;
  project: string;
}

const syntheticTasks: Record<string, { count: number; tasks: Task[] }> = {
  'Not Started': {
    count: 235,
    tasks: [
      { id: '1', title: 'Synthetische Analyse', date: '03.03.2026', priority: 'High', owner: 'Max Mustermann', assignee: 'Erika Musterfrau', project: 'Projekt Alpha' },
      { id: '2', title: 'Dokumentation prüfen', date: '11.03.2026', priority: 'High', owner: 'Max Mustermann', project: 'Internes Audit' },
      { id: '3', title: 'Feedback einholen', date: '03.03.2026', priority: 'High', owner: 'Max Mustermann', project: 'Kundenumfrage' },
    ]
  },
  'Deferred': {
    count: 0,
    tasks: []
  },
  'In Progress': {
    count: 23,
    tasks: [
      { id: '4', title: 'Entwicklungs-Sprint 4', date: '14.11.2025', priority: 'High', owner: 'Lars Planer', project: 'Web-App Redesign' },
      { id: '5', title: 'API Integration', date: '15.10.2025', priority: 'High', owner: 'Lars Planer', project: 'Cloud Sync' },
    ]
  },
  'Completed': {
    count: 1802,
    tasks: [
      { id: '6', title: 'Kickoff Meeting', date: '25.02.2026', priority: 'Normal', owner: 'Henriette Schulz', project: 'Global Rollout' },
      { id: '7', title: 'Anforderungs-Workshop', date: '23.02.2026', priority: 'High', owner: 'Max Mustermann', project: 'Neukunden-Onboarding' },
    ]
  }
};

const AufgabenComponent: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-[#f3f4f6] overflow-hidden">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-slate-800">Aufgaben</h1>
          <div className="flex items-center gap-2">
            <div className="flex rounded border border-slate-300 overflow-hidden">
              <button className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium">Aufgabe erstellen</button>
              <button className="px-2 py-1.5 bg-blue-600 text-white border-l border-blue-500">
                <ChevronDown size={14} />
              </button>
            </div>
            <button className="p-1.5 border border-slate-300 rounded hover:bg-slate-50">
              <MoreHorizontal size={18} className="text-slate-600" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-slate-500">
          <span className="cursor-pointer hover:text-slate-800">Meine offenen Aufgaben</span>
          <span className="font-semibold text-slate-800 border-b-2 border-slate-800 pb-1">Alle Aufgaben</span>
          <MoreHorizontal size={16} className="cursor-pointer" />
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border-b border-slate-200 px-6 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-300 rounded text-sm text-slate-600 hover:bg-slate-50">
            <Filter size={14} />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-300 rounded text-sm text-slate-600 hover:bg-slate-50">
            <ArrowUpDown size={14} />
            <span>Sortierung</span>
          </button>
          <div className="h-6 w-px bg-slate-200 mx-2" />
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded">
            <button className="p-1 rounded hover:bg-white"><LayoutList size={16} className="text-slate-500" /></button>
            <button className="p-1 rounded bg-white shadow-sm"><Columns size={16} className="text-blue-600" /></button>
            <button className="p-1 rounded hover:bg-white"><Clock size={16} className="text-slate-500" /></button>
            <button className="p-1 rounded hover:bg-white"><Calendar size={16} className="text-slate-500" /></button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span>Tasks by Status</span>
          <button className="p-1 hover:bg-slate-100 rounded"><Plus size={14} /></button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Filter Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 mb-3">Aufgaben filtern nach</h3>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Suchen" 
                className="w-full bg-slate-50 border border-slate-200 rounded py-1.5 pl-9 pr-3 text-xs outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3 cursor-pointer">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Systemdefinierte F...</span>
                <ChevronDown size={14} className="text-slate-400" />
              </div>
              <div className="space-y-2">
                {['Bearbeitete Einträge', 'Unbearbeitete Einträge', 'Aktion aufzeichnen', 'Zugehörige-Aktion', 'Gesperrt'].map(label => (
                  <label key={label} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600" />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-3 cursor-pointer">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Nach Feldern filter...</span>
                <ChevronDown size={14} className="text-slate-400" />
              </div>
              <div className="space-y-2">
                {['Abschlusszeit', 'Betreff', 'Erstellt durch', 'Fälligkeitsdatum', 'Priorität', 'Status'].map(label => (
                  <label key={label} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600" />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Kanban Board */}
        <div className="flex-1 overflow-x-auto flex p-4 gap-4 bg-[#e9f1f7]">
          {Object.entries(syntheticTasks).map(([status, data]) => (
            <div key={status} className="w-80 shrink-0 flex flex-col">
              <div className="bg-[#d7e9f5] px-4 py-2 rounded-t-md border-b-2 border-white flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700">{status}</span>
                <span className="text-xs font-bold bg-slate-400/20 px-2 py-0.5 rounded-full text-slate-600">{data.count}</span>
              </div>
              <div className="flex-1 overflow-y-auto py-3 space-y-3">
                {data.tasks.length > 0 ? (
                  data.tasks.map(task => (
                    <div key={task.id} className="bg-white p-4 rounded shadow-sm border border-slate-200 hover:border-blue-400 cursor-pointer transition-colors">
                      <h4 className="text-sm font-bold text-slate-800 mb-2">{task.title}</h4>
                      <div className="space-y-1 text-xs text-slate-500">
                        <p>{task.date}</p>
                        <p className={cn(task.priority === 'High' ? 'text-red-500' : 'text-slate-500')}>{task.priority}</p>
                        <p>{task.owner}</p>
                        {task.assignee && <p>{task.assignee}</p>}
                        <p className="text-slate-400 mt-2">{task.project}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex-1 flex items-center justify-center text-slate-400 text-sm italic py-20">
                    Aufgaben nicht gefunden.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AufgabenComponent;
