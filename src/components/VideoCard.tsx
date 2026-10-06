import { ExternalLink, Eye, Heart, MessageCircle, Share2, Clock, Globe, Plus } from 'lucide-react';
import { VideoData } from '../types';
import { calcEngagementRate, formatNumber, formatPercent, getDaysSincePublish } from '../utils/calculations';

interface Props {
  video: VideoData;
  onSelect: (video: VideoData) => void;
  onAddToCollection: (videoId: string) => void;
  onCompare: (videoId: string) => void;
  isComparing: boolean;
}

const platformColors: Record<string, string> = {
  youtube: 'bg-red-100 text-red-700 border-red-200',
  tiktok: 'bg-gray-100 text-gray-800 border-gray-300',
  instagram: 'bg-pink-100 text-pink-700 border-pink-200',
  facebook: 'bg-blue-100 text-blue-700 border-blue-200',
};

const platformLabels: Record<string, string> = {
  youtube: 'YouTube',
  tiktok: 'TikTok',
  instagram: 'Instagram',
  facebook: 'Facebook',
};

export default function VideoCard({ video, onSelect, onAddToCollection, onCompare, isComparing }: Props) {
  const engagement = calcEngagementRate(video);
  const daysSince = getDaysSincePublish(video.publishedAt);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden">
      {/* Header */}
      <div className="p-4 pb-2">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${platformColors[video.platform]}`}>
            {platformLabels[video.platform]}
          </span>
          {video.isDemo && (
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200">
              DEMO
            </span>
          )}
        </div>
        
        <h3 
          className="font-semibold text-gray-800 text-sm leading-tight cursor-pointer hover:text-indigo-600 line-clamp-2 mb-1"
          onClick={() => onSelect(video)}
        >
          {video.title}
        </h3>
        <p className="text-xs text-gray-500">{video.channel}</p>
      </div>

      {/* Metrics */}
      <div className="px-4 pb-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1.5 text-sm">
            <Eye className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-medium text-gray-700">{formatNumber(video.metrics.views)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <Heart className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-medium text-gray-700">{formatNumber(video.metrics.likes)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <MessageCircle className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-medium text-gray-700">{formatNumber(video.metrics.comments)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <Share2 className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-medium text-gray-700">{formatNumber(video.metrics.shares)}</span>
          </div>
        </div>

        {/* Calculated metrics */}
        <div className="mt-2 pt-2 border-t border-gray-100 flex flex-wrap gap-2">
          {engagement !== null && (
            <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">
              Interacción: {formatPercent(engagement)}
            </span>
          )}
          <span className="text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {daysSince} días
          </span>
          {video.language && (
            <span className="text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Globe className="w-3 h-3" />
              {video.language.toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 flex items-center gap-2">
        <button
          onClick={() => onSelect(video)}
          className="flex-1 px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Ver detalle
        </button>
        <button
          onClick={() => onCompare(video.id)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
            isComparing 
              ? 'bg-indigo-100 text-indigo-700 border-indigo-300' 
              : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
          }`}
          title={isComparing ? 'En comparador' : 'Añadir al comparador'}
        >
          <Plus className="w-3 h-3" />
        </button>
        <button
          onClick={() => onAddToCollection(video.id)}
          className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 transition-colors"
          title="Añadir a colección"
        >
          📁
        </button>
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 transition-colors"
          title="Ver en plataforma original"
        >
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
