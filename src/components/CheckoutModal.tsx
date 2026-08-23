import { useState } from 'react';
import { X, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/format';
import { supabase } from '@/lib/supabase';

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

interface OrderResult {
  orderNumber: string;
  email: string;
}

const SHIPPING = 0; // free shipping demo
const TAX_RATE = 0.08;

export default function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const { items, subtotal, clearCart, itemCount } = useCart();
  const [form, setForm] = useState({
    customer_name: '',
    email: '',
    address: '',
    city: '',
    postal_code: '',
    country: 'United States',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [order, setOrder] = useState<OrderResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = subtotal + SHIPPING + tax;

  const update = (field: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setStatus('submitting');
    setErrorMsg('');

    const payload = {
      ...form,
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        selectedColor: i.selectedColor,
      })),
      subtotal: total,
    };

    const { data, error } = await supabase
      .from('orders')
      .insert(payload)
      .select('order_number, email')
      .single();

    if (error || !data) {
      setStatus('error');
      setErrorMsg(error?.message ?? 'Something went wrong placing your order.');
      return;
    }

    setOrder({ orderNumber: data.order_number, email: data.email });
    setStatus('success');
    clearCart();
  };

  const handleClose = () => {
    if (status === 'success') {
      setOrder(null);
      setStatus('idle');
      setForm({
        customer_name: '',
        email: '',
        address: '',
        city: '',
        postal_code: '',
        country: 'United States',
      });
    }
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start sm:items-center justify-center px-4 py-8 overflow-y-auto">
      <div className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm animate-fade-in" onClick={handleClose} />

      <div className="relative w-full max-w-lg bg-ink-50 rounded-xl shadow-2xl my-auto animate-scale-in">
        <button
          onClick={handleClose}
          aria-label="Close checkout"
          className="absolute top-4 right-4 text-ink-500 hover:text-ink-900 transition-colors z-10"
        >
          <X size={22} />
        </button>

        {status === 'success' && order ? (
          <div className="px-6 py-12 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-5 animate-scale-in">
              <CheckCircle2 size={32} className="text-green-600" />
            </div>
            <h2 className="font-serif text-3xl text-ink-900 mb-3">Order confirmed</h2>
            <p className="text-ink-600 mb-1">Thank you for your purchase.</p>
            <p className="text-sm text-ink-500 mb-6">
              A confirmation has been sent to <span className="text-ink-800">{order.email}</span>
            </p>
            <div className="bg-white border border-ink-200 rounded-lg px-5 py-4 mb-6 inline-block">
              <p className="text-xs uppercase tracking-widest2 text-ink-500 mb-1">Order number</p>
              <p className="font-serif text-2xl text-ink-900">{order.orderNumber}</p>
            </div>
            <button
              onClick={handleClose}
              className="w-full bg-ink-900 text-white py-3.5 text-xs uppercase tracking-widest2 hover:bg-accent-500 transition-colors"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <div className="px-6 py-7">
            <h2 className="font-serif text-3xl text-ink-900 mb-1">Checkout</h2>
            <p className="text-sm text-ink-500 mb-6">{itemCount} item{itemCount !== 1 ? 's' : ''} in your bag</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Full name" value={form.customer_name} onChange={(v) => update('customer_name', v)} required />
                <Field label="Email" type="email" value={form.email} onChange={(v) => update('email', v)} required />
              </div>
              <Field label="Address" value={form.address} onChange={(v) => update('address', v)} required />
              <div className="grid grid-cols-2 gap-3">
                <Field label="City" value={form.city} onChange={(v) => update('city', v)} required />
                <Field label="Postal code" value={form.postal_code} onChange={(v) => update('postal_code', v)} required />
              </div>
              <Field label="Country" value={form.country} onChange={(v) => update('country', v)} required />

              <div className="border-t border-ink-200 pt-4 space-y-1.5 text-sm">
                <Row label="Subtotal" value={formatPrice(subtotal)} />
                <Row label="Shipping" value="Free" />
                <Row label="Tax (8%)" value={formatPrice(tax)} />
                <div className="flex justify-between pt-2 mt-2 border-t border-ink-200">
                  <span className="font-medium text-ink-900">Total</span>
                  <span className="font-serif text-2xl text-ink-900">{formatPrice(total)}</span>
                </div>
              </div>

              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting' || items.length === 0}
                className="w-full bg-ink-900 text-white py-4 text-xs uppercase tracking-widest2 hover:bg-accent-500 transition-colors duration-300 flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Placing order...
                  </>
                ) : (
                  <>
                    Place order — {formatPrice(total)}
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest2 text-ink-500 block mb-1.5">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-ink-300 px-3.5 py-2.5 text-sm text-ink-900 placeholder-ink-400 outline-none focus:border-accent-500 transition-colors rounded-md"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-ink-600">
      <span>{label}</span>
      <span className="text-ink-900">{value}</span>
    </div>
  );
}
