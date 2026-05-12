import { Route, Routes, Navigate } from 'react-router-dom';
import PetCatalog from './pages/PetCatalog';
import PetDetail from './pages/PetDetail';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-semibold">PetStore</h1>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/" element={<PetCatalog />} />
          <Route path="/pets/:id" element={<PetDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
