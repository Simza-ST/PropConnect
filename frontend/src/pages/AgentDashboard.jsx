import { useState } from 'react';
import {
  LayoutDashboard, PlusCircle, List, Inbox, User,
  Settings, LogOut, Bell, Eye, Edit, Trash2, CheckCircle, XCircle, Clock,
} from 'lucide-react';
import { PROPERTIES } from '../data/properties';
import { VIEWING_REQUESTS } from '../data/mockData';
import Footer from '../components/Footer';

const STATUS_COLORS = {
  Pending: 'bg-amber-100 text-amber-700',
  Confirmed: 'bg-blue-100 text-blue-700',
  Completed: 'bg-emerald-100 text-emerald-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const MY_LISTINGS = PROPERTIES.filter(p => p.agent.name === 'Sarah Mokoena');

const NAV = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'listings', label: 'My Listings', icon: List },
  { key: 'add', label: 'Add Listing', icon: PlusCircle },
  { key: 'inbox', label: 'Viewing Inbox', icon: Inbox },
  { key: 'profile', label: 'Profile', icon: User },
];

export default function AgentDashboard({ setPage }) {
  const [tab, setTab] = useState('overview');
  const [requests, setRequests] = useState(VIEWING_REQUESTS);
  const [form, setForm] = useState({ title: '', type: 'sale', price: '', bedrooms: '', bathrooms: '', garages: '', size: '', location: '', description: '' });
  const [formSaved, setFormSaved] = useState(false);

  const updateStatus = (id, status) => setRequests(r => r.map(x => x.id === id ? { ...x, status } : x));
  const handleForm = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const stats = [
    { label: 'Active Listings', value: MY_LISTINGS.length, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending Requests', value: requests.filter(r => r.status === 'Pending').length, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Confirmed Viewings', value: requests.filter(r => r.status === 'Confirmed').length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Completed', value: requests.filter(r => r.status === 'Completed').length, color: 'text-violet-600', bg: 'bg-violet-50' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-60 bg-white border-r border-gray-100 min-h-screen sticky top-0 pt-6">
          <div className="px-5 mb-8">
            <div className="flex items-center gap-3">
              <img src="https://i.pravatar.cc/150?img=47" alt="Agent" className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Sarah Mokoena</p>
                <p className="text-xs text-blue-500 font-medium">Property Agent</p>
              </div>
            </div>
          </div>
          <nav className="flex flex-col gap-1 px-3 flex-1">
            {NAV.map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => setTab(key)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${tab === key ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Icon size={17} /> {label}
                {key === 'inbox' && requests.filter(r => r.status === 'Pending').length > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {requests.filter(r => r.status === 'Pending').length}
                  </span>
                )}
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
              <Icon size={18} />{label}
            </button>
          ))}
        </div>

        <main className="flex-1 p-6 pb-24 md:pb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {NAV.find(n => n.key === tab)?.label}
              </h1>
              <p className="text-sm text-gray-400 mt-0.5">Agent Portal</p>
            </div>
            <button className="relative p-2 text-gray-400 hover:text-gray-600">
              <Bell size={20} />
              {requests.filter(r => r.status === 'Pending').length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
          </div>

          {/* Overview */}
          {tab === 'overview' && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map(s => (
                  <div key={s.label} className={`${s.bg} rounded-2xl p-5`}>
                    <p className={`text-3xl font-extrabold ${s.color}`}>{s.value}</p>
                    <p className="text-sm text-gray-600 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-3">Recent Viewing Requests</h2>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                      <tr>
                        {['Client', 'Property', 'Date', 'Status'].map(h => (
                          <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {requests.slice(0, 4).map(r => (
                        <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 font-medium text-gray-900">{r.client}</td>
                          <td className="px-4 py-3 text-gray-500 truncate max-w-[160px]">{r.property}</td>
                          <td className="px-4 py-3 text-gray-500">{r.date}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[r.status]}`}>{r.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-3">My Listings</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {MY_LISTINGS.map(p => (
                    <div key={p.id} className="bg-white rounded-2xl shadow-sm flex gap-4 p-4 items-center">
                      <img src={p.image} alt={p.title} className="w-20 h-16 rounded-xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">{p.title}</h3>
                        <p className="text-xs text-gray-400">{p.location}</p>
                        <p className="text-sm font-bold text-blue-600 mt-1">R{p.price.toLocaleString()}</p>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${p.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* My Listings */}
          {tab === 'listings' && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                  <tr>
                    {['Property', 'Type', 'Price', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {MY_LISTINGS.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt={p.title} className="w-10 h-10 rounded-lg object-cover" />
                          <span className="font-medium text-gray-900 truncate max-w-[160px]">{p.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500 capitalize">{p.type}</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">R{p.price.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Eye size={15} /></button>
                          <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"><Edit size={15} /></button>
                          <button className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Add Listing */}
          {tab === 'add' && (
            <div className="max-w-2xl">
              {formSaved ? (
                <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Listing Submitted!</h3>
                  <p className="text-gray-500 text-sm mb-6">Your property has been submitted for review.</p>
                  <button onClick={() => setFormSaved(false)} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
                    Add Another
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-5">New Property Listing</h2>
                  <form onSubmit={e => { e.preventDefault(); setFormSaved(true); }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: 'title', label: 'Property Title', span: true },
                      { name: 'location', label: 'Location / Address', span: true },
                      { name: 'price', label: 'Price (R)', type: 'number' },
                      { name: 'size', label: 'Floor Size (m²)', type: 'number' },
                      { name: 'bedrooms', label: 'Bedrooms', type: 'number' },
                      { name: 'bathrooms', label: 'Bathrooms', type: 'number' },
                      { name: 'garages', label: 'Garages', type: 'number' },
                    ].map(({ name, label, type = 'text', span }) => (
                      <div key={name} className={span ? 'sm:col-span-2' : ''}>
                        <label className="text-xs text-gray-500 mb-1 block">{label}</label>
                        <input required name={name} type={type} value={form[name]} onChange={handleForm}
                          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    ))}
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Listing Type</label>
                      <select name="type" value={form.type} onChange={handleForm}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="sale">For Sale</option>
                        <option value="rent">For Rent</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs text-gray-500 mb-1 block">Description</label>
                      <textarea required name="description" rows={4} value={form.description} onChange={handleForm}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs text-gray-500 mb-1 block">Upload Images</label>
                      <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center text-gray-400 text-sm hover:border-blue-400 transition-colors cursor-pointer">
                        Click to upload or drag & drop (up to 20 images)
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors">
                        Submit Listing
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* Inbox */}
          {tab === 'inbox' && (
            <div className="flex flex-col gap-4">
              {requests.map(r => (
                <div key={r.id} className="bg-white rounded-2xl shadow-sm p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{r.client}</h3>
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${STATUS_COLORS[r.status]}`}>{r.status}</span>
                      </div>
                      <p className="text-xs text-gray-500">{r.property} · {r.date}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{r.email} · {r.phone}</p>
                      {r.message && <p className="text-xs text-gray-500 mt-1 italic">"{r.message}"</p>}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => updateStatus(r.id, 'Confirmed')}
                        className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-2 rounded-xl transition-colors">
                        <CheckCircle size={13} /> Confirm
                      </button>
                      <button onClick={() => updateStatus(r.id, 'Cancelled')}
                        className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold px-3 py-2 rounded-xl transition-colors">
                        <XCircle size={13} /> Cancel
                      </button>
                      <button onClick={() => updateStatus(r.id, 'Pending')}
                        className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-semibold px-3 py-2 rounded-xl transition-colors">
                        <Clock size={13} /> Pending
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Profile */}
          {tab === 'profile' && (
            <div className="max-w-lg">
              <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <img src="https://i.pravatar.cc/150?img=47" alt="Agent" className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-100" />
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Sarah Mokoena</h2>
                    <p className="text-sm text-blue-500 font-medium">Property Agent · PropConnect</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {[['Full Name', 'Sarah Mokoena'], ['Email', 'sarah@propconnect.co.za'], ['Phone', '+27 82 111 2233'], ['Agency', 'PropConnect Realty'], ['Bio', 'Specialist in luxury residential properties across Gauteng and Western Cape.']].map(([label, val]) => (
                    <div key={label}>
                      <p className="text-xs text-gray-400 mb-1">{label}</p>
                      {label === 'Bio'
                        ? <textarea defaultValue={val} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                        : <input defaultValue={val} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      }
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
      <Footer setPage={setPage} />
    </div>
  );
}
