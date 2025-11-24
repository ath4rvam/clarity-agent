import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockRegionData } from "@/data/mockCrisisData";
import { Map, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const threatColors = {
  critical: '#ef4444',
  high: '#f97316',
  medium: '#fb923c',
  low: '#22c55e'
};

export const MapPanel = () => {
  const getThreatBadgeVariant = (level: string) => {
    switch (level) {
      case 'critical':
        return 'destructive';
      case 'high':
      case 'medium':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Map className="h-5 w-5" />
            Crisis Map - Geospatial Intelligence
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Interactive map showing real-time misinformation hotspots across Uttarakhand
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="w-full h-[500px] rounded-lg overflow-hidden border border-border">
          <MapContainer
            center={[30.0668, 78.9629]}
            zoom={9}
            className="h-full w-full"
            scrollWheelZoom={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {mockRegionData.map((region, index) => (
              <CircleMarker
                key={index}
                center={[region.lat, region.lng]}
                pathOptions={{
                  fillColor: threatColors[region.threatLevel],
                  color: threatColors[region.threatLevel],
                  fillOpacity: 0.7,
                  weight: 3,
                }}
                radius={10 + region.activeClaims * 2}
              >
                <Popup className="crisis-popup">
                  <div className="p-2 min-w-[220px]">
                    <h3 className="font-bold text-base mb-3 text-foreground flex items-center gap-2">
                      {region.region}
                      <Badge variant={getThreatBadgeVariant(region.threatLevel)}>
                        {region.threatLevel}
                      </Badge>
                    </h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Active Claims:
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          {region.activeClaims}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <XCircle className="h-3 w-3" />
                          False Claims:
                        </span>
                        <span className="text-sm font-semibold text-destructive">
                          {region.falseClaims}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Verified:
                        </span>
                        <span className="text-sm font-semibold text-verified">
                          {region.verifiedClaims}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-2 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        Verification Rate: {Math.round((region.verifiedClaims / region.activeClaims) * 100)}%
                      </p>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
        
        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm p-4 rounded-lg border border-border shadow-lg">
          <p className="text-xs text-muted-foreground mb-3 font-semibold uppercase tracking-wider">
            Threat Levels
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full border-2" 
                style={{ 
                  backgroundColor: threatColors.critical,
                  borderColor: threatColors.critical 
                }}
              />
              <span className="text-xs text-foreground font-medium">Critical</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full border-2" 
                style={{ 
                  backgroundColor: threatColors.high,
                  borderColor: threatColors.high 
                }}
              />
              <span className="text-xs text-foreground font-medium">High</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full border-2" 
                style={{ 
                  backgroundColor: threatColors.medium,
                  borderColor: threatColors.medium 
                }}
              />
              <span className="text-xs text-foreground font-medium">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full border-2" 
                style={{ 
                  backgroundColor: threatColors.low,
                  borderColor: threatColors.low 
                }}
              />
              <span className="text-xs text-foreground font-medium">Low</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3 pt-2 border-t border-border">
            Circle size indicates claim volume
          </p>
        </div>
      </div>
    </Card>
  );
};
