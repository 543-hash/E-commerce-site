import { useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import SearchOverlay from '@/components/SearchOverlay';
import CheckoutModal from '@/components/CheckoutModal';
import { products, type Filter } from '@/data/products';

export default function App() {
  const [filter, setFilter] = useState<Filter>('All');
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleSearchSelect = (name: string) => {
    const match = products.find((p) => p.name === name);
    if (match) {
      setFilter(match.category);
    }
    setSearchOpen(false);
    setTimeout(() => {
      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  return (
    <CartProvider>
      <Header
        filter={filter}
        onFilter={setFilter}
        onOpenSearch={() => setSearchOpen(true)}
      />
      <main>
        <Hero />
        <ProductGrid filter={filter} />
        <Newsletter />
      </main>
      <Footer />
      <CartDrawer onCheckout={() => setCheckoutOpen(true)} />
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={handleSearchSelect}
      />
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </CartProvider>
  );
}
