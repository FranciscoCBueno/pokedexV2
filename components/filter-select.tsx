"use client";

export type FilterOption = {
  value: string;
  label: string;
};

type FilterSelectProps = {
  label: string;
  options: readonly FilterOption[];
  value: string;
  onChange: (value: string) => void;
};

export function FilterSelect({
  label,
  options,
  value,
  onChange,
}: FilterSelectProps) {
  return (
    <label className="flex items-center gap-3 font-semibold">
      <span className="shrink-0 text-black">{label}:</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 rounded border border-gray-300 bg-white px-3 py-2 font-normal text-black"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
