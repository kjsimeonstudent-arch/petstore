import type { Pet } from '../types';

interface Props {
  pet: Pet;
  onClick: () => void;
}

export default function PetCard({ pet, onClick }: Props) {
  return (
    <button onClick={onClick} className="group w-full overflow-hidden rounded-3xl border border-slate-200 bg-white text-left transition hover:-translate-y-1 hover:shadow-lg">
      <div className="h-56 bg-slate-100">
        {pet.primaryImage?.url ? (
          <img src={pet.primaryImage.url} alt={pet.primaryImage.altText ?? pet.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-500">No image</div>
        )}
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-slate-900">{pet.name}</h3>
          <span className="rounded-full bg-sky-100 px-3 py-1 text-sm text-sky-700">{pet.category}</span>
        </div>
        <p className="text-sm text-slate-600">{pet.description}</p>
        <p className="text-xl font-bold text-slate-900">${pet.price.toFixed(2)}</p>
      </div>
    </button>
  );
}
