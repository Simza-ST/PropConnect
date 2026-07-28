import { Building2, Users, TrendingUp, Star } from 'lucide-react';

const stats = [
  { icon: <Building2 size={22} className="text-blue-500" />, value: '1,200+', label: 'Active Listings' },
  { icon: <Users size={22} className="text-violet-500" />, value: '850+', label: 'Verified Agents' },
  { icon: <TrendingUp size={22} className="text-emerald-500" />, value: 'R2.4B+', label: 'Properties Sold' },
  { icon: <Star size={22} className="text-amber-500" />, value: '4.9 / 5', label: 'Client Rating' },
];

export default function StatsBar() {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">{s.icon}</div>
            <div>
              <p className="text-base font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
