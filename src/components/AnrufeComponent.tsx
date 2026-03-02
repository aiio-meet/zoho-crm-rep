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
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Settings2
} from 'lucide-react';
import { cn } from '../lib/utils';

interface CallRecord {
  id: string;
  subject: string;
  type: 'Outbound' | 'Inbound' | 'Missed';
  startTime: string;
  duration: string;
  relatedTo: string;
  contactName: string;
}

const syntheticCalls: CallRecord[] = [
  { id: '1', subject: 'Erstberatung bzgl. Cloud-Migration', type: 'Outbound', startTime: '26.02.2026 10:30 AM', duration: '12:45', relatedTo: 'Alpha Solutions GmbH', contactName: 'Thomas Müller' },
  { id: '2', subject: 'Support-Anfrage: Login Probleme', type: 'Inbound', startTime: '26.02.2026 09:15 AM', duration: '05:20', relatedTo: 'Beta Tech AG', contactName: 'Sarah Schmidt' },
  { id: '3', subject: 'Follow-up: Angebot Software-Lizenz', type: 'Outbound', startTime: '25.02.2026 04:00 PM', duration: '08:10', relatedTo: 'Gamma Services', contactName: 'Michael Weber' },
  { id: '4', subject: 'Verpasster Anruf von Unbekannt', type: 'Missed', startTime: '25.02.2026 02:30 PM', duration: '00:00', relatedTo: '', contactName: 'Unbekannter Anrufer' },
  { id: '5', subject: 'Vertragsverhandlung: Q1 Projekt', type: 'Outbound', startTime: '25.02.2026 11:00 AM', duration: '45:00', relatedTo: 'Delta Logistics', contactName: 'Andreas Wagner' },
  { id: '6', subject: 'Rückruf: Terminbestätigung', type: 'Inbound', startTime: '24.02.2026 03:45 PM', duration: '02:30', relatedTo: 'Epsilon Media', contactName: 'Julia Fischer' },
  { id: '7', subject: 'Kaltakquise: Neue Produktlinie', type: 'Outbound', startTime: '24.02.2026 10:00 AM', duration: '01:15', relatedTo: 'Zeta Manufacturing', contactName: 'Christian Meyer' },
];

const AnrufeComponent: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-[#f3f4f6] overflow-hidden">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-slate-800">Anrufe</h1>
          <div className="flex items-center gap-2">
            <div className="flex rounded border border-slate-300 overflow-hidden">
              <button className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium">Anruf erstellen</button>
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
          <span className="font-semibold text-slate-800 border-b-2 border-slate-800 pb-1">Alle Anrufe</span>
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
            <h3 className="text-sm font-bold text-slate-800 mb-3">Anrufe filtern nach</h3>
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
                {['Bearbeitete Einträge', 'Unbearbeitete Einträge', 'Aktion aufzeichnen', 'Zugehörige-Aktion'].map(label => (
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
                {['Anruf Beginnzeit', 'Anrufagenda', 'Anrufdauer', 'Anrufer', 'Anrufer-ID', 'Anrufergebnis', 'Art des Anrufs', 'Betreff'].map(label => (
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
                  <th className="p-3 text-left font-semibold border-r border-slate-100">Betreff</th>
                  <th className="p-3 text-left font-semibold border-r border-slate-100">Art des Anrufs</th>
                  <th className="p-3 text-left font-semibold border-r border-slate-100">Anruf Beginnzeit</th>
                  <th className="p-3 text-left font-semibold border-r border-slate-100">Anrufdauer</th>
                  <th className="p-3 text-left font-semibold border-r border-slate-100">Verknüpft mit</th>
                  <th className="p-3 text-left font-semibold">Kontaktname</th>
                  <th className="w-10 p-3"><Settings2 size={14} className="text-slate-400" /></th>
                </tr>
              </thead>
              <tbody>
                {syntheticCalls.map((call) => (
                  <tr key={call.id} className="border-b border-slate-100 hover:bg-slate-50 group">
                    <td className="p-3 border-r border-slate-100"><input type="checkbox" className="rounded border-slate-300" /></td>
                    <td className="p-3 border-r border-slate-100 text-blue-600 font-medium cursor-pointer hover:underline">
                      {call.subject}
                    </td>
                    <td className="p-3 border-r border-slate-100 text-slate-600">{call.type}</td>
                    <td className="p-3 border-r border-slate-100 text-slate-600">{call.startTime}</td>
                    <td className="p-3 border-r border-slate-100 text-slate-600">{call.duration}</td>
                    <td className="p-3 border-r border-slate-100 text-slate-600">
                      {call.relatedTo && (
                        <div className="flex items-center gap-2">
                          <Phone size={14} className="text-slate-400" />
                          <span className="text-blue-600 cursor-pointer hover:underline">{call.relatedTo}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-slate-600 text-blue-600 cursor-pointer hover:underline">{call.contactName}</td>
                    <td className="p-3"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="h-10 border-t border-slate-200 px-4 flex items-center justify-between shrink-0 bg-white text-xs text-slate-500">
            <div>Datensätze gesamt 1240</div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-slate-100 rounded disabled:opacity-30" disabled>&lt;</button>
                <span className="font-semibold text-slate-800">1 an 100</span>
                <button className="p-1 hover:bg-slate-100 rounded">&gt;</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnrufeComponent;
