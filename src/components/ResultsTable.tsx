import { ExternalLink, Eye, Heart, MessageCircle, Share2 } from 'lucide-react';
import { VideoData } from '../types';
import { calcEngagementRate, formatNumber, formatPercent, getDaysSincePublish } from '../utils/calculations';

interface Props {
  videos: VideoData[];
  onSelect: (video: VideoData) => void;
  onCompare: (videoId: string) => void;
  onAddToCollection: (videoId: string) => void;
  compareIds: string[];
}

const platformLabels: Record<string, string> = {
  youtube: 'YouTube',
  tiktok: 'TikTok',
  instagram: 'Instagram',
  facebook: 'Facebook',
};

export default function ResultsTable({ videos, onSelect, onCompare, onAddToCollection, compareIds }: Props) {
  if (videos.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Plataforma</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Título</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Canal</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Vistas</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Likes</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Comentarios</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Compartidos</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Interacción</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase">Días</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {videos.map(v => {
              const engagement = calcEngagementRate(v);
              const days = getDaysSincePublish(v.publishedAt);
              return (
                <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-gray-700">{platformLabels[v.platform]}</span>
                      {v.isDemo && <span className="text-xs bg-amber-100 text-amber-600 px-1 rounded">D</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 max-w-[250px]">
                    <button
                      onClick={() => onSelect(v)}
                      className="text-sm font-medium text-gray-800 hover:text-indigo-600 text-left line-clamp-1"
                    >
                      {v.title}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{v.channel}</td>
                  <td className="px-4 py-3 text-right text-sm font-medium text-gray-700">{formatNumber(v.metrics.views)}</td>
                  <td className="px-4 py-3 text-right text-sm text-gray-600">{formatNumber(v.metrics.likes)}</td>
                  <td className="px-4 py-3 text-right text-sm text-gray-600">{formatNumber(v.metrics.comments)}</td>
                  <td className="px-4 py-3 text-right text-sm text-gray-600">{formatNumber(v.metrics.shares)}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm font-medium text-indigo-600">{formatPercent(engagement)}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-500">{days}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => onCompare(v.id)}
                        className={`p-1 rounded ${compareIds.includes(v.id) ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-indigo-600'}`}
                        title="Comparar"
                      >
                        ⇔
                      </button>
                      <button
                        onClick={() => onAddToCollection(v.id)}
                        className="p-1 text-gray-400 hover:text-indigo-600"
                        title="Añadir a colección"
                      >
                        📁
                      </button>
                      <a
                        href={v.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-gray-400 hover:text-indigo-600"
                        title="Ver original"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
