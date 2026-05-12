import type { Category } from '../types';

interface Props {
  categories: Category[];
  selectedCategory?: string;
  onChange: (slug: string | null) => void;
}

export default function FilterPanel({ categories, selectedCategory, onChange }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Categories</h2>
      <div className="space-y-2">
        <button
          type="button"
          className={`block w-full rounded-2xl px-4 py-3 text-left ${selectedCategory == null ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-700'}`}
          onClick={() => onChange(null)}
        >
          All pets
        </button>
        {categories.map((category) => (
          <button
            type="button"
            key={category.slug}
            className={`block w-full rounded-2xl px-4 py-3 text-left ${selectedCategory === category.slug ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-700'}`}
            onClick={() => onChange(category.slug)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
