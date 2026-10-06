import { useState } from 'react';
import { Wifi, WifiOff, AlertCircle, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { platformIntegrations } from '../data/demo';

export default function PlatformStatus() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const statusConfig = {
    connected: { label: 'Conectado', color: 'text-green-600', icon: Wifi, bg: 'bg-green-50 border-green-200' },
    not_configured: { label: 'No configurado', color: 'text-amber-600', icon: WifiOff, bg: 'bg-amber-50 border-amber-200' },
    limited: { label: 'Limitado', color: 'text-orange-600', icon: AlertCircle, bg: 'bg-orange-50 border-orange-200' },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Wifi className="w-5 h-5 text-indigo-600" />
          Estado de integraciones
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Estado actual de las conexiones con cada plataforma. Ninguna integración está configurada en esta versión de demostración.
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {platformIntegrations.map(pi => {
          const status = statusConfig[pi.status];
          const StatusIcon = status.icon;
          const isExpanded = expanded === pi.platform;

          return (
            <div key={pi.platform} className="p-4">
              <button
                onClick={() => setExpanded(isExpanded ? null : pi.platform)}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <StatusIcon className={`w-5 h-5 ${status.color}`} />
                  <div className="text-left">
                    <p className="font-medium text-gray-800 text-sm">{pi.name}</p>
                    <p className="text-xs text-gray-500">{pi.platform.charAt(0).toUpperCase() + pi.platform.slice(1)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${status.bg} ${status.color}`}>
                    {status.label}
                  </span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>
              </button>

              {isExpanded && (
                <div className="mt-3 pl-8 space-y-3">
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-1">Métricas disponibles:</p>
                    <div className="flex flex-wrap gap-1">
                      {pi.availableMetrics.map(m => (
                        <span key={m} className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full border border-green-200">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-1">No disponibles:</p>
                    <div className="flex flex-wrap gap-1">
                      {pi.unavailableMetrics.map(m => (
                        <span key={m} className="px-2 py-0.5 bg-red-50 text-red-600 text-xs rounded-full border border-red-200">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-800">
                      <strong>Requisitos:</strong> {pi.requirements}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 flex items-start gap-1">
                      <Info className="w-3 h-3 mt-0.5 shrink-0" />
                      {pi.notes}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-600">
          <strong>Nota:</strong> Esta aplicación funciona actualmente con datos de demostración claramente marcados. 
          Para conectar APIs reales, se necesitan claves de acceso y, en algunos casos, aprobación de las plataformas. 
          Consulta la sección de cada plataforma para ver los requisitos específicos.
        </p>
      </div>
    </div>
  );
}
