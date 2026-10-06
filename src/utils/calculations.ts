import { VideoData } from '../types';

export function calcEngagementRate(video: VideoData): number | null {
  const { likes, comments, shares, views } = video.metrics;
  if (!views || views === 0) return null;
  const totalInteractions = (likes || 0) + (comments || 0) + (shares || 0);
  return (totalInteractions / views) * 100;
}

export function calcViewsPerFollower(video: VideoData): number | null {
  if (!video.metrics.views || !video.channelFollowers || video.channelFollowers === 0) return null;
  return video.metrics.views / video.channelFollowers;
}

export function calcGrowthRate(video: VideoData): number | null {
  if (!video.metrics.history || video.metrics.history.length < 2) return null;
  const sorted = [...video.metrics.history].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  const daysDiff = (new Date(last.date).getTime() - new Date(first.date).getTime()) / (1000 * 60 * 60 * 24);
  if (daysDiff === 0) return null;
  const viewsDiff = last.views - first.views;
  return viewsDiff / daysDiff;
}

export function calcInteractionRatio(video: VideoData): string {
  const { likes, comments, shares } = video.metrics;
  if (!likes && !comments && !shares) return 'N/D';
  const l = likes || 0;
  const c = comments || 0;
  const s = shares || 0;
  return `${l} : ${c} : ${s} (likes:comentarios:compartidos)`;
}

export function formatNumber(n: number | null): string {
  if (n === null || n === undefined) return 'No disponible';
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'B';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toLocaleString('es-ES');
}

export function formatPercent(n: number | null): string {
  if (n === null || n === undefined) return 'No disponible';
  return n.toFixed(2) + '%';
}

export function formatDailyGrowth(n: number | null): string {
  if (n === null || n === undefined) return 'No disponible';
  return formatNumber(Math.round(n)) + ' vistas/día';
}

export function getDaysSincePublish(publishedAt: string): number {
  const now = new Date();
  const pub = new Date(publishedAt);
  return Math.floor((now.getTime() - pub.getTime()) / (1000 * 60 * 60 * 24));
}
