import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { SearchFilters, Platform } from '../types';

interface Props {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: () => void;
}

const platforms: { value: Platform; label: string; color: string }[] = [
  { value: 'youtube', label: 'YouTube', color: 'bg-red-500' },
  { value: 'tiktok', label: 'TikTok', color: 'bg-gray-900' },
  { value: 'instagram', label: 'Instagram', color: 'bg-pink-500' },
  { value: 'facebook', label: 'Facebook', color: 'bg-blue-600' },
];

export default function SearchPanel({ filters, onFiltersChange, onSearch }: Props) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const update = (partial: Partial<SearchFilters>) => {
    onFiltersChange({ ...filters, ...partial });
  };

  const togglePlatform = (p: Platform) => {
    const current = filters.platforms;
    if (current.includes(p)) {
      update({ platforms: current.filter(x => x !== p) });
    } else {
      update({ platforms: [...current, p] });
    }
  };

  const resetFilters = () => {
    onFiltersChange({
      platforms: [],
      keywords: '',
      hashtag: '',
      language: '',
      region: '',
      dateFrom: '',
      dateTo: '',
      minViews: null,
      minLikes: null,
      minInteractions: null,
      sortBy: 'views',
      sortOrder: 'desc',
      growthType: 'recent_fast',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Search className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-800">Buscar vídeos virales</h2>
      </div>

      {/* Main search */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Palabras clave (ej: recetas, humor, ciencia...)"
            value={filters.keywords}
            onChange={e => update({ keywords: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            onKeyDown={e => e.key === 'Enter' && onSearch()}
          />
        </div>
        <button
          onClick={onSearch}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          Buscar
        </button>
      </div>

      {/* Platforms */}
      <div className="mb-4">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">Plataformas</label>
        <div className="flex flex-wrap gap-2">
          {platforms.map(p => (
            <button
              key={p.value}
              onClick={() => togglePlatform(p.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                filters.platforms.includes(p.value)
                  ? `${p.color} text-white shadow-sm`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quick filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">Hashtag</label>
          <input
            type="text"
            placeholder="#trending"
            value={filters.hashtag}
            onChange={e => update({ hashtag: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">Ordenar por</label>
          <select
            value={filters.sortBy}
            onChange={e => update({ sortBy: e.target.value as SearchFilters['sortBy'] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="views">Visualizaciones</option>
            <option value="likes">Me gusta</option>
            <option value="engagement">Interacción</option>
            <option value="growth">Crecimiento</option>
            <option value="date">Fecha</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">Tipo de crecimiento</label>
          <select
            value={filters.growthType}
            onChange={e => update({ growthType: e.target.value as SearchFilters['growthType'] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="recent_fast">Recientes con crecimiento rápido</option>
            <option value="sustained">Rendimiento sostenido</option>
          </select>
        </div>
      </div>

      {/* Advanced filters toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 mb-3"
      >
        <Filter className="w-3.5 h-3.5" />
        {showAdvanced ? 'Ocultar filtros avanzados' : 'Filtros avanzados'}
      </button>

      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-lg mb-4">
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Idioma</label>
            <input
              type="text"
              placeholder="es, en, pt..."
              value={filters.language}
              onChange={e => update({ language: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Región</label>
            <input
              type="text"
              placeholder="ES, MX, AR..."
              value={filters.region}
              onChange={e => update({ region: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Mín. visualizaciones</label>
            <input
              type="number"
              placeholder="100000"
              value={filters.minViews || ''}
              onChange={e => update({ minViews: e.target.value ? Number(e.target.value) : null })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Mín. interacciones</label>
            <input
              type="number"
              placeholder="10000"
              value={filters.minInteractions || ''}
              onChange={e => update({ minInteractions: e.target.value ? Number(e.target.value) : null })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Fecha desde</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={e => update({ dateFrom: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Fecha hasta</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={e => update({ dateTo: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={resetFilters}
          className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          <X className="w-3 h-3" />
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}
