import { useState } from 'react';
import { ArrowLeft, ExternalLink, Eye, Heart, MessageCircle, Share2, Clock, Globe, AlertTriangle, Info, TrendingUp, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { VideoData } from '../types';
import { calcEngagementRate, calcViewsPerFollower, calcGrowthRate, formatNumber, formatPercent, formatDailyGrowth, calcInteractionRatio, getDaysSincePublish } from '../utils/calculations';
import { generateHypotheses } from '../data/demo';
import AnalysisPanel from './AnalysisPanel';

interface Props {
  video: VideoData;
  onBack: () => void;
}

const platformLabels: Record<string, string> = {
  youtube: 'YouTube',
  tiktok: 'TikTok',
  instagram: 'Instagram',
  facebook: 'Facebook',
};

export default function VideoDetail({ video, onBack }: Props) {
  const [activeTab, setActiveTab] = useState<'metrics' | 'evolution' | 'analysis'>('metrics');
  const engagement = calcEngagementRate(video);
  const viewsPerFollower = calcViewsPerFollower(video);
  const growthRate = calcGrowthRate(video);
  const daysSince = getDaysSincePublish(video.publishedAt);
  const hypotheses = generateHypotheses(video);

  const chartData = video.metrics.history?.map(h => ({
    date: new Date(h.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
    Visualizaciones: h.views,
    'Me gusta': h.likes,
    Comentarios: h.comments,
    Compartidos: h.shares,
  })) || [];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-100">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 mb-3">
          <ArrowLeft className="w-4 h-4" />
          Volver a resultados
        </button>
        
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                {platformLabels[video.platform]}
              </span>
              {video.isDemo && (
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Datos de demostración
                </span>
              )}
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-1">{video.title}</h1>
            <p className="text-sm text-gray-500">{video.channel} · Publicado {new Date(video.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1.5 shrink-0"
          >
            <ExternalLink className="w-4 h-4" />
            Ver original
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        {[
          { id: 'metrics', label: 'Métricas', icon: Eye },
          { id: 'evolution', label: 'Evolución', icon: TrendingUp },
          { id: 'analysis', label: 'Análisis de viralización', icon: Info },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        {activeTab === 'metrics' && (
          <div className="space-y-6">
            {/* Main metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricBox icon={Eye} label="Visualizaciones" value={formatNumber(video.metrics.views)} />
              <MetricBox icon={Heart} label="Me gusta" value={formatNumber(video.metrics.likes)} />
              <MetricBox icon={MessageCircle} label="Comentarios" value={formatNumber(video.metrics.comments)} />
              <MetricBox icon={Share2} label="Compartidos" value={formatNumber(video.metrics.shares)} />
            </div>

            {/* Calculated metrics */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-indigo-500" />
                Métricas calculadas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <CalcMetric
                  label="Tasa de interacción"
                  value={formatPercent(engagement)}
                  formula="(likes + comentarios + compartidos) / visualizaciones × 100"
                />
                <CalcMetric
                  label="Vistas / seguidor"
                  value={viewsPerFollower ? viewsPerFollower.toFixed(1) + 'x' : 'No disponible'}
                  formula="visualizaciones / seguidores del canal"
                  note={video.channelFollowers ? `Canal: ${formatNumber(video.channelFollowers)} seguidores` : 'Seguidores no disponibles'}
                />
                <CalcMetric
                  label="Crecimiento diario"
                  value={formatDailyGrowth(growthRate)}
                  formula="(vistas última medición - vistas primera medición) / días transcurridos"
                />
                <CalcMetric
                  label="Ratio interacciones"
                  value={calcInteractionRatio(video)}
                  formula="likes : comentarios : compartidos"
                />
              </div>
            </div>

            {/* Video info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Información del vídeo</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <InfoRow label="Duración" value={video.duration || 'No disponible'} />
                <InfoRow label="Idioma" value={video.language ? video.language.toUpperCase() : 'No disponible'} />
                <InfoRow label="Región" value={video.region || 'No disponible'} />
                <InfoRow label="Días desde publicación" value={daysSince.toString()} />
                <InfoRow label="Hashtags" value={video.hashtags.join(', ') || 'Ninguno'} />
                <InfoRow label="Tema detectado" value={video.topic || 'No analizado'} />
              </div>
            </div>

            {/* Description */}
            {video.description && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Descripción</h3>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{video.description}</p>
              </div>
            )}

            {/* Source info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div className="text-xs text-blue-800 space-y-1">
                  <p><strong>Fuente:</strong> {video.sourceLabel}</p>
                  <p><strong>Última actualización:</strong> {new Date(video.lastUpdated).toLocaleString('es-ES')}</p>
                  <p><strong>Limitaciones:</strong></p>
                  <ul className="list-disc list-inside ml-2">
                    {video.dataLimitations.map((lim, i) => (
                      <li key={i}>{lim}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'evolution' && (
          <div className="space-y-4">
            {chartData.length > 0 ? (
              <>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Evolución temporal</h3>
                  <p className="text-xs text-gray-500 mb-4">
                    Datos disponibles entre {video.metrics.history?.[0]?.date} y {video.metrics.history?.[video.metrics.history.length - 1]?.date}
                  </p>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => formatNumber(v)} />
                      <Tooltip formatter={(value: number) => formatNumber(value)} />
                      <Legend />
                      <Line type="monotone" dataKey="Visualizaciones" stroke="#4f46e5" strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="Me gusta" stroke="#ec4899" strokeWidth={1.5} dot={{ r: 2 }} />
                      <Line type="monotone" dataKey="Comentarios" stroke="#10b981" strokeWidth={1.5} dot={{ r: 2 }} />
                      <Line type="monotone" dataKey="Compartidos" stroke="#f59e0b" strokeWidth={1.5} dot={{ r: 2 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-xs text-amber-800">
                    <strong>Nota:</strong> La evolución se basa en mediciones puntuales. Los valores entre mediciones son interpolaciones y no reflejan necesariamente el comportamiento real hora a hora.
                    {video.isDemo && ' Estos datos son ficticios y se proporcionan solo con fines demostrativos.'}
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <TrendingUp className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">No hay datos históricos disponibles para este vídeo.</p>
                <p className="text-xs mt-1">Se necesitan al menos 2 mediciones en momentos diferentes.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'analysis' && (
          <AnalysisPanel video={video} hypotheses={hypotheses} />
        )}
      </div>
    </div>
  );
}

function MetricBox({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 text-center">
      <Icon className="w-5 h-5 text-gray-400 mx-auto mb-1" />
      <p className="text-lg font-bold text-gray-800">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

function CalcMetric({ label, value, formula, note }: { label: string; value: string; formula: string; note?: string }) {
  return (
    <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3">
      <p className="text-xs text-indigo-600 font-medium mb-1">{label}</p>
      <p className="text-sm font-semibold text-gray-800 mb-1">{value}</p>
      <p className="text-xs text-gray-500 font-mono">{formula}</p>
      {note && <p className="text-xs text-gray-400 mt-1">{note}</p>}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-700">{value}</span>
    </div>
  );
}
