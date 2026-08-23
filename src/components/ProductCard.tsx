import { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import type { Product } from '@/data/products';
import { formatPrice } from '@/lib/format';
import { useCart } from '@/context/CartContext';

const tagStyles: Record<string, string> = {
  New: 'bg-accent-500 text-white',
  Bestseller: 'bg-ink-900 text-white',
  Limited: 'bg-white text-ink-900 border border-ink-300',
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, selectedColor);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-ink-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {product.tag && (
          <span
            className={`absolute top-3 left-3 text-[10px] uppercase tracking-widest2 px-2.5 py-1 ${tagStyles[product.tag]}`}
          >
            {product.tag}
          </span>
        )}

        <button
          onClick={handleAdd}
          className="absolute bottom-0 left-0 right-0 bg-ink-900/95 text-white py-3.5 text-xs uppercase tracking-widest2 translate-y-full group-hover:translate-y-0 transition-transform duration-400 flex items-center justify-center gap-2 hover:bg-accent-500"
        >
          {justAdded ? (
            <>
              <Check size={15} /> Added
            </>
          ) : (
            <>
              <Plus size={15} /> Add to bag
            </>
          )}
        </button>
      </div>

      <div className="mt-4 px-0.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-xl text-ink-900 leading-tight">{product.name}</h3>
          <span className="text-sm text-ink-700 mt-1">{formatPrice(product.price)}</span>
        </div>

        <div className="mt-2.5 flex items-center gap-2">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              aria-label={`Select color ${color}`}
              className={`h-4 w-4 rounded-full border transition-all ${
                selectedColor === color
                  ? 'ring-1 ring-offset-2 ring-offset-ink-50 ring-ink-900 border-ink-300 scale-110'
                  : 'border-ink-300'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
