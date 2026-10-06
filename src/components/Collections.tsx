import { useState } from 'react';
import { FolderOpen, Plus, Trash2, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Collection, VideoData } from '../types';
import { formatNumber, calcEngagementRate, formatPercent } from '../utils/calculations';
import { exportToCSV } from '../utils/csv';

interface Props {
  collections: Collection[];
  videos: VideoData[];
  onCreateCollection: (name: string) => void;
  onDeleteCollection: (id: string) => void;
  onRemoveFromCollection: (collectionId: string, videoId: string) => void;
}

const platformLabels: Record<string, string> = {
  youtube: 'YouTube',
  tiktok: 'TikTok',
  instagram: 'Instagram',
  facebook: 'Facebook',
};

export default function Collections({ collections, videos, onCreateCollection, onDeleteCollection, onRemoveFromCollection }: Props) {
  const [newName, setNewName] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleCreate = () => {
    if (newName.trim()) {
      onCreateCollection(newName.trim());
      setNewName('');
    }
  };

  const getCollectionVideos = (collection: Collection) => {
    return collection.videoIds.map(id => videos.find(v => v.id === id)).filter(Boolean) as VideoData[];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
          <FolderOpen className="w-5 h-5 text-indigo-600" />
          Colecciones guardadas
        </h3>
        
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nombre de la nueva colección..."
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleCreate()}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Crear
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {collections.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FolderOpen className="w-10 h-10 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No tienes colecciones todavía.</p>
            <p className="text-xs mt-1">Crea una colección para agrupar vídeos y compararlos.</p>
          </div>
        ) : (
          collections.map(col => {
            const colVideos = getCollectionVideos(col);
            const isExpanded = expanded === col.id;
            return (
              <div key={col.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={() => setExpanded(isExpanded ? null : col.id)}
                    className="flex items-center gap-2 text-left"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    <span className="font-medium text-gray-800">{col.name}</span>
                    <span className="text-xs text-gray-400">({colVideos.length} vídeos)</span>
                  </button>
                  <div className="flex items-center gap-2">
                    {colVideos.length > 0 && (
                      <button
                        onClick={() => exportToCSV(colVideos, `coleccion-${col.name}.csv`)}
                        className="text-xs text-indigo-600 hover:text-indigo-800"
                      >
                        Exportar CSV
                      </button>
                    )}
                    <button
                      onClick={() => onDeleteCollection(col.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {isExpanded && colVideos.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {colVideos.map(v => (
                      <div key={v.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">{platformLabels[v.platform]}</span>
                            {v.isDemo && <span className="text-xs bg-amber-100 text-amber-600 px-1 rounded">DEMO</span>}
                          </div>
                          <p className="text-sm text-gray-700 truncate">{v.title}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                            <span>{formatNumber(v.metrics.views)} vistas</span>
                            <span>Int: {formatPercent(calcEngagementRate(v))}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => onRemoveFromCollection(col.id, v.id)}
                          className="text-gray-400 hover:text-red-500 ml-2"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {isExpanded && colVideos.length === 0 && (
                  <p className="text-xs text-gray-400 mt-2">Esta colección está vacía.</p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
