import { useEffect, useState } from 'react';

function PropertyCard({ property }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-800">{property.title}</h2>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${property.type === 'rent' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
          {property.type === 'rent' ? 'For Rent' : 'For Sale'}
        </span>
      </div>
      <p className="text-sm text-gray-500">{property.location}</p>
      <p className="text-xl font-bold text-gray-900">
        R{property.price.toLocaleString()}
        {property.type === 'rent' && <span className="text-sm font-normal text-gray-500">/mo</span>}
      </p>
      <p className="text-sm text-gray-500">{property.bedrooms} Bedrooms</p>
    </div>
  );
}

export default function App() {
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = filter !== 'all' ? `?type=${filter}` : '';
    fetch(`/api/properties${query}`)
      .then(res => res.json())
      .then(data => { setProperties(data); setLoading(false); })
      .catch(() => { setError('Failed to load properties'); setLoading(false); });
  }, [filter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">PropConnect</h1>
          <nav className="flex gap-4 text-sm text-gray-600">
            <a href="#" className="hover:text-blue-600">Buy</a>
            <a href="#" className="hover:text-blue-600">Rent</a>
            <a href="#" className="hover:text-blue-600">List Property</a>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6 flex gap-2">
          {['all', 'sale', 'rent'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === f ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border hover:border-blue-400'}`}
            >
              {f === 'all' ? 'All' : f === 'sale' ? 'For Sale' : 'For Rent'}
            </button>
          ))}
        </div>

        {loading && <p className="text-gray-500">Loading properties...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {properties.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        )}
      </main>
    </div>
  );
}
