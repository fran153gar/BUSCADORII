import { VideoData, Hypothesis } from '../types';
import { AlertTriangle, CheckCircle, HelpCircle, ChevronDown, ChevronUp, Lightbulb, Eye, Users, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface Props {
  video: VideoData;
  hypotheses: Hypothesis[];
}

const confidenceConfig = {
  low: { label: 'Bajo', color: 'bg-red-100 text-red-700 border-red-200', icon: HelpCircle },
  medium: { label: 'Medio', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: AlertTriangle },
  high: { label: 'Alto', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
};

export default function AnalysisPanel({ video, hypotheses }: Props) {
  const [expandedH, setExpandedH] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Observable elements */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-1.5">
          <Eye className="w-4 h-4 text-indigo-500" />
          Elementos observables
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ObservableCard label="Tema / Enfoque" value={video.topic} />
          <ObservableCard label="Gancho inicial" value={video.hookDescription} />
          <ObservableCard label="Estructura narrativa" value={video.narrativeStructure} />
          <ObservableCard label="Llamada a la acción" value={video.ctaDetected} />
          <ObservableCard label="Sonido/formato en tendencia" value={video.trendingSoundOrFormat} />
          <ObservableCard label="Público aparente" value={video.language ? `Idioma: ${video.language.toUpperCase()}${video.region ? `, Región: ${video.region}` : ''}` : null} />
        </div>
      </div>

      {/* Hypotheses */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-1.5">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          Hipótesis sobre factores de viralización
        </h3>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-xs text-blue-800">
            <strong>Importante:</strong> Las siguientes hipótesis se basan en datos observables y cálculos derivados. 
            No determinan la causa exacta de la viralización. Cada hipótesis indica su nivel de confianza, 
            qué datos la respaldan y qué información falta para confirmarla.
          </p>
        </div>

        {hypotheses.length > 0 ? (
          <div className="space-y-3">
            {hypotheses.map(h => {
              const conf = confidenceConfig[h.confidence];
              const isExpanded = expandedH === h.id;
              return (
                <div key={h.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedH(isExpanded ? null : h.id)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2 text-left">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${conf.color}`}>
                        {conf.label}
                      </span>
                      <span className="text-sm font-medium text-gray-800">{h.factor}</span>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>
                  
                  {isExpanded && (
                    <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3">
                      <p className="text-sm text-gray-600">{h.description}</p>
                      
                      <div>
                        <p className="text-xs font-medium text-green-700 mb-1 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Datos que la respaldan:
                        </p>
                        <ul className="list-disc list-inside text-xs text-gray-600 space-y-0.5 ml-2">
                          {h.supportingData.map((d, i) => <li key={i}>{d}</li>)}
                        </ul>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-amber-700 mb-1 flex items-center gap-1">
                          <HelpCircle className="w-3 h-3" />
                          Información que falta:
                        </p>
                        <ul className="list-disc list-inside text-xs text-gray-600 space-y-0.5 ml-2">
                          {h.missingInfo.map((m, i) => <li key={i}>{m}</li>)}
                        </ul>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Explicaciones alternativas:
                        </p>
                        <ul className="list-disc list-inside text-xs text-gray-600 space-y-0.5 ml-2">
                          {h.alternativeExplanations.map((a, i) => <li key={i}>{a}</li>)}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Lightbulb className="w-10 h-10 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No se han podido generar hipótesis con los datos disponibles.</p>
            <p className="text-xs mt-1">Se necesitan más datos observables para el análisis.</p>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5" />
          Limitaciones del análisis
        </h4>
        <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
          <li>Este análisis no determina causas de viralización, solo identifica patrones observables.</li>
          <li>No se infieren datos demográficos, emociones del público ni información privada.</li>
          <li>Las métricas de plataformas distintas no son directamente comparables (difieren en definición y disponibilidad).</li>
          <li>Los algoritmos de recomendación de cada plataforma son opacos y no pueden analizarse directamente.</li>
          <li>La viralización es multifactorial: un mismo resultado puede tener explicaciones distintas.</li>
        </ul>
      </div>
    </div>
  );
}

function ObservableCard({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <p className="text-xs text-gray-500 font-medium mb-1">{label}</p>
      <p className="text-sm text-gray-700">{value || 'No disponible'}</p>
    </div>
  );
}
