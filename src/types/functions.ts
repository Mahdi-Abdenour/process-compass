// ISO Standard Function Types
// Functions are standard-mandated capabilities - immutable, preconfigured

import { ProcessType, ManagementStandard } from "./management-system";

// Duplication rules for functions
export type FunctionDuplicationRule = 'unique' | 'per_process';

// Function status
export type FunctionStatus = 'active' | 'future';

// Function Instance status
export type FunctionInstanceStatus = 'pending' | 'active' | 'completed';

// Eligible process types for a function
export type EligibleProcessType = ProcessType | 'leadership' | 'support' | 'operational';

// Global Function definition (immutable, system-defined)
export interface StandardFunction {
  id: string;
  name: string;
  linkedStandards: ManagementStandard[];
  clauseReferences: string[]; // e.g., ["4.1", "4.2"]
  description: string;
  duplicationRule: FunctionDuplicationRule;
  eligibleProcessTypes: EligibleProcessType[];
  mandatory: boolean;
  status: FunctionStatus;
  category: 'context' | 'leadership' | 'support' | 'operation' | 'performance' | 'improvement';
}

// Function Instance - created when a function is attached to a process
export interface FunctionInstance {
  id: string;
  functionId: string; // Reference to StandardFunction (immutable)
  processId: string; // Reference to Process
  status: FunctionInstanceStatus;
  createdAt: string;
  updatedAt: string;
  
  // Function-specific data storage (flexible JSON-like structure)
  data: FunctionInstanceData;
  
  // Linked Actions (action IDs)
  linkedActionIds: string[];
  
  // Evidence records
  evidence: FunctionEvidence[];
  
  // Append-only history
  history: FunctionHistoryEntry[];
}

// Flexible data container for function-specific fields
export interface FunctionInstanceData {
  // Common fields
  notes?: string;
  lastReviewDate?: string;
  nextReviewDate?: string;
  responsibleName?: string;
  
  // Function-specific fields stored as key-value
  [key: string]: unknown;
}

// Evidence record for function instance
export interface FunctionEvidence {
  id: string;
  type: 'file' | 'link' | 'note';
  title: string;
  description?: string;
  reference?: string; // URL or file path
  addedAt: string;
  addedBy?: string;
}

// History entry for audit trail
export interface FunctionHistoryEntry {
  id: string;
  date: string;
  action: 'created' | 'updated' | 'status_changed' | 'evidence_added' | 'action_linked';
  description: string;
  changedBy?: string;
  previousValue?: string;
  newValue?: string;
}
