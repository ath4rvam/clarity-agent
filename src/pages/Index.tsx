import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ThreatIndicators } from "@/components/dashboard/ThreatIndicators";
import { HeatmapPanel } from "@/components/dashboard/HeatmapPanel";
import { VerificationPipeline } from "@/components/dashboard/VerificationPipeline";
import { AnalyticsPanel } from "@/components/dashboard/AnalyticsPanel";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Threat Overview */}
        <section>
          <ThreatIndicators />
        </section>

        {/* Regional Heatmap */}
        <section>
          <HeatmapPanel />
        </section>

        {/* Two-column layout for Pipeline and Analytics */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VerificationPipeline />
          <div>
            <AnalyticsPanel />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
