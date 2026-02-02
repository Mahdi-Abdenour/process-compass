import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X, GripVertical } from "lucide-react";
import { ProcessActivity } from "@/types/management-system";

interface ActivitiesTabProps {
  activities: ProcessActivity[];
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export function ActivitiesTab({ activities, setFormData }: ActivitiesTabProps) {
  const addActivity = () => {
    const newActivity: ProcessActivity = {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      sequence: activities.length + 1,
    };
    setFormData((prev: any) => ({ ...prev, activities: [...prev.activities, newActivity] }));
  };

  const removeActivity = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      activities: prev.activities.filter((_: ProcessActivity, i: number) => i !== index),
    }));
  };

  const updateActivity = (index: number, field: keyof ProcessActivity, value: string | number) => {
    setFormData((prev: any) => ({
      ...prev,
      activities: prev.activities.map((activity: ProcessActivity, i: number) => 
        i === index ? { ...activity, [field]: value } : activity
      ),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="form-field">
        <Label>Activities</Label>
        <p className="text-sm text-muted-foreground mb-4">
          Define the sequential activities that compose this process. Activities describe the work performed, in order.
        </p>
        
        <div className="space-y-3">
          {activities.length === 0 ? (
            <div className="p-6 bg-muted/30 rounded-lg border border-dashed border-border text-center">
              <p className="text-sm text-muted-foreground">
                No activities defined yet.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Add activities to describe the sequence of work within this process.
              </p>
            </div>
          ) : (
            activities.map((activity, index) => (
              <div 
                key={activity.id} 
                className="flex gap-2 items-start p-3 bg-muted/50 rounded-lg border border-border"
              >
                <div className="flex items-center gap-2 text-muted-foreground shrink-0 pt-2">
                  <GripVertical className="w-4 h-4" />
                  <span className="font-mono text-xs w-6">{index + 1}.</span>
                </div>
                <div className="flex-1 space-y-2">
                  <Input
                    value={activity.name}
                    onChange={(e) => updateActivity(index, "name", e.target.value)}
                    placeholder="e.g., Receive and validate order"
                    className="bg-background"
                  />
                  <Textarea
                    value={activity.description || ""}
                    onChange={(e) => updateActivity(index, "description", e.target.value)}
                    placeholder="Optional: Describe this activity in more detail..."
                    rows={2}
                    className="bg-background text-sm"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeActivity(index)}
                  className="shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addActivity}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Activity
          </Button>
        </div>
      </div>
    </div>
  );
}
