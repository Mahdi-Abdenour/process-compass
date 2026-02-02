import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X, Settings, Cog, Wrench, Scale, FileText } from "lucide-react";
import { ProcessType, ApplicableRegulation, Document } from "@/types/management-system";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const PROCESS_TYPES: { value: ProcessType; label: string; description: string; icon: React.ElementType }[] = [
  { 
    value: "management", 
    label: "Management", 
    description: "Strategic direction, planning, review",
    icon: Settings
  },
  { 
    value: "operational", 
    label: "Operational", 
    description: "Core value-creating activities",
    icon: Cog
  },
  { 
    value: "support", 
    label: "Support", 
    description: "Resources, infrastructure, enablers",
    icon: Wrench
  },
];

interface OverviewTabProps {
  formData: {
    code: string;
    name: string;
    type: ProcessType;
    purpose: string;
    inputs: string[];
    outputs: string[];
    regulations: ApplicableRegulation[];
    pilotName: string;
    status: "draft" | "active" | "archived";
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  linkedDocuments: Document[];
  isEditing: boolean;
}

export function OverviewTab({ formData, setFormData, linkedDocuments, isEditing }: OverviewTabProps) {
  const navigate = useNavigate();

  const addInput = () => {
    setFormData((prev: any) => ({ ...prev, inputs: [...prev.inputs, ""] }));
  };

  const removeInput = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      inputs: prev.inputs.filter((_: string, i: number) => i !== index),
    }));
  };

  const updateInput = (index: number, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      inputs: prev.inputs.map((input: string, i: number) => i === index ? value : input),
    }));
  };

  const addOutput = () => {
    setFormData((prev: any) => ({ ...prev, outputs: [...prev.outputs, ""] }));
  };

  const removeOutput = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      outputs: prev.outputs.filter((_: string, i: number) => i !== index),
    }));
  };

  const updateOutput = (index: number, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      outputs: prev.outputs.map((output: string, i: number) => i === index ? value : output),
    }));
  };

  const addRegulation = () => {
    const newRegulation: ApplicableRegulation = {
      id: crypto.randomUUID(),
      reference: "",
      name: "",
      description: "",
      complianceDisposition: "",
    };
    setFormData((prev: any) => ({ ...prev, regulations: [...prev.regulations, newRegulation] }));
  };

  const removeRegulation = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      regulations: prev.regulations.filter((_: ApplicableRegulation, i: number) => i !== index),
    }));
  };

  const updateRegulation = (index: number, field: keyof ApplicableRegulation, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      regulations: prev.regulations.map((reg: ApplicableRegulation, i: number) => 
        i === index ? { ...reg, [field]: value } : reg
      ),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Process Code */}
      <div className="form-field">
        <Label htmlFor="code">Reference Code *</Label>
        <Input
          id="code"
          value={formData.code}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, code: e.target.value }))}
          placeholder="e.g., PRO-001"
          className="font-mono"
        />
        <p className="form-helper">
          Unique identifier for this process. Auto-generated but editable.
        </p>
      </div>

      {/* Process Name */}
      <div className="form-field">
        <Label htmlFor="name">Process Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, name: e.target.value }))}
          placeholder="e.g., Customer Order Management"
        />
        <p className="form-helper">
          A clear, concise name that identifies this organizational process.
        </p>
      </div>

      {/* Process Type */}
      <div className="form-field">
        <Label>Process Type *</Label>
        <div className="grid grid-cols-1 gap-2 mt-2">
          {PROCESS_TYPES.map((typeOption) => {
            const Icon = typeOption.icon;
            const isSelected = formData.type === typeOption.value;
            return (
              <button
                key={typeOption.value}
                type="button"
                onClick={() => setFormData((prev: any) => ({ ...prev, type: typeOption.value }))}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border text-left transition-all",
                  isSelected 
                    ? "border-primary bg-primary/5 ring-1 ring-primary" 
                    : "border-border hover:border-muted-foreground/30"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "font-medium",
                    isSelected && "text-primary"
                  )}>
                    {typeOption.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {typeOption.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
        <p className="form-helper">
          Classification according to ISO process approach: Management (strategic), Operational (core), or Support (enabling).
        </p>
      </div>

      {/* Purpose */}
      <div className="form-field">
        <Label htmlFor="purpose">Purpose *</Label>
        <Textarea
          id="purpose"
          value={formData.purpose}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, purpose: e.target.value }))}
          placeholder="e.g., To ensure customer orders are received, processed, and fulfilled accurately and within agreed timeframes."
          rows={3}
        />
        <p className="form-helper">
          Describe the objective and scope of this process.
        </p>
      </div>

      {/* Pilot */}
      <div className="form-field">
        <Label htmlFor="pilot">Process Pilot / Owner</Label>
        <Input
          id="pilot"
          value={formData.pilotName}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, pilotName: e.target.value }))}
          placeholder="e.g., Operations Manager"
        />
        <p className="form-helper">
          The person accountable for this process performance and improvement.
        </p>
      </div>

      {/* Status */}
      <div className="form-field">
        <Label>Status</Label>
        <div className="flex gap-2">
          <StatusButton
            selected={formData.status === "draft"}
            onClick={() => setFormData((prev: any) => ({ ...prev, status: "draft" }))}
          >
            Draft
          </StatusButton>
          <StatusButton
            selected={formData.status === "active"}
            onClick={() => setFormData((prev: any) => ({ ...prev, status: "active" }))}
          >
            Active
          </StatusButton>
        </div>
      </div>

      {/* Inputs */}
      <div className="form-field">
        <Label>Inputs *</Label>
        <div className="space-y-2">
          {formData.inputs.map((input, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => updateInput(index, e.target.value)}
                placeholder="e.g., Customer purchase order"
              />
              {formData.inputs.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeInput(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addInput}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Input
          </Button>
        </div>
        <p className="form-helper">
          What enters this process? (documents, data, materials, requests)
        </p>
      </div>

      {/* Outputs */}
      <div className="form-field">
        <Label>Outputs *</Label>
        <div className="space-y-2">
          {formData.outputs.map((output, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={output}
                onChange={(e) => updateOutput(index, e.target.value)}
                placeholder="e.g., Confirmed order, Delivery schedule"
              />
              {formData.outputs.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeOutput(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addOutput}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Output
          </Button>
        </div>
        <p className="form-helper">
          What results from this process? (deliverables, records, decisions)
        </p>
      </div>

      {/* Applicable Regulations */}
      <div className="form-field">
        <div className="flex items-center gap-2 mb-2">
          <Scale className="w-4 h-4 text-muted-foreground" />
          <Label>Applicable Regulations</Label>
        </div>
        <div className="space-y-3">
          {formData.regulations.length === 0 ? (
            <p className="text-sm text-muted-foreground italic py-2">
              No regulations defined yet. Add legal and regulatory requirements applicable to this process.
            </p>
          ) : (
            formData.regulations.map((regulation, index) => (
              <div 
                key={regulation.id} 
                className="p-3 bg-muted/50 rounded-lg border border-border space-y-2"
              >
                <div className="flex gap-2">
                  <Input
                    value={regulation.reference}
                    onChange={(e) => updateRegulation(index, "reference", e.target.value)}
                    placeholder="e.g., Regulation (EU) 2016/679"
                    className="bg-background font-mono text-sm"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRegulation(index)}
                    className="shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <Input
                  value={regulation.name}
                  onChange={(e) => updateRegulation(index, "name", e.target.value)}
                  placeholder="e.g., GDPR - General Data Protection Regulation"
                  className="bg-background"
                />
                <Textarea
                  value={regulation.complianceDisposition || ""}
                  onChange={(e) => updateRegulation(index, "complianceDisposition", e.target.value)}
                  placeholder="How does the organization address this requirement?"
                  rows={2}
                  className="bg-background text-sm"
                />
              </div>
            ))
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addRegulation}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Regulation
          </Button>
        </div>
        <p className="form-helper">
          Identify applicable legal, regulatory, and statutory requirements. Define how compliance is ensured.
        </p>
      </div>

      {/* Utilized Documentation (Read-only display) */}
      <div className="form-field">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-4 h-4 text-muted-foreground" />
          <Label>Utilized Documentation</Label>
        </div>
        {linkedDocuments.length === 0 ? (
          <div className="p-4 bg-muted/30 rounded-lg border border-dashed border-border">
            <p className="text-sm text-muted-foreground text-center">
              No documents linked to this process yet.
            </p>
            <p className="text-xs text-muted-foreground text-center mt-1">
              Documents can be created and linked via the Documents module.
            </p>
            {isEditing && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => navigate("/documents/new")}
                className="w-full mt-3"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Document
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {linkedDocuments.map((doc) => (
              <div 
                key={doc.id}
                className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border"
              >
                <FileText className="w-4 h-4 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{doc.title}</p>
                  <p className="text-xs text-muted-foreground font-mono">{doc.code}</p>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => navigate("/documents/new")}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Document
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusButton({ 
  children, 
  selected, 
  onClick 
}: { 
  children: React.ReactNode; 
  selected: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors
        ${selected 
          ? "bg-primary text-primary-foreground" 
          : "bg-muted text-muted-foreground hover:bg-muted/80"
        }
      `}
    >
      {children}
    </button>
  );
}
