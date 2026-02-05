 import { Shield, AlertCircle } from "lucide-react";
 import { useNavigate } from "react-router-dom";
 
 interface ComplianceCardProps {
   totalRequirements: number;
   allocatedCount: number;
   unallocatedUniqueCount: number;
 }
 
 export function ComplianceCard({ 
   totalRequirements, 
   allocatedCount, 
   unallocatedUniqueCount 
 }: ComplianceCardProps) {
   const navigate = useNavigate();
   const percentage = totalRequirements > 0 
     ? Math.round((allocatedCount / totalRequirements) * 100) 
     : 0;
 
   return (
     <div className="mobile-card space-y-3">
       <div className="flex items-center justify-between">
         <div className="flex items-center gap-2">
           <Shield className="w-4 h-4 text-process" />
           <h3 className="font-semibold text-sm">Compliance Coverage</h3>
         </div>
         <span className="font-mono text-2xl font-bold text-process">
           {percentage}%
         </span>
       </div>
       
       {/* Progress bar */}
       <div className="h-2 bg-muted rounded-full overflow-hidden">
         <div 
           className="h-full bg-process transition-all duration-500"
           style={{ width: `${percentage}%` }}
         />
       </div>
       
       <div className="flex justify-between text-xs text-muted-foreground">
         <span>{allocatedCount} / {totalRequirements} requirements allocated</span>
       </div>
 
       {/* Unallocated unique requirements warning */}
       {unallocatedUniqueCount > 0 && (
         <button 
           onClick={() => navigate("/processes")}
           className="flex items-center gap-2 w-full p-2 rounded-lg bg-destructive/10 text-destructive text-xs hover:bg-destructive/15 transition-colors"
         >
           <AlertCircle className="w-3.5 h-3.5 shrink-0" />
           <span>{unallocatedUniqueCount} unique requirement{unallocatedUniqueCount > 1 ? 's' : ''} not allocated</span>
         </button>
       )}
     </div>
   );
 }