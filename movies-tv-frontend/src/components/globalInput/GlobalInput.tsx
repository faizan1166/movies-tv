import React from "react";

interface Option {
  label: string;
  value: string;
}

interface GlobalInputProps {
  label: string;
  name: string;
  type?: "text" | "select" | "url" | "textarea";
  value: string;
  required?: boolean;
  placeholder?: string;
  options?: Option[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const GlobalInput: React.FC<GlobalInputProps> = ({
  label,
  name,
  type = "text",
  value,
  required,
  placeholder,
  options,
  onChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        >
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          rows={4}
          className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      )}
    </div>
  );
};

export default GlobalInput;
