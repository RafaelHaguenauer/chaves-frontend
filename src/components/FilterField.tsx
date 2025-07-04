import { InputHTMLAttributes } from 'react';

interface FilterFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FilterField = ({ label, ...props }: FilterFieldProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm text-gray-600">{label}</label>
      <input
        {...props}
        className="px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
      />
    </div>
  );
};

export default FilterField;
