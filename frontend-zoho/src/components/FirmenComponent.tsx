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
  Settings2,
} from 'lucide-react';

interface Company {
  id: string;
  companyNo: string;
  companyName: string;
  branch: string;
  city: string;
  contact: string;
  dealBesitze: string;
  accountType: 'Account' | 'Partner';
}

const syntheticCompanies: Company[] = [
  {
    id: '1',
    companyNo: 'FIR-2410',
    companyName: 'Nordhafen Datenwerke GmbH',
    branch: 'IT-Beratung',
    city: 'Hamburg',
    contact: 'Anja Lenz',
    dealBesitze: 'Maximilian Schwarz',
    accountType: 'Account',
  },
  {
    id: '2',
    companyNo: 'FIR-2411',
    companyName: 'Rheinblick Prozesslogik AG',
    branch: 'Automatisierung',
    city: 'Koeln',
    contact: 'Mara Feld',
    dealBesitze: 'Julian Wagner',
    accountType: 'Account',
  },
  {
    id: '3',
    companyNo: 'FIR-2412',
    companyName: 'Kuestenfokus Service GmbH',
    branch: 'Dienstleistungen',
    city: 'Bremen',
    contact: 'Timo Reuter',
    dealBesitze: 'Elena Fischer',
    accountType: 'Partner',
  },
  {
    id: '4',
    companyNo: 'FIR-2413',
    companyName: 'Talwerk Integrationssysteme KG',
    branch: 'Software',
    city: 'Leipzig',
    contact: 'Nina Groh',
    dealBesitze: 'Lukas Hoffmann',
    accountType: 'Account',
  },
  {
    id: '5',
    companyNo: 'FIR-2414',
    companyName: 'Bergstern Netzwerktechnik GmbH',
    branch: 'Infrastruktur',
    city: 'Stuttgart',
    contact: 'Jonas Uhl',
    dealBesitze: 'Simon Krueger',
    accountType: 'Account',
  },
  {
    id: '6',
    companyNo: 'FIR-2415',
    companyName: 'Elbquadrat Analysepartner GmbH',
    branch: 'Datenanalyse',
    city: 'Dresden',
    contact: 'Paula Kern',
    dealBesitze: 'Katharina Vogel',
    accountType: 'Partner',
  },
  {
    id: '7',
    companyNo: 'FIR-2416',
    companyName: 'Waldtor Betriebsprozesse GmbH',
    branch: 'Operations',
    city: 'Augsburg',
    contact: 'Silas Boehm',
    dealBesitze: 'Johannes Ritter',
    accountType: 'Account',
  },
  {
    id: '8',
    companyNo: 'FIR-2417',
    companyName: 'Morgenfeld Tech Solutions GmbH',
    branch: 'Cloud',
    city: 'Frankfurt',
    contact: 'Jette Nolte',
    dealBesitze: 'Tobias Brandt',
    accountType: 'Account',
  },
  {
    id: '9',
    companyNo: 'FIR-2418',
    companyName: 'Suedring Plattformwerke AG',
    branch: 'Plattformbetrieb',
    city: 'Muenchen',
    contact: 'Romy Ahrens',
    dealBesitze: 'Miriam Keller',
    accountType: 'Account',
  },
  {
    id: '10',
    companyNo: 'FIR-2419',
    companyName: 'Auenpark Vertriebsservice GmbH',
    branch: 'Vertrieb',
    city: 'Hannover',
    contact: 'Bela Kramer',
    dealBesitze: 'Katharina Vogel',
    accountType: 'Partner',
  },
  {
    id: '11',
    companyNo: 'FIR-2420',
    companyName: 'Mainbogen Kundenloesungen GmbH',
    branch: 'Kundenservice',
    city: 'Nuernberg',
    contact: 'Greta Voss',
    dealBesitze: 'Benedikt Neumann',
    accountType: 'Account',
  },
];

const FirmenComponent: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-[#f3f4f6] overflow-hidden">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-slate-800">Firmen</h1>
          <div className="flex items-center gap-2">
            <div className="flex rounded border border-slate-300 overflow-hidden">
              <button className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium">Firma erstellen</button>
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
          <span className="font-semibold text-slate-800 border-b-2 border-slate-800 pb-1">Alle Firmen</span>
          <MoreHorizontal size={16} className="cursor-pointer" />
        </div>
      </div>

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
            <button className="p-1 rounded bg-white shadow-sm">
              <LayoutList size={16} className="text-blue-600" />
            </button>
            <button className="p-1 rounded hover:bg-white">
              <Columns size={16} className="text-slate-500" />
            </button>
            <button className="p-1 rounded hover:bg-white">
              <Clock size={16} className="text-slate-500" />
            </button>
            <button className="p-1 rounded hover:bg-white">
              <Calendar size={16} className="text-slate-500" />
            </button>
            <ChevronDown size={14} className="text-slate-400 ml-1" />
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 mb-3">Firmen filtern nach</h3>
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
                {['Bearbeitete Eintraege', 'Unbearbeitete Eintraege', 'Aktive Firmen', 'Inaktive Firmen', 'Archiviert'].map(
                  (label) => (
                    <label key={label} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                      <input type="checkbox" className="rounded border-slate-300 text-blue-600" />
                      <span>{label}</span>
                    </label>
                  ),
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3 cursor-pointer">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Nach Feldern filter...</span>
                <ChevronDown size={14} className="text-slate-400" />
              </div>
              <div className="space-y-2">
                {[
                  'Branche',
                  'Stadt',
                  'Mitarbeiterzahl',
                  'Deal-Besitze',
                  'Geaendert von',
                  'Erstellt durch',
                  'Umsatzklasse',
                  'Letzte Aktivitaetszeit',
                ].map((label) => (
                  <label key={label} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600" />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 flex flex-col bg-white overflow-hidden">
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="sticky top-0 bg-white z-10 border-b border-slate-200">
                <tr className="text-slate-600">
                  <th className="w-10 p-3 border-r border-slate-100">
                    <input type="checkbox" className="rounded border-slate-300" />
                  </th>
                  <th className="p-3 text-left font-semibold border-r border-slate-100">Firmen-Nr.</th>
                  <th className="p-3 text-left font-semibold border-r border-slate-100">Firmenname</th>
                  <th className="p-3 text-left font-semibold border-r border-slate-100">Branche</th>
                  <th className="p-3 text-left font-semibold border-r border-slate-100">Stadt</th>
                  <th className="p-3 text-left font-semibold border-r border-slate-100">Kontaktperson</th>
                  <th className="p-3 text-left font-semibold border-r border-slate-100">Deal-Besitze</th>
                  <th className="p-3 text-left font-semibold border-r border-slate-100">Firma Typ</th>
                  <th className="w-10 p-3">
                    <Settings2 size={14} className="text-slate-400" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {syntheticCompanies.map((company) => (
                  <tr key={company.id} className="border-b border-slate-100 hover:bg-slate-50 group">
                    <td className="p-3 border-r border-slate-100">
                      <input type="checkbox" className="rounded border-slate-300" />
                    </td>
                    <td className="p-3 border-r border-slate-100 text-slate-700">{company.companyNo}</td>
                    <td className="p-3 border-r border-slate-100 text-slate-800 font-medium cursor-pointer hover:text-blue-600">
                      {company.companyName}
                    </td>
                    <td className="p-3 border-r border-slate-100 text-slate-600">{company.branch}</td>
                    <td className="p-3 border-r border-slate-100 text-slate-600">{company.city}</td>
                    <td className="p-3 border-r border-slate-100 text-slate-600">{company.contact}</td>
                    <td className="p-3 border-r border-slate-100 text-slate-700">{company.dealBesitze}</td>
                    <td className="p-3 border-r border-slate-100 text-slate-600">{company.accountType}</td>
                    <td className="p-3"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="h-10 border-t border-slate-200 px-4 flex items-center justify-between shrink-0 bg-white text-xs text-slate-500">
            <div>Datensaetze gesamt 211</div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-slate-100 rounded disabled:opacity-30" disabled>
                  &lt;
                </button>
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

export default FirmenComponent;
