import { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

export default function ViewingModal({ property, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(10,15,30,0.75)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors">
          <X size={20} />
        </button>
        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Request Sent!</h3>
            <p className="text-gray-500 text-sm mb-1">
              <span className="font-medium text-gray-700">{property.agent.name}</span> will contact you shortly.
            </p>
            <p className="text-gray-400 text-xs mb-6">{property.agent.phone}</p>
            <button onClick={onClose} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
              Done
            </button>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-center gap-3 mb-5">
              <img src={property.agent.avatar} alt={property.agent.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Your Agent</p>
                <p className="text-sm font-semibold text-gray-800">{property.agent.name}</p>
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Request a Viewing</h3>
            <p className="text-sm text-gray-500 mb-5 truncate">{property.title}</p>
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="flex flex-col gap-3">
              <input required name="name" placeholder="Full Name" value={form.name} onChange={handle}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input required name="email" type="email" placeholder="Email Address" value={form.email} onChange={handle}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input required name="phone" placeholder="Phone Number" value={form.phone} onChange={handle}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input required name="date" type="date" value={form.date} onChange={handle}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <textarea name="message" placeholder="Optional message..." rows={3} value={form.message} onChange={handle}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              <button type="submit" className="bg-blue-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors mt-1">
                Confirm Viewing Request
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
