import { Card } from "@/components/ui/card";
import { Map } from "lucide-react";
import MapView from "@/components/MapView";

const threatColors = {
  critical: '#ef4444',
  high: '#f97316',
  medium: '#fb923c',
  low: '#22c55e'
};

export const MapPanel = () => {
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

      <MapView />
      
      {/* Legend */}
      <div className="mt-4 bg-secondary/30 p-4 rounded-lg border border-border">
        <p className="text-xs text-muted-foreground mb-2 font-semibold">THREAT LEVELS</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
          Marker size indicates claim volume
        </p>
      </div>
    </Card>
  );
};
