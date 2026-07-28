import { useState } from 'react';
import { Home, Menu, X, ChevronDown } from 'lucide-react';

const SocialIcon = ({ d }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d={d} /></svg>
);
const SOCIALS = [
  'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
  'M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9 9 0 0 1-2.88 1.1A4.52 4.52 0 0 0 11.9 6.1 12.83 12.83 0 0 1 1.64.89a4.52 4.52 0 0 0 1.4 6.03A4.48 4.48 0 0 1 1 6.4v.06a4.52 4.52 0 0 0 3.62 4.43 4.54 4.54 0 0 1-2.04.08 4.52 4.52 0 0 0 4.22 3.14A9.06 9.06 0 0 1 1 19.54a12.8 12.8 0 0 0 6.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.39-.01-.58A9.17 9.17 0 0 0 23 3z',
  'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zm2-3a2 2 0 1 1 2-2 2 2 0 0 1-2 2z',
];

export default function Navbar({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const navLink = (label, target) => (
    <button
      onClick={() => { setPage(target); setOpen(false); }}
      className={`text-sm font-medium transition-colors hover:text-blue-600 ${page === target ? 'text-blue-600' : 'text-gray-600'}`}
    >
      {label}
    </button>
  );

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => setPage('home')} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Home size={16} className="text-white" />
          </div>
          <span className="text-xl font-extrabold text-gray-900 tracking-tight">
            Prop<span className="text-blue-600">Connect</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLink('Buy', 'home')}
          {navLink('Rent', 'home')}
          {navLink('Agents', 'home')}
          {navLink('About', 'home')}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setDropdown(d => !d)}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 px-3 py-2 transition-colors"
            >
              Dashboards <ChevronDown size={14} />
            </button>
            {dropdown && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-xl w-48 py-1 z-50">
                {[['Client Portal', 'client'], ['Agent Portal', 'agent'], ['Admin Panel', 'admin']].map(([label, target]) => (
                  <button key={target} onClick={() => { setPage(target); setDropdown(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => setPage('client')} className="text-sm font-medium text-gray-600 hover:text-blue-600 px-3 py-2 transition-colors">
            Sign In
          </button>
          <button onClick={() => setPage('agent')} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
            List Property
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-gray-600" onClick={() => setOpen(o => !o)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 px-4 py-4 flex flex-col gap-3 bg-white">
          {[['Home', 'home'], ['Client Portal', 'client'], ['Agent Portal', 'agent'], ['Admin Panel', 'admin']].map(([label, target]) => (
            <button key={target} onClick={() => { setPage(target); setOpen(false); }}
              className="text-left text-sm font-medium text-gray-700 hover:text-blue-600 py-1 transition-colors">
              {label}
            </button>
          ))}
          <button onClick={() => { setPage('agent'); setOpen(false); }}
            className="bg-blue-600 text-white py-2.5 rounded-xl font-semibold text-sm mt-1">
            List Property
          </button>
        </div>
      )}
    </header>
  );
}

export { SocialIcon, SOCIALS };
