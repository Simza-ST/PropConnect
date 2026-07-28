import { useState } from 'react';
import { MapPin, Bed, Bath, Car, Maximize2, Heart, Share2, Eye } from 'lucide-react';

export default function PropertyCard({ property, onView }) {
  const [liked, setLiked] = useState(false);
  const isSale = property.type === 'sale';
  const statusColors = {
    Available: 'bg-emerald-100 text-emerald-700',
    'Under Offer': 'bg-amber-100 text-amber-700',
    'Sold/Let': 'bg-red-100 text-red-700',
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      <div className="relative overflow-hidden h-52">
        <img src={property.image} alt={property.title} className="card-img w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isSale ? 'bg-blue-600 text-white' : 'bg-violet-600 text-white'}`}>
            {isSale ? 'For Sale' : 'For Rent'}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[property.status] ?? 'bg-gray-100 text-gray-600'}`}>
            {property.status}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          <button onClick={() => setLiked(l => !l)}
            className="w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors shadow">
            <Heart size={14} className={liked ? 'fill-red-500 text-red-500' : 'text-gray-500'} />
          </button>
          <button className="w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors shadow">
            <Share2 size={14} className="text-gray-500" />
          </button>
        </div>
        <div className="absolute bottom-3 left-3">
          <p className="text-white font-bold text-lg drop-shadow">
            R{property.price.toLocaleString()}
            {!isSale && <span className="text-sm font-normal opacity-80">/mo</span>}
          </p>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="font-semibold text-gray-900 text-base leading-snug">{property.title}</h3>
          <p className="text-sm text-gray-400 flex items-center gap-1 mt-0.5">
            <MapPin size={12} /> {property.location}
          </p>
        </div>
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{property.description}</p>
        <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-gray-100 pt-3">
          <span className="flex items-center gap-1"><Bed size={13} className="text-blue-400" /> {property.bedrooms} Beds</span>
          <span className="flex items-center gap-1"><Bath size={13} className="text-blue-400" /> {property.bathrooms} Baths</span>
          <span className="flex items-center gap-1"><Car size={13} className="text-blue-400" /> {property.garages}</span>
          <span className="flex items-center gap-1 ml-auto"><Maximize2 size={13} className="text-blue-400" /> {property.size}m²</span>
        </div>
        <div className="flex items-center justify-between mt-auto pt-1">
          <div className="flex items-center gap-2">
            <img src={property.agent.avatar} alt={property.agent.name} className="w-7 h-7 rounded-full object-cover ring-2 ring-blue-100" />
            <span className="text-xs text-gray-500">{property.agent.name}</span>
          </div>
          <button onClick={() => onView(property)}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors">
            <Eye size={13} /> View
          </button>
        </div>
      </div>
    </div>
  );
}
