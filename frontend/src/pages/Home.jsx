import { useState } from 'react';
import { Search, ArrowRight, ChevronDown } from 'lucide-react';
import { PROPERTIES } from '../data/properties';
import PropertyCard from '../components/PropertyCard';
import ViewingModal from '../components/ViewingModal';
import StatsBar from '../components/StatsBar';
import Footer from '../components/Footer';

export default function Home({ setPage }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [selected, setSelected] = useState(null);

  const displayed = PROPERTIES
    .filter(p => filter === 'all' || p.type === filter)
    .filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : 0);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="hero-bg py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-blue-600/20 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-widest border border-blue-500/30">
            South Africa's Premier Property Platform
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Find Your Perfect<br />
            <span className="text-blue-400">Property Today</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg mb-8 max-w-xl mx-auto">
            Browse thousands of verified listings across South Africa. Buy, rent, or list your property with confidence.
          </p>
          <div className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
            <div className="flex items-center gap-2 flex-1 px-3">
              <Search size={18} className="text-gray-400 shrink-0" />
              <input type="text" placeholder="Search by area, suburb, or street..."
                value={search} onChange={e => setSearch(e.target.value)}
                className="flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none py-2" />
            </div>
            <div className="flex gap-1 px-1">
              {[['all', 'All'], ['sale', 'Buy'], ['rent', 'Rent']].map(([val, label]) => (
                <button key={val} onClick={() => setFilter(val)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${filter === val ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                  {label}
                </button>
              ))}
            </div>
            <a href="#listings" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 justify-center transition-colors">
              Search <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      <StatsBar />

      {/* Listings */}
      <main id="listings" className="max-w-7xl mx-auto px-4 py-12 flex-1 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {filter === 'all' ? 'All Properties' : filter === 'sale' ? 'Properties for Sale' : 'Properties for Rent'}
            </h2>
            <p className="text-sm text-gray-400 mt-0.5">{displayed.length} listing{displayed.length !== 1 ? 's' : ''} found</p>
          </div>
          <div className="relative">
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="appearance-none bg-white border border-gray-200 text-sm text-gray-600 pl-3 pr-8 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {displayed.length === 0 ? (
          <div className="text-center py-20">
            <Search size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No properties found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayed.map(p => <PropertyCard key={p.id} property={p} onView={setSelected} />)}
          </div>
        )}
      </main>

      {/* CTA */}
      <section className="bg-blue-600 py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Are You a Property Agent?</h2>
          <p className="text-blue-100 text-sm md:text-base mb-6 max-w-xl mx-auto">
            Join PropConnect and reach thousands of qualified buyers and tenants. Manage listings, track viewings, and grow your business.
          </p>
          <button onClick={() => setPage('agent')} className="bg-white text-blue-600 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm">
            Register as an Agent
          </button>
        </div>
      </section>

      <Footer setPage={setPage} />
      {selected && <ViewingModal property={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
