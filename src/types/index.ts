export type Platform = 'youtube' | 'tiktok' | 'instagram' | 'facebook';

export interface VideoMetrics {
  views: number | null;
  likes: number | null;
  comments: number | null;
  shares: number | null;
  // Historical data points for evolution
  history?: MetricSnapshot[];
}

export interface MetricSnapshot {
  date: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
}

export interface VideoData {
  id: string;
  platform: Platform;
  title: string;
  channel: string;
  channelFollowers: number | null;
  url: string;
  thumbnailUrl: string | null;
  publishedAt: string;
  duration: string | null;
  language: string | null;
  region: string | null;
  hashtags: string[];
  description: string;
  metrics: VideoMetrics;
  // Analysis fields
  topic: string | null;
  hookDescription: string | null;
  narrativeStructure: string | null;
  ctaDetected: string | null;
  trendingSoundOrFormat: string | null;
  // Metadata
  sourceLabel: string;
  lastUpdated: string;
  dataLimitations: string[];
  isDemo: boolean;
}

export interface SearchFilters {
  platforms: Platform[];
  keywords: string;
  hashtag: string;
  language: string;
  region: string;
  dateFrom: string;
  dateTo: string;
  minViews: number | null;
  minLikes: number | null;
  minInteractions: number | null;
  sortBy: 'views' | 'likes' | 'engagement' | 'growth' | 'date';
  sortOrder: 'asc' | 'desc';
  growthType: 'recent_fast' | 'sustained';
}

export interface Collection {
  id: string;
  name: string;
  videoIds: string[];
  createdAt: string;
}

export interface Hypothesis {
  id: string;
  factor: string;
  description: string;
  supportingData: string[];
  missingInfo: string[];
  confidence: 'low' | 'medium' | 'high';
  alternativeExplanations: string[];
}

export interface PlatformIntegration {
  platform: Platform;
  name: string;
  status: 'connected' | 'not_configured' | 'limited';
  availableMetrics: string[];
  unavailableMetrics: string[];
  requirements: string;
  notes: string;
}
