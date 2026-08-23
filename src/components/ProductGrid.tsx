import { useMemo } from 'react';
import { filterProducts, type Filter } from '@/data/products';
import ProductCard from './ProductCard';

export default function ProductGrid({ filter }: { filter: Filter }) {
  const filtered = useMemo(() => filterProducts(filter), [filter]);

  return (
    <section id="shop" className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28 scroll-mt-20">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-widest2 text-accent-600 mb-3">The Collection</p>
        <h2 className="font-serif text-4xl sm:text-5xl text-ink-900 leading-tight">
          Pieces worth keeping
        </h2>
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-serif text-2xl text-ink-900 mb-2">No pieces found</p>
          <p className="text-sm text-ink-500">Try a different category or search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className="animate-fade-up"
              style={{ animationDelay: `${Math.min(i, 6) * 0.06}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
