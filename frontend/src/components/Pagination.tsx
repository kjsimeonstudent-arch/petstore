interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  return (
    <div className="flex items-center justify-between rounded-3xl bg-white px-4 py-3 shadow-sm">
      <button
        type="button"
        className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => onPageChange(Math.max(page - 1, 0))}
        disabled={page === 0}
      >
        Previous
      </button>
      <div className="text-sm text-slate-600">
        Page {page + 1} of {totalPages}
      </div>
      <button
        type="button"
        className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => onPageChange(Math.min(page + 1, totalPages - 1))}
        disabled={page >= totalPages - 1}
      >
        Next
      </button>
    </div>
  );
}
