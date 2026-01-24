import { BarChart3, Target, TrendingUp, Lock } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

export default function KPIDashboard() {
  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Dashboard & KPIs" 
        subtitle="Performance Monitoring"
      />

      <div className="px-4 py-6">
        <div className="empty-state">
          <div className="w-16 h-16 rounded-2xl bg-kpi/10 flex items-center justify-center mb-4">
            <BarChart3 className="w-8 h-8 text-kpi" />
          </div>
          
          <h3 className="font-serif text-lg font-semibold mb-2">
            Module Under Development
          </h3>
          
          <p className="text-sm text-muted-foreground max-w-[280px] mb-6">
            The Dashboard & KPI module will provide comprehensive management control with policy axes, objectives, and indicators.
          </p>

          <div className="space-y-3 w-full max-w-[300px]">
            <PlannedFeature 
              icon={Target}
              title="Policy Axes"
              description="Define strategic axes derived from quality policy"
            />
            <PlannedFeature 
              icon={TrendingUp}
              title="Objectives & Indicators"
              description="Measurable objectives with linked KPIs"
            />
            <PlannedFeature 
              icon={BarChart3}
              title="Performance Tracking"
              description="Automatic status evaluation and trend analysis"
            />
          </div>

          <p className="text-xs text-muted-foreground mt-8 font-mono">
            Available in a future release
          </p>
        </div>
      </div>
    </div>
  );
}

interface PlannedFeatureProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function PlannedFeature({ icon: Icon, title, description }: PlannedFeatureProps) {
  return (
    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg text-left">
      <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-muted-foreground" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-medium">{title}</h4>
          <Lock className="w-3 h-3 text-muted-foreground" />
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
    </div>
  );
}
