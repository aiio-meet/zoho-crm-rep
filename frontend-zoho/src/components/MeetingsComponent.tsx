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
  Settings2,
  Briefcase
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Meeting {
  id: string;
  title: string;
  from: string;
  to: string;
  relatedTo: string;
  contactName: string;
  host: string;
}

const syntheticMeetings: Meeting[] = [
  { id: '1', title: 'Strategie-Meeting Q2', from: '17.02.2026 03:00 PM', to: '17.02.2026 04:00 PM', relatedTo: 'Alpha Tech Solutions', contactName: 'Maximilian Schwarz', host: 'Julian Wagner' },
  { id: '2', title: 'Projekt-Update: Cloud Sync', from: '25.02.2026 02:00 PM', to: '25.02.2026 03:00 PM', relatedTo: 'Beta Logistik GmbH', contactName: 'Elena Fischer', host: 'Julian Wagner' },
  { id: '3', title: 'Kunden-Onboarding', from: '04.02.2026 10:00 AM', to: '04.02.2026 11:00 AM', relatedTo: 'Gamma Consulting', contactName: 'Lukas Hoffmann', host: 'Julian Wagner' },
  { id: '4', title: 'Review: Marketing-Kampagne', from: '03.02.2026 11:00 AM', to: '03.02.2026 12:00 PM', relatedTo: 'Delta Media Group', contactName: 'Sophie Neumann', host: 'Julian Wagner' },
  { id: '5', title: 'Wöchentlicher Sync', from: '09.02.2026 10:00 AM', to: '09.02.2026 11:00 AM', relatedTo: 'Epsilon Services', contactName: 'David Richter', host: 'Julian Wagner' },
  { id: '6', title: 'Budget-Planung 2026', from: '29.01.2026 12:00 PM', to: '29.01.2026 01:00 PM', relatedTo: 'Zeta Finance', contactName: 'Laura Zimmermann', host: 'Julian Wagner' },
  { id: '7', title: 'Technisches Deep-Dive', from: '10.02.2026 10:00 AM', to: '10.02.2026 11:00 AM', relatedTo: 'Eta Engineering', contactName: 'Simon Krüger', host: 'Julian Wagner' },
  { id: '8', title: 'Follow Up: Sales Pitch', from: '29.01.2026 09:00 AM', to: '29.01.2026 10:00 AM', relatedTo: 'Theta Retail', contactName: 'Hannah Scholz', host: 'Julian Wagner' },
  { id: '9', title: 'Präsentation: Neue Features', from: '09.09.2025 08:00 AM', to: '09.09.2025 09:30 AM', relatedTo: 'Iota Innovation', contactName: 'Felix Braun', host: 'Tobias Maier' },
  { id: '10', title: 'Vorstellung: Roadmap Q3', from: '09.10.2025 10:00 AM', to: '09.10.2025 11:00 AM', relatedTo: 'Kappa Systems', contactName: 'Marie Vogt', host: 'Jan Peters' },
];

const MeetingsComponent: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-[#f3f4f6] overflow-hidden">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-slate-800">Meetings</h1>
          <div className="flex items-center gap-2">
            <div className="flex rounded border border-slate-300 overflow-hidden">
              <button className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium">Meeting erstellen</button>
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
          <span className="font-semibold text-slate-800 border-b-2 border-slate-800 pb-1">Alle Meetings</span>
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
            <button className="p-1 rounded bg-white shadow-sm"><LayoutList size={16} className="text-blue-600" /></button>
            <button className="p-1 rounded hover:bg-white"><Columns size={16} className="text-slate-500" /></button>
            <button className="p-1 rounded hover:bg-white"><Clock size={16} className="text-slate-500" /></button>
            <button className="p-1 rounded hover:bg-white"><Calendar size={16} className="text-slate-500" /></button>
            <ChevronDown size={14} className="text-slate-400 ml-1" />
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Filter Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 mb-3">Meetings filtern nach</h3>
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
                {['Bearbeitete Einträge', 'Unbearbeitete Einträge', 'Aktion aufzeichnen', 'Zugehörige-Einträge-Aktion'].map(label => (
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
                {['Anbieter', 'Bis', 'Booking Summary', 'BookingId', 'Einchecken von', 'Einchecken-Adresse', 'Einchecken-Land', 'Einchecken-Nebenort', 'Einchecken-Staat', 'Einchecken-Stadt', 'Eincheckzeit', 'Eingecheckt-Status'].map(label => (
                  <label key={label} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600" />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Table Content */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="sticky top-0 bg-white z-10 border-b border-slate-200">
                <tr className="text-slate-600">
                  <th className="w-10 p-3 border-r border-slate-100"><input type="checkbox" className="rounded border-slate-300" /></th>
                  <th className="p-3 text-left font-semibold border-r border-slate-100">Titel</th>
                  <th className="p-3 text-left font-semibold border-r border-slate-100">Von</th>
                  <th className="p-3 text-left font-semibold border-r border-slate-100">Bis</th>
                  <th className="p-3 text-left font-semibold border-r border-slate-100">Verknüpft mit</th>
                  <th className="p-3 text-left font-semibold border-r border-slate-100">Kontaktname</th>
                  <th className="p-3 text-left font-semibold">Host</th>
                  <th className="w-10 p-3"><Settings2 size={14} className="text-slate-400" /></th>
                </tr>
              </thead>
              <tbody>
                {syntheticMeetings.map((meeting) => (
                  <tr key={meeting.id} className="border-b border-slate-100 hover:bg-slate-50 group">
                    <td className="p-3 border-r border-slate-100"><input type="checkbox" className="rounded border-slate-300" /></td>
                    <td className="p-3 border-r border-slate-100 text-slate-800 font-medium cursor-pointer hover:text-blue-600">
                      {meeting.title}
                    </td>
                    <td className="p-3 border-r border-slate-100 text-slate-600">{meeting.from}</td>
                    <td className="p-3 border-r border-slate-100 text-slate-600">{meeting.to}</td>
                    <td className="p-3 border-r border-slate-100 text-slate-600">
                      <div className="flex items-center gap-2">
                        <Briefcase size={14} className="text-slate-400" />
                        <span className="text-blue-600 cursor-pointer hover:underline">{meeting.relatedTo}</span>
                      </div>
                    </td>
                    <td className="p-3 border-r border-slate-100 text-blue-600 cursor-pointer hover:underline">{meeting.contactName}</td>
                    <td className="p-3 text-blue-600 cursor-pointer hover:underline">{meeting.host}</td>
                    <td className="p-3"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="h-10 border-t border-slate-200 px-4 flex items-center justify-between shrink-0 bg-white text-xs text-slate-500">
            <div>Datensätze gesamt 312</div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-slate-100 rounded disabled:opacity-30" disabled>&lt;</button>
                <span className="font-semibold text-slate-800">1 an 10</span>
                <button className="p-1 hover:bg-slate-100 rounded">&gt;</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingsComponent;
