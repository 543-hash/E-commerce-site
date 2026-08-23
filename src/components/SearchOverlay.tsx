import { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/format';

export default function SearchOverlay({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (name: string) => void;
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const results = query.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : products.slice(0, 4);

  const handlePick = (name: string) => {
    onSelect(name);
    setQuery('');
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center animate-fade-in">
      <div className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl mt-20 sm:mt-28 mx-4 bg-ink-50 rounded-xl shadow-2xl overflow-hidden animate-scale-in">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-ink-200">
          <Search size={20} className="text-ink-500" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for pieces, categories..."
            className="flex-1 bg-transparent text-ink-900 placeholder-ink-400 outline-none text-base"
          />
          <button onClick={onClose} aria-label="Close search" className="text-ink-500 hover:text-ink-900 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto no-scrollbar">
          {results.length === 0 ? (
            <div className="px-5 py-10 text-center text-ink-500 text-sm">
              No results for "{query}"
            </div>
          ) : (
            <ul className="divide-y divide-ink-100">
              {results.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => handlePick(p.name)}
                    className="w-full flex items-center gap-4 px-5 py-3 hover:bg-ink-100 transition-colors text-left"
                  >
                    <img src={p.image} alt={p.name} className="h-14 w-12 object-cover rounded" />
                    <div className="flex-1">
                      <p className="font-serif text-lg text-ink-900 leading-tight">{p.name}</p>
                      <p className="text-xs text-ink-500 uppercase tracking-widest2">{p.category}</p>
                    </div>
                    <span className="text-sm text-ink-700">{formatPrice(p.price)}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
