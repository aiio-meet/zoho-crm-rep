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
  Package
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Product {
  id: string;
  name: string;
  revenueType?: string;
  unitPrice?: string;
  productCode?: string;
}

const syntheticProducts: Product[] = [
  { id: '1', name: 'Cloud-Infrastruktur Paket A', revenueType: '', unitPrice: '€ 1.200,00', productCode: 'DE-100:CLD_INF_A' },
  { id: '2', name: 'Sicherheits-Audit (Jährlich)', revenueType: 'MRR', unitPrice: '€ 450,00', productCode: 'DE-101:SEC_AUD_Y' },
  { id: '3', name: 'Datenbank-Optimierungstool', revenueType: '', unitPrice: '€ 890,00', productCode: 'DE-102:DB_OPT_T' },
  { id: '4', name: 'Mitarbeiter-Schulung (Basis)', revenueType: '', unitPrice: '€ 250,00', productCode: 'DE-103:TRN_BAS' },
  { id: '5', name: 'Premium Support (Monatlich)', revenueType: 'MRR', unitPrice: '€ 150,00', productCode: 'DE-104:SUP_PRE_M' },
  { id: '6', name: 'KI-Analyse Modul', revenueType: '', unitPrice: '€ 2.500,00', productCode: 'DE-105:AI_ANL_MOD' },
  { id: '7', name: 'API-Gateway Lizenz', revenueType: '', unitPrice: '€ 600,00', productCode: 'DE-106:API_GTW_L' },
  { id: '8', name: 'Backup-Lösung (Enterprise)', revenueType: 'MRR', unitPrice: '€ 300,00', productCode: 'DE-107:BKP_ENT_M' },
  { id: '9', name: 'Custom Dashboard Setup', revenueType: '', unitPrice: '€ 1.500,00', productCode: 'DE-108:DSH_SET_C' },
  { id: '10', name: 'VPN-Zugang (Pro User)', revenueType: 'MRR', unitPrice: '€ 15,00', productCode: 'DE-109:VPN_USR_M' },
];

const ProdukteComponent: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-[#f3f4f6] overflow-hidden">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-slate-800">Produkte</h1>
          <div className="flex items-center gap-2">
            <div className="flex rounded border border-slate-300 overflow-hidden">
              <button className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium">Produkt erstellen</button>
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
          <span className="font-semibold text-slate-800 border-b-2 border-slate-800 pb-1">Aktive Produkte</span>
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
            <h3 className="text-sm font-bold text-slate-800 mb-3">Produkte filtern nach</h3>
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
                {['Bearbeitete Einträge', 'Unbearbeitete Einträge', 'Aktion aufzeichnen', 'Zugehörige-Einträge-Aktion', 'Gesperrt'].map(label => (
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
                {['Benötigte Menge', 'Einheitspreis', 'Erstellt durch', 'Geändert von', 'Handler', 'Kundendienst-Enddatum', 'Lagerbestand', 'Letzte Aktivitätszeit', 'Menge bestellt', 'Neubestellungs-Ebene', 'Nutzungseinheit'].map(label => (
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
                  <th className="p-3 text-left font-semibold border-r border-slate-100">Produktname</th>
                  <th className="p-3 text-left font-semibold border-r border-slate-100">Umsatztyp</th>
                  <th className="p-3 text-right font-semibold border-r border-slate-100">Einheitspreis</th>
                  <th className="p-3 text-left font-semibold">Produktcode</th>
                  <th className="w-10 p-3"><Settings2 size={14} className="text-slate-400" /></th>
                </tr>
              </thead>
              <tbody>
                {syntheticProducts.map((product) => (
                  <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50 group">
                    <td className="p-3 border-r border-slate-100"><input type="checkbox" className="rounded border-slate-300" /></td>
                    <td className="p-3 border-r border-slate-100 text-slate-800 font-medium cursor-pointer hover:text-blue-600">
                      {product.name}
                    </td>
                    <td className="p-3 border-r border-slate-100">
                      {product.revenueType && (
                        <span className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                          {product.revenueType}
                        </span>
                      )}
                    </td>
                    <td className="p-3 border-r border-slate-100 text-right text-slate-600">{product.unitPrice}</td>
                    <td className="p-3 text-slate-600">{product.productCode}</td>
                    <td className="p-3"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="h-10 border-t border-slate-200 px-4 flex items-center justify-between shrink-0 bg-white text-xs text-slate-500">
            <div>Datensätze gesamt 197</div>
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

export default ProdukteComponent;
