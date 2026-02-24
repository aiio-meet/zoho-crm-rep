/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Calendar, 
  CheckSquare, 
  Mail, 
  Settings, 
  Grid, 
  ChevronDown, 
  Plus, 
  LayoutGrid, 
  Users, 
  Briefcase, 
  Building2, 
  Target, 
  FileText, 
  BarChart3, 
  MessageSquare, 
  HelpCircle,
  MoreHorizontal,
  User,
  History,
  Star,
  Search as SearchIcon,
  Filter,
  Maximize2,
  Lock,
  Calculator
} from 'lucide-react';
import { motion } from 'motion/react';
import { InputField, SelectField, CheckboxField } from './components/FormFields';
import { cn } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState('Deals');

  const sidebarItems = [
    { icon: <History size={18} />, label: 'Arbeitswarteschlange', badge: '✨' },
    { icon: <Users size={18} />, label: 'Leads' },
    { icon: <User size={18} />, label: 'Kontakte' },
    { icon: <Briefcase size={18} />, label: 'Deals', active: true },
    { icon: <Building2 size={18} />, label: 'Firmen' },
    { icon: <CheckSquare size={18} />, label: 'Aufgaben' },
    { icon: <Calendar size={18} />, label: 'Meetings' },
    { icon: <MessageSquare size={18} />, label: 'Anrufe' },
    { icon: <Target size={18} />, label: 'Produkte' },
    { icon: <FileText size={18} />, label: 'Angebote' },
    { icon: <LayoutGrid size={18} />, label: 'Aufträge' },
    { icon: <BarChart3 size={18} />, label: 'Bestellungen' },
    { icon: <FileText size={18} />, label: 'Rechnungen' },
    { icon: <MessageSquare size={18} />, label: 'Feeds' },
    { icon: <Target size={18} />, label: 'Kampagnen' },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f3f4f6]">
      {/* Sidebar */}
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
          {sidebarItems.map((item, idx) => (
            <div 
              key={idx} 
              className={cn(
                "sidebar-item",
                item.active && "active"
              )}
            >
              {item.icon}
              <span className="flex-1">{item.label}</span>
              {item.badge && <span className="text-xs">{item.badge}</span>}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 text-slate-400 text-sm cursor-pointer hover:text-white">
            <Settings size={18} />
            <span>Einstellungen</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navigation */}
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
            <Plus size={18} className="text-slate-500" />
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

        {/* Module Navigation */}
        <div className="h-10 bg-[#2c3e50] text-white flex items-center px-4 gap-6 shrink-0 text-sm">
          <span className="opacity-80 hover:opacity-100 cursor-pointer border-b-2 border-transparent hover:border-white h-full flex items-center">Home</span>
          <span className="font-semibold border-b-2 border-white h-full flex items-center">Module</span>
          <span className="opacity-80 hover:opacity-100 cursor-pointer border-b-2 border-transparent hover:border-white h-full flex items-center">Berichte</span>
          <span className="opacity-80 hover:opacity-100 cursor-pointer border-b-2 border-transparent hover:border-white h-full flex items-center">Analytik</span>
          <span className="opacity-80 hover:opacity-100 cursor-pointer border-b-2 border-transparent hover:border-white h-full flex items-center">Meine Anfragen</span>
        </div>

        {/* Form Header */}
        <div className="bg-white p-4 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-slate-800">Deal erstellen</h1>
            <span className="text-xs text-blue-600 cursor-pointer hover:underline">Seitenlayout bearbeiten</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-1.5 border border-slate-300 rounded text-sm font-medium text-slate-700 hover:bg-slate-50">Abbrechen</button>
            <button className="px-4 py-1.5 border border-slate-300 rounded text-sm font-medium text-slate-700 hover:bg-slate-50">Speichern und Neu</button>
            <button className="px-6 py-1.5 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700">Speichern</button>
          </div>
        </div>

        {/* Form Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-white">
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Section: Deal Information */}
            <section>
              <h2 className="text-sm font-bold text-slate-800 mb-6 border-b border-slate-100 pb-2">Deal: Information</h2>
              <div className="grid grid-cols-2 gap-x-16">
                <div className="space-y-1">
                  <SelectField label="Deal-Besitzer" options={['Jobst von Heintze', 'Admin User']} required />
                  <InputField label="Deal-Name" required />
                  <InputField label="Firma-Name" icon={<Building2 size={14} />} />
                  <SelectField label="Sales Track" options={['Direct', 'Partner', 'Referral']} />
                  <SelectField label="Typ" options={['New Business', 'Existing Business']} />
                  <InputField label="Erwartete Einnahmen" icon={<Lock size={14} />} suffix="€" />
                  <SelectField label="Lead-Quelle" options={['Advertisement', 'Cold Call', 'Employee Referral']} />
                  <InputField label="Kontakt-Name" icon={<Users size={14} />} />
                  <SelectField label="Co-Betreuung" options={['None', 'Sales Team A']} />
                  <SelectField label="Währung" options={['EUR', 'USD', 'GBP']} />
                </div>
                <div className="space-y-1">
                  <InputField label="Betrag" suffix="€" icon={<HelpCircle size={14} />} />
                  <InputField label="Abschlussdatum" placeholder="DD.MM.YYYY" />
                  <SelectField label="Pipeline" options={['Value Based Pipe', 'Standard Pipe']} />
                  <SelectField label="Stufe" options={['Discovery', 'Qualification', 'Proposal']} />
                  <SelectField label="Hosting" options={['Keine', 'Cloud', 'On-Premise']} />
                  <SelectField label="Produktfokus" options={['Keine', 'Software', 'Hardware']} />
                  <InputField label="Wahrscheinlichkeit" placeholder="100" />
                  <InputField label="Nächster Schritt" />
                  <InputField label="Kampagne-Quelle" icon={<Target size={14} />} />
                  <InputField label="Wechselkurs" placeholder="1" icon={<Lock size={14} />} />
                </div>
              </div>
            </section>

            {/* Section: Evaluation */}
            <section>
              <h2 className="text-sm font-bold text-slate-800 mb-6 border-b border-slate-100 pb-2">Evaluation</h2>
              <div className="grid grid-cols-2 gap-x-16">
                <div className="space-y-1">
                  <InputField label="Entscheider" />
                  <InputField label="Probleme, Auswirkungen und Bedarfe" className="items-start" />
                  <InputField label="Erkenntnisse aus Demo und Trial" className="items-start" />
                  <InputField label="Nutzen für den Kunden" className="items-start" />
                </div>
                <div className="space-y-1">
                  <CheckboxField label="Kaufabsicht" />
                  <CheckboxField label="Demotermin" />
                  <CheckboxField label="Trial" />
                  <InputField label="Anforderungen und Erfolgskriterien" className="items-start" />
                </div>
              </div>
            </section>

            {/* Section: Beschreibung */}
            <section>
              <h2 className="text-sm font-bold text-slate-800 mb-6 border-b border-slate-100 pb-2">Beschreibung</h2>
              <div className="grid grid-cols-1">
                <div className="grid grid-cols-6 gap-4 items-start">
                  <label className="text-sm text-slate-600 text-right pr-2 col-span-1 pt-2">Beschreibung</label>
                  <textarea className="col-span-5 h-24 border border-slate-300 rounded p-2 text-sm focus:outline-none focus:border-blue-500"></textarea>
                </div>
              </div>
            </section>

            {/* Section: Stakeholder */}
            <section className="pb-20">
              <h2 className="text-sm font-bold text-slate-800 mb-6 border-b border-slate-100 pb-2">Stakeholder</h2>
              <div className="border border-slate-200 rounded overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold text-slate-600 border-r border-slate-200">Kontakt</th>
                      <th className="px-4 py-2 text-left font-semibold text-slate-600">Funktion im VKC Prozess</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="px-4 py-2 border-r border-slate-200">
                        <input type="text" className="w-full h-8 px-2 border border-slate-200 rounded outline-none focus:border-blue-500" />
                      </td>
                      <td className="px-4 py-2">
                        <input type="text" className="w-full h-8 px-2 border border-slate-200 rounded outline-none focus:border-blue-500" />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="p-2 bg-slate-50">
                  <button className="text-blue-600 text-xs font-semibold flex items-center gap-1 hover:underline">
                    <Plus size={14} />
                    Zeile hinzufügen
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Footer Bar */}
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

      {/* Floating Action Buttons (Right) */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 flex flex-col gap-px">
        <div className="w-6 h-24 bg-slate-800 text-white flex items-center justify-center [writing-mode:vertical-lr] rotate-180 text-[10px] font-bold cursor-pointer hover:bg-slate-700 rounded-l">
          Client Script
        </div>
      </div>
    </div>
  );
}
