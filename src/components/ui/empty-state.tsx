import { LucideIcon } from "lucide-react";
import { Button } from "./button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  helperText?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  helperText,
}: EmptyStateProps) {
  return (
    <div className="empty-state animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="font-serif text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-[280px] mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mb-3">
          {actionLabel}
        </Button>
      )}
      {helperText && (
        <p className="text-xs text-muted-foreground/70 max-w-[240px]">
          {helperText}
        </p>
      )}
    </div>
  );
}
