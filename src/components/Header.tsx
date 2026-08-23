import { useEffect, useState } from 'react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { categories, type Filter } from '@/data/products';

export default function Header({
  filter,
  onFilter,
  onOpenSearch,
}: {
  filter: Filter;
  onFilter: (f: Filter) => void;
  onOpenSearch: () => void;
}) {
  const { itemCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (cat: Filter) => {
    onFilter(cat);
    setMobileOpen(false);
    setTimeout(() => {
      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-ink-50/85 backdrop-blur-md border-b border-ink-200/70 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            className="text-ink-900"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <a
          href="#top"
          className={`font-serif text-2xl sm:text-3xl tracking-wide transition-colors ${
            scrolled ? 'text-ink-900' : 'text-ink-900'
          }`}
        >
          MAISON
          <span className="text-accent-500">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleNav(cat)}
              className={`text-xs uppercase tracking-widest2 transition-colors relative group ${
                filter === cat ? 'text-ink-900' : 'text-ink-600 hover:text-ink-900'
              }`}
            >
              {cat}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-accent-500 transition-all duration-300 ${
                  filter === cat ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4 sm:gap-5">
          <button
            onClick={onOpenSearch}
            aria-label="Search"
            className="text-ink-800 hover:text-accent-600 transition-colors"
          >
            <Search size={20} />
          </button>
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative text-ink-800 hover:text-accent-600 transition-colors"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-[10px] font-medium min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center animate-scale-in">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden mt-3 mx-5 rounded-xl bg-ink-50/95 backdrop-blur border border-ink-200 p-4 animate-fade-in">
          <nav className="flex flex-col gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleNav(cat)}
                className={`text-sm uppercase tracking-widest transition-colors py-1 text-left ${
                  filter === cat ? 'text-accent-600' : 'text-ink-700 hover:text-accent-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
