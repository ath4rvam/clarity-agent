import { AlertTriangle, Activity, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const DashboardHeader = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Miss. Information</h1>
                <p className="text-sm text-muted-foreground">Crisis Misinformation Command Center</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-verified animate-pulse" />
              <span className="text-sm text-muted-foreground">System Active</span>
            </div>
            
            <Badge variant="outline" className="bg-critical/10 text-critical border-critical/30 pulse-critical">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Active Crisis: Uttarakhand Floods
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
};
