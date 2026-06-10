import { SearchX } from 'lucide-react';

export default function EmptyState({ title, hint, onReset, resetLabel = 'Clear filters' }) {
  return (
    <div className="card mx-auto flex max-w-md flex-col items-center gap-3 px-8 py-14 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mist text-ink-soft">
        <SearchX className="h-7 w-7" aria-hidden="true" />
      </span>
      <h3 className="text-lg font-bold text-forest-dark">{title}</h3>
      {hint && <p className="text-sm text-ink-soft">{hint}</p>}
      {onReset && (
        <button type="button" onClick={onReset} className="btn-outline mt-2 !py-2 text-sm">
          {resetLabel}
        </button>
      )}
    </div>
  );
}
