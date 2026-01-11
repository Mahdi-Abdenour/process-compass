import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useManagementSystem } from "@/context/ManagementSystemContext";
import { ProcessStatus } from "@/types/management-system";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

export default function ProcessForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { createProcess, updateProcess, getProcessById } = useManagementSystem();
  
  const existingProcess = id ? getProcessById(id) : undefined;
  const isEditing = !!existingProcess;

  const [formData, setFormData] = useState({
    name: existingProcess?.name || "",
    purpose: existingProcess?.purpose || "",
    inputs: existingProcess?.inputs || [""],
    outputs: existingProcess?.outputs || [""],
    pilotName: existingProcess?.pilotName || "",
    status: existingProcess?.status || "draft" as ProcessStatus,
  });

  const [revisionNote, setRevisionNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error("Process name is required");
      return;
    }
    if (!formData.purpose.trim()) {
      toast.error("Process purpose is required");
      return;
    }

    const cleanedInputs = formData.inputs.filter(i => i.trim());
    const cleanedOutputs = formData.outputs.filter(o => o.trim());

    if (cleanedInputs.length === 0) {
      toast.error("At least one input is required");
      return;
    }
    if (cleanedOutputs.length === 0) {
      toast.error("At least one output is required");
      return;
    }

    if (isEditing && existingProcess) {
      updateProcess(existingProcess.id, {
        name: formData.name.trim(),
        purpose: formData.purpose.trim(),
        inputs: cleanedInputs,
        outputs: cleanedOutputs,
        pilotName: formData.pilotName.trim() || undefined,
        status: formData.status,
      }, revisionNote || "Process updated");
      toast.success("Process updated successfully");
    } else {
      createProcess({
        name: formData.name.trim(),
        purpose: formData.purpose.trim(),
        inputs: cleanedInputs,
        outputs: cleanedOutputs,
        pilotName: formData.pilotName.trim() || undefined,
        status: formData.status,
        standard: "ISO_9001",
      });
      toast.success("Process created successfully");
    }

    navigate("/processes");
  };

  const addInput = () => {
    setFormData(prev => ({ ...prev, inputs: [...prev.inputs, ""] }));
  };

  const removeInput = (index: number) => {
    setFormData(prev => ({
      ...prev,
      inputs: prev.inputs.filter((_, i) => i !== index),
    }));
  };

  const updateInput = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      inputs: prev.inputs.map((input, i) => i === index ? value : input),
    }));
  };

  const addOutput = () => {
    setFormData(prev => ({ ...prev, outputs: [...prev.outputs, ""] }));
  };

  const removeOutput = (index: number) => {
    setFormData(prev => ({
      ...prev,
      outputs: prev.outputs.filter((_, i) => i !== index),
    }));
  };

  const updateOutput = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      outputs: prev.outputs.map((output, i) => i === index ? value : output),
    }));
  };

  return (
    <div className="min-h-screen">
      <PageHeader 
        title={isEditing ? "Edit Process" : "New Process"} 
        subtitle="Fiche Processus"
        showBack
        versionInfo={existingProcess ? {
          version: existingProcess.version,
          revisionDate: existingProcess.revisionDate,
        } : undefined}
      />

      <form onSubmit={handleSubmit} className="px-4 py-6 space-y-6">
        {/* Process Name */}
        <div className="form-field">
          <Label htmlFor="name">Process Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="e.g., Customer Order Management"
          />
          <p className="form-helper">
            A clear, concise name that identifies this organizational process.
          </p>
        </div>

        {/* Purpose */}
        <div className="form-field">
          <Label htmlFor="purpose">Purpose *</Label>
          <Textarea
            id="purpose"
            value={formData.purpose}
            onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
            placeholder="e.g., To ensure customer orders are received, processed, and fulfilled accurately and within agreed timeframes."
            rows={3}
          />
          <p className="form-helper">
            Describe the objective and scope of this process.
          </p>
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

        {/* Pilot */}
        <div className="form-field">
          <Label htmlFor="pilot">Process Pilot / Owner</Label>
          <Input
            id="pilot"
            value={formData.pilotName}
            onChange={(e) => setFormData(prev => ({ ...prev, pilotName: e.target.value }))}
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
              onClick={() => setFormData(prev => ({ ...prev, status: "draft" }))}
            >
              Draft
            </StatusButton>
            <StatusButton
              selected={formData.status === "active"}
              onClick={() => setFormData(prev => ({ ...prev, status: "active" }))}
            >
              Active
            </StatusButton>
          </div>
        </div>

        {/* Revision Note (for edits) */}
        {isEditing && (
          <div className="form-field">
            <Label htmlFor="revisionNote">Revision Note</Label>
            <Input
              id="revisionNote"
              value={revisionNote}
              onChange={(e) => setRevisionNote(e.target.value)}
              placeholder="e.g., Updated outputs based on new delivery process"
            />
            <p className="form-helper">
              Briefly describe what changed in this revision.
            </p>
          </div>
        )}

        {/* Submit */}
        <div className="pt-4">
          <Button type="submit" className="w-full">
            {isEditing ? "Save Changes" : "Create Process"}
          </Button>
        </div>
      </form>
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
