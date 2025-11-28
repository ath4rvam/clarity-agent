import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from "@/components/ui/card";
import { mockRegionData } from "@/data/mockCrisisData";
import { Map as MapIcon, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const threatColors = {
  critical: '#ef4444',
  high: '#f97316',
  medium: '#fb923c',
  low: '#22c55e'
};

export const MapPanel = () => {
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => setIsMapReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const getThreatColor = (level: string): string => {
    return threatColors[level as keyof typeof threatColors] || threatColors.low;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <MapIcon className="h-5 w-5" />
            Crisis Map - Geospatial Intelligence
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Interactive map showing real-time misinformation hotspots
          </p>
        </div>
      </div>

      <div className="relative">
        {!isMapReady ? (
          <div className="flex items-center justify-center h-[500px] bg-card rounded-lg border border-border">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading map...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full h-[500px] rounded-lg overflow-hidden border border-border">
              <MapContainer
                center={[30.0668, 78.9629] as [number, number]}
                zoom={8}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {mockRegionData.map((region, index) => (
                  <CircleMarker
                    key={`marker-${index}-${region.region}`}
                    center={[region.lat, region.lng] as [number, number]}
                    pathOptions={{
                      fillColor: getThreatColor(region.threatLevel),
                      color: getThreatColor(region.threatLevel),
                      fillOpacity: 0.6,
                      weight: 2,
                    }}
                    radius={10 + region.activeClaims}
                  >
                    <Popup>
                      <div className="p-2 min-w-[200px]">
                        <h3 className="font-bold text-base mb-2">{region.region}</h3>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Threat Level:</span>
                            <Badge 
                              variant="outline" 
                              style={{ 
                                borderColor: getThreatColor(region.threatLevel),
                                color: getThreatColor(region.threatLevel)
                              }}
                            >
                              {region.threatLevel.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Active Claims:</span>
                            <span className="font-bold text-sm">{region.activeClaims}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">False Claims:</span>
                            <span className="font-bold text-sm" style={{ color: threatColors.critical }}>{region.falseClaims}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Verified:</span>
                            <span className="font-bold text-sm" style={{ color: threatColors.low }}>{region.verifiedClaims}</span>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
            </div>
            
            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm p-4 rounded-lg border border-border shadow-lg">
              <p className="text-xs text-muted-foreground mb-2 font-semibold">THREAT LEVELS</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: threatColors.critical }}></div>
                  <span className="text-xs text-foreground">Critical</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: threatColors.high }}></div>
                  <span className="text-xs text-foreground">High</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: threatColors.medium }}></div>
                  <span className="text-xs text-foreground">Medium</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: threatColors.low }}></div>
                  <span className="text-xs text-foreground">Low</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Circle size = claim volume
              </p>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};
