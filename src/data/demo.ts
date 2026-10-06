import { VideoData, PlatformIntegration, Hypothesis } from '../types';

export const demoVideos: VideoData[] = [
  {
    id: 'demo-1',
    platform: 'youtube',
    title: 'Tutorial: Cómo hacer pan artesanal en 5 minutos',
    channel: 'CocinaRápida',
    channelFollowers: 45000,
    url: 'https://youtube.com/watch?v=demo1',
    thumbnailUrl: null,
    publishedAt: '2026-01-10T14:00:00Z',
    duration: '5:23',
    language: 'es',
    region: 'ES',
    hashtags: ['#pan', '#recetas', '#cocinafacil'],
    description: 'Aprende a hacer pan artesanal sin amasado. Receta sencilla para principiantes.',
    metrics: {
      views: 2400000,
      likes: 185000,
      comments: 12300,
      shares: 45000,
      history: [
        { date: '2026-01-10', views: 500, likes: 30, comments: 5, shares: 2 },
        { date: '2026-01-12', views: 15000, likes: 800, comments: 120, shares: 200 },
        { date: '2026-01-15', views: 180000, likes: 12000, comments: 1500, shares: 5000 },
        { date: '2026-01-20', views: 800000, likes: 65000, comments: 5000, shares: 18000 },
        { date: '2026-01-25', views: 1600000, likes: 130000, comments: 9000, shares: 32000 },
        { date: '2026-01-28', views: 2400000, likes: 185000, comments: 12300, shares: 45000 },
      ],
    },
    topic: 'Cocina / Recetas rápidas',
    hookDescription: 'Promesa de resultado en tiempo récord (5 min) + imagen del producto final',
    narrativeStructure: 'Problema → Solución paso a paso → Resultado final satisfactorio',
    ctaDetected: 'Suscríbete para más recetas rápidas',
    trendingSoundOrFormat: null,
    sourceLabel: 'Datos de demostración (ficticios)',
    lastUpdated: '2026-01-28T10:00:00Z',
    dataLimitations: ['Datos ficticios generados para demostración', 'No se verifican datos demográficos de audiencia'],
    isDemo: true,
  },
  {
    id: 'demo-2',
    platform: 'tiktok',
    title: 'POV: Tu gato te juzga mientras cocinas',
    channel: '@gatospicantes',
    channelFollowers: 120000,
    url: 'https://tiktok.com/@gatospicantes/video/demo2',
    thumbnailUrl: null,
    publishedAt: '2026-01-22T18:00:00Z',
    duration: '0:28',
    language: 'es',
    region: 'MX',
    hashtags: ['#gatos', '#humor', '#mascotas', '#pov'],
    description: 'Cuando intentas cocinar pero tu gato tiene otra opinión',
    metrics: {
      views: 8500000,
      likes: 1200000,
      comments: 34000,
      shares: 210000,
      history: [
        { date: '2026-01-22', views: 2000, likes: 300, comments: 15, shares: 50 },
        { date: '2026-01-23', views: 150000, likes: 22000, comments: 800, shares: 5000 },
        { date: '2026-01-24', views: 1200000, likes: 180000, comments: 5000, shares: 40000 },
        { date: '2026-01-25', views: 3500000, likes: 500000, comments: 15000, shares: 90000 },
        { date: '2026-01-27', views: 6800000, likes: 950000, comments: 28000, shares: 170000 },
        { date: '2026-01-28', views: 8500000, likes: 1200000, comments: 34000, shares: 210000 },
      ],
    },
    topic: 'Humor / Mascotas',
    hookDescription: 'Formato POV + situación identificable + reacción del animal',
    narrativeStructure: 'Situación cotidiana → Reacción inesperada → Cierre con punchline visual',
    ctaDetected: null,
    trendingSoundOrFormat: 'Usa audio en tendencia "Oh no" (verificar en plataforma)',
    sourceLabel: 'Datos de demostración (ficticios)',
    lastUpdated: '2026-01-28T12:00:00Z',
    dataLimitations: ['Datos ficticios generados para demostración', 'TikTok no expone datos de audiencia segmentada sin acceso empresarial'],
    isDemo: true,
  },
  {
    id: 'demo-3',
    platform: 'instagram',
    title: 'Transformación de habitación en 60 segundos',
    channel: '@decohacks_es',
    channelFollowers: 89000,
    url: 'https://instagram.com/reel/demo3',
    thumbnailUrl: null,
    publishedAt: '2026-01-18T10:00:00Z',
    duration: '1:00',
    language: 'es',
    region: 'AR',
    hashtags: ['#deco', '#hacks', '#antesydespues', '#interiores'],
    description: 'Transformación completa de un dormitorio con poco presupuesto',
    metrics: {
      views: 3200000,
      likes: 420000,
      comments: 8900,
      shares: 95000,
      history: [
        { date: '2026-01-18', views: 1000, likes: 150, comments: 8, shares: 20 },
        { date: '2026-01-20', views: 80000, likes: 10000, comments: 300, shares: 3000 },
        { date: '2026-01-23', views: 600000, likes: 80000, comments: 2000, shares: 20000 },
        { date: '2026-01-26', views: 1800000, likes: 240000, comments: 5500, shares: 55000 },
        { date: '2026-01-28', views: 3200000, likes: 420000, comments: 8900, shares: 95000 },
      ],
    },
    topic: 'Decoración / Hogar',
    hookDescription: 'Antes/después impactante en los primeros 2 segundos',
    narrativeStructure: 'Estado inicial → Proceso acelerado (timelapse) → Resultado final con música satisfactoria',
    ctaDetected: 'Guarda este reel para tu próxima reforma',
    trendingSoundOrFormat: null,
    sourceLabel: 'Datos de demostración (ficticios)',
    lastUpdated: '2026-01-28T11:00:00Z',
    dataLimitations: ['Datos ficticios generados para demostración', 'Instagram no permite acceso a métricas completas sin Graph API configurada'],
    isDemo: true,
  },
  {
    id: 'demo-4',
    platform: 'youtube',
    title: 'Explicando la física cuántica con memes',
    channel: 'CienciaDivertida',
    channelFollowers: 320000,
    url: 'https://youtube.com/watch?v=demo4',
    thumbnailUrl: null,
    publishedAt: '2026-01-05T16:00:00Z',
    duration: '12:45',
    language: 'es',
    region: 'ES',
    hashtags: ['#ciencia', '#física', '#memes', '#educación'],
    description: 'La física cuántica explicada con los memes más populares de internet',
    metrics: {
      views: 1800000,
      likes: 145000,
      comments: 22000,
      shares: 38000,
      history: [
        { date: '2026-01-05', views: 3000, likes: 200, comments: 30, shares: 10 },
        { date: '2026-01-08', views: 45000, likes: 3500, comments: 500, shares: 800 },
        { date: '2026-01-12', views: 200000, likes: 18000, comments: 3000, shares: 5000 },
        { date: '2026-01-18', views: 600000, likes: 50000, comments: 8000, shares: 12000 },
        { date: '2026-01-24', views: 1200000, likes: 100000, comments: 16000, shares: 25000 },
        { date: '2026-01-28', views: 1800000, likes: 145000, comments: 22000, shares: 38000 },
      ],
    },
    topic: 'Educación / Ciencia divulgativa',
    hookDescription: 'Pregunta provocadora + meme reconocible como gancho visual',
    narrativeStructure: 'Pregunta → Explicación con analogías visuales → Recapitulación con humor',
    ctaDetected: 'Comenta qué tema quieres que explique con memes',
    trendingSoundOrFormat: null,
    sourceLabel: 'Datos de demostración (ficticios)',
    lastUpdated: '2026-01-28T09:00:00Z',
    dataLimitations: ['Datos ficticios generados para demostración', 'Crecimiento sostenido sugiere recomendación algorítmica pero no puede confirmarse sin datos internos'],
    isDemo: true,
  },
  {
    id: 'demo-5',
    platform: 'tiktok',
    title: 'Dato random que te va a volar la cabeza',
    channel: '@datoscuriosos',
    channelFollowers: 560000,
    url: 'https://tiktok.com/@datoscuriosos/video/demo5',
    thumbnailUrl: null,
    publishedAt: '2026-01-25T20:00:00Z',
    duration: '0:45',
    language: 'es',
    region: 'CO',
    hashtags: ['#datocurioso', '#aprende', '#sabiasque', '#fyp'],
    description: 'Un dato sobre el océano que nadie te contó',
    metrics: {
      views: 5600000,
      likes: 780000,
      comments: 19000,
      shares: 150000,
      history: [
        { date: '2026-01-25', views: 5000, likes: 700, comments: 20, shares: 100 },
        { date: '2026-01-26', views: 800000, likes: 120000, comments: 3000, shares: 25000 },
        { date: '2026-01-27', views: 2800000, likes: 400000, comments: 10000, shares: 70000 },
        { date: '2026-01-28', views: 5600000, likes: 780000, comments: 19000, shares: 150000 },
      ],
    },
    topic: 'Curiosidades / Datos',
    hookDescription: 'Frase gancho directa ("te va a volar la cabeza") + texto en pantalla',
    narrativeStructure: 'Gancho → Dato inesperado → Explicación breve → Invitación a seguir',
    ctaDetected: 'Sígueme para más datos que te vuelan la cabeza',
    trendingSoundOrFormat: null,
    sourceLabel: 'Datos de demostración (ficticios)',
    lastUpdated: '2026-01-28T14:00:00Z',
    dataLimitations: ['Datos ficticios generados para demostración', 'Crecimiento extremadamente rápido en 3 días - patrón típico de contenido recomendado por algoritmo'],
    isDemo: true,
  },
  {
    id: 'demo-6',
    platform: 'facebook',
    title: 'Abuela aprende a usar IA y crea su primer cuadro',
    channel: 'FamiliaConectada',
    channelFollowers: 23000,
    url: 'https://facebook.com/watch?v=demo6',
    thumbnailUrl: null,
    publishedAt: '2026-01-15T12:00:00Z',
    duration: '3:20',
    language: 'es',
    region: 'MX',
    hashtags: ['#familia', '#tecnología', '#emotivo', '#abuela'],
    description: 'Mi abuela de 82 años usó inteligencia artificial para pintar. Su reacción no tiene precio.',
    metrics: {
      views: 4100000,
      likes: 520000,
      comments: 67000,
      shares: 280000,
      history: [
        { date: '2026-01-15', views: 800, likes: 50, comments: 10, shares: 30 },
        { date: '2026-01-17', views: 25000, likes: 3000, comments: 500, shares: 2000 },
        { date: '2026-01-20', views: 350000, likes: 45000, comments: 8000, shares: 30000 },
        { date: '2026-01-24', views: 1500000, likes: 200000, comments: 30000, shares: 120000 },
        { date: '2026-01-28', views: 4100000, likes: 520000, comments: 67000, shares: 280000 },
      ],
    },
    topic: 'Emotivo / Familia / Tecnología',
    hookDescription: 'Situación emocional + contraste generacional + resultado inesperado',
    narrativeStructure: 'Presentación del personaje → Proceso de aprendizaje → Reacción emocional → Cierre emotivo',
    ctaDetected: 'Comparte si también tienes una abuela tech',
    trendingSoundOrFormat: null,
    sourceLabel: 'Datos de demostración (ficticios)',
    lastUpdated: '2026-01-28T13:00:00Z',
    dataLimitations: ['Datos ficticios generados para demostración', 'Facebook tiene alta tasa de compartidos en contenido emotivo - métrica clave para viralización en esta plataforma'],
    isDemo: true,
  },
];

export const platformIntegrations: PlatformIntegration[] = [
  {
    platform: 'youtube',
    name: 'YouTube Data API v3',
    status: 'not_configured',
    availableMetrics: ['Visualizaciones', 'Me gusta', 'Comentarios', 'Fecha de publicación', 'Duración', 'Título', 'Descripción', 'Miniatura'],
    unavailableMetrics: ['Compartidos (no disponible en API pública)', 'Datos de audiencia segmentada', 'Ingresos'],
    requirements: 'API Key de Google Cloud Console con YouTube Data API v3 habilitada. Cuota: 10,000 unidades/día (gratuita).',
    notes: 'Las visualizaciones y me gusta son datos públicos. Los comentarios requieren análisis adicional. No se obtienen datos de suscriptores sin OAuth del canal.',
  },
  {
    platform: 'tiktok',
    name: 'TikTok Research API / Display API',
    status: 'not_configured',
    availableMetrics: ['Visualizaciones', 'Me gusta', 'Comentarios', 'Compartidos', 'Fecha de publicación'],
    unavailableMetrics: ['Datos de audiencia detallados', 'Fuentes de tráfico', 'Retención de audiencia'],
    requirements: 'Acceso a TikTok Research API (requiere solicitud y aprobación académica/empresarial) o Display API con OAuth del usuario.',
    notes: 'La Research API permite buscar vídeos por hashtags y keywords. La Display API requiere que el usuario autorice su cuenta. Los datos públicos de perfiles son limitados.',
  },
  {
    platform: 'instagram',
    name: 'Instagram Graph API / Basic Display API',
    status: 'not_configured',
    availableMetrics: ['Visualizaciones (Reels)', 'Me gusta', 'Comentarios', 'Guardados (solo cuenta propia)'],
    unavailableMetrics: ['Compartidos (limitado)', 'Alcance detallado', 'Datos de audiencia de terceros'],
    requirements: 'App de Facebook Developer con Instagram Graph API. Para datos propios: cuenta Business/Creator conectada. Para datos de terceros: muy limitado.',
    notes: 'La API pública de Instagram es muy restrictiva. Solo se pueden consultar métricas completas de cuentas propias conectadas como Business. Para terceros, los datos son mínimos.',
  },
  {
    platform: 'facebook',
    name: 'Facebook Graph API',
    status: 'not_configured',
    availableMetrics: ['Visualizaciones', 'Reacciones', 'Comentarios', 'Compartidos', 'Fecha de publicación'],
    unavailableMetrics: ['Datos de audiencia segmentada (sin permisos avanzados)', 'Vistas por fuente de tráfico'],
    requirements: 'App de Facebook Developer con permisos de Pages/Video. Requiere revisión de app para acceso a datos de páginas de terceros.',
    notes: 'Los vídeos públicos de páginas permiten consultar métricas básicas. El acceso a datos detallados requiere aprobación de Meta y justificación de uso.',
  },
];

export function generateHypotheses(video: VideoData): Hypothesis[] {
  const hypotheses: Hypothesis[] = [];
  
  // Hook analysis
  if (video.hookDescription) {
    hypotheses.push({
      id: `${video.id}-h1`,
      factor: 'Gancho inicial efectivo',
      description: `El vídeo presenta un gancho claro: "${video.hookDescription}". Esto puede haber capturado la atención en los primeros segundos, reduciendo la tasa de abandono.`,
      supportingData: [
        `Descripción del gancho: ${video.hookDescription}`,
        video.metrics.views ? `Alto número de visualizaciones (${video.metrics.views.toLocaleString('es-ES')}) sugiere buena retención inicial` : '',
      ].filter(Boolean),
      missingInfo: [
        'Tasa de retención real (no disponible sin acceso interno de la plataforma)',
        'Datos de A/B testing de thumbnails',
        'Métricas de scroll-stop rate',
      ],
      confidence: 'medium',
      alternativeExplanations: [
        'Las visualizaciones altas podrían deberse a recomendación algorítmica independiente del gancho',
        'El tema en sí podría ser suficientemente atractivo sin necesidad de un gancho elaborado',
      ],
    });
  }

  // Topic/niche analysis
  if (video.topic) {
    hypotheses.push({
      id: `${video.id}-h2`,
      factor: 'Tema de alta demanda',
      description: `El tema "${video.topic}" es un nicho con audiencia potencial amplia. Los contenidos de esta categoría suelen tener alto interés general.`,
      supportingData: [
        `Categoría detectada: ${video.topic}`,
        video.metrics.views ? `Visualizaciones superiores al tamaño del canal` : '',
      ].filter(Boolean),
      missingInfo: [
        'Volumen de búsqueda del tema en la plataforma',
        'Competencia en el nicho en el momento de publicación',
        'Datos de tendencia del tema',
      ],
      confidence: 'medium',
      alternativeExplanations: [
        'El éxito podría deberse más al formato que al tema específico',
        'Podría ser un efecto de novedad temporal',
      ],
    });
  }

  // Engagement analysis
  const engagementRate = video.metrics.views && video.metrics.likes 
    ? ((video.metrics.likes + (video.metrics.comments || 0) + (video.metrics.shares || 0)) / video.metrics.views * 100)
    : null;
  
  if (engagementRate && engagementRate > 5) {
    hypotheses.push({
      id: `${video.id}-h3`,
      factor: 'Alta tasa de interacción',
      description: `La tasa de interacción es del ${engagementRate.toFixed(1)}%, lo cual es significativamente superior al promedio típico. Esto puede indicar que el contenido genera fuerte conexión emocional o utilidad percibida.`,
      supportingData: [
        `Tasa de interacción calculada: ${engagementRate.toFixed(2)}%`,
        `Fórmula: (likes + comentarios + compartidos) / visualizaciones × 100`,
        `Datos de entrada: likes=${video.metrics.likes}, comentarios=${video.metrics.comments}, compartidos=${video.metrics.shares}, views=${video.metrics.views}`,
      ],
      missingInfo: [
        'Promedio de engagement del canal para comparar',
        'Promedio de la plataforma para el mismo tipo de contenido',
        'Calidad de los comentarios (no solo cantidad)',
      ],
      confidence: 'high',
      alternativeExplanations: [
        'Podría haber controversia generando comentarios negativos',
        'Bots o interacciones automatizadas (no verificable sin datos adicionales)',
      ],
    });
  }

  // Shares analysis (especially for Facebook)
  if (video.metrics.shares && video.platform === 'facebook') {
    const shareRatio = video.metrics.shares / (video.metrics.views || 1) * 100;
    if (shareRatio > 3) {
      hypotheses.push({
        id: `${video.id}-h4`,
        factor: 'Alto ratio de compartidos (clave en Facebook)',
        description: `En Facebook, los compartidos son el principal motor de viralización. Con un ratio de ${shareRatio.toFixed(1)}% de compartidos/visualizaciones, este vídeo tiene características de contenido compartible: emotivo, identificable o útil.`,
        supportingData: [
          `Compartidos: ${video.metrics.shares.toLocaleString('es-ES')}`,
          `Ratio compartidos/visualizaciones: ${shareRatio.toFixed(2)}%`,
          'Facebook prioriza contenido con alto engagement social en el feed',
        ],
        missingInfo: [
          'Contexto de los compartidos (grupos, mensajes, muro)',
          'Datos de alcance generado por cada compartido',
        ],
        confidence: 'medium',
        alternativeExplanations: [
          'Los compartidos podrían concentrarse en un momento específico y no ser sostenidos',
          'Podría haber sido compartido por una cuenta con muchos seguidores',
        ],
      });
    }
  }

  // Growth pattern
  if (video.metrics.history && video.metrics.history.length >= 2) {
    const sorted = [...video.metrics.history].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const firstDayViews = sorted[0].views;
    const lastDayViews = sorted[sorted.length - 1].views;
    const growthFactor = lastDayViews / Math.max(firstDayViews, 1);
    
    if (growthFactor > 100) {
      hypotheses.push({
        id: `${video.id}-h5`,
        factor: 'Patrón de crecimiento exponencial',
        description: `El vídeo muestra un crecimiento de ${growthFactor.toFixed(0)}x desde su publicación hasta la última medición. Este patrón sugiere activación del algoritmo de recomendación de la plataforma.`,
        supportingData: [
          `Primer registro: ${firstDayViews.toLocaleString('es-ES')} visualizaciones`,
          `Último registro: ${lastDayViews.toLocaleString('es-ES')} visualizaciones`,
          `Factor de crecimiento: ${growthFactor.toFixed(0)}x`,
          `Periodo observado: ${sorted[0].date} a ${sorted[sorted.length - 1].date}`,
        ],
        missingInfo: [
          'Datos hora a hora para detectar picos exactos',
          'Información sobre si fue añadido a alguna lista de reproducción o destacado',
          'Si recibió promoción externa (shares en otras redes, medios)',
        ],
        confidence: 'medium',
        alternativeExplanations: [
          'El crecimiento podría deberse a un evento externo (mención en medios, share de cuenta grande)',
          'Podría ser estacional o relacionado con un evento de actualidad',
        ],
      });
    }
  }

  // CTA analysis
  if (video.ctaDetected) {
    hypotheses.push({
      id: `${video.id}-h6`,
      factor: 'Llamada a la acción presente',
      description: `Se detectó una CTA: "${video.ctaDetected}". Las llamadas a la acción pueden incrementar comentarios, guardados y suscripciones, lo que a su vez favorece la recomendación algorítmica.`,
      supportingData: [
        `CTA detectada: "${video.ctaDetected}"`,
        video.metrics.comments ? `Comentarios: ${video.metrics.comments.toLocaleString('es-ES')} (podría estar influido por la CTA)` : '',
      ].filter(Boolean),
      missingInfo: [
        'Momento exacto de la CTA en el vídeo',
        'Correlación temporal entre la CTA y picos de comentarios',
      ],
      confidence: 'low',
      alternativeExplanations: [
        'Los comentarios podrían generarse espontáneamente sin influencia de la CTA',
        'El efecto de la CTA podría ser marginal comparado con otros factores',
      ],
    });
  }

  return hypotheses;
}
