import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useManagementSystem } from "@/context/ManagementSystemContext";
import { DocumentType, ISOClauseReference } from "@/types/management-system";
import { Plus, X, FileCheck, ClipboardList, BookOpen, ScrollText, FileText } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const DOCUMENT_TYPES: { value: DocumentType; label: string; description: string; icon: React.ElementType }[] = [
  { 
    value: "procedure", 
    label: "Procedure", 
    description: "Specifies how to carry out an activity",
    icon: FileCheck
  },
  { 
    value: "form", 
    label: "Form", 
    description: "Template for capturing records",
    icon: ClipboardList
  },
  { 
    value: "instruction", 
    label: "Work Instruction", 
    description: "Detailed task-level guidance",
    icon: BookOpen
  },
  { 
    value: "record", 
    label: "Record Template", 
    description: "Evidence of activity completion",
    icon: ScrollText
  },
  { 
    value: "policy", 
    label: "Policy", 
    description: "Top-level organizational intent",
    icon: FileText
  },
];

// ISO 9001:2015 Key Clauses for document reference
const ISO_9001_CLAUSES: ISOClauseReference[] = [
  { clauseNumber: "4.1", clauseTitle: "Understanding the organization and its context" },
  { clauseNumber: "4.2", clauseTitle: "Understanding the needs and expectations of interested parties" },
  { clauseNumber: "4.3", clauseTitle: "Determining the scope of the QMS" },
  { clauseNumber: "4.4", clauseTitle: "Quality management system and its processes" },
  { clauseNumber: "5.1", clauseTitle: "Leadership and commitment" },
  { clauseNumber: "5.2", clauseTitle: "Policy" },
  { clauseNumber: "5.3", clauseTitle: "Organizational roles, responsibilities and authorities" },
  { clauseNumber: "6.1", clauseTitle: "Actions to address risks and opportunities" },
  { clauseNumber: "6.2", clauseTitle: "Quality objectives and planning to achieve them" },
  { clauseNumber: "6.3", clauseTitle: "Planning of changes" },
  { clauseNumber: "7.1", clauseTitle: "Resources" },
  { clauseNumber: "7.2", clauseTitle: "Competence" },
  { clauseNumber: "7.3", clauseTitle: "Awareness" },
  { clauseNumber: "7.4", clauseTitle: "Communication" },
  { clauseNumber: "7.5", clauseTitle: "Documented information" },
  { clauseNumber: "8.1", clauseTitle: "Operational planning and control" },
  { clauseNumber: "8.2", clauseTitle: "Requirements for products and services" },
  { clauseNumber: "8.3", clauseTitle: "Design and development" },
  { clauseNumber: "8.4", clauseTitle: "Control of externally provided processes, products and services" },
  { clauseNumber: "8.5", clauseTitle: "Production and service provision" },
  { clauseNumber: "8.6", clauseTitle: "Release of products and services" },
  { clauseNumber: "8.7", clauseTitle: "Control of nonconforming outputs" },
  { clauseNumber: "9.1", clauseTitle: "Monitoring, measurement, analysis and evaluation" },
  { clauseNumber: "9.2", clauseTitle: "Internal audit" },
  { clauseNumber: "9.3", clauseTitle: "Management review" },
  { clauseNumber: "10.1", clauseTitle: "Improvement - General" },
  { clauseNumber: "10.2", clauseTitle: "Nonconformity and corrective action" },
  { clauseNumber: "10.3", clauseTitle: "Continual improvement" },
];

export default function DocumentForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { createDocument, updateDocument, getDocumentById, processes } = useManagementSystem();
  
  const existingDocument = id ? getDocumentById(id) : undefined;
  const isEditing = !!existingDocument;

  const [formData, setFormData] = useState({
    title: existingDocument?.title || "",
    type: existingDocument?.type || "procedure" as DocumentType,
    description: existingDocument?.description || "",
    processIds: existingDocument?.processIds || [] as string[],
    isoClauseReferences: existingDocument?.isoClauseReferences || [] as ISOClauseReference[],
    status: existingDocument?.status || "draft" as "draft" | "active",
  });

  const [revisionNote, setRevisionNote] = useState("");

  const activeProcesses = processes.filter(p => p.status !== "archived");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Document title is required");
      return;
    }

    if (formData.processIds.length === 0) {
      toast.error("Select at least one process");
      return;
    }

    if (isEditing && existingDocument) {
      updateDocument(existingDocument.id, {
        title: formData.title.trim(),
        type: formData.type,
        description: formData.description.trim() || undefined,
        processIds: formData.processIds,
        isoClauseReferences: formData.isoClauseReferences,
        status: formData.status,
      }, revisionNote || "Document updated");
      toast.success("Document updated successfully");
    } else {
      createDocument({
        title: formData.title.trim(),
        type: formData.type,
        description: formData.description.trim() || undefined,
        processIds: formData.processIds,
        isoClauseReferences: formData.isoClauseReferences,
        status: formData.status,
        standard: "ISO_9001",
      });
      toast.success("Document created successfully");
    }

    navigate("/documents");
  };

  const toggleProcess = (processId: string) => {
    setFormData(prev => ({
      ...prev,
      processIds: prev.processIds.includes(processId)
        ? prev.processIds.filter(id => id !== processId)
        : [...prev.processIds, processId]
    }));
  };

  const toggleClause = (clause: ISOClauseReference) => {
    setFormData(prev => {
      const exists = prev.isoClauseReferences.some(c => c.clauseNumber === clause.clauseNumber);
      return {
        ...prev,
        isoClauseReferences: exists
          ? prev.isoClauseReferences.filter(c => c.clauseNumber !== clause.clauseNumber)
          : [...prev.isoClauseReferences, clause]
      };
    });
  };

  return (
    <div className="min-h-screen">
      <PageHeader 
        title={isEditing ? "Edit Document" : "New Document"} 
        subtitle="Procedure / Form"
        showBack
        versionInfo={existingDocument ? {
          version: existingDocument.version,
          revisionDate: existingDocument.revisionDate,
        } : undefined}
      />

      <form onSubmit={handleSubmit} className="px-4 py-6 space-y-6">
        {/* Document Title */}
        <div className="form-field">
          <Label htmlFor="title">Document Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="e.g., Document Control Procedure"
          />
          <p className="form-helper">
            A clear title that identifies this document.
          </p>
        </div>

        {/* Document Type */}
        <div className="form-field">
          <Label>Document Type *</Label>
          <div className="grid grid-cols-1 gap-2 mt-2">
            {DOCUMENT_TYPES.map((typeOption) => {
              const Icon = typeOption.icon;
              const isSelected = formData.type === typeOption.value;
              return (
                <button
                  key={typeOption.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: typeOption.value }))}
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
        </div>

        {/* Description */}
        <div className="form-field">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="e.g., Describes the process for creating, reviewing, approving, and distributing controlled documents."
            rows={3}
          />
          <p className="form-helper">
            Optional summary of the document's purpose and scope.
          </p>
        </div>

        {/* Applicable Processes */}
        <div className="form-field">
          <Label>Applicable Processes *</Label>
          <p className="form-helper mb-3">
            Select the processes this document applies to.
          </p>
          {activeProcesses.length === 0 ? (
            <p className="text-sm text-muted-foreground italic py-2">
              No processes defined yet. Create processes first.
            </p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto border border-border rounded-lg p-3">
              {activeProcesses.map((process) => (
                <label
                  key={process.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                >
                  <Checkbox
                    checked={formData.processIds.includes(process.id)}
                    onCheckedChange={() => toggleProcess(process.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{process.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{process.code}</p>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* ISO 9001 Clause References */}
        <div className="form-field">
          <Label>ISO 9001 Requirements Satisfied</Label>
          <p className="form-helper mb-3">
            Select the ISO 9001:2015 clauses this document addresses.
          </p>
          <div className="space-y-1 max-h-64 overflow-y-auto border border-border rounded-lg p-3">
            {ISO_9001_CLAUSES.map((clause) => {
              const isSelected = formData.isoClauseReferences.some(c => c.clauseNumber === clause.clauseNumber);
              return (
                <label
                  key={clause.clauseNumber}
                  className={cn(
                    "flex items-start gap-3 p-2 rounded-lg cursor-pointer transition-colors",
                    isSelected ? "bg-primary/10" : "hover:bg-muted/50"
                  )}
                >
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleClause(clause)}
                    className="mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-mono font-medium text-primary">{clause.clauseNumber}</span>
                      {" "}
                      <span>{clause.clauseTitle}</span>
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
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
              placeholder="e.g., Updated to reflect new process changes"
            />
            <p className="form-helper">
              Briefly describe what changed in this revision.
            </p>
          </div>
        )}

        {/* Submit */}
        <div className="pt-4">
          <Button type="submit" className="w-full">
            {isEditing ? "Save Changes" : "Create Document"}
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
