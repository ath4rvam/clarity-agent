import { Card } from "@/components/ui/card";
import { mockAnalytics } from "@/data/mockCrisisData";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

const COLORS = {
  critical: 'hsl(0 84% 60%)',
  high: 'hsl(38 92% 50%)',
  medium: 'hsl(38 92% 50% / 0.6)',
  low: 'hsl(142 76% 36%)',
  verified: 'hsl(142 76% 36%)',
  false: 'hsl(0 84% 60%)',
  primary: 'hsl(217 91% 60%)'
};

export const AnalyticsPanel = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Hourly Trends */}
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Claims Over Time
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            24-hour activity pattern
          </p>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={mockAnalytics.hourlyTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="hour" 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="claims" 
              stroke={COLORS.primary}
              strokeWidth={2}
              name="Total Claims"
              dot={{ fill: COLORS.primary }}
            />
            <Line 
              type="monotone" 
              dataKey="false" 
              stroke={COLORS.false}
              strokeWidth={2}
              name="False Claims"
              dot={{ fill: COLORS.false }}
            />
            <Line 
              type="monotone" 
              dataKey="verified" 
              stroke={COLORS.verified}
              strokeWidth={2}
              name="Verified Claims"
              dot={{ fill: COLORS.verified }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Threat Distribution */}
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">Threat Distribution</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Claims by severity level
          </p>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={mockAnalytics.threatDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {mockAnalytics.threatDistribution.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={
                    entry.name === 'Critical' ? COLORS.critical :
                    entry.name === 'High' ? COLORS.high :
                    entry.name === 'Medium' ? COLORS.medium :
                    COLORS.low
                  } 
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Source Distribution */}
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">Top Sources</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Misinformation by platform
          </p>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={mockAnalytics.topSources}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="count" fill={COLORS.primary} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Key Metrics */}
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">Key Performance Metrics</h3>
          <p className="text-sm text-muted-foreground mt-1">
            System efficiency indicators
          </p>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg. Verification Time</p>
              <p className="text-3xl font-bold text-foreground">{mockAnalytics.averageVerificationTime} min</p>
            </div>
            <div className="flex items-center gap-2 text-verified">
              <TrendingDown className="h-5 w-5" />
              <span className="text-sm font-medium">-2 min from last hour</span>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Verification Rate</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-foreground">94.2%</p>
                  <span className="text-xs text-verified">+2.1%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">False Detection</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-foreground">48.4%</p>
                  <span className="text-xs text-critical">+5.3%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground mb-3">Agent Performance</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Collector Agent</span>
                <span className="text-foreground font-medium">98% uptime</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Verification Agent</span>
                <span className="text-foreground font-medium">96% accuracy</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Distribution Agent</span>
                <span className="text-foreground font-medium">99% delivery</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
