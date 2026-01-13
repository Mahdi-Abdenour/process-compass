import { useParams, useNavigate } from "react-router-dom";
import { 
  FileText, 
  FileCheck, 
  ClipboardList, 
  BookOpen, 
  ScrollText,
  Workflow
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { useManagementSystem } from "@/context/ManagementSystemContext";
import { toast } from "sonner";
import { format } from "date-fns";
import { DocumentType } from "@/types/management-system";
import { cn } from "@/lib/utils";

const DOCUMENT_TYPE_CONFIG: Record<DocumentType, { label: string; icon: React.ElementType; color: string }> = {
  procedure: { label: "Procedure", icon: FileCheck, color: "text-blue-600" },
  form: { label: "Form", icon: ClipboardList, color: "text-green-600" },
  instruction: { label: "Work Instruction", icon: BookOpen, color: "text-purple-600" },
  record: { label: "Record Template", icon: ScrollText, color: "text-amber-600" },
  policy: { label: "Policy", icon: FileText, color: "text-red-600" },
};

export default function DocumentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getDocumentById, archiveDocument, getProcessById } = useManagementSystem();
  
  const document = id ? getDocumentById(id) : undefined;

  if (!document) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Document not found</p>
      </div>
    );
  }

  const handleArchive = () => {
    archiveDocument(document.id);
    toast.success("Document archived");
    navigate("/documents");
  };

  const typeConfig = DOCUMENT_TYPE_CONFIG[document.type];
  const TypeIcon = typeConfig.icon;

  const linkedProcesses = document.processIds
    .map(id => getProcessById(id))
    .filter(Boolean);

  return (
    <div className="min-h-screen">
      <PageHeader 
        title={document.title}
        subtitle={document.code}
        showBack
        versionInfo={{
          version: document.version,
          revisionDate: document.revisionDate,
        }}
        actions={[
          { label: "Edit Document", onClick: () => navigate(`/documents/${document.id}/edit`) },
          { label: "Archive Document", onClick: handleArchive, variant: "destructive" },
        ]}
      />

      <div className="px-4 py-6 space-y-6">
        {/* Status & Type */}
        <div className="flex items-center gap-3 flex-wrap">
          <StatusBadge status={document.status} />
          <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-sm", typeConfig.color)}>
            <TypeIcon className="w-3.5 h-3.5" />
            <span className="font-medium">{typeConfig.label}</span>
          </div>
          <span className="text-sm text-muted-foreground font-mono">
            Rev. {format(new Date(document.revisionDate), "dd/MM/yyyy")}
          </span>
        </div>

        {/* Description */}
        {document.description && (
          <section className="mobile-card">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Description
            </h3>
            <p className="font-serif text-foreground leading-relaxed">
              {document.description}
            </p>
          </section>
        )}

        {/* Applicable Processes */}
        <section className="mobile-card">
          <div className="flex items-center gap-2 mb-3">
            <Workflow className="w-4 h-4 text-process" />
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Applicable Processes
            </h3>
          </div>
          {linkedProcesses.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">No processes linked</p>
          ) : (
            <ul className="space-y-2">
              {linkedProcesses.map((process) => (
                <li key={process!.id} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-process mt-2 shrink-0" />
                  <div>
                    <span className="font-mono text-xs text-muted-foreground">{process!.code}</span>
                    <span className="mx-1.5">—</span>
                    <span>{process!.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* ISO 9001 Clauses */}
        <section className="mobile-card">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
            ISO 9001:2015 Requirements Satisfied
          </h3>
          {document.isoClauseReferences.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">No clauses referenced</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {document.isoClauseReferences
                .sort((a, b) => a.clauseNumber.localeCompare(b.clauseNumber))
                .map((clause) => (
                  <div 
                    key={clause.clauseNumber} 
                    className="px-2.5 py-1.5 bg-primary/10 rounded-lg border border-primary/20"
                  >
                    <span className="font-mono text-sm font-medium text-primary">
                      {clause.clauseNumber}
                    </span>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {clause.clauseTitle}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </section>

        {/* Quick Actions */}
        <section className="space-y-2">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => navigate(`/documents/${document.id}/edit`)}
          >
            <FileText className="w-4 h-4 mr-2" />
            Edit Document
          </Button>
        </section>
      </div>
    </div>
  );
}
