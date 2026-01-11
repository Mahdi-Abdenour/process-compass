import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FabProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

export function Fab({ onClick, label = "Add new", className }: FabProps) {
  return (
    <button
      onClick={onClick}
      className={cn("fab", className)}
      aria-label={label}
    >
      <Plus className="w-6 h-6" />
    </button>
  );
}
