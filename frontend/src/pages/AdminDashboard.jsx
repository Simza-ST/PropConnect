import { useState } from 'react';
import {
  LayoutDashboard, Users, List, Eye, Settings,
  LogOut, Bell, Shield, TrendingUp, Building2,
  CheckCircle, XCircle, Trash2, AlertTriangle,
} from 'lucide-react';
import { PROPERTIES } from '../data/properties';
import { VIEWING_REQUESTS, USERS } from '../data/mockData';
import Footer from '../components/Footer';

const STATUS_COLORS = {
  Pending: 'bg-amber-100 text-amber-700',
  Confirmed: 'bg-blue-100 text-blue-700',
  Completed: 'bg-emerald-100 text-emerald-700',
  Cancelled: 'bg-red-100 text-red-700',
  Active: 'bg-emerald-100 text-emerald-700',
  Suspended: 'bg-red-100 text-red-700',
};

const NAV = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'listings', label: 'All Listings', icon: List },
  { key: 'users', label: 'Users', icon: Users },
  { key: 'viewings', label: 'Viewings', icon: Eye },
  { key: 'settings', label: 'Settings', icon: Settings },
];

export default function AdminDashboard({ setPage }) {
  const [tab, setTab] = useState('overview');
  const [users, setUsers] = useState(USERS);
  const [listings, setListings] = useState(PROPERTIES);

  const toggleUserStatus = id => setUsers(u => u.map(x => x.id === id ? { ...x, status: x.status === 'Active' ? 'Suspended' : 'Active' } : x));
  const deleteListing = id => setListings(l => l.filter(x => x.id !== id));

  const overviewStats = [
    { label: 'Total Listings', value: listings.length, icon: <Building2 size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Registered Users', value: users.length, icon: <Users size={20} />, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Viewing Requests', value: VIEWING_REQUESTS.length, icon: <Eye size={20} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Active Agents', value: users.filter(u => u.role === 'Agent' && u.status === 'Active').length, icon: <TrendingUp size={20} />, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-60 bg-gray-900 min-h-screen sticky top-0 pt-6">
          <div className="px-5 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield size={16} className="text-white" />
              </div>
              <span className="text-white font-extrabold text-base">Admin Panel</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">AD</div>
              <div>
                <p className="text-sm font-semibold text-white">Admin User</p>
                <p className="text-xs text-gray-400">System Administrator</p>
              </div>
            </div>
          </div>
          <nav className="flex flex-col gap-1 px-3 flex-1">
            {NAV.map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => setTab(key)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${tab === key ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
                <Icon size={17} /> {label}
              </button>
            ))}
          </nav>
          <div className="px-3 pb-6">
            <button onClick={() => setPage('home')} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-gray-800 transition-colors w-full">
              <LogOut size={17} /> Back to Home
            </button>
          </div>
        </aside>

        {/* Mobile tab bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 flex z-30">
          {NAV.map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`flex-1 flex flex-col items-center py-3 text-xs font-medium transition-colors ${tab === key ? 'text-blue-400' : 'text-gray-500'}`}>
              <Icon size={18} />{label}
            </button>
          ))}
        </div>

        <main className="flex-1 p-6 pb-24 md:pb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{NAV.find(n => n.key === tab)?.label}</h1>
              <p className="text-sm text-gray-400 mt-0.5">PropConnect Administration</p>
            </div>
            <button className="relative p-2 text-gray-400 hover:text-gray-600">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>

          {/* Overview */}
          {tab === 'overview' && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {overviewStats.map(s => (
                  <div key={s.label} className={`${s.bg} rounded-2xl p-5`}>
                    <div className={`${s.color} mb-2`}>{s.icon}</div>
                    <p className={`text-3xl font-extrabold ${s.color}`}>{s.value}</p>
                    <p className="text-sm text-gray-600 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-base font-semibold text-gray-900 mb-3">Recent Users</h2>
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    {users.slice(0, 5).map(u => (
                      <div key={u.id} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs shrink-0">
                          {u.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{u.name}</p>
                          <p className="text-xs text-gray-400">{u.role}</p>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[u.status]}`}>{u.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900 mb-3">Recent Viewings</h2>
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    {VIEWING_REQUESTS.slice(0, 5).map(r => (
                      <div key={r.id} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{r.client}</p>
                          <p className="text-xs text-gray-400 truncate">{r.property}</p>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${STATUS_COLORS[r.status]}`}>{r.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Analytics */}
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-3">Platform Analytics</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'New Listings This Month', value: '24', change: '+12%' },
                    { label: 'Viewing Conversion Rate', value: '38%', change: '+5%' },
                    { label: 'Avg. Listing Price', value: 'R2.8M', change: '+8%' },
                  ].map(s => (
                    <div key={s.label} className="bg-white rounded-2xl shadow-sm p-5">
                      <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                      <p className="text-2xl font-extrabold text-gray-900">{s.value}</p>
                      <p className="text-xs text-emerald-600 font-medium mt-1">{s.change} this month</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* All Listings */}
          {tab === 'listings' && (
            <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
              <table className="w-full text-sm min-w-[600px]">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                  <tr>
                    {['Property', 'Agent', 'Type', 'Price', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {listings.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt={p.title} className="w-10 h-10 rounded-lg object-cover" />
                          <span className="font-medium text-gray-900 truncate max-w-[140px]">{p.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{p.agent.name}</td>
                      <td className="px-4 py-3 text-gray-500 capitalize">{p.type}</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">R{p.price.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button className="p-1.5 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"><CheckCircle size={15} /></button>
                          <button className="p-1.5 text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"><AlertTriangle size={15} /></button>
                          <button onClick={() => deleteListing(p.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Users */}
          {tab === 'users' && (
            <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
              <table className="w-full text-sm min-w-[600px]">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                  <tr>
                    {['User', 'Email', 'Role', 'Joined', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs shrink-0">
                            {u.name.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-900">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{u.email}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${u.role === 'Agent' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{u.joined}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[u.status]}`}>{u.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => toggleUserStatus(u.id)}
                            className={`p-1.5 rounded-lg transition-colors ${u.status === 'Active' ? 'text-amber-500 hover:bg-amber-50' : 'text-emerald-500 hover:bg-emerald-50'}`}>
                            {u.status === 'Active' ? <XCircle size={15} /> : <CheckCircle size={15} />}
                          </button>
                          <button className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Viewings */}
          {tab === 'viewings' && (
            <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
              <table className="w-full text-sm min-w-[600px]">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                  <tr>
                    {['Client', 'Email', 'Property', 'Date', 'Status'].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {VIEWING_REQUESTS.map(r => (
                    <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900">{r.client}</td>
                      <td className="px-4 py-3 text-gray-500">{r.email}</td>
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
          )}

          {/* Settings */}
          {tab === 'settings' && (
            <div className="max-w-lg flex flex-col gap-5">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-base font-bold text-gray-900 mb-4">Platform Settings</h2>
                <div className="flex flex-col gap-4">
                  {[['Site Name', 'PropConnect'], ['Support Email', 'support@propconnect.co.za'], ['Contact Number', '+27 10 123 4567'], ['Featured Listings Limit', '6']].map(([label, val]) => (
                    <div key={label}>
                      <p className="text-xs text-gray-400 mb-1">{label}</p>
                      <input defaultValue={val} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  ))}
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Listing Moderation</p>
                      <p className="text-xs text-gray-400">Require admin approval before listings go live</p>
                    </div>
                    <div className="w-10 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                      <p className="text-xs text-gray-400">Require 2FA for admin login</p>
                    </div>
                    <div className="w-10 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
                    </div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors mt-2">
                    Save Settings
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-base font-bold text-gray-900 mb-4">Export Reports</h2>
                <div className="flex flex-col gap-3">
                  {['Listings Report (CSV)', 'Users Report (CSV)', 'Viewings Report (PDF)', 'Full Audit Log (PDF)'].map(r => (
                    <button key={r} className="flex items-center justify-between px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors">
                      {r}
                      <span className="text-xs text-gray-400">Download</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}
