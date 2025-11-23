import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockRegionData } from "@/data/mockCrisisData";
import { AlertTriangle, MapPin } from "lucide-react";

const threatColors = {
  critical: "bg-critical",
  high: "bg-warning",
  medium: "bg-warning/60",
  low: "bg-verified"
};

const threatBadges = {
  critical: "critical",
  high: "warning",
  medium: "warning",
  low: "verified"
};

export const HeatmapPanel = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Regional Threat Heatmap
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time misinformation spread across affected regions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Last updated:</span>
          <span className="text-xs text-foreground font-medium">Just now</span>
        </div>
      </div>

      {/* Simplified visual heatmap */}
      <div className="relative bg-secondary/30 rounded-lg p-8 mb-6 border border-border">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {mockRegionData.map((region, index) => (
            <div
              key={region.region}
              className={`relative p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                region.threatLevel === 'critical' ? 'border-critical pulse-critical' : 
                region.threatLevel === 'high' ? 'border-warning pulse-warning' :
                'border-border'
              }`}
              style={{
                background: `radial-gradient(circle, ${
                  region.threatLevel === 'critical' ? 'hsl(0 84% 60% / 0.2)' : 
                  region.threatLevel === 'high' ? 'hsl(38 92% 50% / 0.2)' :
                  region.threatLevel === 'medium' ? 'hsl(38 92% 50% / 0.1)' :
                  'hsl(142 76% 36% / 0.1)'
                } 0%, transparent 70%)`
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-foreground">{region.region}</h3>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    region.threatLevel === 'critical' ? 'bg-critical/20 text-critical border-critical/50' : 
                    region.threatLevel === 'high' ? 'bg-warning/20 text-warning border-warning/50' :
                    region.threatLevel === 'medium' ? 'bg-warning/10 text-warning border-warning/30' :
                    'bg-verified/20 text-verified border-verified/50'
                  }`}
                >
                  {region.threatLevel.toUpperCase()}
                </Badge>
              </div>
              
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Claims:</span>
                  <span className="font-medium text-foreground">{region.activeClaims}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">False:</span>
                  <span className="font-medium text-critical">{region.falseClaims}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Verified:</span>
                  <span className="font-medium text-verified">{region.verifiedClaims}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-sm">
        <span className="text-muted-foreground">Threat Levels:</span>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-critical"></div>
          <span className="text-foreground">Critical</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-warning"></div>
          <span className="text-foreground">High</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-warning/60"></div>
          <span className="text-foreground">Medium</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-verified"></div>
          <span className="text-foreground">Low</span>
        </div>
      </div>
    </Card>
  );
};
