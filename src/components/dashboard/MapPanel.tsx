import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockRegionData } from "@/data/mockCrisisData";
import { Map, AlertCircle } from "lucide-react";

const threatColors = {
  critical: '#ef4444',
  high: '#f97316',
  medium: '#fb923c',
  low: '#22c55e'
};

export const MapPanel = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapReady, setIsMapReady] = useState(false);
  const [tokenInput, setTokenInput] = useState('');

  const initializeMap = (token: string) => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [78.9629, 30.0668], // Uttarakhand center
      zoom: 8,
      pitch: 45,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    map.current.on('load', () => {
      setIsMapReady(true);
      
      // Add markers for each region
      mockRegionData.forEach((region) => {
        if (!map.current) return;

        // Create custom marker element
        const el = document.createElement('div');
        el.className = 'crisis-marker';
        el.style.backgroundColor = threatColors[region.threatLevel];
        el.style.width = `${20 + region.activeClaims * 2}px`;
        el.style.height = `${20 + region.activeClaims * 2}px`;
        el.style.borderRadius = '50%';
        el.style.border = '3px solid rgba(255, 255, 255, 0.8)';
        el.style.cursor = 'pointer';
        el.style.boxShadow = `0 0 20px ${threatColors[region.threatLevel]}`;
        el.style.transition = 'all 0.3s ease';
        
        el.addEventListener('mouseenter', () => {
          el.style.transform = 'scale(1.3)';
        });
        
        el.addEventListener('mouseleave', () => {
          el.style.transform = 'scale(1)';
        });

        // Create popup content
        const popup = new mapboxgl.Popup({ 
          offset: 25,
          className: 'crisis-popup'
        }).setHTML(`
          <div style="padding: 8px; min-width: 200px;">
            <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 8px; color: #fff;">${region.region}</h3>
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="color: #94a3b8;">Threat Level:</span>
              <span style="color: ${threatColors[region.threatLevel]}; font-weight: bold; text-transform: uppercase;">${region.threatLevel}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="color: #94a3b8;">Active Claims:</span>
              <span style="color: #fff; font-weight: bold;">${region.activeClaims}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="color: #94a3b8;">False Claims:</span>
              <span style="color: #ef4444; font-weight: bold;">${region.falseClaims}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #94a3b8;">Verified:</span>
              <span style="color: #22c55e; font-weight: bold;">${region.verifiedClaims}</span>
            </div>
          </div>
        `);

        // Add marker to map
        new mapboxgl.Marker(el)
          .setLngLat([region.lng, region.lat])
          .setPopup(popup)
          .addTo(map.current);
      });

      // Add atmospheric effects
      map.current.setFog({
        color: 'rgb(30, 30, 40)',
        'high-color': 'rgb(50, 50, 60)',
        'horizon-blend': 0.1,
      });
    });
  };

  const handleTokenSubmit = () => {
    if (tokenInput.trim()) {
      setMapboxToken(tokenInput.trim());
      initializeMap(tokenInput.trim());
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Map className="h-5 w-5" />
            Crisis Map - Geospatial Intelligence
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Interactive map showing real-time misinformation hotspots
          </p>
        </div>
      </div>

      {!mapboxToken ? (
        <div className="space-y-4">
          <div className="flex items-start gap-2 p-4 bg-info/10 border border-info/20 rounded-lg">
            <AlertCircle className="h-5 w-5 text-info mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-foreground font-medium mb-2">Mapbox Token Required</p>
              <p className="text-muted-foreground mb-3">
                To display the interactive crisis map, please enter your Mapbox public token. 
                Get one for free at{' '}
                <a 
                  href="https://mapbox.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  mapbox.com
                </a>
              </p>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="pk.eyJ1Ijoi..."
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleTokenSubmit} variant="default">
                  Load Map
                </Button>
              </div>
            </div>
          </div>
          
          {/* Placeholder */}
          <div className="relative w-full h-[500px] bg-secondary/30 rounded-lg flex items-center justify-center border border-border">
            <div className="text-center">
              <Map className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Enter your Mapbox token to view the crisis map</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div ref={mapContainer} className="w-full h-[500px] rounded-lg" />
          {!isMapReady && (
            <div className="absolute inset-0 bg-secondary/30 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading crisis map...</p>
              </div>
            </div>
          )}
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm p-4 rounded-lg border border-border">
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
              Marker size = claim volume
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};
