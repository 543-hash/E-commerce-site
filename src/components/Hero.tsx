import { ArrowRight } from 'lucide-react';

const heroImage =
  'https://images.pexels.com/photos/38137520/pexels-photo-38137520.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1800';

export default function Hero() {
  return (
    <section id="top" className="relative h-screen min-h-[640px] w-full overflow-hidden">
      <img
        src={heroImage}
        alt="Maison editorial campaign"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-900/70 via-ink-900/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/50 via-transparent to-ink-900/20" />

      <div className="relative z-10 h-full mx-auto max-w-7xl px-5 sm:px-8 flex flex-col justify-end pb-20 sm:pb-28">
        <div className="max-w-xl">
          <p className="text-white/80 text-xs sm:text-sm uppercase tracking-widest2 mb-5 animate-fade-up">
            Autumn / Winter 2026 Collection
          </p>
          <h1
            className="font-serif text-white text-5xl sm:text-7xl leading-[1.05] mb-6 animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            Quiet luxury,
            <br />
            <span className="italic text-accent-200">crafted to last.</span>
          </h1>
          <p
            className="text-white/85 text-base sm:text-lg max-w-md mb-9 leading-relaxed animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            Timeless essentials in natural fibers. Designed in our atelier, made to
            be worn for years, not seasons.
          </p>
          <div
            className="flex flex-wrap items-center gap-4 animate-fade-up"
            style={{ animationDelay: '0.3s' }}
          >
            <a
              href="#shop"
              className="group inline-flex items-center gap-2 bg-white text-ink-900 px-7 py-3.5 text-sm uppercase tracking-widest2 hover:bg-accent-500 hover:text-white transition-colors duration-300"
            >
              Shop the collection
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#editorial"
              className="inline-flex items-center gap-2 text-white border border-white/40 px-7 py-3.5 text-sm uppercase tracking-widest2 hover:bg-white/10 transition-colors duration-300"
            >
              View lookbook
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-white/60">
        <span className="text-[10px] uppercase tracking-widest2">Scroll</span>
        <span className="h-10 w-px bg-white/40 animate-pulse" />
      </div>
    </section>
  );
}
