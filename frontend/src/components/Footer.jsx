import { Home, Phone } from 'lucide-react';
import { SocialIcon, SOCIALS } from './Navbar';

export default function Footer({ setPage }) {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <button onClick={() => setPage('home')} className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <Home size={14} className="text-white" />
            </div>
            <span className="text-white font-extrabold text-lg">Prop<span className="text-blue-400">Connect</span></span>
          </button>
          <p className="text-sm leading-relaxed">South Africa's trusted property platform connecting buyers, tenants, and agents.</p>
          <div className="flex gap-3 mt-4">
            {SOCIALS.map((d, i) => (
              <a key={i} href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors text-gray-300">
                <SocialIcon d={d} />
              </a>
            ))}
          </div>
        </div>
        {[
          { title: 'Properties', links: ['Buy a Home', 'Rent a Home', 'New Developments', 'Commercial'] },
          { title: 'Company', links: ['About Us', 'Our Agents', 'Careers', 'Press'] },
          { title: 'Support', links: ['Help Centre', 'Contact Us', 'Privacy Policy', 'Terms of Service'] },
        ].map(col => (
          <div key={col.title}>
            <h4 className="text-white font-semibold text-sm mb-3">{col.title}</h4>
            <ul className="flex flex-col gap-2">
              {col.links.map(l => <li key={l}><a href="#" className="text-sm hover:text-white transition-colors">{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
        <p>© {new Date().getFullYear()} PropConnect. All rights reserved.</p>
        <p className="flex items-center gap-1"><Phone size={11} /> +27 10 123 4567 &nbsp;|&nbsp; info@propconnect.co.za</p>
      </div>
    </footer>
  );
}
