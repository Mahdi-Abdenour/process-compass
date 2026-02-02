import { ObjectivesSection } from "@/components/process/ObjectivesSection";
import { KPISection } from "@/components/process/KPISection";

interface KPIsObjectivesTabProps {
  processId: string;
  isEditing: boolean;
  isNewProcess: boolean;
}

export function KPIsObjectivesTab({ processId, isEditing, isNewProcess }: KPIsObjectivesTabProps) {
  if (isNewProcess) {
    return (
      <div className="space-y-6">
        <div className="p-6 bg-muted/30 rounded-lg border border-dashed border-border text-center">
          <p className="text-sm text-muted-foreground">
            Save the process first to add objectives and KPIs.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Objectives and KPIs require a saved process to be linked to.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ObjectivesSection processId={processId} isEditing={isEditing} />
      <KPISection processId={processId} isEditing={isEditing} />
    </div>
  );
}
