import { useState } from 'react';
import { Heart, Eye, Calendar, Bell, User, Settings, LogOut, MapPin, Bed, Bath } from 'lucide-react';
import { PROPERTIES } from '../data/properties';
import { MY_VIEWINGS, SAVED_PROPERTIES } from '../data/mockData';
import ViewingModal from '../components/ViewingModal';
import Footer from '../components/Footer';

const STATUS_COLORS = {
  Pending: 'bg-amber-100 text-amber-700',
  Confirmed: 'bg-blue-100 text-blue-700',
  Completed: 'bg-emerald-100 text-emerald-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const NAV = [
  { key: 'browse', label: 'Browse', icon: MapPin },
  { key: 'saved', label: 'Saved', icon: Heart },
  { key: 'viewings', label: 'My Viewings', icon: Calendar },
  { key: 'profile', label: 'Profile', icon: User },
];

export default function ClientDashboard({ setPage }) {
  const [tab, setTab] = useState('browse');
  const [selected, setSelected] = useState(null);
  const [saved, setSaved] = useState(SAVED_PROPERTIES);

  const savedProps = PROPERTIES.filter(p => saved.includes(p.id));

  const toggleSave = id => setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-60 bg-white border-r border-gray-100 min-h-screen sticky top-0 pt-6">
          <div className="px-5 mb-8">
            <div className="flex items-center gap-3">
              <img src="https://i.pravatar.cc/150?img=5" alt="Client" className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Lungelo Khumalo</p>
                <p className="text-xs text-gray-400">Client</p>
              </div>
            </div>
          </div>
          <nav className="flex flex-col gap-1 px-3 flex-1">
            {NAV.map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => setTab(key)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${tab === key ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Icon size={17} /> {label}
              </button>
            ))}
          </nav>
          <div className="px-3 pb-6 flex flex-col gap-1">
            <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              <Settings size={17} /> Settings
            </button>
            <button onClick={() => setPage('home')} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
              <LogOut size={17} /> Back to Home
            </button>
          </div>
        </aside>

        {/* Mobile tab bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex z-30">
          {NAV.map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`flex-1 flex flex-col items-center py-3 text-xs font-medium transition-colors ${tab === key ? 'text-blue-600' : 'text-gray-400'}`}>
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>

        {/* Main */}
        <main className="flex-1 p-6 pb-24 md:pb-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {tab === 'browse' && 'Browse Properties'}
                {tab === 'saved' && 'Saved Properties'}
                {tab === 'viewings' && 'My Viewings'}
                {tab === 'profile' && 'My Profile'}
              </h1>
              <p className="text-sm text-gray-400 mt-0.5">Welcome back, Lungelo</p>
            </div>
            <button className="relative p-2 text-gray-400 hover:text-gray-600">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>

          {/* Browse */}
          {tab === 'browse' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {PROPERTIES.map(p => (
                <div key={p.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
                  <div className="relative h-44 overflow-hidden">
                    <img src={p.image} alt={p.title} className="card-img w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <button onClick={() => toggleSave(p.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow">
                      <Heart size={14} className={saved.includes(p.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
                    </button>
                    <p className="absolute bottom-3 left-3 text-white font-bold text-base drop-shadow">
                      R{p.price.toLocaleString()}{p.type === 'rent' && <span className="text-xs font-normal opacity-80">/mo</span>}
                    </p>
                  </div>
                  <div className="p-4 flex flex-col gap-2 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{p.title}</h3>
                    <p className="text-xs text-gray-400 flex items-center gap-1"><MapPin size={11} />{p.location}</p>
                    <div className="flex gap-3 text-xs text-gray-500 mt-1">
                      <span className="flex items-center gap-1"><Bed size={12} className="text-blue-400" />{p.bedrooms}</span>
                      <span className="flex items-center gap-1"><Bath size={12} className="text-blue-400" />{p.bathrooms}</span>
                    </div>
                    <button onClick={() => setSelected(p)}
                      className="mt-auto bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5">
                      <Eye size={13} /> Request Viewing
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Saved */}
          {tab === 'saved' && (
            savedProps.length === 0 ? (
              <div className="text-center py-20">
                <Heart size={40} className="text-gray-200 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No saved properties yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {savedProps.map(p => (
                  <div key={p.id} className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
                    <div className="relative h-44">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                      <button onClick={() => toggleSave(p.id)}
                        className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow">
                        <Heart size={14} className="fill-red-500 text-red-500" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">{p.title}</h3>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mb-3"><MapPin size={11} />{p.location}</p>
                      <p className="text-base font-bold text-gray-900">R{p.price.toLocaleString()}{p.type === 'rent' && <span className="text-xs font-normal text-gray-400">/mo</span>}</p>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {/* Viewings */}
          {tab === 'viewings' && (
            <div className="flex flex-col gap-4">
              {MY_VIEWINGS.map(v => (
                <div key={v.id} className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4">
                  <img src={v.image} alt={v.property} className="w-20 h-16 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">{v.property}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Agent: {v.agent}</p>
                    <p className="text-xs text-gray-400">Date: {v.date}</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full shrink-0 ${STATUS_COLORS[v.status]}`}>{v.status}</span>
                </div>
              ))}
            </div>
          )}

          {/* Profile */}
          {tab === 'profile' && (
            <div className="max-w-lg">
              <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <img src="https://i.pravatar.cc/150?img=5" alt="Profile" className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-100" />
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Lungelo Khumalo</h2>
                    <p className="text-sm text-gray-400">Client since June 2025</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {[['Full Name', 'Lungelo Khumalo'], ['Email', 'lungelo@email.com'], ['Phone', '+27 82 333 4455'], ['Location', 'Johannesburg, SA']].map(([label, val]) => (
                    <div key={label}>
                      <p className="text-xs text-gray-400 mb-1">{label}</p>
                      <input defaultValue={val} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  ))}
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {selected && <ViewingModal property={selected} onClose={() => setSelected(null)} />}
      <Footer setPage={setPage} />
    </div>
  );
}
