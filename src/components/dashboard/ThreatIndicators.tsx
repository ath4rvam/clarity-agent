import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { mockAnalytics } from "@/data/mockCrisisData";

const indicators = [
  {
    label: "Total Claims",
    value: mockAnalytics.totalClaims,
    icon: AlertTriangle,
    variant: "default",
    change: "+23 in last hour"
  },
  {
    label: "False Claims",
    value: mockAnalytics.falseClaims,
    icon: XCircle,
    variant: "critical",
    change: "+15 in last hour"
  },
  {
    label: "Verified Claims",
    value: mockAnalytics.verifiedClaims,
    icon: CheckCircle,
    variant: "verified",
    change: "+8 in last hour"
  },
  {
    label: "Pending Review",
    value: mockAnalytics.pendingClaims,
    icon: Clock,
    variant: "warning",
    change: "Avg. 12 min verification"
  }
];

const variantStyles = {
  default: "border-border bg-card",
  critical: "border-critical/30 bg-critical/5",
  verified: "border-verified/30 bg-verified/5",
  warning: "border-warning/30 bg-warning/5"
};

const iconStyles = {
  default: "text-foreground",
  critical: "text-critical",
  verified: "text-verified",
  warning: "text-warning"
};

export const ThreatIndicators = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {indicators.map((indicator) => (
        <Card 
          key={indicator.label}
          className={`p-6 ${variantStyles[indicator.variant as keyof typeof variantStyles]}`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{indicator.label}</p>
              <p className="text-3xl font-bold text-foreground mb-2">{indicator.value}</p>
              <p className="text-xs text-muted-foreground">{indicator.change}</p>
            </div>
            <indicator.icon className={`h-8 w-8 ${iconStyles[indicator.variant as keyof typeof iconStyles]}`} />
          </div>
        </Card>
      ))}
    </div>
  );
};
