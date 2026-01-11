import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Workflow, ArrowRight, Filter } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/ui/empty-state";
import { Fab } from "@/components/ui/fab";
import { StatusBadge } from "@/components/ui/status-badge";
import { useManagementSystem } from "@/context/ManagementSystemContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ProcessList() {
  const navigate = useNavigate();
  const { processes } = useManagementSystem();
  const [filter, setFilter] = useState<"all" | "active" | "draft">("all");

  const filteredProcesses = processes.filter((p) => {
    if (filter === "all") return p.status !== "archived";
    return p.status === filter;
  });

  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Processes" 
        subtitle="Fiche Processus — ISO 9001"
      />

      {processes.length > 0 && (
        <div className="section-header border-b-0">
          <div className="flex gap-2">
            <FilterButton 
              active={filter === "all"} 
              onClick={() => setFilter("all")}
            >
              All
            </FilterButton>
            <FilterButton 
              active={filter === "active"} 
              onClick={() => setFilter("active")}
            >
              Active
            </FilterButton>
            <FilterButton 
              active={filter === "draft"} 
              onClick={() => setFilter("draft")}
            >
              Draft
            </FilterButton>
          </div>
        </div>
      )}

      <div className="px-4 py-4 space-y-3">
        {filteredProcesses.length === 0 ? (
          <EmptyState
            icon={Workflow}
            title="No processes defined"
            description="Processes are the backbone of your management system. Start by defining your key organizational processes."
            actionLabel="Create First Process"
            onAction={() => navigate("/processes/new")}
            helperText="Each process will have inputs, outputs, a pilot, and linked indicators, risks, and actions."
          />
        ) : (
          filteredProcesses.map((process) => (
            <button
              key={process.id}
              onClick={() => navigate(`/processes/${process.id}`)}
              className="process-card w-full text-left"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-process font-medium">
                      {process.code}
                    </span>
                    <StatusBadge status={process.status} />
                  </div>
                  <h3 className="font-semibold truncate">{process.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {process.purpose}
                  </p>
                  {process.pilotName && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Pilot: {process.pilotName}
                    </p>
                  )}
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
              </div>
              
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
                <StatChip label="Risks" value={process.riskIds.length} />
                <StatChip label="Actions" value={process.actionIds.length} />
                <StatChip label="Indicators" value={process.indicatorIds.length} />
              </div>
            </button>
          ))
        )}
      </div>

      <Fab onClick={() => navigate("/processes/new")} label="Create process" />
    </div>
  );
}

function FilterButton({ 
  children, 
  active, 
  onClick 
}: { 
  children: React.ReactNode; 
  active: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 text-sm font-medium rounded-full transition-colors",
        active 
          ? "bg-primary text-primary-foreground" 
          : "text-muted-foreground hover:bg-muted"
      )}
    >
      {children}
    </button>
  );
}

function StatChip({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-mono text-sm font-medium">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
