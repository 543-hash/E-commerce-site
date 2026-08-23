import { useEffect } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/format';

const FREE_SHIP_THRESHOLD = 150;

export default function CartDrawer({ onCheckout }: { onCheckout: () => void }) {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    itemCount,
  } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeCart();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeCart]);

  const handleCheckout = () => {
    closeCart();
    onCheckout();
  };

  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIP_THRESHOLD) * 100);

  return (
    <>
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-ink-900/50 backdrop-blur-sm transition-opacity duration-400 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-ink-50 shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-ink-200">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-ink-700" />
            <h2 className="font-serif text-2xl text-ink-900">
              Your Bag
              <span className="text-ink-400 text-base ml-1.5">({itemCount})</span>
            </h2>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="text-ink-600 hover:text-ink-900 hover:rotate-90 transition-all duration-300"
          >
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4">
            <div className="h-20 w-20 rounded-full bg-ink-100 flex items-center justify-center">
              <ShoppingBag size={28} className="text-ink-300" />
            </div>
            <p className="font-serif text-2xl text-ink-900">Your bag is empty</p>
            <p className="text-sm text-ink-500 max-w-xs">
              Discover our latest pieces, made from natural fibers and built to last.
            </p>
            <button
              onClick={closeCart}
              className="mt-2 inline-flex items-center gap-2 bg-ink-900 text-white px-6 py-3 text-xs uppercase tracking-widest2 hover:bg-accent-500 transition-colors"
            >
              Start shopping <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          <>
            <div className="px-6 py-4 border-b border-ink-200">
              <p className="text-xs text-ink-600 mb-2">
                {remaining > 0 ? (
                  <>
                    You're <span className="text-ink-900 font-medium">{formatPrice(remaining)}</span> away from free shipping
                  </>
                ) : (
                  <span className="text-accent-700 font-medium">You've unlocked free shipping</span>
                )}
              </p>
              <div className="h-1.5 bg-ink-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent-500 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 no-scrollbar">
              <ul className="flex flex-col gap-5">
                {items.map((item) => (
                  <li key={`${item.id}-${item.selectedColor}`} className="flex gap-4">
                    <div className="h-28 w-22 shrink-0 overflow-hidden bg-ink-100" style={{ width: '5.5rem' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between gap-2">
                        <h3 className="font-serif text-lg text-ink-900 leading-tight">{item.name}</h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                          className="text-ink-400 hover:text-accent-600 transition-colors self-start"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className="h-3 w-3 rounded-full border border-ink-300"
                          style={{ backgroundColor: item.selectedColor }}
                        />
                        <span className="text-xs text-ink-500">{item.category}</span>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border border-ink-300 rounded-full">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="p-1.5 text-ink-600 hover:text-ink-900 transition-colors"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="text-sm w-6 text-center text-ink-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                            className="p-1.5 text-ink-600 hover:text-ink-900 transition-colors"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <span className="text-sm text-ink-900 font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-ink-200 px-6 py-5 bg-white/50">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-ink-600">Subtotal</span>
                <span className="font-serif text-2xl text-ink-900">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-ink-500 mb-4">
                Shipping & taxes calculated at checkout.
              </p>
              <button
                onClick={handleCheckout}
                className="w-full bg-ink-900 text-white py-4 text-xs uppercase tracking-widest2 hover:bg-accent-500 transition-colors duration-300 flex items-center justify-center gap-2 group"
              >
                Checkout
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={closeCart}
                className="w-full mt-2 py-3 text-xs uppercase tracking-widest2 text-ink-600 hover:text-ink-900 transition-colors"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
