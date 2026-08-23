import { Instagram, Twitter, Facebook } from 'lucide-react';

const columns = [
  { title: 'Shop', links: ['New Arrivals', 'Women', 'Men', 'Accessories', 'Sale'] },
  { title: 'House', links: ['Our Story', 'Sustainability', 'Craftsmanship', 'Careers'] },
  { title: 'Support', links: ['Shipping', 'Returns', 'Size Guide', 'Contact'] },
];

export default function Footer() {
  return (
    <footer className="bg-ink-50 border-t border-ink-200">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <a href="#top" className="font-serif text-3xl text-ink-900">
              MAISON<span className="text-accent-500">.</span>
            </a>
            <p className="text-sm text-ink-600 mt-4 max-w-xs leading-relaxed">
              Considered clothing in natural fibers. Designed in our atelier and made
              to be worn for years to come.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#top"
                  aria-label="Social link"
                  className="h-9 w-9 rounded-full border border-ink-300 flex items-center justify-center text-ink-700 hover:bg-ink-900 hover:text-white hover:border-ink-900 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs uppercase tracking-widest2 text-ink-900 mb-4">{col.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#shop" className="text-sm text-ink-600 hover:text-accent-600 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-ink-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink-500">
            © {new Date().getFullYear()} Maison. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="#top" className="text-xs text-ink-500 hover:text-ink-900 transition-colors">Privacy</a>
            <a href="#top" className="text-xs text-ink-500 hover:text-ink-900 transition-colors">Terms</a>
            <a href="#top" className="text-xs text-ink-500 hover:text-ink-900 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
