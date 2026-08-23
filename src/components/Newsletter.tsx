import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <section id="editorial" className="relative overflow-hidden bg-ink-900 text-white py-24 sm:py-32">
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: 'radial-gradient(circle at 20% 30%, #f8d2ad 0, transparent 40%), radial-gradient(circle at 80% 70%, #dc6f25 0, transparent 40%)',
      }} />
      <div className="relative mx-auto max-w-2xl px-5 sm:px-8 text-center">
        <p className="text-xs uppercase tracking-widest2 text-accent-300 mb-4">Join the house</p>
        <h2 className="font-serif text-4xl sm:text-5xl leading-tight mb-5">
          Early access to new arrivals
        </h2>
        <p className="text-white/70 text-base sm:text-lg max-w-md mx-auto mb-9 leading-relaxed">
          Be the first to know when we release new pieces, private sales, and editorial stories.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full bg-transparent border border-white/30 focus:border-accent-400 px-5 py-3.5 text-sm text-white placeholder-white/50 outline-none transition-colors"
          />
          <button
            type="submit"
            className="w-full sm:w-auto shrink-0 bg-white text-ink-900 px-7 py-3.5 text-xs uppercase tracking-widest2 hover:bg-accent-500 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 group"
          >
            {submitted ? (
              <>
                <Check size={15} /> Subscribed
              </>
            ) : (
              <>
                Subscribe <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
        <p className="text-xs text-white/40 mt-5">
          No spam, only good things. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
