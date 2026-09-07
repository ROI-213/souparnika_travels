import { useState } from 'react';
import { Plus, Edit, Trash2, MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Area = {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  airport_distance: string;
  is_active: boolean;
};

const INITIAL_AREAS: Area[] = [
  { id: '1', name: 'Whitefield', slug: 'whitefield', city: 'Bengaluru', state: 'Karnataka', airport_distance: '~45 km', is_active: true },
  { id: '2', name: 'Koramangala', slug: 'koramangala', city: 'Bengaluru', state: 'Karnataka', airport_distance: '~41 km', is_active: true },
  { id: '3', name: 'MG Road', slug: 'mg-road', city: 'Bengaluru', state: 'Karnataka', airport_distance: '~35 km', is_active: true },
];

export function AreasManager() {
  const [areas, setAreas] = useState<Area[]>(INITIAL_AREAS);
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [airportDist, setAirportDist] = useState('');

  const filteredAreas = areas.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) return;
    
    const newArea: Area = {
      id: Date.now().toString(),
      name,
      slug,
      city: 'Bengaluru',
      state: 'Karnataka',
      airport_distance: airportDist,
      is_active: true
    };
    
    setAreas([newArea, ...areas]);
    setShowAdd(false);
    setName('');
    setSlug('');
    setAirportDist('');
  };

  const deleteArea = (id: string) => {
    if (confirm('Are you sure you want to delete this service area?')) {
      setAreas(prev => prev.filter(a => a.id !== id));
    }
  };

  const toggleActive = (id: string) => {
    setAreas(prev => prev.map(a => a.id === id ? { ...a, is_active: !a.is_active } : a));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-xl text-[#071525]">
            Areas We Serve & Routes
          </h2>
          <p className="text-xs text-slate-500">Manage locations, local fleet pricing, and outstation routes.</p>
        </div>
        <Button onClick={() => setShowAdd(true)} className="bg-[#071525] hover:bg-blue-600">
          <Plus className="w-4 h-4 mr-2" /> Add Area
        </Button>
      </div>

      {showAdd && (
        <form onSubmit={handleAddSubmit} className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Add New Service Area</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold mb-1 block">Area Name</label>
              <Input 
                value={name} 
                onChange={e => {
                  setName(e.target.value);
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                }} 
                placeholder="e.g. Indiranagar" 
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold mb-1 block">URL Slug</label>
              <Input value={slug} onChange={e => setSlug(e.target.value)} required />
            </div>
            <div>
              <label className="text-xs font-bold mb-1 block">Airport Distance</label>
              <Input value={airportDist} onChange={e => setAirportDist(e.target.value)} placeholder="e.g. ~40 km" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Save Area</Button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input 
              placeholder="Search areas..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
        </div>
        
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-medium">
            <tr>
              <th className="p-4">Location</th>
              <th className="p-4 hidden sm:table-cell">URL Slug</th>
              <th className="p-4 hidden md:table-cell">Airport Dist</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredAreas.map(area => (
              <tr key={area.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-500" /> {area.name}
                </td>
                <td className="p-4 text-slate-500 hidden sm:table-cell">/areas/{area.slug}</td>
                <td className="p-4 text-slate-500 hidden md:table-cell">{area.airport_distance}</td>
                <td className="p-4">
                  <button onClick={() => toggleActive(area.id)} className={`px-2 py-1 rounded-md text-xs font-bold ${area.is_active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                    {area.is_active ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="p-4 text-right flex items-center justify-end gap-2">
                  <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">Pricing</Button>
                  <Button variant="ghost" size="sm" className="h-8 text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => deleteArea(area.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
            {filteredAreas.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">No areas found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
