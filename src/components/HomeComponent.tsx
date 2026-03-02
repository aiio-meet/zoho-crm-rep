import React from 'react';
import { 
  RefreshCw, 
  ChevronDown, 
  MoreHorizontal, 
  ChevronLeft, 
  ChevronRight,
  Phone
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

interface Task {
  id: string;
  subject: string;
  dueDate: string;
  status: string;
  priority: string;
  assignedTo: string;
}

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
}

const syntheticTasks: Task[] = [
  { id: '1', subject: 'Erstgespräch führen', dueDate: '03.03.2026', status: 'Not Started', priority: 'High', assignedTo: 'Maximilian Schwarz' },
  { id: '2', subject: 'Vertrag unterzeichnen', dueDate: '11.03.2026', status: 'Not Started', priority: 'High', assignedTo: 'Maximilian Schwarz' },
  { id: '3', subject: 'Follow-up E-Mail senden', dueDate: '03.03.2026', status: 'Not Started', priority: 'High', assignedTo: 'Maximilian Schwarz' },
  { id: '4', subject: 'Angebot überarbeiten', dueDate: '27.02.2026', status: 'Not Started', priority: 'High', assignedTo: 'Julian Wagner' },
  { id: '5', subject: 'Onboarding-Termin', dueDate: '27.02.2026', status: 'Not Started', priority: 'High', assignedTo: 'Maximilian Schwarz' },
];

const syntheticLeads: Lead[] = [
  { id: '1', name: 'Lukas Müller', company: 'SOLAR Tech GmbH', email: 'mueller@solar-tech.de', phone: '+49 123 456789' },
  { id: '2', name: 'Sarah Schmidt', company: 'EcoFlow Systems', email: 's.schmidt@ecoflow.com', phone: '+49 987 654321' },
];

const chartData = [
  { name: 'Discovery', value: 180000, color: '#ffb380' },
  { name: 'Evaluation', value: 432673, color: '#ffe080' },
  { name: 'Intention (Decision)', value: 390698, color: '#4ade80' },
  { name: 'Purchase', value: 180000, color: '#c084fc' },
];

const HomeComponent: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-[#f3f4f6] p-6 space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-blue-600 rounded-full opacity-20" />
          </div>
          <h2 className="text-lg font-semibold text-slate-800">Willkommen Maximilian Schwarz</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500">
            <RefreshCw size={18} />
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 border border-slate-300 rounded text-sm text-slate-600 cursor-pointer hover:bg-slate-50">
            <span>Startseite von Maximilian Schwarz</span>
            <ChevronDown size={14} />
          </div>
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Open Tasks */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Offene Aufgaben</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100">
                  <th className="p-3 text-left font-medium">Betreff</th>
                  <th className="p-3 text-left font-medium">Fälligkeitsdatum</th>
                  <th className="p-3 text-left font-medium">Status</th>
                  <th className="p-3 text-left font-medium">Priorität</th>
                  <th className="p-3 text-left font-medium">Für die Aufgabe</th>
                </tr>
              </thead>
              <tbody>
                {syntheticTasks.map((task) => (
                  <tr key={task.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="p-3 text-blue-600 cursor-pointer hover:underline font-medium">{task.subject}</td>
                    <td className="p-3 text-slate-600">{task.dueDate}</td>
                    <td className="p-3 text-slate-600">{task.status}</td>
                    <td className="p-3 text-slate-600">{task.priority}</td>
                    <td className="p-3 text-slate-600">{task.assignedTo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-3 border-t border-slate-100 flex items-center justify-end gap-4 text-xs text-slate-500">
            <span>1 - 10</span>
            <div className="flex gap-1">
              <button className="p-1 hover:bg-slate-100 rounded"><ChevronLeft size={14} /></button>
              <button className="p-1 hover:bg-slate-100 rounded"><ChevronRight size={14} /></button>
            </div>
          </div>
        </div>

        {/* Today's Leads */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Heutige Leads</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100">
                  <th className="p-3 text-left font-medium">Lead-Name</th>
                  <th className="p-3 text-left font-medium">Firma</th>
                  <th className="p-3 text-left font-medium">E-Mail</th>
                  <th className="p-3 text-left font-medium">Tel.</th>
                </tr>
              </thead>
              <tbody>
                {syntheticLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="p-3 text-blue-600 cursor-pointer hover:underline font-medium">{lead.name}</td>
                    <td className="p-3 text-slate-600">{lead.company}</td>
                    <td className="p-3 text-blue-600 cursor-pointer hover:underline">{lead.email}</td>
                    <td className="p-3 text-slate-600">
                      <div className="flex items-center gap-2">
                        <span>{lead.phone}</span>
                        <Phone size={14} className="text-green-600" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-3 border-t border-slate-100 flex items-center justify-end gap-4 text-xs text-slate-500 mt-auto">
            <span>1 - 2</span>
            <div className="flex gap-1">
              <button className="p-1 hover:bg-slate-100 rounded"><ChevronLeft size={14} /></button>
              <button className="p-1 hover:bg-slate-100 rounded"><ChevronRight size={14} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
        <h3 className="font-bold text-slate-800 mb-6">Betrag nach Stufe</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 11 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 11 }}
                dx={-10}
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={120}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center text-xs text-slate-500 mt-4">Stufe</div>
      </div>

      {/* Closing this month */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
        <h3 className="font-bold text-slate-800 mb-4">Diesen Monat abschließend</h3>
        <div className="flex items-center justify-center h-24">
          <div className="flex items-end gap-1">
            <div className="w-2 h-8 bg-orange-300 rounded-t" />
            <div className="w-2 h-12 bg-blue-300 rounded-t" />
            <div className="w-2 h-10 bg-slate-300 rounded-t" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
