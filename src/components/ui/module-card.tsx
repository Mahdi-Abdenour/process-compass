import { LucideIcon, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  count?: number;
  isActive?: boolean;
  plannedMessage?: string;
  accentColor?: string;
}

export function ModuleCard({
  title,
  description,
  icon: Icon,
  path,
  count,
  isActive = true,
  plannedMessage,
  accentColor,
}: ModuleCardProps) {
  const cardContent = (
    <div
      className={cn(
        "mobile-card relative overflow-hidden",
        isActive 
          ? "cursor-pointer hover:shadow-card-hover" 
          : "opacity-60 cursor-not-allowed"
      )}
    >
      {/* Accent bar */}
      <div 
        className={cn(
          "absolute top-0 left-0 right-0 h-1 rounded-t-xl",
          accentColor || "bg-primary"
        )}
      />
      
      <div className="flex items-start gap-4 pt-2">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
          isActive ? "bg-primary/10" : "bg-muted"
        )}>
          <Icon className={cn(
            "w-6 h-6",
            isActive ? "text-primary" : "text-muted-foreground"
          )} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold truncate">{title}</h3>
            {isActive && count !== undefined && (
              <span className="font-mono text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded">
                {count}
              </span>
            )}
            {!isActive && (
              <Lock className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );

  if (!isActive) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div>{cardContent}</div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">{plannedMessage || "Planned feature"}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return <Link to={path}>{cardContent}</Link>;
}
