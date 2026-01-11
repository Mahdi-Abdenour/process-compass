import { createContext, useContext, ReactNode } from "react";
import { useProcesses } from "@/hooks/useProcesses";
import { useContextIssues } from "@/hooks/useContextIssues";
import { useActions } from "@/hooks/useActions";
import { ManagementStandard } from "@/types/management-system";

interface ManagementSystemContextType {
  // Current standard
  currentStandard: ManagementStandard;
  
  // Processes
  processes: ReturnType<typeof useProcesses>["processes"];
  createProcess: ReturnType<typeof useProcesses>["createProcess"];
  updateProcess: ReturnType<typeof useProcesses>["updateProcess"];
  archiveProcess: ReturnType<typeof useProcesses>["archiveProcess"];
  getProcessById: ReturnType<typeof useProcesses>["getProcessById"];
  getActiveProcesses: ReturnType<typeof useProcesses>["getActiveProcesses"];
  
  // Context Issues
  issues: ReturnType<typeof useContextIssues>["issues"];
  createIssue: ReturnType<typeof useContextIssues>["createIssue"];
  updateIssue: ReturnType<typeof useContextIssues>["updateIssue"];
  deleteIssue: ReturnType<typeof useContextIssues>["deleteIssue"];
  getIssuesByProcess: ReturnType<typeof useContextIssues>["getIssuesByProcess"];
  getIssuesByQuadrant: ReturnType<typeof useContextIssues>["getIssuesByQuadrant"];
  getRisksByPriority: ReturnType<typeof useContextIssues>["getRisksByPriority"];
  
  // Actions
  actions: ReturnType<typeof useActions>["actions"];
  createAction: ReturnType<typeof useActions>["createAction"];
  updateAction: ReturnType<typeof useActions>["updateAction"];
  getActionsByProcess: ReturnType<typeof useActions>["getActionsByProcess"];
  getActionsByStatus: ReturnType<typeof useActions>["getActionsByStatus"];
  getOverdueActions: ReturnType<typeof useActions>["getOverdueActions"];
}

const ManagementSystemContext = createContext<ManagementSystemContextType | null>(null);

export function ManagementSystemProvider({ children }: { children: ReactNode }) {
  const processesHook = useProcesses();
  const issuesHook = useContextIssues();
  const actionsHook = useActions();

  const value: ManagementSystemContextType = {
    currentStandard: "ISO_9001",
    
    // Processes
    processes: processesHook.processes,
    createProcess: processesHook.createProcess,
    updateProcess: processesHook.updateProcess,
    archiveProcess: processesHook.archiveProcess,
    getProcessById: processesHook.getProcessById,
    getActiveProcesses: processesHook.getActiveProcesses,
    
    // Issues
    issues: issuesHook.issues,
    createIssue: issuesHook.createIssue,
    updateIssue: issuesHook.updateIssue,
    deleteIssue: issuesHook.deleteIssue,
    getIssuesByProcess: issuesHook.getIssuesByProcess,
    getIssuesByQuadrant: issuesHook.getIssuesByQuadrant,
    getRisksByPriority: issuesHook.getRisksByPriority,
    
    // Actions
    actions: actionsHook.actions,
    createAction: actionsHook.createAction,
    updateAction: actionsHook.updateAction,
    getActionsByProcess: actionsHook.getActionsByProcess,
    getActionsByStatus: actionsHook.getActionsByStatus,
    getOverdueActions: actionsHook.getOverdueActions,
  };

  return (
    <ManagementSystemContext.Provider value={value}>
      {children}
    </ManagementSystemContext.Provider>
  );
}

export function useManagementSystem() {
  const context = useContext(ManagementSystemContext);
  if (!context) {
    throw new Error("useManagementSystem must be used within ManagementSystemProvider");
  }
  return context;
}
