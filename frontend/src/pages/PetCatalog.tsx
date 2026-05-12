import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { fetchCategories } from '../services/categoryService';
import { fetchPets } from '../services/petService';
import type { Category, PageResponse, Pet } from '../types';
import PetCard from '../components/PetCard';
import FilterPanel from '../components/FilterPanel';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

const defaultPageSize = 10;

function PetCatalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [pageData, setPageData] = useState<PageResponse<Pet> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const page = Number(searchParams.get('page') ?? 0);
  const size = Number(searchParams.get('size') ?? defaultPageSize);
  const category = searchParams.get('category') ?? undefined;
  const search = searchParams.get('search') ?? undefined;

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setError('Unable to load categories'));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchPets({ page, size, category, search })
      .then((data) => {
        setPets(data.data);
        setPageData(data);
      })
      .catch(() => setError('Could not load pets.'))
      .finally(() => setLoading(false));
  }, [page, size, category, search]);

  const updateParams = (params: Record<string, string | number | null>) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value == null || value === '') {
        next.delete(key);
      } else {
        next.set(key, String(value));
      }
    });
    setSearchParams(next);
  };

  const handleCategoryChange = (slug: string | null) => {
    updateParams({ category: slug, page: 0 });
  };

  const handleSearch = (query: string | null) => {
    updateParams({ search: query, page: 0 });
  };

  const handlePageChange = (nextPage: number) => {
    updateParams({ page: nextPage });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-xl bg-white p-4 shadow-sm">
          <FilterPanel categories={categories} selectedCategory={category} onChange={handleCategoryChange} />
        </aside>
        <section className="space-y-4">
          <SearchBar defaultValue={search ?? ''} onSearch={handleSearch} />
          {loading && <div className="rounded-xl bg-white p-6 shadow-sm">Loading pets...</div>}
          {error && <div className="rounded-xl bg-red-50 p-6 text-red-700 shadow-sm">{error}</div>}
          {!loading && !error && pets.length === 0 && (
            <div className="rounded-xl bg-white p-6 text-slate-700 shadow-sm">
              No pets found. Try changing filters or search terms.
            </div>
          )}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} onClick={() => navigate(`/pets/${pet.id}`)} />
            ))}
          </div>
          {pageData && (
            <Pagination
              page={pageData.page}
              totalPages={pageData.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </section>
      </div>
    </div>
  );
}

export default PetCatalog;
