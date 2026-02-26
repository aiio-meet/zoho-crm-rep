import React from 'react';
import { 
  Plus, 
  Building2, 
  Users, 
  Target, 
  HelpCircle,
  Lock
} from 'lucide-react';
import { InputField, SelectField, CheckboxField } from './FormFields';

const DealsCompoenents: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
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
    </div>
  );
};

export default DealsCompoenents;
