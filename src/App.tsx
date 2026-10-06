import { useState, useMemo } from 'react';
import { Radar, LayoutGrid, Table2, ArrowLeftRight, FolderOpen, Wifi, Download, Info, AlertTriangle, Database } from 'lucide-react';
import { VideoData, SearchFilters, Collection } from './types';
import { demoVideos } from './data/demo';
import { useLocalStorage } from './hooks/useLocalStorage';
import { exportToCSV } from './utils/csv';
import SearchPanel from './components/SearchPanel';
import VideoCard from './components/VideoCard';
import VideoDetail from './components/VideoDetail';
import ResultsTable from './components/ResultsTable';
import Comparator from './components/Comparator';
import Collections from './components/Collections';
import PlatformStatus from './components/PlatformStatus';
import { calcEngagementRate, calcGrowthRate } from './utils/calculations';

type ViewMode = 'cards' | 'table' | 'compare' | 'collections' | 'platforms';

const defaultFilters: SearchFilters = {
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
};

export default function App() {
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [hasSearched, setHasSearched] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [collections, setCollections] = useLocalStorage<Collection[]>('radar-collections', []);
  const [showDemoNotice, setShowDemoNotice] = useState(true);

  // Filter and sort videos
  const filteredVideos = useMemo(() => {
    let result = [...demoVideos];

    // Filter by platform
    if (filters.platforms.length > 0) {
      result = result.filter(v => filters.platforms.includes(v.platform));
    }

    // Filter by keywords
    if (filters.keywords.trim()) {
      const kw = filters.keywords.toLowerCase();
      result = result.filter(v =>
        v.title.toLowerCase().includes(kw) ||
        v.channel.toLowerCase().includes(kw) ||
        v.description.toLowerCase().includes(kw) ||
        v.hashtags.some(h => h.toLowerCase().includes(kw)) ||
        (v.topic && v.topic.toLowerCase().includes(kw))
      );
    }

    // Filter by hashtag
    if (filters.hashtag.trim()) {
      const tag = filters.hashtag.toLowerCase().replace('#', '');
      result = result.filter(v =>
        v.hashtags.some(h => h.toLowerCase().includes(tag))
      );
    }

    // Filter by language
    if (filters.language.trim()) {
      result = result.filter(v => v.language === filters.language.toLowerCase());
    }

    // Filter by region
    if (filters.region.trim()) {
      result = result.filter(v => v.region === filters.region.toUpperCase());
    }

    // Filter by date range
    if (filters.dateFrom) {
      result = result.filter(v => new Date(v.publishedAt) >= new Date(filters.dateFrom));
    }
    if (filters.dateTo) {
      result = result.filter(v => new Date(v.publishedAt) <= new Date(filters.dateTo));
    }

    // Filter by minimum views
    if (filters.minViews) {
      result = result.filter(v => (v.metrics.views || 0) >= filters.minViews!);
    }

    // Filter by minimum interactions
    if (filters.minInteractions) {
      result = result.filter(v => {
        const total = (v.metrics.likes || 0) + (v.metrics.comments || 0) + (v.metrics.shares || 0);
        return total >= filters.minInteractions!;
      });
    }

    // Sort
    result.sort((a, b) => {
      let aVal = 0, bVal = 0;
      switch (filters.sortBy) {
        case 'views':
          aVal = a.metrics.views || 0;
          bVal = b.metrics.views || 0;
          break;
        case 'likes':
          aVal = a.metrics.likes || 0;
          bVal = b.metrics.likes || 0;
          break;
        case 'engagement':
          aVal = calcEngagementRate(a) || 0;
          bVal = calcEngagementRate(b) || 0;
          break;
        case 'growth':
          aVal = calcGrowthRate(a) || 0;
          bVal = calcGrowthRate(b) || 0;
          break;
        case 'date':
          aVal = new Date(a.publishedAt).getTime();
          bVal = new Date(b.publishedAt).getTime();
          break;
      }
      return filters.sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
    });

    return result;
  }, [filters]);

  const handleSearch = () => {
    setHasSearched(true);
  };

  const handleCompare = (videoId: string) => {
    setCompareIds(prev => {
      if (prev.includes(videoId)) {
        return prev.filter(id => id !== videoId);
      }
      if (prev.length >= 4) return prev;
      return [...prev, videoId];
    });
  };

  const handleAddToCollection = (videoId: string) => {
    if (collections.length === 0) {
      const newCol: Collection = {
        id: Date.now().toString(),
        name: 'Mi primera colección',
        videoIds: [videoId],
        createdAt: new Date().toISOString(),
      };
      setCollections([newCol]);
    } else {
      // Add to first collection or prompt
      const updated = [...collections];
      if (!updated[0].videoIds.includes(videoId)) {
        updated[0] = { ...updated[0], videoIds: [...updated[0].videoIds, videoId] };
        setCollections(updated);
      }
    }
  };

  const handleCreateCollection = (name: string) => {
    const newCol: Collection = {
      id: Date.now().toString(),
      name,
      videoIds: [],
      createdAt: new Date().toISOString(),
    };
    setCollections(prev => [...prev, newCol]);
  };

  const handleDeleteCollection = (id: string) => {
    setCollections(prev => prev.filter(c => c.id !== id));
  };

  const handleRemoveFromCollection = (collectionId: string, videoId: string) => {
    setCollections(prev => prev.map(c =>
      c.id === collectionId
        ? { ...c, videoIds: c.videoIds.filter(id => id !== videoId) }
        : c
    ));
  };

  const compareVideos = compareIds.map(id => demoVideos.find(v => v.id === id)).filter(Boolean) as VideoData[];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Radar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Radar de Vídeos Virales</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Análisis de difusión y factores de viralización</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {hasSearched && filteredVideos.length > 0 && (
              <button
                onClick={() => exportToCSV(filteredVideos)}
                className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center gap-1 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Exportar CSV</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Demo notice */}
        {showDemoNotice && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-amber-800 mb-1">Versión de demostración</h3>
              <p className="text-xs text-amber-700 mb-2">
                Esta aplicación funciona con <strong>datos ficticios</strong> claramente marcados como "DEMO". 
                Ninguna API de plataformas está conectada actualmente. Los datos mostrados son ejemplos para ilustrar 
                las funcionalidades del sistema.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="flex items-center gap-1 text-amber-700">
                  <Database className="w-3 h-3" />
                  6 vídeos de demostración
                </span>
                <span className="flex items-center gap-1 text-amber-700">
                  <Info className="w-3 h-3" />
                  Métricas calculadas con fórmulas visibles
                </span>
                <span className="flex items-center gap-1 text-amber-700">
                  <Wifi className="w-3 h-3" />
                  0 APIs conectadas (ver estado)
                </span>
              </div>
            </div>
            <button onClick={() => setShowDemoNotice(false)} className="text-amber-600 hover:text-amber-800 text-xs">
              ✕
            </button>
          </div>
        )}

        {/* Search panel */}
        <SearchPanel filters={filters} onFiltersChange={setFilters} onSearch={handleSearch} />

        {/* Navigation tabs */}
        {hasSearched && (
          <div className="flex items-center gap-1 bg-white rounded-lg p-1 shadow-sm border border-gray-200 overflow-x-auto">
            <NavButton active={viewMode === 'cards'} onClick={() => setViewMode('cards')} icon={LayoutGrid} label="Tarjetas" />
            <NavButton active={viewMode === 'table'} onClick={() => setViewMode('table')} icon={Table2} label="Tabla" />
            <NavButton active={viewMode === 'compare'} onClick={() => setViewMode('compare')} icon={ArrowLeftRight} label={`Comparar (${compareIds.length})`} />
            <NavButton active={viewMode === 'collections'} onClick={() => setViewMode('collections')} icon={FolderOpen} label={`Colecciones (${collections.length})`} />
            <NavButton active={viewMode === 'platforms'} onClick={() => setViewMode('platforms')} icon={Wifi} label="Integraciones" />
          </div>
        )}

        {/* Results */}
        {hasSearched && !selectedVideo && viewMode === 'cards' && (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {filteredVideos.length} resultado{filteredVideos.length !== 1 ? 's' : ''} encontrado{filteredVideos.length !== 1 ? 's' : ''}
              </p>
              {filteredVideos.some(v => v.isDemo) && (
                <span className="text-xs text-amber-600 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Incluye datos de demostración
                </span>
              )}
            </div>
            {filteredVideos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredVideos.map(v => (
                  <VideoCard
                    key={v.id}
                    video={v}
                    onSelect={setSelectedVideo}
                    onAddToCollection={handleAddToCollection}
                    onCompare={handleCompare}
                    isComparing={compareIds.includes(v.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <Radar className="w-16 h-16 mx-auto mb-4 text-gray-200" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Sin resultados</h3>
                <p className="text-sm text-gray-500">
                  No se encontraron vídeos con los filtros actuales. Prueba a ampliar los criterios de búsqueda.
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Nota: En esta versión de demostración solo hay 6 vídeos de ejemplo. Con APIs conectadas, los resultados serían dinámicos.
                </p>
              </div>
            )}
          </>
        )}

        {hasSearched && !selectedVideo && viewMode === 'table' && (
          <ResultsTable
            videos={filteredVideos}
            onSelect={setSelectedVideo}
            onCompare={handleCompare}
            onAddToCollection={handleAddToCollection}
            compareIds={compareIds}
          />
        )}

        {viewMode === 'compare' && (
          <Comparator
            videos={compareVideos}
            onRemove={(id) => setCompareIds(prev => prev.filter(x => x !== id))}
            onClear={() => setCompareIds([])}
          />
        )}

        {viewMode === 'collections' && (
          <Collections
            collections={collections}
            videos={demoVideos}
            onCreateCollection={handleCreateCollection}
            onDeleteCollection={handleDeleteCollection}
            onRemoveFromCollection={handleRemoveFromCollection}
          />
        )}

        {viewMode === 'platforms' && (
          <PlatformStatus />
        )}

        {/* Video detail */}
        {selectedVideo && (
          <VideoDetail video={selectedVideo} onBack={() => setSelectedVideo(null)} />
        )}

        {/* Footer info */}
        {!hasSearched && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-indigo-600" />
              ¿Cómo funciona esta herramienta?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Funciones operativas</h3>
                <ul className="text-sm text-gray-600 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    Búsqueda y filtros por plataforma, palabras clave, hashtags, idioma, región y métricas
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    Visualización en tarjetas y tabla con ordenación
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    Métricas calculadas con fórmulas visibles y datos de entrada
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    Comparador de hasta 4 vídeos
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    Colecciones guardadas (persistencia local)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    Exportación a CSV
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    Análisis de hipótesis de viralización con niveles de confianza
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    Gráficos de evolución temporal
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Requiere configuración externa</h3>
                <ul className="text-sm text-gray-600 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">⚠</span>
                    YouTube Data API v3 — requiere API Key de Google Cloud
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">⚠</span>
                    TikTok Research API — requiere solicitud y aprobación
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">⚠</span>
                    Instagram Graph API — requiere app de Facebook Developer
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">⚠</span>
                    Facebook Graph API — requiere permisos y revisión de app
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">⚠</span>
                    Almacenamiento persistente en base de datos (actualmente localStorage)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">⚠</span>
                    Monitoreo continuo de métricas (requiere backend/scheduler)
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                  <p className="text-xs text-indigo-800">
                    <strong>Principio:</strong> Esta herramienta nunca inventa datos. Todo dato mostrado indica su fuente. 
                    Los datos de demostración están marcados como ficticios. Las hipótesis se presentan con nivel de confianza 
                    y explicaciones alternativas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            Radar de Vídeos Virales · Herramienta de análisis e investigación
          </p>
          <p className="text-xs text-gray-400">
            Datos de demostración · Sin APIs conectadas · No se recopilan datos de usuario
          </p>
        </div>
      </footer>
    </div>
  );
}

function NavButton({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: any; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 whitespace-nowrap transition-colors ${
        active
          ? 'bg-indigo-100 text-indigo-700'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}
