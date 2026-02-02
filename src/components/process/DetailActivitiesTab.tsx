import { ListOrdered } from "lucide-react";
import { ProcessActivity } from "@/types/management-system";

interface DetailActivitiesTabProps {
  activities: ProcessActivity[];
}

export function DetailActivitiesTab({ activities }: DetailActivitiesTabProps) {
  if (!activities || activities.length === 0) {
    return (
      <div className="p-6 bg-muted/30 rounded-lg border border-dashed border-border text-center">
        <ListOrdered className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">
          No activities defined for this process.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Edit the process to add activities.
        </p>
      </div>
    );
  }

  return (
    <section className="mobile-card">
      <div className="flex items-center gap-2 mb-4">
        <ListOrdered className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Process Activities
        </h3>
      </div>
      <ol className="space-y-3">
        {activities.sort((a, b) => a.sequence - b.sequence).map((activity) => (
          <li key={activity.id} className="flex gap-3">
            <span className="font-mono text-xs text-muted-foreground w-6 shrink-0 pt-0.5">
              {activity.sequence}.
            </span>
            <div className="flex-1">
              <p className="font-medium">{activity.name}</p>
              {activity.description && (
                <p className="text-sm text-muted-foreground mt-0.5">
                  {activity.description}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
