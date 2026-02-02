import { useNavigate } from "react-router-dom";
import { 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  User, 
  Scale, 
  FileText,
  Settings,
  Cog,
  Wrench,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { format } from "date-fns";
import { Process, ProcessType, Document } from "@/types/management-system";
import { cn } from "@/lib/utils";

const PROCESS_TYPE_CONFIG: Record<ProcessType, { label: string; icon: React.ElementType; color: string }> = {
  management: { label: "Management", icon: Settings, color: "text-purple-600" },
  operational: { label: "Operational", icon: Cog, color: "text-process" },
  support: { label: "Support", icon: Wrench, color: "text-amber-600" },
};

interface DetailOverviewTabProps {
  process: Process;
  documents: Document[];
}

export function DetailOverviewTab({ process, documents }: DetailOverviewTabProps) {
  const navigate = useNavigate();
  const typeConfig = PROCESS_TYPE_CONFIG[process.type];
  const TypeIcon = typeConfig.icon;

  return (
    <div className="space-y-6">
      {/* Status & Type */}
      <div className="flex items-center gap-3 flex-wrap">
        <StatusBadge status={process.status} />
        <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-sm", typeConfig.color)}>
          <TypeIcon className="w-3.5 h-3.5" />
          <span className="font-medium">{typeConfig.label}</span>
        </div>
        <span className="text-sm text-muted-foreground font-mono">
          Rev. {format(new Date(process.revisionDate), "dd/MM/yyyy")}
        </span>
      </div>

      {/* Purpose */}
      <section className="mobile-card">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
          Purpose
        </h3>
        <p className="font-serif text-foreground leading-relaxed">
          {process.purpose}
        </p>
      </section>

      {/* Inputs & Outputs */}
      <div className="grid grid-cols-1 gap-4">
        <section className="mobile-card">
          <div className="flex items-center gap-2 mb-3">
            <ArrowDownToLine className="w-4 h-4 text-process" />
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Inputs
            </h3>
          </div>
          <ul className="space-y-2">
            {process.inputs.map((input, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-process mt-2 shrink-0" />
                <span>{input}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mobile-card">
          <div className="flex items-center gap-2 mb-3">
            <ArrowUpFromLine className="w-4 h-4 text-success" />
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Outputs
            </h3>
          </div>
          <ul className="space-y-2">
            {process.outputs.map((output, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-success mt-2 shrink-0" />
                <span>{output}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Applicable Regulations */}
      {process.regulations && process.regulations.length > 0 && (
        <section className="mobile-card">
          <div className="flex items-center gap-2 mb-3">
            <Scale className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Applicable Regulations
            </h3>
          </div>
          <div className="space-y-3">
            {process.regulations.map((regulation) => (
              <div key={regulation.id} className="p-3 bg-muted/30 rounded-lg border border-border">
                <p className="font-mono text-xs text-primary font-medium">
                  {regulation.reference}
                </p>
                <p className="font-medium mt-1">{regulation.name}</p>
                {regulation.complianceDisposition && (
                  <p className="text-sm text-muted-foreground mt-2 pt-2 border-t border-border">
                    <span className="font-medium">Compliance disposition:</span> {regulation.complianceDisposition}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Utilized Documentation */}
      <section className="mobile-card">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Utilized Documentation
          </h3>
        </div>
        {documents.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">
            No documents linked to this process yet.
          </p>
        ) : (
          <ul className="space-y-2">
            {documents.map((doc) => (
              <li key={doc.id}>
                <button
                  onClick={() => navigate(`/documents/${doc.id}`)}
                  className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-muted/50 text-left transition-colors"
                >
                  <FileText className="w-4 h-4 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{doc.title}</p>
                    <p className="text-xs text-muted-foreground font-mono">{doc.code}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Pilot */}
      {process.pilotName && (
        <section className="mobile-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <User className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Process Pilot
              </p>
              <p className="font-medium">{process.pilotName}</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
