import React from 'react';
import { cn } from '../lib/utils';

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  icon?: React.ReactNode;
  suffix?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  placeholder,
  required,
  className,
  icon,
  suffix,
}) => {
  return (
    <div className={cn("grid grid-cols-3 gap-4 items-center mb-4", className)}>
      <label className="text-sm text-slate-600 text-right pr-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="col-span-2 relative flex items-center">
        <input
          type={type}
          placeholder={placeholder}
          className="w-full h-8 px-2 border border-slate-300 rounded focus:outline-none focus:border-blue-500 text-sm"
        />
        {icon && <div className="absolute right-2 text-slate-400">{icon}</div>}
        {suffix && <div className="ml-2 text-sm text-slate-500">{suffix}</div>}
      </div>
    </div>
  );
};

interface SelectFieldProps {
  label: string;
  options: string[];
  required?: boolean;
  className?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  required,
  className,
}) => {
  return (
    <div className={cn("grid grid-cols-3 gap-4 items-center mb-4", className)}>
      <label className="text-sm text-slate-600 text-right pr-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="col-span-2">
        <select className="w-full h-8 px-2 border border-slate-300 rounded focus:outline-none focus:border-blue-500 text-sm bg-white">
          <option value="">-None-</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

interface CheckboxFieldProps {
  label: string;
  className?: string;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, className }) => {
  return (
    <div className={cn("grid grid-cols-3 gap-4 items-center mb-4", className)}>
      <label className="text-sm text-slate-600 text-right pr-2">{label}</label>
      <div className="col-span-2">
        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
      </div>
    </div>
  );
};
