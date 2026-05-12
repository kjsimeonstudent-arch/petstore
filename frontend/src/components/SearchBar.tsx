import { useState, type FormEvent } from 'react';

interface Props {
  defaultValue: string;
  onSearch: (query: string | null) => void;
}

export default function SearchBar({ defaultValue, onSearch }: Props) {
  const [value, setValue] = useState(defaultValue);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(value.trim() || null);
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 rounded-3xl bg-white p-4 shadow-sm sm:flex-row sm:items-center">
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search exact pet name"
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
      />
      <div className="flex gap-2">
        <button type="submit" className="rounded-2xl bg-sky-600 px-4 py-3 text-white hover:bg-sky-700">
          Search
        </button>
        <button type="button" className="rounded-2xl bg-slate-100 px-4 py-3 text-slate-700 hover:bg-slate-200" onClick={() => { setValue(''); onSearch(null); }}>
          Clear
        </button>
      </div>
    </form>
  );
}
