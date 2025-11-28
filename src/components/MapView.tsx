import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { Loader2 } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { Badge } from '@/components/ui/badge';
import { mockRegionData } from '@/data/mockCrisisData';

interface Hotspot {
  lat: number;
  lng: number;
  intensity: number;
  category: string;
  region: string;
  activeClaims: number;
  falseClaims: number;
  verifiedClaims: number;
}

const MapView = () => {
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Convert mock region data to hotspot format
    const convertedHotspots: Hotspot[] = mockRegionData.map((region) => ({
      lat: region.lat,
      lng: region.lng,
      intensity: (region.falseClaims / region.activeClaims) * 100,
      category: region.threatLevel,
      region: region.region,
      activeClaims: region.activeClaims,
      falseClaims: region.falseClaims,
      verifiedClaims: region.verifiedClaims,
    }));
    
    setHotspots(convertedHotspots);
    setLoading(false);
  }, []);

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'critical':
        return '#ef4444'; // red
      case 'high':
        return '#f97316'; // orange
      case 'medium':
        return '#fb923c'; // light orange
      case 'low':
        return '#22c55e'; // green
      default:
        return '#6b7280'; // gray
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-card rounded-lg border border-border">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden border border-border">
      <MapContainer
        center={[78.9629, 30.0668] as [number, number]}
        zoom={8}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {hotspots.map((hotspot, index) => (
          <CircleMarker
            key={index}
            center={[hotspot.lat, hotspot.lng] as [number, number]}
            pathOptions={{
              fillColor: getCategoryColor(hotspot.category),
              color: getCategoryColor(hotspot.category),
              fillOpacity: 0.6,
              weight: 2,
            }}
            radius={Math.sqrt(hotspot.activeClaims) * 3}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-base mb-2">{hotspot.region}</h3>
                <Badge className="mb-3 capitalize">{hotspot.category}</Badge>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Active Claims:</span>
                    <span className="font-semibold">{hotspot.activeClaims}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">False Claims:</span>
                    <span className="font-semibold text-destructive">{hotspot.falseClaims}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Verified:</span>
                    <span className="font-semibold text-verified">{hotspot.verifiedClaims}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t mt-2">
                    <span className="text-muted-foreground">False Rate:</span>
                    <span className="font-semibold">{hotspot.intensity.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
