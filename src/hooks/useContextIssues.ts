import { useState, useCallback } from "react";
import { ContextIssue, IssueType, SwotQuadrant, IssueOrigin } from "@/types/management-system";

export function useContextIssues() {
  const [issues, setIssues] = useState<ContextIssue[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const createIssue = useCallback((data: {
    type: IssueType;
    quadrant: SwotQuadrant;
    description: string;
    origin: IssueOrigin;
    processId: string;
    severity?: number;
    probability?: number;
  }) => {
    const now = new Date().toISOString();
    
    // Calculate criticality if severity and probability provided
    const criticality = data.severity && data.probability 
      ? data.severity * data.probability 
      : undefined;
    
    const newIssue: ContextIssue = {
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
      version: 1,
      revisionDate: now,
      criticality,
      ...data,
    };
    
    setIssues((prev) => [...prev, newIssue]);
    return newIssue;
  }, []);

  const updateIssue = useCallback((id: string, data: Partial<ContextIssue>, revisionNote?: string) => {
    const now = new Date().toISOString();
    setIssues((prev) =>
      prev.map((issue) => {
        if (issue.id !== id) return issue;
        
        const updated = {
          ...issue,
          ...data,
          updatedAt: now,
          version: issue.version + 1,
          revisionDate: now,
          revisionNote: revisionNote || data.revisionNote,
        };
        
        // Recalculate criticality if severity or probability changed
        if (data.severity !== undefined || data.probability !== undefined) {
          const severity = data.severity ?? issue.severity;
          const probability = data.probability ?? issue.probability;
          updated.criticality = severity && probability ? severity * probability : undefined;
        }
        
        return updated;
      })
    );
  }, []);

  const deleteIssue = useCallback((id: string) => {
    setIssues((prev) => prev.filter((issue) => issue.id !== id));
  }, []);

  const getIssuesByProcess = useCallback((processId: string) => {
    return issues.filter((issue) => issue.processId === processId);
  }, [issues]);

  const getIssuesByQuadrant = useCallback((processId: string, quadrant: SwotQuadrant) => {
    return issues.filter(
      (issue) => issue.processId === processId && issue.quadrant === quadrant
    );
  }, [issues]);

  const getRisksByPriority = useCallback(() => {
    return issues
      .filter((issue) => issue.type === "risk" && issue.criticality !== undefined)
      .sort((a, b) => (b.criticality || 0) - (a.criticality || 0));
  }, [issues]);

  return {
    issues,
    isLoading,
    createIssue,
    updateIssue,
    deleteIssue,
    getIssuesByProcess,
    getIssuesByQuadrant,
    getRisksByPriority,
  };
}
