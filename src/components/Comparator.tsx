import { ArrowLeftRight, X, Eye, Heart, MessageCircle, Share2 } from 'lucide-react';
import { VideoData } from '../types';
import { calcEngagementRate, calcViewsPerFollower, formatNumber, formatPercent } from '../utils/calculations';

interface Props {
  videos: VideoData[];
  onRemove: (videoId: string) => void;
  onClear: () => void;
}

const platformLabels: Record<string, string> = {
  youtube: 'YouTube',
  tiktok: 'TikTok',
  instagram: 'Instagram',
  facebook: 'Facebook',
};

export default function Comparator({ videos, onRemove, onClear }: Props) {
  if (videos.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <ArrowLeftRight className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <h3 className="text-lg font-semibold text-gray-700 mb-1">Comparador de vídeos</h3>
        <p className="text-sm text-gray-500">
          Añade vídeos desde las tarjetas de resultados usando el botón "+" para compararlos aquí.
        </p>
        <p className="text-xs text-gray-400 mt-2">Máximo 4 vídeos para comparar.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5 text-indigo-600" />
          Comparador ({videos.length}/4)
        </h3>
        <button onClick={onClear} className="text-xs text-gray-500 hover:text-red-600">
          Limpiar todo
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Métrica</th>
              {videos.map(v => (
                <th key={v.id} className="text-left px-4 py-3 min-w-[180px]">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs text-gray-400">{platformLabels[v.platform]}</span>
                      <p className="text-sm font-medium text-gray-800 line-clamp-1">{v.title}</p>
                      <p className="text-xs text-gray-500">{v.channel}</p>
                    </div>
                    <button onClick={() => onRemove(v.id)} className="text-gray-400 hover:text-red-500">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <CompareRow
              label="Visualizaciones"
              icon={Eye}
              values={videos.map(v => formatNumber(v.metrics.views))}
              rawValues={videos.map(v => v.metrics.views || 0)}
              higherBetter
            />
            <CompareRow
              label="Me gusta"
              icon={Heart}
              values={videos.map(v => formatNumber(v.metrics.likes))}
              rawValues={videos.map(v => v.metrics.likes || 0)}
              higherBetter
            />
            <CompareRow
              label="Comentarios"
              icon={MessageCircle}
              values={videos.map(v => formatNumber(v.metrics.comments))}
              rawValues={videos.map(v => v.metrics.comments || 0)}
              higherBetter
            />
            <CompareRow
              label="Compartidos"
              icon={Share2}
              values={videos.map(v => formatNumber(v.metrics.shares))}
              rawValues={videos.map(v => v.metrics.shares || 0)}
              higherBetter
            />
            <tr>
              <td className="px-4 py-2.5 text-xs font-medium text-gray-600">Tasa de interacción</td>
              {videos.map(v => {
                const rate = calcEngagementRate(v);
                const maxRate = Math.max(...videos.map(vv => calcEngagementRate(vv) || 0));
                const isMax = rate === maxRate && videos.length > 1;
                return (
                  <td key={v.id} className={`px-4 py-2.5 text-sm ${isMax ? 'font-bold text-green-700' : 'text-gray-700'}`}>
                    {formatPercent(rate)}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-xs font-medium text-gray-600">Vistas / seguidor</td>
              {videos.map(v => (
                <td key={v.id} className="px-4 py-2.5 text-sm text-gray-700">
                  {calcViewsPerFollower(v) ? calcViewsPerFollower(v)!.toFixed(1) + 'x' : 'N/D'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-xs font-medium text-gray-600">Plataforma</td>
              {videos.map(v => (
                <td key={v.id} className="px-4 py-2.5 text-sm text-gray-700">{platformLabels[v.platform]}</td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-xs font-medium text-gray-600">Duración</td>
              {videos.map(v => (
                <td key={v.id} className="px-4 py-2.5 text-sm text-gray-700">{v.duration || 'N/D'}</td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-xs font-medium text-gray-600">Fecha publicación</td>
              {videos.map(v => (
                <td key={v.id} className="px-4 py-2.5 text-sm text-gray-700">
                  {new Date(v.publishedAt).toLocaleDateString('es-ES')}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-xs font-medium text-gray-600">Tema</td>
              {videos.map(v => (
                <td key={v.id} className="px-4 py-2.5 text-sm text-gray-700">{v.topic || 'N/D'}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-amber-50 border-t border-amber-200">
        <p className="text-xs text-amber-800">
          <strong>Nota:</strong> Las métricas de plataformas distintas no son directamente equivalentes. 
          Cada plataforma define y mide las interacciones de forma diferente. Los valores en verde indican 
          el valor más alto en la comparación, pero esto no implica superioridad absoluta.
        </p>
      </div>
    </div>
  );
}

function CompareRow({ label, icon: Icon, values, rawValues, higherBetter }: {
  label: string;
  icon: any;
  values: string[];
  rawValues: number[];
  higherBetter: boolean;
}) {
  const maxVal = Math.max(...rawValues);
  const minVal = Math.min(...rawValues.filter(v => v > 0));
  
  return (
    <tr>
      <td className="px-4 py-2.5 text-xs font-medium text-gray-600 flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5 text-gray-400" />
        {label}
      </td>
      {values.map((val, i) => {
        const isMax = rawValues[i] === maxVal && rawValues.filter(v => v > 0).length > 1;
        return (
          <td key={i} className={`px-4 py-2.5 text-sm ${isMax ? 'font-bold text-green-700' : 'text-gray-700'}`}>
            {val}
          </td>
        );
      })}
    </tr>
  );
}
