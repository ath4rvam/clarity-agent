import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockClaims } from "@/data/mockCrisisData";
import { Clock, CheckCircle, XCircle, AlertCircle, ArrowRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const statusIcons = {
  pending: Clock,
  verifying: AlertCircle,
  verified: CheckCircle,
  false: XCircle,
  misleading: AlertCircle
};

const statusColors = {
  pending: "text-muted-foreground bg-muted/50 border-muted",
  verifying: "text-info bg-info/10 border-info/30",
  verified: "text-verified bg-verified/10 border-verified/30",
  false: "text-critical bg-critical/10 border-critical/30",
  misleading: "text-warning bg-warning/10 border-warning/30"
};

export const VerificationPipeline = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Verification Pipeline</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time claim processing and fact-checking status
          </p>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
          6 Active Claims
        </Badge>
      </div>

      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-4">
          {mockClaims.map((claim, index) => {
            const StatusIcon = statusIcons[claim.status];
            
            return (
              <div
                key={claim.id}
                className="border border-border rounded-lg p-4 bg-card hover:border-primary/30 transition-all duration-300"
                style={{
                  animation: `fadeIn 0.5s ease-in ${index * 0.1}s both`
                }}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg border ${statusColors[claim.status]}`}>
                    <StatusIcon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-sm text-foreground font-medium line-clamp-2">
                        {claim.text}
                      </p>
                      <Badge 
                        variant="outline"
                        className={`shrink-0 ${
                          claim.threatLevel === 'critical' ? 'bg-critical/10 text-critical border-critical/30' :
                          claim.threatLevel === 'high' ? 'bg-warning/10 text-warning border-warning/30' :
                          claim.threatLevel === 'medium' ? 'bg-warning/5 text-warning border-warning/20' :
                          'bg-muted text-muted-foreground border-muted'
                        }`}
                      >
                        {claim.threatLevel.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span>Source: {claim.source}</span>
                      <span>•</span>
                      <span>Location: {claim.location.city}</span>
                      <span>•</span>
                      <span>Media: {claim.mediaType}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        Viral: <span className="text-foreground font-medium">{claim.viralCoefficient}/10</span>
                      </span>
                    </div>

                    {claim.verificationDetails && (
                      <div className="border-l-2 border-primary/30 pl-4 space-y-2 bg-primary/5 p-3 rounded-r">
                        <p className="text-xs font-medium text-primary">
                          Verification Complete
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {claim.verificationDetails.reasoning}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {claim.verificationDetails.agents.map((agent) => (
                            <Badge key={agent} variant="secondary" className="text-xs">
                              {agent}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {!claim.verificationDetails && (
                      <div className="flex items-center gap-2 text-xs text-info">
                        <AlertCircle className="h-3 w-3 animate-pulse" />
                        <span>Processing through verification agents...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
};

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
