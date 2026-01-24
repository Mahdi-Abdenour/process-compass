// ISO 9001:2015 Preconfigured Functions Catalog
// This is the canonical, immutable source of truth for ISO 9001 functions

import { StandardFunction } from "@/types/functions";

export const ISO_9001_FUNCTIONS: StandardFunction[] = [
  // ============================================
  // UNIQUE FUNCTIONS (Organization-level)
  // ============================================
  
  // Clause 4 - Context of the Organization
  {
    id: "fn-4.1-context",
    name: "Context of the Organization",
    linkedStandards: ["ISO_9001"],
    clauseReferences: ["4.1"],
    description: "Understanding the organization and its context. Determine external and internal issues relevant to its purpose and strategic direction.",
    duplicationRule: "unique",
    eligibleProcessTypes: ["leadership", "management"],
    mandatory: true,
    status: "active",
    category: "context",
  },
  {
    id: "fn-4.2-interested-parties",
    name: "Interested Parties Needs & Expectations",
    linkedStandards: ["ISO_9001"],
    clauseReferences: ["4.2"],
    description: "Understanding the needs and expectations of interested parties. Determine relevant interested parties and their requirements.",
    duplicationRule: "unique",
    eligibleProcessTypes: ["leadership", "management"],
    mandatory: true,
    status: "active",
    category: "context",
  },
  {
    id: "fn-4.3-scope",
    name: "Scope Determination",
    linkedStandards: ["ISO_9001"],
    clauseReferences: ["4.3"],
    description: "Determining the scope of the quality management system. Define boundaries and applicability.",
    duplicationRule: "unique",
    eligibleProcessTypes: ["leadership", "management"],
    mandatory: true,
    status: "active",
    category: "context",
  },
  {
    id: "fn-4.4-qms-processes",
    name: "QMS Process Mapping",
    linkedStandards: ["ISO_9001"],
    clauseReferences: ["4.4"],
    description: "Quality management system and its processes. Establish, implement, maintain and continually improve the QMS.",
    duplicationRule: "unique",
    eligibleProcessTypes: ["leadership", "management"],
    mandatory: true,
    status: "active",
    category: "context",
  },

  // Clause 5 - Leadership
  {
    id: "fn-5.1-leadership",
    name: "Leadership & Commitment",
    linkedStandards: ["ISO_9001"],
    clauseReferences: ["5.1", "5.1.1", "5.1.2"],
    description: "Leadership and commitment. Top management demonstrating leadership and commitment to the QMS and customer focus.",
    duplicationRule: "unique",
    eligibleProcessTypes: ["leadership", "management"],
    mandatory: true,
    status: "active",
    category: "leadership",
  },
  {
    id: "fn-5.2-policy",
    name: "Policy Management",
    linkedStandards: ["ISO_9001"],
    clauseReferences: ["5.2", "5.2.1", "5.2.2"],
    description: "Establishing, communicating and maintaining the quality policy appropriate to the purpose and context.",
    duplicationRule: "unique",
    eligibleProcessTypes: ["leadership", "management"],
    mandatory: true,
    status: "active",
    category: "leadership",
  },
  {
    id: "fn-5.3-roles",
    name: "Roles, Responsibilities & Authorities",
    linkedStandards: ["ISO_9001"],
    clauseReferences: ["5.3"],
    description: "Organizational roles, responsibilities and authorities. Assigning, communicating and understanding roles within the QMS.",
    duplicationRule: "unique",
    eligibleProcessTypes: ["leadership", "management"],
    mandatory: true,
    status: "active",
    category: "leadership",
  },

  // Clause 7 - Support
  {
    id: "fn-7.2-competence",
    name: "Competence Management",
    linkedStandards: ["ISO_9001"],
    clauseReferences: ["7.2"],
    description: "Determine and ensure necessary competence of persons doing work affecting QMS performance and effectiveness.",
    duplicationRule: "unique",
    eligibleProcessTypes: ["support"],
    mandatory: true,
    status: "active",
    category: "support",
  },
  {
    id: "fn-7.3-awareness",
    name: "Awareness",
    linkedStandards: ["ISO_9001"],
    clauseReferences: ["7.3"],
    description: "Ensure persons doing work under the organization's control are aware of quality policy, objectives, and their contribution.",
    duplicationRule: "unique",
    eligibleProcessTypes: ["support"],
    mandatory: true,
    status: "active",
    category: "support",
  },
  {
    id: "fn-7.4-communication",
    name: "Communication",
    linkedStandards: ["ISO_9001"],
    clauseReferences: ["7.4"],
    description: "Determine internal and external communications relevant to the QMS including what, when, with whom, how to communicate.",
    duplicationRule: "unique",
    eligibleProcessTypes: ["support"],
    mandatory: true,
    status: "active",
    category: "support",
  },
  {
    id: "fn-7.5-documented-info",
    name: "Documented Information Control",
    linkedStandards: ["ISO_9001"],
    clauseReferences: ["7.5", "7.5.1", "7.5.2", "7.5.3"],
    description: "Creating, updating and controlling documented information required by the QMS and standard.",
    duplicationRule: "unique",
    eligibleProcessTypes: ["support"],
    mandatory: true,
    status: "active",
    category: "support",
  },

  // Clause 9 - Performance Evaluation
  {
    id: "fn-9.2-internal-audit",
    name: "Internal Audit",
    linkedStandards: ["ISO_9001"],
    clauseReferences: ["9.2", "9.2.1", "9.2.2"],
    description: "Conduct internal audits at planned intervals to provide information on QMS conformity and effectiveness.",
    duplicationRule: "unique",
    eligibleProcessTypes: ["leadership", "management", "support"],
    mandatory: true,
    status: "active",
    category: "performance",
  },
  {
    id: "fn-9.3-management-review",
    name: "Management Review",
    linkedStandards: ["ISO_9001"],
    clauseReferences: ["9.3", "9.3.1", "9.3.2", "9.3.3"],
    description: "Top management review of the QMS at planned intervals to ensure its continuing suitability, adequacy and effectiveness.",
    duplicationRule: "unique",
    eligibleProcessTypes: ["leadership", "management"],
    mandatory: true,
    status: "active",
    category: "performance",
  },

  // Clause 10 - Improvement
  {
    id: "fn-10.2-nonconformity",
    name: "Nonconformity & Corrective Action",
    linkedStandards: ["ISO_9001"],
    clauseReferences: ["10.2", "10.2.1", "10.2.2"],
    description: "React to nonconformities, evaluate need for action, implement actions needed, review effectiveness and update risks/opportunities.",
    duplicationRule: "unique",
    eligibleProcessTypes: ["leadership", "management", "support"],
    mandatory: true,
    status: "active",
    category: "improvement",
  },
  {
    id: "fn-10.3-continual-improvement",
    name: "Continual Improvement",
    linkedStandards: ["ISO_9001"],
    clauseReferences: ["10.3"],
    description: "Continually improve the suitability, adequacy and effectiveness of the quality management system.",
    duplicationRule: "unique",
    eligibleProcessTypes: ["leadership", "management"],
    mandatory: true,
    status: "active",
    category: "improvement",
  },

  // ============================================
  // PER-PROCESS FUNCTIONS (Operational)
  // ============================================

  // Clause 8 - Operation
  {
    id: "fn-8.1-operational-planning",
    name: "Operational Planning & Control",
    linkedStandards: ["ISO_9001"],
    clauseReferences: ["8.1"],
    description: "Plan, implement and control processes needed to meet requirements for provision of products and services.",
    duplicationRule: "per_process",
    eligibleProcessTypes: ["operational"],
    mandatory: true,
    status: "active",
    category: "operation",
  },
  {
    id: "fn-8.2-customer-requirements",
    name: "Customer Requirements Review",
    linkedStandards: ["ISO_9001"],
    clauseReferences: ["8.2", "8.2.1", "8.2.2", "8.2.3", "8.2.4"],
    description: "Determine and review requirements for products and services, including customer communication and changes.",
    duplicationRule: "per_process",
    eligibleProcessTypes: ["operational"],
    mandatory: true,
    status: "active",
    category: "operation",
  },
  {
    id: "fn-8.3-design-development",
    name: "Design & Development",
    linkedStandards: ["ISO_9001"],
    clauseReferences: ["8.3", "8.3.1", "8.3.2", "8.3.3", "8.3.4", "8.3.5", "8.3.6"],
    description: "Establish, implement and maintain a design and development process for products and services.",
    duplicationRule: "per_process",
    eligibleProcessTypes: ["operational"],
    mandatory: false, // Conditional - may not apply to all organizations
    status: "active",
    category: "operation",
  },
  {
    id: "fn-8.4-external-providers",
    name: "Control of Externally Provided Processes",
    linkedStandards: ["ISO_9001"],
    clauseReferences: ["8.4", "8.4.1", "8.4.2", "8.4.3"],
    description: "Ensure externally provided processes, products and services conform to requirements.",
    duplicationRule: "per_process",
    eligibleProcessTypes: ["operational", "support"],
    mandatory: true,
    status: "active",
    category: "operation",
  },
  {
    id: "fn-8.5-production-service",
    name: "Production / Service Provision",
    linkedStandards: ["ISO_9001"],
    clauseReferences: ["8.5", "8.5.1", "8.5.2", "8.5.3", "8.5.4", "8.5.5", "8.5.6"],
    description: "Implement production and service provision under controlled conditions including identification, preservation and post-delivery.",
    duplicationRule: "per_process",
    eligibleProcessTypes: ["operational"],
    mandatory: true,
    status: "active",
    category: "operation",
  },
  {
    id: "fn-8.6-release",
    name: "Release of Products & Services",
    linkedStandards: ["ISO_9001"],
    clauseReferences: ["8.6"],
    description: "Implement planned arrangements to verify product and service requirements have been met.",
    duplicationRule: "per_process",
    eligibleProcessTypes: ["operational"],
    mandatory: true,
    status: "active",
    category: "operation",
  },
  {
    id: "fn-8.7-nonconforming-outputs",
    name: "Control of Nonconforming Outputs",
    linkedStandards: ["ISO_9001"],
    clauseReferences: ["8.7", "8.7.1", "8.7.2"],
    description: "Ensure outputs that do not conform to requirements are identified and controlled to prevent unintended use or delivery.",
    duplicationRule: "per_process",
    eligibleProcessTypes: ["operational"],
    mandatory: true,
    status: "active",
    category: "operation",
  },
  {
    id: "fn-9.1-monitoring",
    name: "Performance Monitoring & Measurement",
    linkedStandards: ["ISO_9001"],
    clauseReferences: ["9.1", "9.1.1", "9.1.2", "9.1.3"],
    description: "Determine what needs to be monitored and measured, methods, when to perform and analyze results.",
    duplicationRule: "per_process",
    eligibleProcessTypes: ["operational", "support", "management"],
    mandatory: true,
    status: "active",
    category: "performance",
  },
];

// Helper to get function by ID
export function getFunctionById(functionId: string): StandardFunction | undefined {
  return ISO_9001_FUNCTIONS.find(f => f.id === functionId);
}

// Helper to get functions by category
export function getFunctionsByCategory(category: StandardFunction['category']): StandardFunction[] {
  return ISO_9001_FUNCTIONS.filter(f => f.category === category);
}

// Helper to get unique functions
export function getUniqueFunctions(): StandardFunction[] {
  return ISO_9001_FUNCTIONS.filter(f => f.duplicationRule === 'unique');
}

// Helper to get per-process functions
export function getPerProcessFunctions(): StandardFunction[] {
  return ISO_9001_FUNCTIONS.filter(f => f.duplicationRule === 'per_process');
}

// Helper to get functions eligible for a process type
export function getFunctionsForProcessType(processType: string): StandardFunction[] {
  return ISO_9001_FUNCTIONS.filter(f => 
    f.eligibleProcessTypes.includes(processType as any) ||
    // Map 'management' type to 'leadership' eligibility
    (processType === 'management' && f.eligibleProcessTypes.includes('leadership'))
  );
}
