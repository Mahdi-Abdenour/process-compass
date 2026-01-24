import { useNavigate } from "react-router-dom";
import { 
  Shield, 
  CheckCircle2, 
  Clock, 
  Lock, 
  ChevronRight,
  AlertCircle,
  Layers
} from "lucide-react";
import { useManagementSystem } from "@/context/ManagementSystemContext";
import { Process } from "@/types/management-system";
import { StandardFunction, FunctionInstance } from "@/types/functions";
import { cn } from "@/lib/utils";

interface ApplicableFunctionsProps {
  process: Process;
}

interface ApplicableFunctionItem {
  function: StandardFunction;
  instance?: FunctionInstance;
  isAttached: boolean;
  isBlocked: boolean;
  blockedByProcessId?: string;
  isMandatory: boolean;
  canAttach: boolean;
}

// Category display config
const CATEGORY_CONFIG: Record<string, { label: string; color: string }> = {
  context: { label: "Context", color: "text-blue-600" },
  leadership: { label: "Leadership", color: "text-purple-600" },
  support: { label: "Support", color: "text-amber-600" },
  operation: { label: "Operation", color: "text-process" },
  performance: { label: "Performance", color: "text-kpi" },
  improvement: { label: "Improvement", color: "text-success" },
};

// Status display config
const STATUS_CONFIG: Record<string, { icon: React.ElementType; label: string; color: string }> = {
  pending: { icon: Clock, label: "Pending", color: "text-muted-foreground" },
  active: { icon: CheckCircle2, label: "Active", color: "text-success" },
  completed: { icon: CheckCircle2, label: "Completed", color: "text-primary" },
};

export function ApplicableFunctionsSection({ process }: ApplicableFunctionsProps) {
  const navigate = useNavigate();
  const { getApplicableFunctions, getProcessById } = useManagementSystem();
  
  const applicableFunctions = getApplicableFunctions(process);

  // Group functions by category
  const groupedFunctions = applicableFunctions.reduce((acc, item) => {
    const category = item.function.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, ApplicableFunctionItem[]>);

  // Count stats
  const attachedCount = applicableFunctions.filter(f => f.isAttached).length;
  const mandatoryMissing = applicableFunctions.filter(f => f.isMandatory && !f.isAttached && !f.isBlocked).length;

  if (applicableFunctions.length === 0) {
    return null;
  }

  return (
    <section className="mobile-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Applicable Functions
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
            {attachedCount} attached
          </span>
          {mandatoryMissing > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-warning/10 text-warning font-medium">
              {mandatoryMissing} pending
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedFunctions).map(([category, items]) => (
          <div key={category}>
            <p className={cn(
              "text-xs font-medium uppercase tracking-wider mb-2",
              CATEGORY_CONFIG[category]?.color || "text-muted-foreground"
            )}>
              {CATEGORY_CONFIG[category]?.label || category}
            </p>
            <div className="space-y-1">
              {items.map((item) => (
                <FunctionRow 
                  key={item.function.id} 
                  item={item}
                  getProcessById={getProcessById}
                  onNavigate={(processId) => navigate(`/processes/${processId}`)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

interface FunctionRowProps {
  item: ApplicableFunctionItem;
  getProcessById: (id: string) => Process | undefined;
  onNavigate: (processId: string) => void;
}

function FunctionRow({ item, getProcessById, onNavigate }: FunctionRowProps) {
  const { function: fn, instance, isAttached, isBlocked, blockedByProcessId, isMandatory } = item;

  // Get blocking process name
  const blockingProcess = blockedByProcessId ? getProcessById(blockedByProcessId) : undefined;

  const statusConfig = instance ? STATUS_CONFIG[instance.status] : null;
  const StatusIcon = statusConfig?.icon;

  return (
    <div 
      className={cn(
        "flex items-center gap-3 p-2 rounded-lg transition-colors",
        isAttached && "bg-muted/50",
        isBlocked && "opacity-60",
        !isAttached && !isBlocked && "bg-muted/20"
      )}
    >
      {/* Status indicator */}
      <div className="w-6 h-6 flex items-center justify-center shrink-0">
        {isAttached && StatusIcon ? (
          <StatusIcon className={cn("w-4 h-4", statusConfig?.color)} />
        ) : isBlocked ? (
          <Lock className="w-4 h-4 text-muted-foreground" />
        ) : isMandatory ? (
          <AlertCircle className="w-4 h-4 text-warning" />
        ) : (
          <Layers className="w-4 h-4 text-muted-foreground" />
        )}
      </div>

      {/* Function info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-sm font-medium truncate",
            isBlocked && "text-muted-foreground"
          )}>
            {fn.name}
          </span>
          {isMandatory && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary shrink-0">
              Required
            </span>
          )}
          {fn.duplicationRule === 'unique' && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground shrink-0">
              Unique
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground font-mono">
          {fn.clauseReferences.join(", ")}
        </p>
        {isBlocked && blockingProcess && (
          <button
            onClick={() => onNavigate(blockedByProcessId!)}
            className="text-xs text-primary hover:underline flex items-center gap-1 mt-0.5"
          >
            Hosted by {blockingProcess.name}
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Action / Status */}
      {isAttached && instance && (
        <span className={cn("text-xs px-2 py-0.5 rounded-full", statusConfig?.color, "bg-muted")}>
          {statusConfig?.label}
        </span>
      )}
    </div>
  );
}
