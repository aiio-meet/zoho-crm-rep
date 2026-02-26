/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Search,
  Bell,
  Calendar,
  CheckSquare,
  Mail,
  Settings,
  Grid,
  ChevronDown,
  LayoutGrid,
  Users,
  Briefcase,
  Building2,
  Target,
  FileText,
  BarChart3,
  MessageSquare,
  User,
  History,
  Search as SearchIcon,
} from 'lucide-react';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import DealsCompoenents from './components/DealsCompoenents';
import AufgabenComponent from './components/AufgabenComponent';
import PlaceholderPage from './components/PlaceholderPage';
import { cn } from './lib/utils';

export default function App() {
  const sidebarItems = [
    { icon: <History size={18} />, label: 'Arbeitswarteschlange', path: '/arbeitswarteschlange', badge: '✨' },
    { icon: <Users size={18} />, label: 'Leads', path: '/leads' },
    { icon: <User size={18} />, label: 'Kontakte', path: '/kontakte' },
    { icon: <Briefcase size={18} />, label: 'Deals', path: '/deals' },
    { icon: <Building2 size={18} />, label: 'Firmen', path: '/firmen' },
    { icon: <CheckSquare size={18} />, label: 'Aufgaben', path: '/aufgaben' },
    { icon: <Calendar size={18} />, label: 'Meetings', path: '/meetings' },
    { icon: <MessageSquare size={18} />, label: 'Anrufe', path: '/anrufe' },
    { icon: <Target size={18} />, label: 'Produkte', path: '/produkte' },
    { icon: <FileText size={18} />, label: 'Angebote', path: '/angebote' },
    { icon: <LayoutGrid size={18} />, label: 'Aufträge', path: '/auftraege' },
    { icon: <BarChart3 size={18} />, label: 'Bestellungen', path: '/bestellungen' },
    { icon: <FileText size={18} />, label: 'Rechnungen', path: '/rechnungen' },
    { icon: <MessageSquare size={18} />, label: 'Feeds', path: '/feeds' },
    { icon: <Target size={18} />, label: 'Kampagnen', path: '/kampagnen' },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f3f4f6]">
      <aside className="w-64 bg-[#1e293b] text-white flex flex-col shrink-0">
        <div className="p-4 flex items-center gap-2 border-b border-slate-700">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-lg">Z</div>
          <div className="flex flex-col">
            <span className="font-bold text-sm leading-tight">CRM Teamber...</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Zoho One</span>
          </div>
          <ChevronDown size={14} className="ml-auto text-slate-400" />
        </div>

        <div className="p-2">
          <div className="relative mb-4">
            <SearchIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Suche"
              className="w-full bg-slate-800 border-none rounded py-1.5 pl-9 pr-3 text-xs focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-hide">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn('sidebar-item', isActive && 'active')}
            >
              {item.icon}
              <span className="flex-1">{item.label}</span>
              {item.badge && <span className="text-xs">{item.badge}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 text-slate-400 text-sm cursor-pointer hover:text-white">
            <Settings size={18} />
            <span>Einstellungen</span>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-12 bg-white border-b border-slate-200 flex items-center px-4 gap-4 shrink-0">
          <div className="flex items-center gap-2 text-slate-600 cursor-pointer">
            <Grid size={20} />
            <span className="font-semibold text-sm">CRM</span>
          </div>
          <div className="h-6 w-px bg-slate-200 mx-2" />
          <div className="flex items-center gap-1 text-slate-600 text-sm font-medium">
            <span className="px-2 py-1 hover:bg-slate-100 rounded">Personal</span>
            <span className="px-2 py-1 hover:bg-slate-100 rounded">Organization</span>
            <div className="flex items-center gap-1 px-2 py-1 bg-slate-100 rounded text-blue-600">
              <span>Sales</span>
              <ChevronDown size={14} />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <Search size={18} className="text-slate-500" />
            </div>
            <History size={18} className="text-slate-500" />
            <CheckSquare size={18} className="text-slate-500" />
            <Calendar size={18} className="text-slate-500" />
            <Mail size={18} className="text-slate-500" />
            <Bell size={18} className="text-slate-500" />
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
              JH
            </div>
          </div>
        </header>

        <div className="h-10 bg-[#2c3e50] text-white flex items-center px-4 gap-6 shrink-0 text-sm">
          <span className="opacity-80 hover:opacity-100 cursor-pointer border-b-2 border-transparent hover:border-white h-full flex items-center">Home</span>
          <span className="font-semibold border-b-2 border-white h-full flex items-center">Module</span>
          <span className="opacity-80 hover:opacity-100 cursor-pointer border-b-2 border-transparent hover:border-white h-full flex items-center">Berichte</span>
          <span className="opacity-80 hover:opacity-100 cursor-pointer border-b-2 border-transparent hover:border-white h-full flex items-center">Analytik</span>
          <span className="opacity-80 hover:opacity-100 cursor-pointer border-b-2 border-transparent hover:border-white h-full flex items-center">Meine Anfragen</span>
        </div>

        <Routes>
          <Route path="/deals" element={<DealsCompoenents />} />
          <Route path="/aufgaben" element={<AufgabenComponent />} />
          <Route path="/:pageSlug" element={<PlaceholderPage />} />
          <Route path="*" element={<Navigate to="/deals" replace />} />
        </Routes>

        <footer className="h-10 bg-white border-t border-slate-200 flex items-center px-4 justify-between shrink-0 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 cursor-pointer hover:text-slate-800">
              <MessageSquare size={14} />
              Soziales
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span>Formularansichten erstellen</span>
              <select className="bg-transparent border border-slate-300 rounded px-1 py-0.5 text-[10px]">
                <option>Standardansicht</option>
              </select>
            </div>
            <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50">Spezifische Formularseite erstellen</button>
          </div>
        </footer>
      </div>

      <div className="fixed right-0 top-1/2 -translate-y-1/2 flex flex-col gap-px">
        <div className="w-6 h-24 bg-slate-800 text-white flex items-center justify-center [writing-mode:vertical-lr] rotate-180 text-[10px] font-bold cursor-pointer hover:bg-slate-700 rounded-l">
          Client Script
        </div>
      </div>
    </div>
  );
}
