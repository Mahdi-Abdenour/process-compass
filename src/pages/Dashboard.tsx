import { 
  Workflow, 
  AlertTriangle, 
  CheckSquare, 
  BarChart3,
  Shield,
  FileCheck,
  Target,
  FileText
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ModuleCard } from "@/components/ui/module-card";
import { useManagementSystem } from "@/context/ManagementSystemContext";

const modules = [
  {
    id: "processes",
    title: "Processes",
    description: "Define and manage organizational processes with inputs, outputs, and ownership.",
    icon: Workflow,
    path: "/processes",
    isActive: true,
    accentColor: "bg-process",
  },
  {
    id: "issues",
    title: "Context & Issues",
    description: "SWOT analysis, risks and opportunities identification per process.",
    icon: AlertTriangle,
    path: "/issues",
    isActive: true,
    accentColor: "bg-warning",
  },
  {
    id: "actions",
    title: "Action Plan",
    description: "Corrective and improvement actions with full traceability to source.",
    icon: CheckSquare,
    path: "/actions",
    isActive: true,
    accentColor: "bg-action",
  },
  {
    id: "kpi",
    title: "Dashboard & KPIs",
    description: "Policy axes, objectives, and performance indicators monitoring.",
    icon: BarChart3,
    path: "/kpi",
    isActive: false,
    plannedMessage: "Module under development",
    accentColor: "bg-kpi",
  },
  {
    id: "leadership",
    title: "Leadership",
    description: "Quality policy definition, management review records and decisions.",
    icon: Target,
    path: "/leadership",
    isActive: false,
    plannedMessage: "Available in a future release",
    accentColor: "bg-primary",
  },
  {
    id: "audits",
    title: "Internal Audits",
    description: "Audit planning, execution, findings and nonconformity management.",
    icon: FileCheck,
    path: "/audits",
    isActive: false,
    plannedMessage: "Planned feature",
    accentColor: "bg-audit",
  },
];

export default function Dashboard() {
  const { processes, issues, actions, getOverdueActions } = useManagementSystem();
  
  const activeProcesses = processes.filter(p => p.status === "active").length;
  const openActions = actions.filter(a => a.status !== "completed" && a.status !== "cancelled").length;
  const overdueActions = getOverdueActions().length;
  const risksCount = issues.filter(i => i.type === "risk").length;

  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Management System" 
        subtitle="ISO 9001 Quality Management"
      />
      
      <div className="px-4 py-6 space-y-6">
        {/* Quick Stats */}
        <section>
          <div className="grid grid-cols-2 gap-3">
            <QuickStat 
              label="Active Processes" 
              value={activeProcesses} 
              icon={Workflow}
              color="text-process"
            />
            <QuickStat 
              label="Open Actions" 
              value={openActions}
              icon={CheckSquare}
              color="text-action"
              alert={overdueActions > 0 ? `${overdueActions} overdue` : undefined}
            />
            <QuickStat 
              label="Identified Risks" 
              value={risksCount}
              icon={Shield}
              color="text-risk"
            />
            <QuickStat 
              label="Total Issues" 
              value={issues.length}
              icon={AlertTriangle}
              color="text-warning"
            />
          </div>
        </section>

        {/* Modules Grid */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 px-1">
            Modules
          </h2>
          <div className="space-y-3">
            {modules.map((module) => (
              <ModuleCard
                key={module.id}
                title={module.title}
                description={module.description}
                icon={module.icon}
                path={module.path}
                isActive={module.isActive}
                plannedMessage={module.plannedMessage}
                accentColor={module.accentColor}
                count={
                  module.id === "processes" ? processes.length :
                  module.id === "issues" ? issues.length :
                  module.id === "actions" ? actions.length :
                  undefined
                }
              />
            ))}
          </div>
        </section>

        {/* Standard Info */}
        <section className="mobile-card bg-primary text-primary-foreground">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 mt-0.5 shrink-0 opacity-80" />
            <div>
              <h3 className="font-semibold">ISO 9001:2015</h3>
              <p className="text-sm opacity-80 mt-1">
                Quality management systems — Requirements
              </p>
              <p className="text-xs opacity-60 mt-2 font-mono">
                Active standard for this system
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

interface QuickStatProps {
  label: string;
  value: number;
  icon: React.ElementType;
  color?: string;
  alert?: string;
}

function QuickStat({ label, value, icon: Icon, color, alert }: QuickStatProps) {
  return (
    <div className="mobile-card">
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-4 h-4 ${color || "text-muted-foreground"}`} />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-mono font-bold">{value}</span>
        {alert && (
          <span className="text-xs text-destructive font-medium">{alert}</span>
        )}
      </div>
    </div>
  );
}
