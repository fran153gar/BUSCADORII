import { VideoData } from '../types';
import { calcEngagementRate, calcViewsPerFollower, calcGrowthRate, formatNumber } from './calculations';

export function exportToCSV(videos: VideoData[], filename: string = 'radar-videos.csv'): void {
  const headers = [
    'Plataforma',
    'Título',
    'Canal',
    'URL',
    'Fecha publicación',
    'Duración',
    'Idioma',
    'Región',
    'Hashtags',
    'Visualizaciones',
    'Me gusta',
    'Comentarios',
    'Compartidos',
    'Seguidores canal',
    'Tasa interacción (%)',
    'Vistas/seguidor',
    'Crecimiento diario (vistas/día)',
    'Tema',
    'Fuente',
    'Última actualización',
    'Es demo',
  ];

  const rows = videos.map(v => [
    v.platform,
    `"${v.title.replace(/"/g, '""')}"`,
    `"${v.channel.replace(/"/g, '""')}"`,
    v.url,
    v.publishedAt,
    v.duration || 'N/D',
    v.language || 'N/D',
    v.region || 'N/D',
    v.hashtags.join('; '),
    formatNumber(v.metrics.views),
    formatNumber(v.metrics.likes),
    formatNumber(v.metrics.comments),
    formatNumber(v.metrics.shares),
    formatNumber(v.channelFollowers),
    formatNumber(calcEngagementRate(v)),
    formatNumber(calcViewsPerFollower(v)),
    formatNumber(calcGrowthRate(v)),
    v.topic || 'N/D',
    v.sourceLabel,
    v.lastUpdated,
    v.isDemo ? 'Sí' : 'No',
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}
