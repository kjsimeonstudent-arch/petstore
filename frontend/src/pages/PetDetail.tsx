import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPetDetail } from '../services/petService';
import type { PetDetail as PetDetailType } from '../types';
import ImageGallery from '../components/ImageGallery';

function PetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState<PetDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchPetDetail(id)
      .then(setPet)
      .catch(() => setError('Unable to load pet details.'))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="space-y-6">
      <button className="text-sm text-sky-600 hover:underline" onClick={() => navigate(-1)}>
        &larr; Back to catalog
      </button>
      {loading && <div className="rounded-xl bg-white p-6 shadow-sm">Loading details...</div>}
      {error && <div className="rounded-xl bg-red-50 p-6 text-red-700 shadow-sm">{error}</div>}
      {pet && (
        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-3xl font-semibold">{pet.name}</h2>
            <p className="mt-2 text-slate-600">Category: {pet.category}</p>
            <p className="mt-4 text-lg font-medium text-slate-900">${pet.price.toFixed(2)}</p>
            <p className="mt-4 text-slate-700">{pet.detailedDescription || pet.description}</p>
            <div className="mt-4 space-y-2 rounded-xl bg-slate-50 p-4">
              <p><strong>Availability:</strong> {pet.availabilityStatus}</p>
              <p><strong>Stock:</strong> {pet.stockQuantity}</p>
              <p><strong>Characteristics:</strong></p>
              <pre className="whitespace-pre-wrap rounded bg-white p-3 text-sm text-slate-700">{pet.characteristics}</pre>
            </div>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <ImageGallery images={pet.images} />
          </div>
        </div>
      )}
    </div>
  );
}

export default PetDetail;
